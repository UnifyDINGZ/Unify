from fastapi import FastAPI

router = FastAPI()


@router.get("/greet/{name}")
async def greet(name: str) -> str:
    """
    Returns a string greeting `user`
    """
    return f"Hello, {name}!!"
