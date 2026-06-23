from typing import TYPE_CHECKING, List

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.sqltypes import String

from .base import Base
from .mixins import IdMixin

if TYPE_CHECKING:
    from .business import Business


class User(IdMixin, Base):
    __tablename__ = "users"

    first_name: Mapped[str] = mapped_column(String(32), nullable=False)
    last_name: Mapped[str] = mapped_column(String(32))

    businesses: Mapped[List["Business"]] = relationship(back_populates="owner")
