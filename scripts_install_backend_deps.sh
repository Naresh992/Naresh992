#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
PYTHON_BIN="${PYTHON_BIN:-python}"
VENV_DIR="${BACKEND_VENV_DIR:-$BACKEND_DIR/.venv}"

print_proxy_diagnostics() {
  echo "Proxy diagnostics:"
  echo "  HTTP_PROXY=${HTTP_PROXY:-<unset>}"
  echo "  HTTPS_PROXY=${HTTPS_PROXY:-<unset>}"
  echo "  http_proxy=${http_proxy:-<unset>}"
  echo "  https_proxy=${https_proxy:-<unset>}"
  "$PYTHON_BIN" -m pip config list || true
}

run_pip_without_proxy() {
  env -u HTTP_PROXY -u HTTPS_PROXY -u http_proxy -u https_proxy \
    PIP_INDEX_URL="${PIP_INDEX_URL:-https://pypi.org/simple}" \
    "$@"
}

print_proxy_diagnostics

echo "[1/4] Creating backend virtual environment at $VENV_DIR"
"$PYTHON_BIN" -m venv "$VENV_DIR"
# shellcheck disable=SC1091
source "$VENV_DIR/bin/activate"

PYTHON_IN_VENV="$VENV_DIR/bin/python"

echo "[2/4] Upgrading pip with proxy variables cleared"
if ! run_pip_without_proxy "$PYTHON_IN_VENV" -m pip install --upgrade pip; then
  echo "WARNING: pip upgrade failed. Continuing with existing pip."
fi

echo "[3/4] Installing backend requirements with proxy variables cleared"
if ! run_pip_without_proxy "$PYTHON_IN_VENV" -m pip install -r "$BACKEND_DIR/requirements.txt"; then
  echo "[3/4 retry] Direct PyPI install with trusted hosts"
  run_pip_without_proxy "$PYTHON_IN_VENV" -m pip install -r "$BACKEND_DIR/requirements.txt" \
    --index-url https://pypi.org/simple \
    --trusted-host pypi.org \
    --trusted-host files.pythonhosted.org
fi

echo "[4/4] Verifying backend imports"
"$PYTHON_IN_VENV" - <<'PY'
import fastapi
import pydantic
import pytest
print('backend dependencies ok')
PY

echo "Backend dependencies installed. Activate with: source backend/.venv/bin/activate"
