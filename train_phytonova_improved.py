
import json
import random
from pathlib import Path

import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight

# -------------------- SETTINGS --------------------

SEED = 42
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 16
EPOCHS_HEAD = 12
EPOCHS_FINE = 15

TRAIN_DIR = Path("dataset/PlantDoc/train")
MODEL_DIR = Path("models")

OUTPUT_MODEL = MODEL_DIR / "phytonova_mobilenetv2_improved.keras"
OUTPUT_LABELS = MODEL_DIR / "phytonova_mobilenetv2_improved_labels.txt"
OUTPUT_HISTORY = Path("results/phytonova_improved_training_history.json")

random.seed(SEED)
np.random.seed(SEED)
tf.random.set_seed(SEED)

MODEL_DIR.mkdir(exist_ok=True)
OUTPUT_HISTORY.parent.mkdir(exist_ok=True)

# -------------------- CHECK CLASSES --------------------


LABEL_SOURCE = MODEL_DIR / "phytonova_mobilenetv2_labels.txt"

class_names = [
    line.strip()
    for line in LABEL_SOURCE.read_text(encoding="utf-8").splitlines()
    if line.strip()
]

if len(class_names) != 27 or len(set(class_names)) != 27:
    raise ValueError("Expected exactly 27 unique classes in labels file")

for name in class_names:
    if not (TRAIN_DIR / name).is_dir():
        raise ValueError(f"Missing training folder: {name}")

print("Classes:", len(class_names))

OUTPUT_LABELS.write_text(
    "\n".join(class_names) + "\n",
    encoding="utf-8"
)


# -------------------- COLLECT IMAGE PATHS --------------------

valid_extensions = {".jpg", ".jpeg", ".png", ".bmp"}

image_paths = []
image_labels = []

for class_index, class_name in enumerate(class_names):
    files = sorted(
        p for p in (TRAIN_DIR / class_name).rglob("*")
        if p.is_file() and p.suffix.lower() in valid_extensions
    )

    for file_path in files:
        image_paths.append(str(file_path))
        image_labels.append(class_index)

image_paths = np.array(image_paths)
image_labels = np.array(image_labels)

print("Total images:", len(image_paths))

# -------------------- STRATIFIED SPLIT --------------------

train_paths, val_paths, train_labels, val_labels = train_test_split(
    image_paths,
    image_labels,
    test_size=0.20,
    random_state=SEED,
    stratify=image_labels
)

print("Training images:", len(train_paths))
print("Validation images:", len(val_paths))

# -------------------- LOAD DATA --------------------

def load_image(path, label):
    image = tf.io.read_file(path)
    image = tf.io.decode_image(
        image, channels=3, expand_animations=False
    )
    image.set_shape([None, None, 3])
    image = tf.image.resize(image, IMAGE_SIZE)
    image = tf.cast(image, tf.float32)
    return image, label

def make_dataset(paths, labels, training=False):
    ds = tf.data.Dataset.from_tensor_slices((paths, labels))

    if training:
        ds = ds.shuffle(
            len(paths), seed=SEED, reshuffle_each_iteration=True
        )

    ds = ds.map(
        load_image,
        num_parallel_calls=tf.data.AUTOTUNE
    )

    ds = ds.batch(BATCH_SIZE)
    ds = ds.prefetch(tf.data.AUTOTUNE)
    return ds

train_ds = make_dataset(train_paths, train_labels, training=True)
val_ds = make_dataset(val_paths, val_labels)

# -------------------- CLASS WEIGHTS --------------------

weights = compute_class_weight(
    class_weight="balanced",
    classes=np.arange(len(class_names)),
    y=train_labels
)

class_weights = {
    i: float(weight) for i, weight in enumerate(weights)
}

print("Class weights calculated.")

# -------------------- BUILD MODEL --------------------

augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip("horizontal"),
    tf.keras.layers.RandomRotation(0.08),
    tf.keras.layers.RandomZoom(0.10),
], name="data_augmentation")

base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

base_model.trainable = False

inputs = tf.keras.Input(shape=(224, 224, 3), name="image")

x = augmentation(inputs)
x = tf.keras.layers.Rescaling(
    scale=1.0 / 127.5,
    offset=-1.0,
    name="mobilenet_scaling"
)(x)

x = base_model(x, training=False)
x = tf.keras.layers.GlobalAveragePooling2D()(x)
x = tf.keras.layers.Dropout(0.30)(x)

outputs = tf.keras.layers.Dense(
    len(class_names),
    activation="softmax",
    name="predictions"
)(x)

model = tf.keras.Model(inputs, outputs, name="PhytoNova_Improved")

# -------------------- CALLBACKS --------------------

callbacks = [
    tf.keras.callbacks.EarlyStopping(
        monitor="val_loss",
        patience=4,
        restore_best_weights=True
    ),
    tf.keras.callbacks.ReduceLROnPlateau(
        monitor="val_loss",
        factor=0.2,
        patience=2,
        min_lr=1e-7
    )
]

# -------------------- PHASE 1 --------------------

print("\nPHASE 1: Training classification head")

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

history_head = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS_HEAD,
    class_weight=class_weights,
    callbacks=callbacks
)

# -------------------- PHASE 2 --------------------

print("\nPHASE 2: Fine-tuning MobileNetV2")

base_model.trainable = True

# Freeze most layers; fine-tune only the last 30
for layer in base_model.layers[:-30]:
    layer.trainable = False

# Keep Batch Normalization layers frozen
for layer in base_model.layers:
    if isinstance(layer, tf.keras.layers.BatchNormalization):
        layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

history_fine = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS_FINE,
    class_weight=class_weights,
    callbacks=callbacks
)

# -------------------- SAVE MODEL --------------------

model.save(OUTPUT_MODEL)

history_data = {
    "head": {
        key: [float(x) for x in values]
        for key, values in history_head.history.items()
    },
    "fine_tuning": {
        key: [float(x) for x in values]
        for key, values in history_fine.history.items()
    }
}

OUTPUT_HISTORY.write_text(
    json.dumps(history_data, indent=2),
    encoding="utf-8"
)

print("\nTRAINING FINISHED")
print("Saved model:", OUTPUT_MODEL)
print("Saved labels:", OUTPUT_LABELS)
print("Saved history:", OUTPUT_HISTORY)
print("Best validation accuracy:",
      max(history_fine.history["val_accuracy"]))
