"""Synergism & Section 3(e) Novelty Calculator Schemas."""

from typing import List, Optional
from pydantic import BaseModel, Field


class BioactivityDataPoint(BaseModel):
    """Laboratory test concentration and measured inhibition / bioactivity percentage."""
    compound_name: str = Field(..., example="Withanolide A (Herb A)")
    dose: float = Field(..., example=50.0, description="Dose or concentration in ug/mL or mg/kg")
    effect: float = Field(..., example=0.45, description="Fractional inhibitory effect between 0.0 and 1.0 (e.g. 45% = 0.45)")


class CombinationDataPoint(BaseModel):
    """Combination test point with both components tested together."""
    dose_herb_a: float = Field(..., example=25.0)
    dose_herb_b: float = Field(..., example=25.0)
    measured_effect: float = Field(..., example=0.88, description="Fractional effect of combination (e.g. 88% = 0.88)")


class SynergismCalculationRequest(BaseModel):
    """Payload to calculate Chou-Talalay Combination Index (CI) & Section 3(e) defense justification."""
    formulation_name: str = Field(..., example="Ashwagandha + Brahmi Complex")
    herb_a_name: str = Field(..., example="Withania somnifera Extract")
    herb_b_name: str = Field(..., example="Bacopa monnieri Extract")
    assay_type: str = Field("Acetylcholinesterase (AChE) Inhibition Assay", example="AChE Inhibition")
    single_herb_a_data: List[BioactivityDataPoint]
    single_herb_b_data: List[BioactivityDataPoint]
    combination_data: List[CombinationDataPoint]


class IsobologramPoint(BaseModel):
    """Coordinate for Isobologram 2D plot."""
    dose_a: float
    dose_b: float
    is_synergistic: bool


class SynergismCalculationResponse(BaseModel):
    """Result of scientific synergism computation for IPO Section 3(e) compliance."""
    formulation_name: str
    combination_index_ci: float  # CI < 0.9 = Synergism, 0.9-1.1 = Additive, > 1.1 = Antagonism
    synergy_classification: str  # STRONG_SYNERGISM, MODERATE_SYNERGISM, ADDITIVE, ANTAGONISTIC
    expected_additive_effect: float
    observed_combination_effect: float
    fold_enhancement: float
    section_3e_compliance_status: str  # DEFENSE_VIABLE, HIGH_REJECTION_RISK
    patent_claim_wording_recommendation: str
    isobologram_points: List[IsobologramPoint]
    ai_legal_justification_narrative: str
