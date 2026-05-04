#!/usr/bin/env bash
set -euo pipefail

echo "[1/3] Setting up backend virtualenv"
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..

echo "[2/3] Installing mobile dependencies"
cd mobile
npm install
cd ..

echo "[3/3] Running verification"
./scripts_verify.sh
