import os
import json

TRAIN_DIR = "dataset/PlantDoc/train"
TEST_DIR = "dataset/PlantDoc/test"

# Keep only classes shared by training and testing
class_names = sorted(
    name for name in os.listdir(TRAIN_DIR)
    if os.path.isdir(os.path.join(TRAIN_DIR, name))
    and os.path.isdir(os.path.join(TEST_DIR, name))
)

os.makedirs("models", exist_ok=True)

# Save labels in the model's output order
with open("models/labels.txt", "w", encoding="utf-8") as file:
    file.write("\n".join(class_names) + "\n")

# Also save as JSON for convenient app integration
with open("models/labels.json", "w", encoding="utf-8") as file:
    json.dump(class_names, file, indent=2, ensure_ascii=False)

print("Saved", len(class_names), "class labels.")
print("Files: models/labels.txt and models/labels.json")
print("\nClass order:")
for index, name in enumerate(class_names):
    print(index, ":", name)