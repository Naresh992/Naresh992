#!/usr/bin/env bash
set -euo pipefail

echo "[1/6] Python syntax compile check"
python -m compileall backend/app backend/tests

echo "[2/6] Backend tests"
if [ -f backend/.venv/bin/activate ]; then
  (
    cd backend
    source .venv/bin/activate
    pytest -q
  )
elif python -c "import fastapi, pytest" >/dev/null 2>&1; then
  (cd backend && pytest -q)
else
  echo "WARNING: backend tests skipped because FastAPI/Pytest dependencies are not installed. Run ./scripts_setup.sh on a machine with package registry access."
fi

echo "[3/6] Frontend static build check"
npm --prefix frontend run build

echo "[4/6] Frontend server smoke check"
(
  cd frontend
  node server.js >/tmp/raritone-frontend-verify.log 2>&1 &
  server_pid=$!
  trap 'kill "$server_pid" >/dev/null 2>&1 || true' EXIT
  sleep 1
  curl -fsS http://localhost:5173/ >/tmp/raritone-frontend-index.html
  grep -q "Raritone Frontend" /tmp/raritone-frontend-index.html
)

echo "[5/6] Mobile package.json parse"
node -e "const fs=require('fs');JSON.parse(fs.readFileSync('mobile/package.json','utf8'));console.log('mobile package.json ok')"

echo "[6/6] Mobile Expo availability check"
if [ -x mobile/node_modules/.bin/expo ]; then
  (cd mobile && npm run start -- --non-interactive)
else
  echo "WARNING: mobile Expo runtime not installed. Run npm install in mobile/ before launching the Expo app."
fi

echo "Verification completed. Frontend web preview is runnable at: cd frontend && npm run dev"
