# PLANT DISEASE DETECTION AND RECOGNITION-Phyto Nova 🌿

**Plant Disease Detection and AI Plant Care Assistant**

Phyto Nova is a mobile application project intended to help users identify possible plant diseases from leaf images and get plant-care guidance through an AI chatbot. The project uses an Expo/React Native frontend and a Python FastAPI backend.

> **Project status:** The app and backend have been developed, and the API endpoints have been tested during development. Before calling the project production-ready, verify the final Android APK on a physical device, evaluate the disease classifier on a separate labelled test dataset, and deploy the backend securely if the app must work outside the development network.

## Contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Requirements](#requirements)
- [Backend setup](#backend-setup)
- [Mobile app setup](#mobile-app-setup)
- [Run the complete project](#run-the-complete-project)
- [API endpoints](#api-endpoints)
- [Build an Android APK](#build-an-android-apk)
- [Model evaluation](#model-evaluation)
- [Testing checklist](#testing-checklist)
- [Troubleshooting](#troubleshooting)
- [Security and limitations](#security-and-limitations)
- [Future improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Plant disease scanning:** Submit a plant-leaf image to the backend for prediction.
- **AI plant-care chatbot:** Ask plant-care questions through the `/chat` endpoint.
- **Mobile interface:** Built with React Native and Expo.
- **App tabs and settings:** Navigation and settings screens are included.
- **Theme support:** A theme context is included in the frontend.
- **Android packaging:** EAS Build is configured for an internal-preview APK and a production Android App Bundle.

The exact disease classes, model architecture, dataset, and prediction confidence behavior should be documented after checking the actual model and backend implementation. This README intentionally does not claim unverified accuracy figures.

## Technology stack

| Area | Technology |
|---|---|
| Mobile app | React Native, Expo, TypeScript/JavaScript |
| Backend API | Python, FastAPI, Uvicorn |
| Disease prediction | Classifier/model loaded by the backend |
| Chat assistant | Gemini API, configured through an environment variable |
| JavaScript dependencies | npm |
| Python isolation | Python virtual environment (`.venv`) |
| Android builds | EAS Build |

## Project structure

The main files currently used by the project are shown below. Additional model files, assets, and dependencies may exist in the local project.

```text
PlantDiseaseProject/
├── api.py                         # FastAPI backend and API endpoints
├── .env                           # Local secrets; do not commit this file
├── .venv/                          # Python virtual environment
└── PlantDiseaseApp/
    ├── app.json                   # Expo app configuration
    ├── eas.json                   # EAS build profiles
    ├── package.json               # Frontend dependencies and scripts
    └── src/
        ├── app/
        │   ├── index.tsx          # Main scanner/home screen
        │   ├── chatbot.tsx        # Chatbot screen
        │   ├── settings.tsx       # Settings screen
        │   └── theme-context.tsx  # Theme state/context
        └── components/
            └── app-tabs.tsx       # App tab navigation
```

## Requirements

Install the following on the development computer:

- Windows 10/11 (commands below use PowerShell)
- Python version compatible with the packages used by `api.py`
- Node.js and npm
- Expo-compatible Android device or Android emulator
- An internet connection for package installation and AI chatbot requests
- A valid Gemini API key if the chatbot uses Gemini
- EAS account for cloud Android builds

## Backend setup

Open PowerShell and move to the project root:

```powershell
cd C:\Users\hp\PlantDiseaseProject
```

### 1. Activate the Python environment (optional)

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, use the virtual-environment Python executable directly in the commands below.

### 2. Configure environment variables

Create or edit the `.env` file in the project root. For example:

```dotenv
GEMINI_API_KEY=replace_with_your_own_key
```

Confirm the exact variable name expected by `api.py`. Replace the example value with your own key locally. **Never publish your real API key, commit `.env`, or paste the key into issue reports.** Ensure `.env` is included in `.gitignore`.

### 3. Start the backend

```powershell
cd C:\Users\hp\PlantDiseaseProject
.\.venv\Scripts\python.exe -m uvicorn api:app --host 0.0.0.0 --port 8000
```

Keep this terminal open while using the mobile app. When the server starts successfully, open the interactive API documentation on the development computer:

- http://127.0.0.1:8000/docs
- http://127.0.0.1:8000/openapi.json

The API documentation is the best place to confirm the exact request fields and response formats supported by the current code.

## Mobile app setup

Open a **second** PowerShell terminal:

```powershell
cd C:\Users\hp\PlantDiseaseProject\PlantDiseaseApp
npm.cmd install
```

Optionally check the Expo project configuration:

```powershell
npx.cmd expo-doctor
```

Start Expo:

```powershell
npx.cmd expo start
```

Follow the Expo CLI instructions to open the app on a device or emulator.

### Backend URL and phone connectivity

The frontend has been configured during development to use this local backend address:

```text
http://192.168.137.1:8000
```

This address is specific to the development network and may differ on another computer or network. If the phone cannot reach the backend:

1. Make sure the backend terminal is running.
2. Make sure the phone and computer can communicate over the same network or hotspot.
3. Check the computer's current IPv4 address and update the frontend API base URL if needed.
4. Allow inbound connections to port `8000` in the computer's firewall only on a trusted private network.
5. Test `http://<COMPUTER-IP>:8000/docs` from the phone's browser.

The local HTTP setup is for development. For a publicly distributed app, host the API over HTTPS and update the frontend to use the deployed HTTPS URL.

## Run the complete project

1. Start the FastAPI backend using the command in [Backend setup](#backend-setup).
2. Start Expo from the `PlantDiseaseApp` directory.
3. Open the app on an Android device or emulator.
4. Use the scanner to choose or capture a leaf image and submit it for prediction.
5. Open the chatbot and send a plant-care question.
6. If a request fails, check the backend terminal and the API documentation for details.

## API endpoints

The backend currently exposes these intended endpoints. Confirm their exact schemas in `api.py` or `/docs` before integrating another client.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/docs` | Interactive API documentation provided by FastAPI |
| `POST` | `/predict` | Receives an image and returns a disease prediction according to the backend implementation |
| `POST` | `/chat` | Receives a chat request and returns a chatbot response according to the backend implementation |

Request field names, image encoding, response keys, supported file types, and error formats must be taken from the live API schema rather than assumed from this summary.

## Build an Android APK

The EAS configuration includes a `preview` profile intended to create an installable APK and a `production` profile intended to create an Android App Bundle.

### 1. Sign in to EAS

From the mobile app directory:

```powershell
cd C:\Users\hp\PlantDiseaseProject\PlantDiseaseApp
npx.cmd eas-cli login
```

If EAS project configuration has not yet been completed, run:

```powershell
npx.cmd eas-cli build:configure
```

Follow the prompts and choose Android when asked.

### 2. Build the preview APK

```powershell
npx.cmd eas-cli build --platform android --profile preview
```

Wait for the cloud build to finish, then use the APK link supplied by EAS to download and install it on an Android device. Android may ask you to allow installation from the source used to download the APK.

### 3. Important: the APK still needs a reachable backend

An APK does not automatically include or host the FastAPI backend. If the frontend points to a private address such as `192.168.137.1`, the installed app will only work when that address is reachable and the backend is running. For reliable use outside the development network, deploy the backend to a secure HTTPS host and configure the app to use that URL before building the APK.

For a Play Store release, build the production Android App Bundle:

```powershell
npx.cmd eas-cli build --platform android --profile production
```

Review the current EAS and Expo documentation before release because build requirements can change.

## Model evaluation

Do not report accuracy, precision, recall, or F1-score without measuring the model on a separate labelled test set that was not used to train or tune it. A meaningful evaluation requires:

- The exact trained model and preprocessing pipeline used by `/predict`.
- The model's class-label mapping.
- A labelled test set representative of expected real-world images.
- Predictions generated by the final model on every test image.

After collecting the true labels and predicted labels in the same order, the following example calculates common classification metrics:

```python
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Replace these examples with your actual test labels and model predictions.
y_true = ["healthy", "disease_a", "healthy", "disease_a"]
y_pred = ["healthy", "disease_a", "disease_a", "disease_a"]

print("Accuracy:", accuracy_score(y_true, y_pred))
print("Classification report:")
print(classification_report(y_true, y_pred, zero_division=0))
print("Confusion matrix:")
print(confusion_matrix(y_true, y_pred))
```

This is an illustrative calculation only; the example labels are placeholders and **are not Phyto Nova's measured results**. Replace them with predictions from your actual held-out test dataset. Report per-class precision, recall, F1-score, support, and the test-set size. Avoid evaluating on training images because that can overstate performance.

## Testing checklist

### Backend

- [ ] Backend starts without errors.
- [ ] `/docs` loads.
- [ ] `/predict` handles a valid image.
- [ ] Invalid or unsupported images return a useful error rather than crashing the server.
- [ ] `/chat` returns a response when the AI provider is available.
- [ ] Missing or invalid API credentials are handled safely.

### Mobile app

- [ ] Scanner screen opens.
- [ ] Camera/gallery permissions are handled clearly.
- [ ] A leaf image can be submitted and the result is displayed.
- [ ] Chatbot sends a message and displays the response.
- [ ] Loading states and network errors are understandable.
- [ ] Tabs and settings work.
- [ ] Theme selection, if exposed, updates the UI correctly.

### APK and model

- [ ] Preview APK installs on a physical Android device.
- [ ] The app can reach the configured backend from that device.
- [ ] Scanner and chatbot are tested in the installed APK, not only in Expo Go.
- [ ] Classifier performance is measured on a held-out labelled dataset.
- [ ] Predictions are checked on varied lighting, backgrounds, plant varieties, and image quality.

## Troubleshooting

### Backend command fails

- Check that `C:\Users\hp\PlantDiseaseProject\.venv` exists.
- Run the command from the project root where `api.py` is located.
- Read the full error printed in PowerShell; it may indicate a missing dependency, model file, or environment variable.

### Port 8000 is already in use

Stop the process using port 8000 or select another port and update the frontend URL to match it. The backend and frontend must use the same port.

### The app cannot connect to the API

- Confirm the backend is running with `--host 0.0.0.0`.
- Check the computer's current local IPv4 address.
- Update the API base URL in the frontend if the address changed.
- Check Wi-Fi/hotspot connectivity and firewall rules.
- Remember that `127.0.0.1` on a physical phone refers to the phone itself, not the computer.

### Chatbot fails

- Confirm the backend can access the internet.
- Verify the environment variable name expected by `api.py`.
- Confirm the API key is valid and has access to the configured model.
- Inspect the backend error log and provider response. Do not share the secret key in screenshots or logs.

### Expo or Android build warnings

Run `npx.cmd expo-doctor` and address errors that affect the actual build. A warning about a library's New Architecture compatibility does not by itself prove that the app is broken; test the installed build before removing dependencies or changing architecture settings.

### EAS build fails

Open the build details linked by EAS and read the first relevant error. Verify the Expo configuration, dependency versions, Android package identifier, and EAS project configuration before retrying.

## Security and limitations

- Keep API keys and credentials out of source control. Store secrets in environment variables or a suitable secret manager.
- Do not expose a development server directly to the public internet.
- Use HTTPS for a deployed backend.
- Consider authentication, rate limits, upload-size limits, image validation, logging hygiene, and abuse prevention before public deployment.
- A model prediction is an estimate, not a guaranteed diagnosis. Disease symptoms can look similar, and image quality affects results. Users should seek expert advice for high-impact crop decisions.
- The chatbot may provide inaccurate information. Verify important treatment and pesticide guidance with trusted agricultural sources and follow local product labels and regulations.
- The model's architecture, training dataset, supported plant species, disease classes, and measured performance are not specified here because they must be confirmed from the actual project files and evaluation results.

## Future improvements

- Evaluate and publish per-class test metrics and a confusion matrix.
- Add prediction history and saved scans.
- Improve handling of uncertain predictions and unsupported plants.
- Provide localized plant-care information and language support.
- Deploy a stable HTTPS backend with monitoring and rate limiting.
- Add automated tests for API endpoints and frontend flows.
- Document the training dataset, model version, preprocessing, and limitations.

## Contributing

1. Create a branch for your change.
2. Keep API contracts and frontend expectations in sync.
3. Test the backend and mobile app after changes.
4. Do not include `.env`, API keys, private data, or generated secrets in commits.
5. Describe the change and the tests performed in your pull request.

## License

No license has been specified in this README. Add a license only after deciding how the project may be used, modified, and redistributed.

---
**Phyto Nova** — helping users explore plant health with image-based predictions and AI-assisted plant care.

