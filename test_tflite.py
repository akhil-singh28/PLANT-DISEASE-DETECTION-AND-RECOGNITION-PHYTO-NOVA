import os
import numpy as np
import tensorflow as tf

MODEL_PATH = "models/plant_disease_model.tflite"
TEST_DIR = "dataset/PlantDoc/test"
IMG_SIZE = (224, 224)

# Load the TFLite model
interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

print("TFLite model loaded successfully!")
print("Input shape:", input_details[0]["shape"])
print("Output shape:", output_details[0]["shape"])

# Select the first available test image
image_path = None
true_class = None

for class_name in sorted(os.listdir(TEST_DIR)):
    class_dir = os.path.join(TEST_DIR, class_name)
    if not os.path.isdir(class_dir):
        continue

    for filename in sorted(os.listdir(class_dir)):
        if filename.lower().endswith((".jpg", ".jpeg", ".png", ".bmp", ".webp")):
            image_path = os.path.join(class_dir, filename)
            true_class = class_name
            break

    if image_path:
        break

if image_path is None:
    raise RuntimeError("No test images found.")

# Load and prepare image
image = tf.keras.utils.load_img(image_path, target_size=IMG_SIZE)
image_array = tf.keras.utils.img_to_array(image)
image_array = np.expand_dims(image_array, axis=0)

# Apply MobileNetV2 preprocessing
image_array = tf.keras.applications.mobilenet_v2.preprocess_input(
    image_array
)

# Run inference
interpreter.set_tensor(input_details[0]["index"], image_array.astype(np.float32))
interpreter.invoke()

scores = interpreter.get_tensor(output_details[0]["index"])[0]
predicted_index = int(np.argmax(scores))

# Recreate the training class order
class_names = sorted(
    name for name in os.listdir("dataset/PlantDoc/train")
    if os.path.isdir(os.path.join("dataset/PlantDoc/train", name))
    and os.path.isdir(os.path.join(TEST_DIR, name))
)

print("\nImage tested:", image_path)
print("Actual class:", true_class)
print("Predicted class:", class_names[predicted_index])
print("Model confidence:", f"{scores[predicted_index] * 100:.2f}%")
print("\nTFLite prediction test completed.")