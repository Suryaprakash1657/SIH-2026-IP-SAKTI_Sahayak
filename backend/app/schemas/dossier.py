"""Automated Dossier & Form Generation Schemas."""

from typing import List, Optional
from pydantic import BaseModel, Field


class DossierGenerationRequest(BaseModel):
    """Payload to trigger automated PDF drafting of IPO Patent Application & NBA Form III."""
    formulation_title: str
    inventor_names: List[str] = Field(..., example=["Dr. Rajesh Sharma", "Dr. Priya Nair"])
    applicant_name: str = Field(..., example="Ayush Bioactives Pvt Ltd")
    applicant_address: str = Field(..., example="Plot 42, Biotech Park, Gandhinagar, Gujarat 382010, India")
    system: str = Field("Ayurveda", example="Ayurveda")
    botanical_ingredients: List[str]
    biological_source_origin: str = Field("Madhya Pradesh and Kerala, India", example="Madhya Pradesh and Kerala, India")
    novel_features_summary: str = Field(
        "Supercritical CO2 extraction yielding >12% Withanolide glycoside content with verified AChE inhibition synergy",
        example="Supercritical CO2 extraction yielding >12% Withanolides"
    )
    combination_index_ci: Optional[float] = Field(0.68, example=0.68)
    include_ipo_form1: bool = Field(True, description="Generate IPO Form 1 (Application for Grant of Patent)")
    include_ipo_form2_specification: bool = Field(True, description="Generate IPO Form 2 (Complete/Provisional Specification)")
    include_nba_form_iii: bool = Field(True, description="Generate NBA Form III (Application for IPR on Biological Resources)")


class DossierGenerationResponse(BaseModel):
    """Generated document metadata and secure download URL."""
    dossier_id: str
    formulation_title: str
    generated_pdf_url: str
    file_size_bytes: int
    included_forms: List[str]
    draft_claims_preview: List[str]
    abstract_preview: str
    biological_source_declaration: str
