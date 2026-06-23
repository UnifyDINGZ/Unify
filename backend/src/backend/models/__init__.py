from typing import Any, AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from os import environ

from .business import Business, InventoryItem
from .user import User

engine = create_async_engine(environ["DATABASE_URL"])
AsyncSessionLocal = async_sessionmaker(
    engine,
    expire_on_commit=False,
)


async def get_session() -> AsyncGenerator[AsyncSession, Any]:
    """
    FastAPI dependency that loads in an asynchronous
    session with the database
    """
    async with AsyncSessionLocal() as session:
        yield session
