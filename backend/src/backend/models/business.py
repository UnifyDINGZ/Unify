from typing import List, TYPE_CHECKING

from sqlalchemy.sql.sqltypes import Uuid
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base
from .mixins import IdMixin

if TYPE_CHECKING:
    from .user import User


class Business(IdMixin, Base):
    __tablename__ = "businesses"
    owner_id: Mapped[Uuid] = mapped_column(ForeignKey("users.id"))
    owner: Mapped["User"] = relationship(back_populates="businesses")

    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    email: Mapped[str] = mapped_column(nullable=False, unique=True)

    inventory_items: Mapped[List["InventoryItem"]] = relationship(
        back_populates="business", cascade="all, delete-orphan"
    )


class InventoryItem(IdMixin, Base):
    __tablename__ = "inventory"
    business_id: Mapped[Uuid] = mapped_column(ForeignKey("businesses.id"))
    business: Mapped["Business"] = relationship(back_populates="inventory_items")
