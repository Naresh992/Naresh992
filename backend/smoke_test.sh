#!/usr/bin/env bash
set -euo pipefail

# Dependency-light smoke test that runs against the in-process app.
cd "$(dirname "$0")"

python - <<'PY'
from app.compat import TestClient
from app.main import app

client = TestClient(app)

health = client.get('/health')
assert health.status_code == 200, health.json()

scan = client.post('/scan-body', json={'image_url': 'https://example.com/person.jpg'})
assert scan.status_code == 200, scan.json()

avatar = client.post('/generate-avatar', json={'height_cm': 172, 'chest_cm': 96, 'waist_cm': 82, 'hips_cm': 99})
assert avatar.status_code == 200, avatar.json()

print('backend smoke test passed')
PY
