
import tensorflow as tf
import numpy as np
from pathlib import Path
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    f1_score
)

# Paths
TEST_DIR = Path("dataset/PlantDoc/test")
MODEL_PATH = Path("models/phytonova_mobilenetv2.keras")
LABELS_PATH = Path("models/phytonova_mobilenetv2_labels.txt")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# Load the exact class order used by Phyto Nova
class_names = [
    line.strip()
    for line in LABELS_PATH.read_text(encoding="utf-8").splitlines()
    if line.strip()
]

# Check that test folders match the model labels
test_classes = sorted(
    folder.name for folder in TEST_DIR.iterdir()
    if folder.is_dir()
)

if set(class_names) != set(test_classes):
    raise ValueError(
        "Test folder names do not match the model labels.\n"
        f"Missing folders: {set(class_names) - set(test_classes)}\n"
        f"Extra folders: {set(test_classes) - set(class_names)}"
    )

# Load test images in the model's class order
test_ds = tf.keras.utils.image_dataset_from_directory(
    str(TEST_DIR),
    class_names=class_names,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int",
    shuffle=False
)

# Apply the same pixel normalization used by api.py
test_ds = test_ds.map(
    lambda images, labels: (
        tf.cast(images, tf.float32) / 255.0,
        labels
    )
).prefetch(tf.data.AUTOTUNE)

# Load Phyto Nova MobileNetV2
model = tf.keras.models.load_model(str(MODEL_PATH))

# Check model output classes
if model.output_shape[-1] != len(class_names):
    raise ValueError(
        f"Model outputs {model.output_shape[-1]} classes, "
        f"but labels contain {len(class_names)} classes."
    )

# Get actual labels and predictions
y_true = np.concatenate([
    labels.numpy() for _, labels in test_ds
])

predictions = model.predict(test_ds, verbose=1)
y_pred = np.argmax(predictions, axis=1)

# Calculate only the three requested metrics
accuracy = accuracy_score(y_true, y_pred)

macro_precision = precision_score(
    y_true, y_pred,
    average="macro",
    zero_division=0
)

macro_f1 = f1_score(
    y_true, y_pred,
    average="macro",
    zero_division=0
)

# Display results
print("\nPHYTO NOVA MOBILENETV2 EVALUATION")
print("---------------------------------")
print(f"Test images: {len(y_true)}")
print(f"Classes: {len(class_names)}")
print(f"Accuracy: {accuracy * 100:.2f}%")
print(f"Macro Precision: {macro_precision:.4f}")
print(f"Macro F1-score: {macro_f1:.4f}")

# Save to a NEW report, preserving the old report
output_file = Path("results/phytonova_mobilenetv2_evaluation.txt")
output_file.parent.mkdir(exist_ok=True)

output_file.write_text(
    "PHYTO NOVA MOBILENETV2 EVALUATION\n"
    "---------------------------------\n"
    f"Test images: {len(y_true)}\n"
    f"Classes: {len(class_names)}\n"
    f"Accuracy: {accuracy * 100:.2f}%\n"
    f"Macro Precision: {macro_precision:.4f}\n"
    f"Macro F1-score: {macro_f1:.4f}\n",
    encoding="utf-8"
)

print(f"\nResults saved to: {output_file}")
