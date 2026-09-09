"""Alternative IP Strategy Pivot Engine (Trade Secrets, Trademarks, GI, Designs)."""

from typing import Dict, List, Any


class IPPivotEngine:
    """Provides non-patent IP protection strategies when Section 3(p) or 3(e) blocks patenting."""

    @classmethod
    def recommend_pivots(
        cls,
        formulation_title: str,
        section_3p_high_risk: bool,
        section_3e_high_risk: bool,
        has_novel_extraction: bool,
        has_unique_delivery_dispenser: bool = False,
    ) -> Dict[str, Any]:
        """
        Generates alternative IP monetization and protection options.
        """
        pivots = []

        # 1. Trade Secret & Know-How Protection
        if has_novel_extraction:
            pivots.append({
                "ip_type": "PROCESS_TRADE_SECRET",
                "title": "Extraction & Process Know-How Protection",
                "description": (
                    "Keep proprietary extraction parameters (temperature, pressure, solvent ratios, chromatography steps) "
                    "as strictly confidential trade secrets under non-disclosure and employment agreements, avoiding public patent disclosure."
                ),
                "protection_duration": "Indefinite (as long as kept secret)",
                "cost_barrier": "Low to Moderate",
                "recommended_action": "Implement robust confidentiality NDAs, segmented manufacturing SOPs, and access-control logs.",
            })

        # 2. Trademark & Brand Building
        pivots.append({
            "ip_type": "REGISTERED_TRADEMARK",
            "title": "Distinctive Brand & Formulation Trademark (Class 5)",
            "description": (
                "Register strong, distinctive trademark and brand names in NICE Class 5 (Pharmaceuticals and Ayush preparations) "
                "to capture commercial consumer goodwill."
            ),
            "protection_duration": "10 Years (Renewable indefinitely)",
            "cost_barrier": "Low",
            "recommended_action": "File Trademark Form TM-A with IPO Trademark Registry with distinctive coined brand name.",
        })

        # 3. Geographical Indications (GI) Leverage
        pivots.append({
            "ip_type": "GEOGRAPHICAL_INDICATION",
            "title": "Regional Cultivar & GI Origin Authentication",
            "description": (
                "Leverage registered GI tags for regional botanical raw drugs (e.g., Malabar Pepper, Kashmir Saffron, Nagaland Naga Mircha) "
                "to command premium market pricing and legal protection against counterfeits."
            ),
            "protection_duration": "10 Years (Renewable)",
            "cost_barrier": "Low",
            "recommended_action": "Register as authorized user under Section 17 of Geographical Indications of Goods Act 1999.",
        })

        # 4. Industrial Design Protection
        if has_unique_delivery_dispenser:
            pivots.append({
                "ip_type": "INDUSTRIAL_DESIGN",
                "title": "Novel Packaging & Delivery Device Design Registration",
                "description": (
                    "Register aesthetic and ergonomic shape of novel dual-chamber dispenser or sublingual inhaler under Designs Act 2000."
                ),
                "protection_duration": "10 + 5 Years",
                "cost_barrier": "Moderate",
                "recommended_action": "File Design Application under Designs Act 2000 with 6-view orthographic drawings.",
            })

        # Human Escalation Recommendation
        escalation_advisory = {
            "requires_patent_attorney_review": (section_3p_high_risk or section_3e_high_risk),
            "escalation_path": "Refer to empanelled Ayush IPR Facilitation Center (AIFC) or Certified Patent Agent for claim restructuring.",
            "consultation_checklist": [
                "Detailed extraction flow-chart with solvent yields",
                "Comparative bioassay data against individual botanical controls",
                "Raw herb procurement invoices and cultivation provenance records",
            ],
        }

        return {
            "formulation_title": formulation_title,
            "recommended_pivots": pivots,
            "human_escalation_advisory": escalation_advisory,
        }
