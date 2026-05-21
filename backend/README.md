# Backend (FastAPI)

## Install dependencies when proxy/PyPI access fails
If pip reports `Tunnel connection failed: 403 Forbidden`, run this from the repository root:
```bash
./scripts_install_backend_deps.sh
```

The installer clears `HTTP_PROXY`, `HTTPS_PROXY`, `http_proxy`, and `https_proxy` for pip, retries with `https://pypi.org/simple`, trusts `pypi.org` and `files.pythonhosted.org`, and validates that FastAPI/Pydantic/Pytest import successfully.

To inspect proxy settings manually:
```bash
echo $HTTP_PROXY
echo $HTTPS_PROXY
python -m pip config list
```


## Option A: Run directly (venv)
```bash
./run_local.sh
```

## Option B: Run in Docker
```bash
docker build -t raritone-backend ./backend
docker run --rm -p 8000:8000 raritone-backend
```

## Smoke-test locally
In another terminal while server is running:
```bash
./smoke_test.sh
```

## Test
```bash
pytest
```
