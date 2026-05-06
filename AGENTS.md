# AGENTS.md — Raritone Project Operating Guide

## Project intent
Raritone is a production-focused cross-platform (iOS + Android) virtual try-on shopping app.

Primary flow:
1. User authenticates
2. User scans body
3. Measurements are generated
4. Avatar is generated
5. User tries products virtually
6. User purchases confidently

## Architecture rules
- Repository top-level folders:
  - `frontend/` React/Vite web preview
  - `mobile/` React Native (Expo)
  - `backend/` FastAPI services
  - `ai-models/` CV and ML code
  - `3d-assets/` GLTFs, textures, garments
  - `api/` shared contracts and API docs
- Keep components/services modular and feature-scoped.
- Prefer strict typing (TypeScript/Pydantic) where applicable.

## Naming conventions
- Use `kebab-case` for folders and API paths.
- Use `PascalCase` for React components.
- Use `camelCase` for JS/TS/Python variables and functions.
- API endpoints should be versioned under `/v1` when implemented.

## Feature flow guardrails
- Authentication must complete before scan/try-on routes are accessible.
- Measurement records must be persisted and versioned per user.
- Avatar generation should be reproducible from measurement snapshots.
- Try-on preview should be non-destructive and keep source assets immutable.

## Code quality
- Keep files focused; avoid giant multi-purpose modules.
- Add docstrings/comments for non-obvious logic only.
- Every new feature should include tests or a documented test plan.

## Delivery style
- Build incrementally by vertical slice (auth, scan, avatar, try-on, commerce).
- Do not introduce breaking refactors without migration notes.
