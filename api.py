
from io import BytesIO
from pathlib import Path

import numpy as np
from openai import models
import tensorflow as tf
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "phytonova_mobilenetv2.keras"
LABELS_PATH = BASE_DIR / "models" / "phytonova_mobilenetv2_labels.txt"

app = FastAPI(title="Plant Disease Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model(MODEL_PATH)
labels = LABELS_PATH.read_text(encoding="utf-8").splitlines()


@app.get("/")
def home():
    return {"message": "Plant Disease Detection API is running"}
import base64
import binascii

from pydantic import BaseModel


class ImageRequest(BaseModel):
    image: str
    
@app.post("/predict")
async def predict(request: ImageRequest):
    try:
        image_bytes = base64.b64decode(request.image, validate=True)

        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        image = image.resize((224, 224))

        image_array = np.asarray(image, dtype=np.float32) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        
        predictions = model.predict(image_array, verbose=0)[0]
        predicted_index = int(np.argmax(predictions))
        confidence = float(predictions[predicted_index])

        return {
            "disease": labels[predicted_index],
            "confidence": round(confidence, 4),
            "needs_review": True,
            "message": (
                "This is an AI-generated prediction, not a confirmed diagnosis. "
                "Check that the plant is supported by PhytoNova and verify the result."
            ),
        }


    except (ValueError, binascii.Error):
        raise HTTPException(
            status_code=400,
            detail="Invalid Base64 image data.",
        )
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=f"Could not process image: {exc}",
        )



import os
import asyncio
from dotenv import load_dotenv
from google import genai
from fastapi import HTTPException
from pydantic import BaseModel

load_dotenv(BASE_DIR / ".env")


class ChatRequest(BaseModel):
    message: str



@app.post("/chat")
async def chat(request: ChatRequest):
    question = request.message.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Please enter a question.",
        )

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="Gemini API key is not configured.",
        )

    client = genai.Client(api_key=api_key)

    prompt = (
        "You are Phyto Nova, a helpful plant-care assistant. "
        "Answer questions about plant health, common diseases, "
        "prevention, and general plant care in simple language. "
        "Do not claim certainty from text alone. "
        "Recommend expert help for serious or unclear symptoms.\n\n"
        f"User question: {question}"
    )

    # Try the primary model, then a fallback model.
    models = ["gemini-3.5-flash", "gemini-flash-lite-latest"]

    for model in models:
        for attempt in range(2):
            try:
                response = await asyncio.to_thread(
                    client.models.generate_content,
                    model=model,
                    contents=prompt,
                )

                if response.text:
                    return {"reply": response.text}

                print(f"{model} returned an empty response.")

            except Exception as exc:
                error_text = str(exc)
                print(f"Gemini error ({model}, attempt {attempt + 1}): {error_text}")

                # Retry only temporary service/overload errors.
                if any(code in error_text for code in ("503", "UNAVAILABLE", "429", "500", "502", "504")):
                    if attempt == 0:
                        await asyncio.sleep(2**(attempt + 1))  # Exponential backoff
                        continue
                else:
                    # Don't keep retrying authentication or request errors.
                    break

    raise HTTPException(
        status_code=503,
        detail="The plant-care assistant is temporarily busy. Please try again shortly.",
    )
