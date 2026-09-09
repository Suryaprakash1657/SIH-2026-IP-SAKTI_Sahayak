"""Biological Diversity (Amendment) Act 2024 ABS Compliance Engine."""

from typing import List
from app.schemas.bda import (
    BDAComplianceRequest,
    BDAComplianceResponse,
    ABSFeeBreakdown,
)


class BDAEvaluator:
    """Evaluates Access and Benefit Sharing (ABS) obligations under BDA 2024."""

    @classmethod
    def evaluate_compliance(cls, request: BDAComplianceRequest) -> BDAComplianceResponse:
        """
        Calculates ABS exemption status, SBB/NBA filing requirements, and ABS fee under BDA 2024.
        Key BDA 2024 Provisions:
        - Registered AYUSH Vaidyas / codified traditional practitioners are ABS-exempt.
        - Cultivated medicinal plants (with cultivation certificate) are exempt from ABS fees under Section 7.
        - Foreign-controlled entities (Section 3(2)) require mandatory NBA prior approval.
        - Section 6 patent approval required prior to patent grant (streamlined timeline).
        """
        is_foreign = request.is_foreign_shareholding or request.entity_type == "FOREIGN_CONTROLLED_ENTITY"
        is_vaidya = request.is_ayush_practitioner_registered or request.entity_type == "REGISTERED_AYUSH_VAIDYA"
        is_cultivated = (request.source_type == "CULTIVATED" and request.has_cultivation_certificate)

        # 1. Section category determination
        if is_foreign:
            section_cat = "Section 3(2) - Foreign Controlled Entity / Non-Indian National"
            nba_required = True
            sbb_required = True
            is_exempt = False
            rate = 0.005  # 0.5% of ex-factory sale price
            exemption_reason = None
            doc_checklist = [
                "NBA Form I (Access to biological resources)",
                "NBA Form III (IPR Approval prior to patent grant)",
                "Foreign Equity Shareholding Pattern Certification",
                "Benefit Sharing Agreement Draft",
            ]
        elif is_vaidya:
            section_cat = "Section 7 Exemption - Registered AYUSH Practitioner"
            nba_required = False
            sbb_required = False
            is_exempt = True
            rate = 0.0
            exemption_reason = "Statutory exemption under BDA 2024 for registered AYUSH practitioners dispensing classical formulations."
            doc_checklist = [
                "State AYUSH Council Registration Certificate",
                "Self-declaration of traditional clinical practice",
            ]
        elif is_cultivated:
            section_cat = "Section 7 / Section 40 - Cultivated Bio-Resource Exemption"
            nba_required = False
            sbb_required = True  # Intimation to SBB, but fee exempt
            is_exempt = True
            rate = 0.0
            exemption_reason = "Exempt from ABS fee under BDA 2024 due to verified cultivated source origin."
            doc_checklist = [
                "Certificate of Cultivation from local Range Forest Officer / Gram Panchayat / Agricultural Board",
                "Form I Intimation to State Biodiversity Board (SBB)",
                "Purchase receipts / Farm contract farming agreements",
            ]
        else:
            # Domestic Indian commercial manufacturer utilizing wild-harvested bio-resources
            section_cat = "Section 7 - Domestic Indian Commercial Utilization"
            nba_required = False
            sbb_required = True
            is_exempt = False
            
            # SBB ABS Fee Tier based on annual sales turnover:
            # Up to 1 Cr: 0.1%, 1-3 Cr: 0.2%, Above 3 Cr: 0.5%
            sales = request.annual_gross_ex_factory_sale_inr
            if sales <= 10000000:
                rate = 0.001  # 0.1%
            elif sales <= 30000000:
                rate = 0.002  # 0.2%
            else:
                rate = 0.005  # 0.5%
                
            exemption_reason = None
            doc_checklist = [
                "Form I (Prior intimation to State Biodiversity Board)",
                "Annual Ex-Factory Sales Audit Certificate",
                "Traceability register for raw drug procurement",
                "NBA Form III intimation before patent grant",
            ]

        # Calculate annual fee
        fee_inr = round(request.annual_gross_ex_factory_sale_inr * rate, 2)
        
        fee_breakdown = ABSFeeBreakdown(
            applicable_percentage_rate=round(rate * 100, 2),
            calculated_annual_fee_inr=fee_inr,
            is_fully_exempt=is_exempt,
            exemption_reason=exemption_reason,
        )

        timing = "Must obtain NBA approval prior to patent grant (amended under BDA 2024 Section 6)."

        narrative = (
            f"Under the Biological Diversity (Amendment) Act 2024, the entity is categorized under '{section_cat}'. "
            f"{'The formulation is FULLY EXEMPT from monetary ABS sharing fees.' if is_exempt else f'Applicable ABS fee liability is {fee_breakdown.applicable_percentage_rate}% of ex-factory sales (Rs. {fee_inr:,.2f}/yr).'}"
        )

        return BDAComplianceResponse(
            entity_classification=request.entity_type,
            section_category=section_cat,
            is_abs_exempt=is_exempt,
            sbb_intimation_required=sbb_required,
            nba_approval_required=nba_required,
            nba_patent_approval_timing=timing,
            fee_breakdown=fee_breakdown,
            mandatory_document_checklist=doc_checklist,
            compliance_summary_narrative=narrative,
        )
