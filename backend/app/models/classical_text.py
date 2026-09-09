"""Classical Textbooks (First Schedule D&C Act) and Reference Pharmacopoeia Models."""

from typing import Optional, List
from sqlalchemy import String, Text, Integer, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pgvector.sqlalchemy import Vector
from app.models.base import Base, TimestampMixin


class ClassicalTextbook(Base, TimestampMixin):
    """First Schedule recognized authoritative books for Ayurveda, Siddha, and Unani."""

    __tablename__ = "classical_textbooks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    system: Mapped[str] = mapped_column(String(32), index=True)  # Ayurveda, Siddha, Unani, Sowa-Rigpa
    book_name: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    transliterated_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    author_era: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    schedule_entry_number: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    classical_formulations: Mapped[List["ClassicalFormulation"]] = relationship(
        "ClassicalFormulation", back_populates="textbook", cascade="all, delete-orphan"
    )


class ClassicalFormulation(Base, TimestampMixin):
    """Codified traditional formulations found in First Schedule books (TKDL prior art baseline)."""

    __tablename__ = "classical_formulations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    textbook_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("classical_textbooks.id", ondelete="CASCADE"), index=True
    )
    formulation_name: Mapped[str] = mapped_column(String(255), index=True)  # e.g., "Triphala Churna", "Chyawanprash"
    sanskrit_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    dosage_form: Mapped[str] = mapped_column(String(64))  # Churna, Vati, Asava, Arishta, Taila, Ghrita
    chapter_verse: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    ingredients: Mapped[dict] = mapped_column(JSON, default=list)  # list of botanical/mineral names & classical parts
    indications: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    tkdl_reference_id: Mapped[Optional[str]] = mapped_column(String(64), index=True)
    
    # Vector embedding of classical description & ingredients
    embedding: Mapped[Optional[List[float]]] = mapped_column(Vector(768), nullable=True)

    # Relationships
    textbook: Mapped["ClassicalTextbook"] = relationship(
        "ClassicalTextbook", back_populates="classical_formulations"
    )
