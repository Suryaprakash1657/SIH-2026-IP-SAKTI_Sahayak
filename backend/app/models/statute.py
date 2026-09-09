"""Statute, Legal Clause, and Vector Embedding Database Models."""

from typing import Optional, List
from sqlalchemy import String, Text, Integer, Float, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pgvector.sqlalchemy import Vector
from app.models.base import Base, TimestampMixin


class StatuteDocument(Base, TimestampMixin):
    """Represents a primary legal act or rule document (e.g., Patents Act 1970, BDA 2024)."""

    __tablename__ = "statute_documents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    code: Mapped[str] = mapped_column(String(64), unique=True, index=True)  # e.g., IPA_1970, BDA_2024, DCA_1940
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    short_title: Mapped[str] = mapped_column(String(128), nullable=False)
    jurisdiction: Mapped[str] = mapped_column(String(32), default="IN")  # IN, US, EP, WO
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    pdf_path: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    metadata_json: Mapped[Optional[dict]] = mapped_column(JSON, default=dict)

    # Relationships
    clauses: Mapped[List["StatuteClause"]] = relationship(
        "StatuteClause", back_populates="document", cascade="all, delete-orphan"
    )


class StatuteClause(Base, TimestampMixin):
    """Represents a discrete section, sub-rule, or schedule clause with bounding box & vector embedding."""

    __tablename__ = "statute_clauses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    document_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("statute_documents.id", ondelete="CASCADE"), index=True
    )
    section_number: Mapped[str] = mapped_column(String(32), index=True)  # e.g., "3(p)", "3(e)", "Rule 158B"
    heading: Mapped[str] = mapped_column(String(255), nullable=False)
    full_text: Mapped[str] = mapped_column(Text, nullable=False)
    plain_summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # Coordinate highlighting metadata for Split-Screen PDF Viewer
    page_number: Mapped[int] = mapped_column(Integer, default=1)
    bbox_coordinates: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # {x0, y0, x1, y1, width, height}
    
    # Vector Embedding for Semantic Hybrid Search
    embedding: Mapped[Optional[List[float]]] = mapped_column(Vector(768), nullable=True)
    tags: Mapped[Optional[dict]] = mapped_column(JSON, default=list)  # e.g., ["traditional_knowledge", "synergism", "abs"]

    # Relationships
    document: Mapped["StatuteDocument"] = relationship(
        "StatuteDocument", back_populates="clauses"
    )
