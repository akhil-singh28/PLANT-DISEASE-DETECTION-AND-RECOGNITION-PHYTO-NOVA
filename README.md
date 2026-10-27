# PLANT-DISEASE-DETECTION-AND-RECOGNITION-PHYTO-NOVA
Phyto Nova is a plant-disease detection project with a Python API backend and an Expo/React Native mobile application. Users can submit plant images for an automated prediction and ask plant-health questions through a chatbot interface.
Disclaimer: Model predictions are estimates, not a confirmed diagnosis. Consult an agricultural expert before making consequential treatment or pesticide decisions.

Contents
- Overview and features
- Project structure
- Technology stack
- Requirements
- Installation
- Run the backend
- Run the mobile app
- Connect a physical phone
- API endpoints
- Model and dataset
- Configuration and secrets
- Security and privacy
- Troubleshooting
- Build an Android APK
- GitHub publishing checklist
- Contributing and license
  
Overview and features

The project is intended to make an initial image-based plant-health assessment accessible through a mobile interface. Its main parts are:

- Image-based disease prediction through the backend /predict endpoint.
- A mobile scanner/home screen.
- A plant-health chatbot using the /chat endpoint.
- Disease information content.
- Settings and theme context.
- Bottom-tab navigation.
- Expo/EAS configuration for Android builds.
  
The actual disease classes and prediction quality depend on the model, labels, and training/evaluation data included in the repository. Do not claim a particular accuracy or supported disease list without verifying the model and its evaluation results.

Project structure
PlantDiseaseProject/
├── api.py                         # FastAPI backend
├── requirements.txt               # Python dependencies
├── render.yaml                    # Deployment configuration, if used
├── models/
│   ├── phytonova_mobilenetv2.keras
│   └── phytonova_mobilenetv2_labels.txt
├── dataset_prep/                   # Dataset utilities, if used
├── .env                            # Local secrets; never commit
├── .venv/                          # Python virtual environment; never commit
└── PlantDiseaseApp/
    ├── app.json                    # Expo configuration
    ├── eas.json                    # EAS build profiles
    ├── package.json                # JavaScript dependencies
    ├── package-lock.json           # npm lockfile
    ├── metro.config.js             # Metro configuration
    ├── assets/
    │   ├── images/
    │   └── models/                 # App model assets, if required
    └── src/
        ├── app/
        │   ├── index.tsx            # Scanner/home screen
        │   ├── chatbot.tsx          # Chatbot screen
        │   ├── settings.tsx         # Settings screen
        │   └── theme-context.tsx    # Theme context
        ├── components/
        │   └── app-tabs.tsx         # Bottom navigation
        └── diseaseInfo.tsx          # Disease information

        
This is a representative structure based on the project files. Keep every file referenced by imports and configuration. Remove obsolete SDK copies and backups only after confirming they are not needed.
Technology stack
- Python, FastAPI, and Uvicorn for the backend.
- TensorFlow/Keras for model loading and inference, where configured.
- React Native, Expo, Expo Router, and TypeScript/TSX for the mobile app.
- Ionicons for interface icons.
- EAS Build for cloud Android builds.
- Environment variables for server-side configuration and provider credentials.
  
For exact package versions, inspect requirements.txt and PlantDiseaseApp/package.json.
Requirements
- Python compatible with the packages in requirements.txt.
- Node.js and npm.
- A computer running Windows, macOS, or Linux.
- Expo Go on a compatible phone or an Android emulator.
- A network connection between the phone and computer when using the local API.
- Git if you want to manage or publish the source repository.
Commands below use Windows PowerShell and the project path C:\\Users\\hp\\PlantDiseaseProject. Change the path if yours is different.
Installation
1. Open the backend folder
cd C:\\Users\\hp\\PlantDiseaseProject
2. Activate or create the Python environment
If .venv already exists:
.\\.venv\\Scripts\\Activate.ps1
If it does not exist:
py -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
You can avoid activation-policy issues by calling the environment's Python executable directly.
3. Install Python dependencies
.\\.venv\\Scripts\\python.exe -m pip install --upgrade pip
.\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt
4. Configure local environment variables
If the chat integration uses Gemini, create a local .env in the project root with the variable name expected by api.py, for example:
GEMINI_API_KEY=your_key_here
Replace the placeholder locally. Never commit a real key, share it in screenshots, or paste it into public issues. The exact variable name must match the backend code.
5. Install mobile dependencies
Open another PowerShell window:
cd C:\\Users\\hp\\PlantDiseaseProject\\PlantDiseaseApp
npm install
If npx is not recognized in PowerShell, use npx.cmd or reopen the terminal after installing Node.js.
Run the backend
In the backend terminal:
cd C:\\Users\\hp\\PlantDiseaseProject
.\\.venv\\Scripts\\python.exe -m uvicorn api:app --host 0.0.0.0 --port 8000
Keep this terminal open. 0.0.0.0 allows other devices on the network to attempt to reach the server; it does not make the server publicly hosted.

