"""Diagnostic Wizard Request & Response Pydantic Schemas."""

from typing import List, Optional
from pydantic import BaseModel, Field


class HerbIngredient(BaseModel):
    """Single botanical or mineral ingredient in a formulation."""
    botanical_name: str = Field(..., example="Withania somnifera")
    common_name: str = Field(..., example="Ashwagandha")
    sanskrit_name: Optional[str] = Field(None, example="Ashwagandha")
    part_used: str = Field(..., example="Root Extract (5:1)")
    percentage_or_quantity: str = Field(..., example="300 mg")
    source_origin: Optional[str] = Field("Madhya Pradesh, India", example="Madhya Pradesh, India")
    is_cultivated: bool = Field(True, description="Whether cultivated on private farm or wild-harvested")


class FormulationDiagnosticRequest(BaseModel):
    """Input payload for full formulation legal diagnostic evaluation."""
    title: str = Field(..., example="Standardized Neuroprotective Ashwagandha-Brahmi Synergistic Complex")
    system: str = Field("Ayurveda", example="Ayurveda")
    dosage_form: str = Field("Coated Tablet", example="Coated Tablet")
    therapeutic_indication: str = Field("Cognitive enhancement and neuroprotection in mild age-related memory impairment", example="Cognitive enhancement")
    ingredients: List[HerbIngredient] = Field(..., min_length=1)
    extraction_method: Optional[str] = Field(
        "Standardized Supercritical CO2 dual extraction at 40°C, 250 bar",
        example="Standardized Supercritical CO2 dual extraction"
    )
    is_novel_ratio: bool = Field(True, description="Whether ratio deviates from classical textbook proportions")
    intended_jurisdiction: str = Field("BOTH", example="BOTH")  # IN, EXPORT, BOTH
    user_language: str = Field("en", example="en")


class ClassicalMatchReference(BaseModel):
    """Reference match from First Schedule authoritative textbooks (TKDL baseline)."""
    textbook_name: str
    classical_formulation: str
    chapter_verse: Optional[str] = None
    similarity_score: float
    overlapping_ingredients: List[str]
    is_verbatim_match: bool


class Section3PEvaluation(BaseModel):
    """Indian Patents Act Section 3(p) Traditional Knowledge Bar Analysis."""
    risk_level: str  # HIGH, MODERATE, LOW
    risk_score: float  # 0.0 to 1.0
    tkdl_prior_art_found: bool
    summary: str
    statutory_grounds: str
    overcoming_strategies: List[str]


class Section3EEvaluation(BaseModel):
    """Indian Patents Act Section 3(e) Mere Admixture vs Synergism Analysis."""
    risk_level: str  # HIGH, MODERATE, LOW
    risk_score: float  # 0.0 to 1.0
    requires_bioactivity_synergy: bool
    chou_talalay_ci_score: Optional[float] = None
    summary: str
    statutory_grounds: str
    recommended_experimental_evidence: List[str]


class BDABriefEvaluation(BaseModel):
    """High-level BDA 2024 compliance result."""
    is_exempt_from_abs: bool
    exemption_clause: Optional[str] = None
    requires_sbb_intimation: bool
    requires_nba_approval: bool
    estimated_abs_rate: Optional[str] = None


class FormulationDiagnosticResponse(BaseModel):
    """Consolidated diagnostic report for the formulation."""
    assessment_id: Optional[int] = None
    title: str
    classification_type: str  # CLASSICAL_ASU (Sec 3a) vs PATENT_PROPRIETARY (Sec 3h)
    regulatory_framework: str  # Rule 158B licensing path
    first_schedule_match: Optional[ClassicalMatchReference] = None
    section_3p: Section3PEvaluation
    section_3e: Section3EEvaluation
    bda_2024: BDABriefEvaluation
    primary_recommendation: str
    full_ai_reasoning: str
