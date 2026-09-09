"""Dual Jurisdiction (Domestic India vs Export) Strategy Engine."""

from typing import List
from app.schemas.jurisdiction import (
    JurisdictionComparisonRequest,
    JurisdictionRuleBreakdown,
    DualJurisdictionResponse,
)


class DualJurisdictionService:
    """Evaluates divergence between Indian Patent Office standards and foreign export IP requirements."""

    @classmethod
    def evaluate_jurisdictions(
        cls, request: JurisdictionComparisonRequest
    ) -> DualJurisdictionResponse:
        """
        Compare domestic IPO vs International (USPTO/EPO/PCT) filing hurdles.
        - Domestic: Stringent Section 3(p) TKDL and Section 3(e) Synergism hurdles + Section 10(4)(d)(ii) source disclosure.
        - Foreign Export: 35 U.S.C. 101/103 (patentable subject matter if non-obvious combination or standardized extract),
          no Section 3(p) equivalent, but subject to international TKDL citations and Nagoya Protocol export permits.
        """
        domestic_breakdown = JurisdictionRuleBreakdown(
            jurisdiction_code="IN",
            jurisdiction_name="India (IPO - Indian Patent Office)",
            patentability_feasibility="MEDIUM" if request.novel_extraction_process else "LOW",
            primary_legal_barrier="Section 3(p) (Traditional Knowledge bar) and Section 3(e) (Admixture bar) of Indian Patents Act 1970",
            biodiversity_abs_requirement="Mandatory Section 6 NBA approval prior to patent grant and SBB intimation under BDA 2024",
            regulatory_marketing_path="AYUSH State Licensing Authority (Rule 158B - Proprietary / Classical ASU)",
            strategic_filing_recommendations=[
                "File Provisional Specification with preliminary bioactivity data to secure early priority date.",
                "Conduct Chou-Talalay combination index testing before filing Complete Specification (Form 2).",
                "Strictly include geographical coordinates & source of biological material (Section 10(4)(d)(ii)).",
            ],
        )

        international_breakdown = JurisdictionRuleBreakdown(
            jurisdiction_code="EXPORT_PCT",
            jurisdiction_name="Export Markets (USPTO / EPO / WIPO PCT)",
            patentability_feasibility="HIGH",
            primary_legal_barrier="35 U.S.C. § 101 / 103 (Utility & Non-obviousness); EPO Article 56 (Inventive Step)",
            biodiversity_abs_requirement="Nagoya Protocol ABS declaration & PIC (Prior Informed Consent) certificate for commercialization",
            regulatory_marketing_path="US FDA Dietary Supplement (DSHEA / NDI) or EU Traditional Herbal Medicinal Products Directive (THMPD)",
            strategic_filing_recommendations=[
                "File WIPO PCT international application within 12 months of Indian priority date.",
                "Structure independent claims around standardized marker compound concentration profile.",
                "Pre-empt TKDL citations by filing explicit comparative bio-availability and synergism data.",
            ],
        )

        divergence = (
            "Significant statutory divergence: In India, classical herbal compositions face strict statutory exclusion under "
            "Section 3(p) unless unexpected synergism is proven. In export jurisdictions (US/EU), standardized synergistic "
            "compositions and novel extraction processes are routinely granted patents under utility/novelty standards."
        )

        timeline = "File Indian Priority -> 12 Months: File PCT International Application -> 30/31 Months: Enter National Phase (US/EP/JP)."

        nagoya = (
            "Exporting formulations derived from Indian biological resources requires an export permit and certificate of source "
            "under BDA 2024 to prevent port-of-entry impoundment under Nagoya Protocol compliance."
        )

        return DualJurisdictionResponse(
            formulation_title=request.formulation_title,
            domestic_india=domestic_breakdown,
            international_export=international_breakdown,
            divergence_summary=divergence,
            recommended_pct_entry_timeline=timeline,
            export_labeling_and_nagoya_advisory=nagoya,
        )
