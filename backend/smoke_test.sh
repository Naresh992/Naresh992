#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://127.0.0.1:8000}"

curl -fsS "$BASE_URL/health"
echo
curl -fsS -X POST "$BASE_URL/scan-body" -H 'Content-Type: application/json' -d '{"image_url":"https://example.com/person.jpg"}'
echo
curl -fsS -X POST "$BASE_URL/generate-avatar" -H 'Content-Type: application/json' -d '{"height_cm":172,"chest_cm":96,"waist_cm":82,"hips_cm":99}'
echo
