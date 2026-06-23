from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import Uuid
from uuid import UUID


class IdMixin:
    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), unique=True, primary_key=True, nullable=False
    )
