"""Dual Jurisdiction (Domestic vs. Export) Analysis Schemas."""

from typing import List, Optional
from pydantic import BaseModel, Field


class JurisdictionComparisonRequest(BaseModel):
    """Request payload to compare domestic India vs foreign export IP strategies."""
    formulation_title: str
    botanical_ingredients: List[str]
    is_classical_herbal_source: bool = True
    novel_extraction_process: bool = True
    target_export_countries: List[str] = Field(default=["US", "EP", "JP"])


class JurisdictionRuleBreakdown(BaseModel):
    """Detailed IP & regulatory hurdle breakdown for a specific territory."""
    jurisdiction_code: str  # IN, US, EP, WO
    jurisdiction_name: str
    patentability_feasibility: str  # HIGH, MEDIUM, LOW, PROHIBITED
    primary_legal_barrier: str  # e.g., "Section 3(p) & 3(e) Indian Patents Act" or "35 U.S.C. 101/103 Subject Matter"
    biodiversity_abs_requirement: str
    regulatory_marketing_path: str  # e.g. "AYUSH Proprietary Drug License" vs "FDA Dietary Supplement / NDI"
    strategic_filing_recommendations: List[str]


class DualJurisdictionResponse(BaseModel):
    """Comparative dual-jurisdiction strategy matrix."""
    formulation_title: str
    domestic_india: JurisdictionRuleBreakdown
    international_export: JurisdictionRuleBreakdown
    divergence_summary: str
    recommended_pct_entry_timeline: str
    export_labeling_and_nagoya_advisory: str
