"""Biological Diversity (Amendment) Act 2024 Compliance Schemas."""

from typing import List, Optional
from pydantic import BaseModel, Field


class BDAComplianceRequest(BaseModel):
    """Input payload to evaluate BDA 2024 ABS obligations and compute fee liabilities."""
    entity_type: str = Field(
        ...,
        example="INDIAN_AYUSH_COMPANY",
        description="INDIAN_ENTITY, FOREIGN_CONTROLLED_ENTITY, REGISTERED_AYUSH_VAIDYA, RESEARCH_INSTITUTION"
    )
    is_foreign_shareholding: bool = Field(False, description="Any foreign equity or management control under Sec 3(2)")
    is_ayush_practitioner_registered: bool = Field(False, description="Whether registered under state AYUSH council")
    source_type: str = Field("CULTIVATED", example="CULTIVATED", description="CULTIVATED, WILD_HARVESTED, MIXED")
    has_cultivation_certificate: bool = Field(True, description="Certificate of cultivation from local Range Forest Officer / Gram Panchayat")
    annual_gross_ex_factory_sale_inr: float = Field(5000000.0, example=5000000.0, description="Annual sales turnover in INR")
    bio_resource_names: List[str] = Field(..., example=["Withania somnifera", "Bacopa monnieri"])
    is_patent_applied: bool = Field(True, description="Whether patent has been filed or granted")


class ABSFeeBreakdown(BaseModel):
    """Detailed calculation of ABS fee obligation under BDA 2024 regulations."""
    applicable_percentage_rate: float  # e.g. 0.0%, 0.1%, 0.2%, 0.5%
    calculated_annual_fee_inr: float
    is_fully_exempt: bool
    exemption_reason: Optional[str] = None


class BDAComplianceResponse(BaseModel):
    """Comprehensive BDA 2024 compliance and filing guidance."""
    entity_classification: str
    section_category: str  # Section 3(2) vs Section 7 vs Section 40 exemption
    is_abs_exempt: bool
    sbb_intimation_required: bool
    nba_approval_required: bool
    nba_patent_approval_timing: str  # e.g., "Prior to Patent Grant (BDA 2024 amendment)"
    fee_breakdown: ABSFeeBreakdown
    mandatory_document_checklist: List[str]
    compliance_summary_narrative: str
