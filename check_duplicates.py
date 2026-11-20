
from pathlib import Path
import hashlib

base = Path("dataset/PlantDoc")
train = {}

# Build a hash index of training images
for file in (base / "train").rglob("*.jpg"):
    digest = hashlib.sha256(file.read_bytes()).hexdigest()
    train.setdefault(digest, []).append(file)

# Find matching test images
count = 0

for file in (base / "test").rglob("*.jpg"):
    digest = hashlib.sha256(file.read_bytes()).hexdigest()

    if digest in train:
        count += 1
        print(f"\nTEST: {file.parent.name} | {file.name}")

        for training_file in train[digest]:
            print(
                f"TRAIN: {training_file.parent.name} | "
                f"{training_file.name}"
            )

print("\nTotal train-test duplicate pairs:", count)
