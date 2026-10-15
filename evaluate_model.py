import tensorflow as tf
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix

TEST_DIR = "dataset/PlantDoc/test"
MODEL_PATH = "models/plant_disease_model.keras"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# Load the saved model
model = tf.keras.models.load_model(MODEL_PATH)

# Use the same class order as training
class_names = sorted(
    name for name in __import__("os").listdir(TEST_DIR)
    if __import__("os").path.isdir(
        __import__("os").path.join(TEST_DIR, name)
    )
)

# Load test images without shuffling
test_ds = tf.keras.utils.image_dataset_from_directory(
    TEST_DIR,
    class_names=class_names,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    label_mode="int",
    shuffle=False
)

# Evaluate overall performance
loss, accuracy = model.evaluate(test_ds, verbose=1)
print(f"\nTest loss: {loss:.4f}")
print(f"Test accuracy: {accuracy * 100:.2f}%")

# Get true labels and model predictions
y_true = np.concatenate([labels.numpy() for _, labels in test_ds])
probabilities = model.predict(test_ds, verbose=1)
y_pred = np.argmax(probabilities, axis=1)

print("\nClassification report:")
print(classification_report(
    y_true,
    y_pred,
    labels=range(len(class_names)),
    target_names=class_names,
    zero_division=0
))

print("\nConfusion matrix:")
print(confusion_matrix(y_true, y_pred))

print("\nEvaluation completed.")

# Save evaluation results to a text file
import os

os.makedirs("results", exist_ok=True)

report = classification_report(
    y_true,
    y_pred,
    labels=range(len(class_names)),
    target_names=class_names,
    zero_division=0
)

with open("results/evaluation_report.txt", "w", encoding="utf-8") as file:
    file.write(f"Test loss: {loss:.4f}\n")
    file.write(f"Test accuracy: {accuracy * 100:.2f}%\n\n")
    file.write("Classification Report:\n")
    file.write(report)
    file.write("\n\nConfusion Matrix:\n")
    file.write(str(confusion_matrix(y_true, y_pred)))

print("Evaluation report saved to results/evaluation_report.txt")