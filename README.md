# Raritone – AI Virtual Try-On Shopping Mobile App

This repository is initialized for building **Raritone**, a production-ready virtual try-on commerce platform.

## Planned stack
- **Mobile:** React Native (Expo), Redux Toolkit, React Navigation
- **Backend:** FastAPI (+ optional Node.js services)
- **AI/CV:** MediaPipe Pose, OpenCV
- **3D:** Three.js/WebGL, GLTF assets
- **Cloud:** Render/AWS, PostgreSQL, S3

## Target structure
```
/raritone-app
  /frontend
  /mobile
  /backend
  /ai-models
  /3d-assets
  /api
```

## Setup + verify
```bash
./scripts_setup.sh
```

## Verify only (after setup)
```bash
./scripts_verify.sh
```

## Backend dependency install when pip is blocked by a proxy
If `python -m pip install -r backend/requirements.txt` fails with `Tunnel connection failed: 403 Forbidden`, run the backend installer. It prints proxy diagnostics, clears proxy variables for pip, retries against public PyPI, and verifies FastAPI/Pydantic/Pytest imports:
```bash
./scripts_install_backend_deps.sh
```

Manual equivalent:
```bash
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy
python -m pip install --upgrade pip
python -m pip install -r backend/requirements.txt --index-url https://pypi.org/simple --trusted-host pypi.org --trusted-host files.pythonhosted.org
```

If this still fails, the network is blocking outbound PyPI access and you need an approved proxy, a package mirror, or pre-downloaded wheels.

## Frontend web preview
The web frontend is dependency-free and can be used immediately:
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in a browser.

## Initial development workflow
Build in small milestones:
1. Frontend auth flow
2. Body scan API
3. Avatar generation pipeline
4. Try-on integration
5. Product & profile experience

See `AGENTS.md` for project operating rules, naming conventions, and feature flow constraints.
