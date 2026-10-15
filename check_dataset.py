import os
import tensorflow as tf

train_dir = "dataset/PlantDoc/train"
test_dir = "dataset/PlantDoc/test"

print("TensorFlow version:", tf.__version__)

for name, folder in [("TRAIN", train_dir), ("TEST", test_dir)]:
    print(f"\n{name} dataset:")
    classes = sorted(
        item for item in os.listdir(folder)
        if os.path.isdir(os.path.join(folder, item))
    )
    print("Number of classes:", len(classes))

    total_images = 0
    for class_name in classes:
        class_dir = os.path.join(folder, class_name)
        images = [
            f for f in os.listdir(class_dir)
            if f.lower().endswith((".jpg", ".jpeg", ".png", ".bmp", ".webp"))
        ]
        total_images += len(images)
        print(f"  {class_name}: {len(images)} images")

    print("Total images:", total_images)

print("\nDataset check completed.")