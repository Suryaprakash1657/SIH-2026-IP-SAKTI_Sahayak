"""Biological Diversity (Amendment) Act 2024 Rules and ABS Criteria Models."""

from typing import Optional
from sqlalchemy import String, Text, Integer, Float, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base, TimestampMixin


class BDARule(Base, TimestampMixin):
    """Codified BDA 2024 sections, exemptions, entity tiers, and fee calculations."""

    __tablename__ = "bda_rules"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    section_reference: Mapped[str] = mapped_column(String(64), unique=True, index=True)  # e.g., "Sec 3(2)", "Sec 7", "Sec 40"
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    
    # Entity Type: DOMESTIC_INDIAN, FOREIGN_CONTROLLED, AYUSH_VAIDYA, RESEARCH_INSTITUTION
    entity_category: Mapped[str] = mapped_column(String(64), index=True)
    
    # Exemption Status & Conditions
    is_abs_exempt: Mapped[bool] = mapped_column(Boolean, default=False)
    exemption_basis: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # e.g. "Cultivated bio-resource with AYUSH registration"
    
    # Commercial Utilization Fee Percentage or Flat Surcharge
    abs_percentage_rate: Mapped[Optional[float]] = mapped_column(Float, default=0.0)  # 0.1% - 0.5% of ex-factory sale price
    sbb_intimation_required: Mapped[bool] = mapped_column(Boolean, default=True)
    nba_approval_required: Mapped[bool] = mapped_column(Boolean, default=False)
    
    rule_metadata: Mapped[Optional[dict]] = mapped_column(JSON, default=dict)
