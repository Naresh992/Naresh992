# API Notes

Initial endpoints implemented in FastAPI:
- `GET /health`
- `POST /scan-body`
- `POST /generate-avatar`
- `POST /tryon`

`/tryon` supports categories:
- `clothes`
- `shoes`
- `jewellery`
- `accessories`

`/tryon` supports render modes:
- `2d` preview (`.png`)
- `3d` preview (`.glb`)

> Note: current outputs are still prototype/mock outputs for integration. Real physics-based cloth simulation and accurate occlusion are pending CV + 3D pipeline integration.
