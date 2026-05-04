#!/usr/bin/env bash
set -euo pipefail

echo "[1/4] Python syntax compile check"
python -m compileall backend/app backend/tests

echo "[2/4] Backend tests"
(
  cd backend
  pytest -q
)

echo "[3/4] Mobile package.json parse"
node -e "const fs=require('fs');JSON.parse(fs.readFileSync('mobile/package.json','utf8'));console.log('package.json ok')"

echo "[4/4] Mobile start check"
(
  cd mobile
  npm run start
)
