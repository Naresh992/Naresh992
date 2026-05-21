# API Notes

Implemented endpoints:
- `GET /health`
- `POST /scan-body`
- `POST /generate-avatar`
- `POST /tryon/jobs` (submit try-on render job)
- `GET /tryon/jobs/{job_id}` (poll render status/result)

Try-on categories:
- `clothes`
- `shoes`
- `jewellery`
- `accessories`

Render modes:
- `2d` output (`.png`)
- `3d` output (`.glb`)

Pipeline status:
- Queue + worker simulation + polling API are implemented.
- Real Blender/Three.js rendering, physics cloth simulation, and advanced occlusion are pending integration.
