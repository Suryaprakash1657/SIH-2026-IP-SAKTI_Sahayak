"""Generated Legal Application Dossiers and Regulatory Filing Draft Models."""

from typing import Optional
from sqlalchemy import String, Text, Integer, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin


class GeneratedDossier(Base, TimestampMixin):
    """Stores generated patent specifications, IPO Form 1/2 drafts, and NBA Form III applications."""

    __tablename__ = "generated_dossiers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    assessment_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("formulation_assessments.id", ondelete="CASCADE"), index=True
    )
    dossier_type: Mapped[str] = mapped_column(String(64), index=True)  # IPO_PROVISIONAL, IPO_COMPLETE, NBA_FORM_III, RULE_158B_DOSSIER
    file_path: Mapped[str] = mapped_column(String(512), nullable=False)
    file_size_bytes: Mapped[int] = mapped_column(Integer, default=0)
    
    # Generated content structures
    claims_draft: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    abstract_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    synergism_table: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    biological_source_declaration: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # Section 10(4)(d)(ii) mandatory disclosure
    
    # Relationships
    assessment: Mapped["FormulationAssessment"] = relationship(
        "FormulationAssessment", back_populates="dossiers"
    )
