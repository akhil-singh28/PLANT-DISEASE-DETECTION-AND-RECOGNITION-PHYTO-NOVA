import os
import tensorflow as tf

# Dataset folders
TRAIN_DIR = "dataset/PlantDoc/train"
TEST_DIR = "dataset/PlantDoc/test"

# Model settings
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
SEED = 42

# Use only classes available in both train and test
train_classes = {
    name for name in os.listdir(TRAIN_DIR)
    if os.path.isdir(os.path.join(TRAIN_DIR, name))
}
test_classes = {
    name for name in os.listdir(TEST_DIR)
    if os.path.isdir(os.path.join(TEST_DIR, name))
}

CLASS_NAMES = sorted(train_classes & test_classes)

print("TensorFlow version:", tf.__version__)
print("Number of classes:", len(CLASS_NAMES))
print("Classes:")
for name in CLASS_NAMES:
    print(" -", name)

# Load training images using the shared class list
train_ds = tf.keras.utils.image_dataset_from_directory(
    TRAIN_DIR,
    class_names=CLASS_NAMES,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int",
    seed=SEED
)

# Load test images using exactly the same class order
test_ds = tf.keras.utils.image_dataset_from_directory(
    TEST_DIR,
    class_names=CLASS_NAMES,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int",
    shuffle=False
)

print("\nTraining batches:", tf.data.experimental.cardinality(train_ds).numpy())
print("Test batches:", tf.data.experimental.cardinality(test_ds).numpy())
print("\nDataset loading check completed successfully.")




# Build a MobileNetV2 transfer-learning model

# Load pretrained ImageNet features
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

# Freeze pretrained layers for initial training
base_model.trainable = False

# Add our plant disease classification head
inputs = tf.keras.Input(shape=(224, 224, 3))

# Apply MobileNetV2's required preprocessing
x = tf.keras.applications.mobilenet_v2.preprocess_input(inputs)

# Extract image features
x = base_model(x, training=False)

# Convert features into one vector per image
x = tf.keras.layers.GlobalAveragePooling2D()(x)

# Reduce overfitting
x = tf.keras.layers.Dropout(0.2)(x)

# Predict one of the 27 classes
outputs = tf.keras.layers.Dense(
    len(CLASS_NAMES),
    activation="softmax"
)(x)

model = tf.keras.Model(inputs, outputs)

# Configure training
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

print("\nMobileNetV2 model created successfully.")

# Train the classification head
EPOCHS = 10

history = model.fit(
    train_ds,
    validation_data=test_ds,
    epochs=EPOCHS
)

# Save the trained model
os.makedirs("models", exist_ok=True)
model.save("models/plant_disease_model.keras")

print("\nTraining completed!")
print("Model saved to models/plant_disease_model.keras")
