
from pathlib import Path
import numpy as np
import tensorflow as tf
from PIL import Image
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report
)

MODEL_PATH = Path("models/phytonova_mobilenetv2_improved.keras")
LABEL_PATH = Path("models/phytonova_mobilenetv2_improved_labels.txt")
TEST_DIR = Path("dataset/PlantDoc/test")
REPORT_PATH = Path("results/phytonova_improved_test_report.txt")

# Load model and its exact class order
model = tf.keras.models.load_model(MODEL_PATH)

class_names = [
    x.strip()
    for x in LABEL_PATH.read_text(encoding="utf-8").splitlines()
    if x.strip()
]

if len(class_names) != 27:
    raise ValueError("Expected 27 class labels.")

# Check that test folders match the model labels
test_classes = {
    p.name for p in TEST_DIR.iterdir() if p.is_dir()
}

if test_classes != set(class_names):
    raise ValueError("Test folder classes do not match model labels.")

# Load test images
valid_extensions = {".jpg", ".jpeg", ".png", ".bmp"}

images = []
true_labels = []

for class_index, class_name in enumerate(class_names):
    folder = TEST_DIR / class_name

    files = sorted(
        p for p in folder.rglob("*")
        if p.is_file() and p.suffix.lower() in valid_extensions
    )

    for file_path in files:
        with Image.open(file_path) as img:
            img = img.convert("RGB")
            img = img.resize((224, 224))
            images.append(np.asarray(img, dtype=np.float32))
            true_labels.append(class_index)

X_test = np.array(images, dtype=np.float32)
y_true = np.array(true_labels)

print("Test images:", len(X_test))

# Predict
probabilities = model.predict(X_test, batch_size=16, verbose=1)
y_pred = np.argmax(probabilities, axis=1)

# Calculate metrics
accuracy = accuracy_score(y_true, y_pred)
precision = precision_score(
    y_true, y_pred, average="macro", zero_division=0
)
recall = recall_score(
    y_true, y_pred, average="macro", zero_division=0
)
f1 = f1_score(
    y_true, y_pred, average="macro", zero_division=0
)

report = classification_report(
    y_true,
    y_pred,
    labels=np.arange(len(class_names)),
    target_names=class_names,
    zero_division=0
)

summary = (
    "\nPHYTO NOVA IMPROVED MODEL - TEST RESULTS\n"
    "========================================\n"
    f"Test images: {len(X_test)}\n"
    f"Accuracy: {accuracy:.4f} ({accuracy * 100:.2f}%)\n"
    f"Macro precision: {precision:.4f} ({precision * 100:.2f}%)\n"
    f"Macro recall: {recall:.4f} ({recall * 100:.2f}%)\n"
    f"Macro F1-score: {f1:.4f} ({f1 * 100:.2f}%)\n\n"
    "CLASSIFICATION REPORT\n"
    "=====================\n"
    f"{report}"
)

print(summary)

REPORT_PATH.parent.mkdir(exist_ok=True)
REPORT_PATH.write_text(summary, encoding="utf-8")

print("Report saved to:", REPORT_PATH)