On the development computer, try:
- API host: http://127.0.0.1:8000
- Interactive docs, if enabled: http://127.0.0.1:8000/docs
If /docs is disabled, check route definitions in api.py.
Run the mobile app
In a separate terminal:
cd C:\\Users\\hp\\PlantDiseaseProject\\PlantDiseaseApp
npx.cmd expo start
Use the displayed QR code with Expo Go where supported, or run the app in an Android emulator. Leave the Expo terminal running during development.
Connect a physical phone
The phone cannot use localhost to reach the computer's API; on the phone, localhost means the phone itself.
1. Connect the phone and computer to the same Wi-Fi/local network.
2. Run ipconfig in PowerShell and find the computer's current IPv4 address.
3. Set the mobile app's API base URL to that address and port. Example only:
   http://192.168.137.1:8000
4. Make sure Uvicorn is running.
5. Allow the server through Windows Firewall on private networks if required.
6. Confirm the phone can reach the computer.
The example is a local development URL; your IP address may be different. For public release, deploy the backend with HTTPS and configure the app to use that HTTPS URL. Do not expose a development server or secret-bearing endpoint directly to the public internet.
API endpoints
The backend currently includes these endpoints. The exact payload fields and response schemas must be verified in api.py.
POST /predict
Accepts a plant image and returns a model prediction. The typical flow is:
1. The app captures or selects an image.
2. The app uploads it to the backend.
3. The backend validates and preprocesses the image.
4. The model predicts a class or scores.
5. The backend sends the result to the app.
Check the implementation for the exact image field name, encoding, input dimensions, output fields, and error responses.
POST /chat
Accepts a plant-health question and returns a chatbot response. It may require a provider API key configured on the backend. Check api.py for the exact request and response format.
Testing
If FastAPI docs are enabled, open http://127.0.0.1:8000/docs on the development computer. Use sample images and non-sensitive test messages. Avoid logging API keys or other credentials.
Model and dataset
The project references these model files:
- models/phytonova_mobilenetv2.keras
- models/phytonova_mobilenetv2_labels.txt
Include them in the repository only if the backend needs them and their size and license allow redistribution. If they are too large for ordinary Git hosting, consider Git LFS or an artifact host and document how to obtain them.

Before relying on the model, document:
- Dataset source and license.
- Crop and disease classes represented.
- Images per class and class imbalance.
- Training, validation, and test split methodology.
- Evaluation metrics, including per-class performance where possible.
- Known limitations involving lighting, backgrounds, unseen crops, and disease stages.
Do not invent accuracy figures or disease coverage. Confirm these from the model labels, dataset, and evaluation results.
Configuration and secrets
- Store provider keys in a local .env file or a deployment secret manager.
- Ensure .env files are excluded by .gitignore.
- A .env.example may be committed if it contains placeholders only.
- Keep the API base URL configurable for development versus production.
- Never embed private provider keys in mobile code: app bundles can be inspected.
- For hosted deployment, configure environment variables in the hosting dashboard.
Security and privacy
- Never commit API keys, tokens, passwords, private certificates, or real .env files.
- Check both the root Git repository and the mobile app repository before pushing.
- If a key was exposed, revoke/rotate it; deleting it from the latest commit is not enough.
- Avoid logging sensitive information or credentials.
- Validate uploaded file type and size on the backend.
- Obtain appropriate consent before storing or sharing uploaded images.
- Add authentication, rate limits, and monitoring before making the API public.
- Use HTTPS in production.
- Treat disease predictions as estimates, not the sole basis for pesticide or treatment decisions.
Suggested .gitignore rules (merge these with the existing file rather than blindly overwriting it):
# Secrets
.env
.env.*
!.env.example
**/.env
**/.env.*
!**/.env.example

