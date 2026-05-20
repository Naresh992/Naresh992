from pathlib import Path
import importlib.util
import sys

backend_root = Path(__file__).resolve().parents[1]
if str(backend_root) not in sys.path:
    sys.path.insert(0, str(backend_root))

if importlib.util.find_spec("fastapi") is None:
    from app.compat import install_fastapi_testclient_module

    install_fastapi_testclient_module()
