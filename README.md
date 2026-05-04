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

## Initial development workflow
Build in small milestones:
1. Frontend auth flow
2. Body scan API
3. Avatar generation pipeline
4. Try-on integration
5. Product & profile experience

See `AGENTS.md` for project operating rules, naming conventions, and feature flow constraints.
