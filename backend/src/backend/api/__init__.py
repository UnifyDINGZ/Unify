from fastapi import FastAPI

router = FastAPI()


@router.get("/ping", tags=["Misc"])
async def ping() -> str:
    """
    Pings the backend. Internally used
    as a healthcheck.
    """
    return f"Pong! Head to the docs at {router.docs_url or "<<Unknown>>"} to see the backend's functionality"


@router.get("/greet/{name}")
async def greet(name: str) -> str:
    """
    Returns a string greeting `user`
    """
    return f"Hello, {name}!!"
