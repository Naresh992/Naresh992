#!/usr/bin/env bash
set -euo pipefail

echo "[1/3] Setting up backend virtualenv"
./scripts_install_backend_deps.sh

echo "[2/3] Installing mobile dependencies"
cd mobile
npm install
cd ..

echo "[3/3] Running verification"
./scripts_verify.sh
