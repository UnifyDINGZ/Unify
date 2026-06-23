from typing import List

from sqlalchemy import ForeignKey, Uuid

from .base import Base
from .mixins import IdMixin

from sqlalchemy.orm import Mapped, mapped_column, relationship


class Business(IdMixin, Base):
    __tablename__ = "businesses"
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    email: Mapped[str] = mapped_column(nullable=False, unique=True)

    inventory_items: Mapped[List["InventoryItem"]] = relationship(
        back_populates="business", cascade="all, delete-orphan"
    )


class InventoryItem(IdMixin, Base):
    __tablename__ = "inventory"
    business_id: Mapped[Uuid] = mapped_column(ForeignKey("businesses.id"))
    business: Mapped["Business"] = relationship(back_populates="inventory_items")
