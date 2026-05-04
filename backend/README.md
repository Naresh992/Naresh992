# Backend (FastAPI)

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
