from uvicorn import run
from os import getenv


def main():
    is_dev = getenv("UBD_DEV", "") == "true"

    run(
        "backend.api:router",
        host="0.0.0.0",
        port=8080,
        proxy_headers=True,
        reload=is_dev,
    )