# Python
.venv/
venv/
__pycache__/
*.py[cod]

# Node and Expo
node_modules/
.expo/
dist/
web-build/

# Logs and local backups
*.log
*.backup
*.backup-*
*.bak
Do not ignore model files automatically if the backend requires them. Decide whether to commit them or host them separately.
Troubleshooting
Uvicorn command not found
Run it through the virtual environment:
.\\.venv\\Scripts\\python.exe -m uvicorn api:app --host 0.0.0.0 --port 8000
The app cannot reach the backend
- Confirm the backend is running on port 8000.
- Use the computer's current LAN IPv4 address in the app.
- Keep the phone and computer on the same network.
- Check Windows Firewall.
- Do not use localhost in the phone app to reach the computer.
- Check backend logs for request errors.
Prediction fails
- Verify the uploaded image is valid and reaches the backend.
- Check that the model and label files exist at the paths used by api.py.
- Check image dimensions, color channels, and preprocessing.
- Verify TensorFlow/Keras compatibility with the saved model.
- Read the backend error message without exposing secrets.
Chatbot fails
- Confirm the backend is running.
- Confirm the required environment variable is configured.
- Check the provider key, model access, quota, and network connection.
- Review backend errors without printing the key.
- Keep provider credentials on the server, never in the mobile app.
Expo/npm errors
cd C:\\Users\\hp\\PlantDiseaseProject\\PlantDiseaseApp
npm install
npx.cmd expo-doctor
Review compatibility warnings before changing package versions. Avoid deleting lockfiles or running broad upgrades without a backup. The project may show a react-native-fast-tflite New Architecture warning; address it if an actual build/runtime issue occurs rather than removing it preemptively.
Build an Android APK
The eas.json preview profile is configured for an internal Android APK build. From the mobile app directory:
cd C:\\Users\\hp\\PlantDiseaseProject\\PlantDiseaseApp
npx.cmd eas-cli build --platform android --profile preview
Sign in to EAS if prompted, follow the build prompts, and inspect the build logs. Download the generated APK from the EAS build page and install it on a compatible Android device.

A successful APK build does not guarantee the backend is reachable. Configure a deployed HTTPS API before sharing the app publicly. Never ship provider secrets in the app.
GitHub publishing checklist
- [ ] Verify .env and secret files are ignored and not tracked.
- [ ] Search for hardcoded keys without displaying their values.
- [ ] Exclude .venv, node_modules, .expo, caches, logs, and unnecessary backups.
- [ ] Decide how to distribute the model and confirm its license.
- [ ] Keep the active PlantDiseaseApp and required assets.
- [ ] Remove old SDK copies only after confirming they are not used.
- [ ] Review git status in both the root and mobile repositories.
- [ ] Fetch and inspect remote history before pushing.
- [ ] Do not use git push --force just to resolve diverged history.
- [ ] Add verified dataset and model evaluation details.
- [ ] Rotate any credential that was ever exposed.
Future improvements
Possible next steps:
- Deploy a secure HTTPS backend.
- Configure separate development and production API URLs.
- Add confidence scores and an “unable to identify” outcome.
- Evaluate with independent, locally collected images.
- Improve accessibility, loading indicators, and offline/error states.
- Add automated tests for API validation and image preprocessing.
- Document supported crops, disease classes, data sources, and model metrics.
- Add rate limiting and monitoring before public deployment.
Contributing and license
Bug reports should include the operating system, Python/Node versions, steps to reproduce, and relevant error messages with credentials removed. Test backend and mobile changes before submitting a pull request. Never include .env, virtual environments, dependency folders, or personal backups in commits.

Add the license that applies to the source code, model weights, and datasets. Confirm redistribution rights before publishing them; do not assume that publicly available data or weights can automatically be redistributed.
