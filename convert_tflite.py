import os
import tensorflow as tf

MODEL_PATH = "models/plant_disease_model.keras"
OUTPUT_PATH = "models/plant_disease_model.tflite"

print("Loading trained model...")
model = tf.keras.models.load_model(MODEL_PATH)

print("Converting model to TensorFlow Lite...")
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

os.makedirs("models", exist_ok=True)

with open(OUTPUT_PATH, "wb") as file:
    file.write(tflite_model)

print("\nConversion completed successfully!")
print("TensorFlow Lite model saved to:", OUTPUT_PATH)
print("Model size:", round(len(tflite_model) / (1024 * 1024), 2), "MB")