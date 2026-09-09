"""Formulation Assessment, Ingredients, and Compliance Evaluation Models."""

from typing import Optional, List
from sqlalchemy import String, Text, Integer, Float, Boolean, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin


class FormulationAssessment(Base, TimestampMixin):
    """User submitted formulation query and its comprehensive diagnostic evaluation."""

    __tablename__ = "formulation_assessments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), index=True)
    system: Mapped[str] = mapped_column(String(32), default="Ayurveda")  # Ayurveda, Siddha, Unani, etc.
    dosage_form: Mapped[str] = mapped_column(String(64), default="Extract Tablet")
    therapeutic_indication: Mapped[str] = mapped_column(String(255), nullable=False)
    intended_jurisdiction: Mapped[str] = mapped_column(String(32), default="BOTH")  # IN, EXPORT, BOTH

    # Classification Output: CLASSICAL vs PROPRIETARY (Rule 158B)
    classification_type: Mapped[str] = mapped_column(String(64), default="PROPRIETARY")
    is_first_schedule_match: Mapped[bool] = mapped_column(Boolean, default=False)
    classical_text_match_id: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    # Patentability Risk Scores (0.0 to 1.0)
    section_3p_risk_score: Mapped[float] = mapped_column(Float, default=0.0)
    section_3e_risk_score: Mapped[float] = mapped_column(Float, default=0.0)
    bda_abs_applicable: Mapped[bool] = mapped_column(Boolean, default=True)

    # Detailed Analytical Results stored as JSON
    ingredients_data: Mapped[dict] = mapped_column(JSON, default=list)
    synergism_data: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    tkdl_prior_art_matches: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    bda_assessment: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    export_comparison: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    pivot_recommendations: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    full_llm_reasoning: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    dossiers: Mapped[List["GeneratedDossier"]] = relationship(
        "GeneratedDossier", back_populates="assessment", cascade="all, delete-orphan"
    )
