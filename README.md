# 🌿Phyto Nova – PLANT DISEASE DETECTION AND RECOGNITION

Phyto Nova is an AI-powered PLANT DISEASE DETECTION AND RECOGNITION application designed to help users identify plant leaf diseases using images captured from a mobile device or selected from the Gallery.

The project combines a MobileNetV2-based deep learning model, a Python FastAPI backend, and an Expo React Native Mobile Application. It also includes an AI Chatbot powered by the Gemini API.

---

## 📌 Table of Contents
1. [Project Overview](#-project-overview)
2. [Main Features](#-main-features)
3. [Technology Stack](#-technology-stack)
4. [Project Architecture](#-project-architecture)
5. [Project Folder Structure](#-project-folder-structure)
6. [System Requirements](#-system-requirements)
7. [Installation and Setup](#-installation-and-setup)
8. [Backend Setup](#-backend-setup)
9. [Mobile Application Setup](#-mobile-application-setup)
10. [Running the Complete Project](#-running-the-complete-project)
11. [Deep Learning Model](#-deep-learning-model)
12. [Dataset Information](#-dataset-information)
13. [Training the Improved Model](#-training-the-improved-model)
14. [Model Evaluation](#-model-evaluation)
15. [Generating Training Graphs](#-generating-training-graphs)
16. [Research Results](#-research-results)
17. [Generating the Android APK](#-generating-the-android-apk)
18. [API Endpoints](#-api-endpoints)
19. [Troubleshooting](#-troubleshooting)
20. [Limitations and Future Scope](#-limitations-and-future-scope)
21. [Security Notes](#-security-notes)
22. [Conclusion](#-conclusion)

---

## 🌱 Project Overview

Plant diseases can negatively affect agricultural productivity and crop quality. Early identification of plant diseases can help farmers and gardeners take appropriate preventive and corrective measures.

Phyto Nova aims to provide an accessible mobile-based solution for plant leaf disease classification.

Users can capture or upload a plant leaf image. The image is sent to a Python backend, where a trained deep learning model processes it and predicts the most likely disease category.

The application also includes an AI chatbot to provide plant-related information and assistance.

### Project Objectives

- Develop an AI-based Plant Disease classification system.
- Classify plant leaf images into 27 supported categories.
- Integrate a trained MobileNetV2 model with a mobile application.
- Provide an easy-to-use interface for image-based disease detection.
- Integrate an AI chatbot for plant-related assistance.
- Evaluate model performance using accuracy, precision, and F1-score.

---

## ✨ Main Features

- Plant leaf image capture using a mobile camera.
- Image selection from the device gallery.
- AI-based plant disease prediction.
- Classification across 27 supported categories.
- Prediction confidence display, where provided by the backend.
- Plant-related AI chatbot using Gemini.
- Mobile application interface built with React Native and Expo.
- Settings and application navigation.
- Android APK generation using Expo Application Services (EAS).

---

## 🛠 Technology Stack

| Component | Technology |
|---|---|
| Programming language | Python |
| Deep learning framework | TensorFlow / Keras |
| Model architecture | MobileNetV2 |
| Pretrained weights | ImageNet |
| Backend framework | FastAPI |
| API server | Uvicorn |
| Mobile framework | React Native |
| Mobile development platform | Expo |
| Navigation | Expo Router |
| Chatbot integration | Google Gemini API |
| Image processing | Pillow |
| Numerical processing | NumPy |
| Model evaluation | Scikit-learn |
| Graph generation | Matplotlib |
| Android build | Expo Application Services (EAS) |

---

## 🏗 Project Architecture

The system consists of three main components.

### 1. Mobile Application

The mobile application provides the user interface. Users can capture or select leaf images and send them to the backend for prediction.

### 2. Python Backend

The backend is developed using FastAPI. It receives images, performs preprocessing, loads the trained model, and returns prediction results.

The backend also provides a chatbot endpoint that communicates with the Gemini API.

### 3. Deep Learning Model

The plant disease classifier uses MobileNetV2 transfer learning to classify leaf images into 27 categories.

### System Workflow

```text
             USER
               |
               v
      PHYTO NOVA MOBILE APP
               |
        Capture / Upload
          Leaf Image
               |
               v
         FASTAPI BACKEND
               |
        Image Preprocessing
        Resize to 224 x 224
               |
               v
       MobileNetV2 Model
               |
         Classification
               |
               v
       Predicted Disease
               |
               v
       Result to Mobile App
```

Chatbot workflow:

```text
       USER QUESTION
             |
             v
      PHYTO NOVA APP
             |
             v
       FASTAPI /chat
             |
             v
       GEMINI API
             |
             v
       CHAT RESPONSE
             |
             v
       MOBILE APP
```

---

## 📁 Project Folder Structure

The main project directory is:

```text
PlantDiseaseProject/
│
├── api.py
├── train_phytonova_improved.py
├── evaluate_phytonova_clean_test.py
├── plot_training_history.py
├── .env
├── .venv/
│
├── models/
│   ├── phytonova_mobilenetv2.keras
│   ├── phytonova_mobilenetv2_labels.txt
│   ├── phytonova_mobilenetv2_improved.keras
│   ├── phytonova_mobilenetv2_improved_labels.txt
│   ├── phytonova_mobilenetv2_improved_training_history.json
│   ├── plant_disease_model.keras
│   ├── plant_disease_model.tflite
│   ├── labels.json
│   └── labels.txt
│
├── dataset/
│   └── PlantDoc/
│       ├── train/
│       └── test/
│
├── results/
│   ├── phytonova_improved_test_report.txt
│   ├── phytonova_clean_test_report.txt
│   ├── phytonova_improved_training_history.json
│   ├── phytonova_training_accuracy.png
│   └── phytonova_training_loss.png
│
├── PlantDiseaseApp/
│   ├── app/
│   │   ├── index.tsx
│   │   ├── chatbot.tsx
│   │   ├── settings.tsx
│   │   └── theme-context.tsx
│   ├── components/
│   │   └── app-tabs.tsx
│   ├── app.json
│   ├── eas.json
│   ├── package.json
│   └── ...
│
└── README.md
```

*Note: This is a documentation overview. Some folders may contain additional files, and generated reports or model files may be added as the project develops.*

---

## 💻 System Requirements

Recommended development environment:

- Windows 10 or Windows 11.
- Python installed.
- Node.js and npm installed.
- Android phone with Expo Go for development testing.
- Internet connection for package installation and Gemini API requests.
- Sufficient storage for the dataset, Python environment, and model files.
- An NVIDIA GPU for training environment - TensorFlow
---

## ⚙ Installation and Setup

### Step 1: Download or clone the project

If using Git:

```cmd
git clone YOUR_REPOSITORY_URL
```

Alternatively, download and extract the project ZIP file.

Open Command Prompt and navigate to the project directory:

```cmd
cd C:\Users\hp\PlantDiseaseProject
```

### Step 2: Create a Python virtual environment

```cmd
python -m venv .venv
```

Activate it:

```cmd
.venv\Scripts\activate
```

If the virtual environment has already been created, activate the existing one.

### Step 3: Install Python dependencies

If a `requirements.txt` file is available:

```cmd
python -m pip install -r requirements.txt
```

If it is not available, install the packages required by the backend and model scripts. The project uses packages including:

```cmd
python -m pip install tensorflow fastapi uvicorn python-multipart pillow numpy scikit-learn matplotlib python-dotenv google-genai
```

Use the versions compatible with your existing model and Python environment. Avoid upgrading TensorFlow or Keras unnecessarily in an already-working environment.

---

## 🖥 Backend Setup

The backend file is:

```text
api.py
```

The backend uses FastAPI to receive plant images and return model predictions.

### Step 1: Configure environment variables

Create a `.env` file in the project root.

Add your Gemini API key:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Replace the placeholder with your own API key.

Never publish the actual API key in GitHub or include it in this README.

### Step 2: Verify model files

The original model and its label file are:

```text
models/phytonova_mobilenetv2.keras
models/phytonova_mobilenetv2_labels.txt
```

The improved model files are:

```text
models/phytonova_mobilenetv2_improved.keras
models/phytonova_mobilenetv2_improved_labels.txt
```

The currently configured backend must use the model paths specified in `api.py`.

Do not replace the original model with the improved model without testing the prediction pipeline and confirming that the label order is correct.

### Step 3: Start the backend server

Open Command Prompt:

```cmd
cd C:\Users\hp\PlantDiseaseProject
```

Start FastAPI:

```cmd
.\.venv\Scripts\python.exe -m uvicorn api:app --host 0.0.0.0 --port 8000
```

If successful, the server will be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

Keep this terminal open while using the mobile application.

---

## 📱 Mobile Application Setup

The mobile application is inside:

```text
PlantDiseaseApp/
```

It is built using React Native and Expo.

### Step 1: Open the frontend directory

Open a second Command Prompt window:

```cmd
cd C:\Users\hp\PlantDiseaseProject\PlantDiseaseApp
```

### Step 2: Install dependencies

```cmd
npm install
```

### Step 3: Configure the backend URL

The mobile application communicates with the backend through an API URL.

The current development URL used in the project is:

```text
http://192.168.137.1:8000
```

This is a private local-network address. It must match the computer's actual reachable network address.

If the computer's IP address changes, update the backend URL in the frontend source code.

For a physical Android device, the phone and computer must be connected to the same Wi-Fi network or suitable hotspot.

### Step 4: Start Expo

```cmd
npx.cmd expo start
```

Scan the displayed QR code using Expo Go on your Android phone.

Keep the Expo terminal open while testing.

---

## ▶ Running the Complete Project

Two terminal windows are required during local development.

### Terminal 1 – Backend

```cmd
cd C:\Users\hp\PlantDiseaseProject
.\.venv\Scripts\python.exe -m uvicorn api:app --host 0.0.0.0 --port 8000
```

### Terminal 2 – Mobile Application

```cmd
cd C:\Users\hp\PlantDiseaseProject\PlantDiseaseApp
npx.cmd expo start
```

### Testing Procedure

1. Start the backend.
2. Confirm that the backend starts without errors.
3. Start Expo.
4. Open the application on the Android phone.
5. Navigate to the plant disease scanner.
6. Capture a plant leaf image or select one from the gallery.
7. Submit the image for prediction.
8. Check the predicted disease and displayed result.
9. Open the chatbot and test a plant-related question.

**Important:** The backend must remain running for prediction and chatbot requests.

---

## 🧠 Deep Learning Model

Phyto Nova uses MobileNetV2, a convolutional neural network architecture designed for efficient image classification.

The improved model uses transfer learning with pretrained ImageNet weights.

### Model Configuration

| Parameter | Configuration |
|---|---|
| Architecture | MobileNetV2 |
| Input dimensions | 224 × 224 × 3 |
| Output classes | 27 |
| Pretrained weights | ImageNet |
| Feature extraction | Global Average Pooling |
| Regularization | Dropout |
| Output layer | Dense with Softmax |
| Loss function | Sparse Categorical Crossentropy |
| Optimizer | Adam |
| Fine-tuning learning rate | Approximately 0.00001 |

### Image Preprocessing

The improved model receives RGB images with dimensions 224 × 224.

Pixel values are normalized internally using:

```python
Rescaling(1./127.5, offset=-1)
```

This converts pixel values from the 0–255 range to approximately -1 to 1.

### Supported Classes

The model supports the following 27 categories:

1. Apple Scab Leaf
2. Apple leaf
3. Apple rust leaf
4. Bell_pepper leaf
5. Bell_pepper leaf spot
6. Blueberry leaf
7. Cherry leaf
8. Corn Gray leaf spot
9. Corn leaf blight
10. Corn rust leaf
11. Peach leaf
12. Potato leaf early blight
13. Potato leaf late blight
14. Raspberry leaf
15. Soyabean leaf
16. Squash Powdery mildew leaf
17. Strawberry leaf
18. Tomato Early blight leaf
19. Tomato Septoria leaf spot
20. Tomato leaf
21. Tomato leaf bacterial spot
22. Tomato leaf late blight
23. Tomato leaf mosaic virus
24. Tomato leaf yellow virus
25. Tomato mold leaf
26. grape leaf
27. grape leaf black rot

The class order in the label file must match the output order used by the model.

---

## 📚 Dataset Information

The local dataset directory is:

```text
dataset/PlantDoc/
```

Expected directory structure:

```text
PlantDoc/
│
├── train/
│   ├── Apple Scab Leaf/
│   ├── Apple leaf/
│   ├── Apple rust leaf/
│   ├── ...
│
└── test/
    ├── Apple Scab Leaf/
    ├── Apple leaf/
    ├── Apple rust leaf/
    ├── ...
```

### Dataset Statistics

| Dataset partition | Number of images |
|---|---:|
| Training images | 2,334 |
| Original test images | 236 |
| Total images in supported classes | 2,570 |
| Supported classes | 27 |

The training dataset contains unequal numbers of images across classes.

Some classes have substantially fewer examples than others. Class weighting was used during improved model training to help address this imbalance.

The dataset also contains some exact duplicate images between the training and test partitions, including duplicate images with conflicting labels. Twelve exact train/test duplicates were excluded from the reported clean-test evaluation.

This exclusion does not detect near-duplicates or guarantee that every dataset label is correct.

---

## 🏋 Training the Improved Model

The improved model is trained using:

```text
train_phytonova_improved.py
```

The script uses training images only and divides them into training and validation subsets.

The original test set is not used for gradient updates.

### Training Configuration

| Parameter | Value |
|---|---|
| Model | MobileNetV2 |
| Input size | 224 × 224 |
| Batch size | 16 |
| Initial training epochs | 12 |
| Fine-tuning epochs | 15 maximum |
| Actual fine-tuning history | 5 epochs |
| Data augmentation | Horizontal flip, rotation, zoom |
| Class balancing | Class weights |
| Train/validation split | Stratified 80/20 |
| Random seed | 42 |

The base model is initially frozen to train the classification head. Fine-tuning then unfreezes selected layers while keeping batch normalization layers frozen.

### Run Training

From the project root:

```cmd
cd C:\Users\hp\PlantDiseaseProject
```

Run:

```cmd
.\.venv\Scripts\python.exe train_phytonova_improved.py
```

The improved model is saved separately:

```text
models/phytonova_mobilenetv2_improved.keras
```

Its corresponding labels are saved in:

```text
models/phytonova_mobilenetv2_improved_labels.txt
```

Training history:

```text
results/phytonova_improved_training_history.json
```

**Note:** Training can take a significant amount of time, especially when TensorFlow runs on the CPU.

Do not overwrite the original working model during experimentation.

---

## 📊 Model Evaluation

The improved model is evaluated using:

```text
evaluate_phytonova_clean_test.py
```

The evaluation script:

1. Loads the improved model.
2. Reads the 27 class labels.
3. Calculates SHA256 hashes for training images.
4. Excludes exact test-image duplicates found in the training dataset.
5. Resizes the remaining test images to 224 × 224.
6. Generates model predictions.
7. Calculates accuracy, precision, recall, and F1-score.
8. Saves the classification report.

### Run Evaluation

```cmd
cd C:\Users\hp\PlantDiseaseProject
```

Execute:

```cmd
.\.venv\Scripts\python.exe evaluate_phytonova_clean_test.py
```

The evaluation report is saved as:

```text
results/phytonova_clean_test_report.txt
```

### Evaluation Metrics

**Accuracy**

The proportion of correctly classified test images.

```text
Accuracy = Correct Predictions / Total Predictions
```

**Precision**

Measures how many predicted examples of a class were actually correct.

```text
Precision = TP / (TP + FP)
```

**Recall**

Measures how many actual examples of a class were correctly identified.

```text
Recall = TP / (TP + FN)
```

**F1-score**

The harmonic mean of precision and recall.

```text
F1-score = 2 × (Precision × Recall) / (Precision + Recall)
```

Macro-averaged precision, recall, and F1-score give equal importance to each class.

---

## 📈 Generating Training Graphs

Training graphs are generated using:

```text
plot_training_history.py
```

The script reads the saved training history:

```text
results/phytonova_improved_training_history.json
```

It combines the initial training and fine-tuning stages into continuous curves.

### Generate Graphs

```cmd
cd C:\Users\hp\PlantDiseaseProject
```

Run:

```cmd
.\.venv\Scripts\python.exe plot_training_history.py
```

### Generated Files

**Training and Validation Accuracy**

```text
results/phytonova_training_accuracy.png
```

This graph compares training accuracy and validation accuracy across epochs.

**Training and Validation Loss**

```text
results/phytonova_training_loss.png
```

This graph compares training loss and validation loss across epochs.

Both graphs are saved at 300 DPI for use in research documentation.

### Understanding the Graphs

- Increasing training accuracy generally indicates that the model is learning the training data.
- Increasing validation accuracy indicates improved performance on unseen validation examples.
- If training accuracy increases while validation accuracy stagnates, overfitting may be occurring.
- If training loss decreases while validation loss increases, the model may be memorizing training examples rather than generalizing well.

The graphs should be interpreted using the actual recorded curves, not assumptions.

---

## 📋 Research Results

The following results were obtained from the improved MobileNetV2 model.

### Clean Test Evaluation

| Metric | Result |
|---|---:|
| Original test images | 236 |
| Excluded exact duplicates | 12 |
| Evaluated test images | 224 |
| Accuracy | 51.34% |
| Macro precision | 51.99% |
| Macro recall | 51.13% |
| Macro F1-score | 48.87% |

### Best Performing Classes

| Class | F1-score |
|---|---:|
| Strawberry leaf | 0.93 |
| Tomato leaf yellow virus | 0.89 |
| Peach leaf | 0.82 |
| Squash Powdery mildew leaf | 0.80 |
| Corn rust leaf | 0.78 |
| Raspberry leaf | 0.77 |

### Classes Requiring Improvement

| Class | F1-score |
|---|---:|
| Tomato leaf bacterial spot | 0.00 |
| Tomato leaf mosaic virus | 0.00 |
| Corn Gray leaf spot | 0.18 |
| Potato leaf late blight | 0.22 |
| Bell_pepper leaf | 0.29 |

### Training and Validation Observations

The recorded training history contains:

- 12 initial training epochs.
- 5 fine-tuning epochs.
- 17 recorded epochs in total.
- Best initial-stage validation accuracy of approximately 56.32%.
- Best fine-tuning-stage validation accuracy of approximately 56.10%.

The training accuracy was substantially higher than validation accuracy, suggesting possible overfitting.

### Research Interpretation

The improved MobileNetV2 model demonstrates the ability to identify several plant disease categories, but classification performance varies considerably between classes.

Some categories achieved high F1-scores, while others were not identified correctly.

The results indicate that improvements to dataset quality, class representation, training strategy, and model generalization are necessary.

**Important:** These are provisional results from the current dataset and evaluation procedure. They should not be represented as a 75% accuracy result or as proof of reliable real-world diagnosis.

---

## 📦 Generating the Android APK

Phyto Nova uses Expo Application Services (EAS) to build Android application packages.

The Expo project is located at:

```text
PlantDiseaseApp/
```

The EAS configuration file is:

```text
eas.json
```

The current configuration contains:

- `preview` profile for an internal-distribution APK.
- `production` profile for an Android App Bundle.

### Step 1: Open the frontend directory

```cmd
cd C:\Users\hp\PlantDiseaseProject\PlantDiseaseApp
```

### Step 2: Install EAS CLI

```cmd
npx.cmd eas-cli --version
```

If necessary, use:

```cmd
npm install -g eas-cli
```

### Step 3: Log in to Expo

```cmd
npx.cmd eas-cli login
```

### Step 4: Build the APK

```cmd
npx.cmd eas-cli build --platform android --profile preview
```

EAS will prepare and build the application in the cloud.

Follow the build URL displayed in the terminal to monitor progress and retrieve the APK.

### Important Backend Deployment Note

The current backend URL:

```text
http://192.168.137.1:8000
```

is a private local-network address.

An APK installed on a phone outside the development network will not normally be able to reach this address.

For deployment beyond local testing:

1. Deploy the FastAPI backend to a suitable hosting service.
2. Configure HTTPS.
3. Update the mobile app's backend URL to the deployed HTTPS address.
4. Test scanner and chatbot requests from the installed APK.
5. Rebuild the APK after changing the frontend configuration.

The backend must be hosted and available for remote prediction and chatbot functionality.

---

## 🔌 API Endpoints

The FastAPI backend provides the following application functionality.

### 1. Plant Disease Prediction

```text
POST /predict
```

Purpose:

Receives a plant leaf image and returns the model's prediction.

The backend performs:

- Image reception.
- RGB conversion.
- Image resizing to 224 × 224.
- Pixel preprocessing.
- Model inference.
- Prediction response generation.

### 2. AI Chatbot

```text
POST /chat
```

Purpose:

Receives a user question and generates an AI response through the configured Gemini integration.

### API Documentation

When the backend is running, open:

```text
http://127.0.0.1:8000/docs
```

This interactive documentation allows developers to inspect available endpoints and test requests.

The exact request and response schemas should be checked in the current `api.py` implementation.

---

## 🧰 Troubleshooting

### Problem 1: Backend is not starting

Check that the virtual environment and dependencies are available.

Run:

```cmd
cd C:\Users\hp\PlantDiseaseProject
```

Then:

```cmd
.\.venv\Scripts\python.exe -m uvicorn api:app --host 0.0.0.0 --port 8000
```

Check the terminal for the actual Python error.

### Problem 2: Mobile application cannot connect to backend

Check:

- Backend server is running.
- Phone and computer are on the same network.
- Frontend API URL is correct.
- Windows Firewall allows the required connection.
- Port 8000 is available.

### Problem 3: Prediction is not working

Check:

- Model file exists.
- Label file exists.
- Model path in `api.py` is correct.
- The image can be opened and converted to RGB.
- The backend terminal does not show an inference error.

### Problem 4: Chatbot is not responding

Check:

- `.env` exists in the project root.
- Gemini API key is configured correctly.
- Backend can access the internet.
- Gemini API requests are not failing due to quota, permissions, or model availability.

Never share your API key publicly.

### Problem 5: Expo application is not starting

Navigate to:

```cmd
cd C:\Users\hp\PlantDiseaseProject\PlantDiseaseApp
```

Install dependencies if needed:

```cmd
npm install
```

Then start Expo:

```cmd
npx.cmd expo start
```

---

## 🚧 Limitations and Future Scope

### Current Limitations

- Current test accuracy is approximately 51.34%.
- Some disease classes have low or zero F1-scores.
- The dataset contains class imbalance.
- Exact duplicate images and conflicting labels were identified.
- Near-duplicate images have not yet been fully audited.
- Model performance may vary with lighting, background, camera quality, and leaf orientation.
- Local-network backend configuration is not suitable for unrestricted public deployment.
- Predictions should not be treated as a substitute for expert plant disease diagnosis.

### Future Improvements

1. Increase the number of correctly labelled training images.
2. Improve class balance.
3. Audit conflicting and incorrect labels.
4. Investigate visually similar disease categories.
5. Experiment with different transfer-learning architectures.
6. Improve hyperparameter tuning using validation data.
7. Generate a confusion matrix.
8. Evaluate on an independent external dataset.
9. Deploy the backend using HTTPS.
10. Improve prediction reliability and user guidance.
11. Explore offline inference for future mobile releases.

---

## 🔐 Security Notes

- Never upload `.env` files containing API keys to GitHub.
- Add `.env` and `.venv/` to `.gitignore`.
- Do not publish private credentials.
- Do not expose development server configuration as a production deployment.
- Use HTTPS for a publicly accessible backend.
- Validate uploaded image files before processing.
- Consider request limits and authentication before public deployment.

Suggested `.gitignore` entries:

```gitignore
.env
.venv/
__pycache__/
*.pyc
node_modules/
.expo/
dist/
build/
```

---

## 🏁 Conclusion

Phyto Nova demonstrates the integration of deep learning, backend API development, and mobile application development for plant disease classification.

The project uses MobileNetV2 transfer learning to classify 27 plant leaf categories and provides an Expo-based mobile interface for image submission and prediction.

A FastAPI backend connects the mobile application to the trained model, while Gemini integration provides an additional plant-related chatbot feature.

The current improved model achieved 51.34% accuracy on 224 test images after excluding 12 exact train/test duplicates. Further dataset cleaning, model optimization, and independent testing are required before considering the system suitable for dependable real-world use.

Phyto Nova provides a foundation for further research and development in AI-assisted plant disease identification.

---

**Project Name:** Phyto Nova : PLANT DISEASE DETECTION AND RECOGNITION
**Project Category:** Artificial Intelligence / Deep Learning / Mobile Application Development  
**Model Architecture:** MobileNetV2  
**Backend:** FastAPI  
**Frontend:** React Native + Expo  
**Chatbot:** Google Gemini API  
**Supported Categories:** 27 plant leaf classes  
**Current Evaluation Accuracy:** 51.34% 
