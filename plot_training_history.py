
import json
from pathlib import Path
import matplotlib.pyplot as plt

# File locations
history_file = Path("results/phytonova_improved_training_history.json")
output_dir = Path("results")
output_dir.mkdir(exist_ok=True)

# Load actual training history
with open(history_file, "r", encoding="utf-8") as file:
    history = json.load(file)

head = history["head"]
fine = history["fine_tuning"]

# Join both training stages
train_accuracy = head["accuracy"] + fine["accuracy"]
val_accuracy = head["val_accuracy"] + fine["val_accuracy"]

train_loss = head["loss"] + fine["loss"]
val_loss = head["val_loss"] + fine["val_loss"]

epochs = range(1, len(train_accuracy) + 1)
fine_start = len(head["accuracy"]) + 0.5

# Graph 1: Accuracy
plt.figure(figsize=(10, 6))
plt.plot(epochs, train_accuracy, label="Training Accuracy", marker="o")
plt.plot(epochs, val_accuracy, label="Validation Accuracy", marker="o")
plt.axvline(fine_start, linestyle="--", label="Fine-tuning begins")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.title("Phyto Nova - Training and Validation Accuracy")
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig(output_dir / "phytonova_training_accuracy.png", dpi=300)
plt.close()

# Graph 2: Loss
plt.figure(figsize=(10, 6))
plt.plot(epochs, train_loss, label="Training Loss", marker="o")
plt.plot(epochs, val_loss, label="Validation Loss", marker="o")
plt.axvline(fine_start, linestyle="--", label="Fine-tuning begins")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.title("Phyto Nova - Training and Validation Loss")
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig(output_dir / "phytonova_training_loss.png", dpi=300)
plt.close()

print("Graphs generated successfully!")
print("Accuracy graph: results/phytonova_training_accuracy.png")
print("Loss graph: results/phytonova_training_loss.png")
print("Total epochs:", len(train_accuracy))
print("Head training epochs:", len(head["accuracy"]))
print("Fine-tuning epochs:", len(fine["accuracy"]))
