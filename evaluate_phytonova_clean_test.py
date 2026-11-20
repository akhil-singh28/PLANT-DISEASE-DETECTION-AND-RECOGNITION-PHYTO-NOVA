
from pathlib import Path
import hashlib
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

BASE = Path("dataset/PlantDoc")
TRAIN_DIR = BASE / "train"
TEST_DIR = BASE / "test"

MODEL_PATH = Path("models/phytonova_mobilenetv2_improved.keras")
LABEL_PATH = Path("models/phytonova_mobilenetv2_improved_labels.txt")
REPORT_PATH = Path("results/phytonova_clean_test_report.txt")

# Load labels and model
class_names = [
    x.strip()
    for x in LABEL_PATH.read_text(encoding="utf-8").splitlines()
    if x.strip()
]

if len(class_names) != 27:
    raise ValueError("Expected 27 classes.")

model = tf.keras.models.load_model(MODEL_PATH)

# Hash all training images
train_hashes = set()

for file in TRAIN_DIR.rglob("*"):
    if file.is_file() and file.suffix.lower() == ".jpg":
        digest = hashlib.sha256(file.read_bytes()).hexdigest()
        train_hashes.add(digest)

# Collect only test images not found in training
images = []
true_labels = []
excluded = 0

for class_index, class_name in enumerate(class_names):
    folder = TEST_DIR / class_name

    for file in sorted(folder.rglob("*")):
        if not file.is_file() or file.suffix.lower() != ".jpg":
            continue

        digest = hashlib.sha256(file.read_bytes()).hexdigest()

        if digest in train_hashes:
            excluded += 1
            continue

        with Image.open(file) as img:
            img = img.convert("RGB")
            img = img.resize((224, 224))
            images.append(np.asarray(img, dtype=np.float32))
            true_labels.append(class_index)

X_test = np.asarray(images, dtype=np.float32)
y_true = np.asarray(true_labels)

if len(X_test) == 0:
    raise ValueError("No independent test images found.")

print("Excluded duplicate test images:", excluded)
print("Remaining test images:", len(X_test))

# Predict
probabilities = model.predict(
    X_test, batch_size=16, verbose=1
)
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
    "\nPHYTO NOVA - CLEAN TEST RESULTS\n"
    "================================\n"
    f"Original test images: 236\n"
    f"Excluded duplicates: {excluded}\n"
    f"Independent test images: {len(X_test)}\n"
    f"Accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)\n"
    f"Macro precision: {precision:.4f} ({precision*100:.2f}%)\n"
    f"Macro recall: {recall:.4f} ({recall*100:.2f}%)\n"
    f"Macro F1-score: {f1:.4f} ({f1*100:.2f}%)\n\n"
    f"{report}"
)

print(summary)

REPORT_PATH.parent.mkdir(exist_ok=True)
REPORT_PATH.write_text(summary, encoding="utf-8")

print("Report saved:", REPORT_PATH)
