"""Indian Patents Act Section 3(p) and Section 3(e) Patentability Evaluator."""

from typing import List, Optional
from app.schemas.diagnostic import Section3PEvaluation, Section3EEvaluation, HerbIngredient, ClassicalMatchReference


class Section3Evaluator:
    """Evaluates formulation compliance against statutory patentability hurdles in India."""

    @classmethod
    def evaluate_section_3p(
        cls,
        ingredients: List[HerbIngredient],
        classical_match: Optional[ClassicalMatchReference],
        is_novel_ratio: bool,
    ) -> Section3PEvaluation:
        """
        Analyze Section 3(p): Inventions which in effect are traditional knowledge or
        an aggregation of known properties of traditionally known component(s).
        """
        has_tk_match = classical_match is not None and classical_match.similarity_score > 0.4
        
        if has_tk_match and not is_novel_ratio:
            risk_level = "HIGH"
            risk_score = 0.92
            summary = (
                f"Severe Section 3(p) rejection hurdle. The proposed formulation overlaps significantly ({int(classical_match.similarity_score * 100)}%) "
                f"with classical entry '{classical_match.classical_formulation}' in '{classical_match.textbook_name}'."
            )
            grounds = (
                "Indian Patents Act 1970, Section 3(p): 'an invention which in effect is traditional knowledge or which "
                "is an aggregation or duplication of known properties of traditionally known component or components' is not patentable."
            )
            strategies = [
                "Pivot claims from formulation composition to a specific standardized extraction process.",
                "Demonstrate unexpected, non-obvious bioactivity enhancement through Synergism assays (Chou-Talalay CI < 0.8).",
                "Isolate and characterize specific novel enriched bioactive fraction (e.g. specific glycoside fraction) rather than whole crude extract.",
                "Consider alternative IP route: Registered Trademark + Process Trade Secrets.",
            ]
        elif has_tk_match and is_novel_ratio:
            risk_level = "MODERATE"
            risk_score = 0.58
            summary = (
                "Moderate Section 3(p) hurdle. While ingredients are traditional, novel component ratios and extraction "
                "parameters provide a defensible path if backed by comparative experimental data."
            )
            grounds = (
                "Section 3(p) read with Controller General Guidelines on Traditional Knowledge and Biological Material."
            )
            strategies = [
                "Submit comparative data explicitly testing the classical ratio vs. the claimed novel ratio.",
                "Emphasize technical effect not disclosed in First Schedule texts (e.g., enhanced bioavailability, blood-brain barrier permeability).",
                "Ensure mandatory source and geographical origin disclosure under Section 10(4)(d)(ii).",
            ]
        else:
            risk_level = "LOW"
            risk_score = 0.22
            summary = "Low Section 3(p) prior art risk. No verbatim First Schedule classical composition match detected."
            grounds = "Section 3(p) statutory filter."
            strategies = [
                "Conduct exhaustive TKDL and PubMed prior-art search to confirm novelty of combination.",
                "Draft independent claims targeting the specific synergistic ratio range.",
            ]

        return Section3PEvaluation(
            risk_level=risk_level,
            risk_score=risk_score,
            tkdl_prior_art_found=has_tk_match,
            summary=summary,
            statutory_grounds=grounds,
            overcoming_strategies=strategies,
        )

    @classmethod
    def evaluate_section_3e(
        cls,
        ingredients: List[HerbIngredient],
        is_novel_ratio: bool,
        ci_score: Optional[float] = None,
    ) -> Section3EEvaluation:
        """
        Analyze Section 3(e): Substance obtained by a mere admixture resulting only in the aggregation
        of properties, or process of producing such substance.
        """
        is_multi_herb = len(ingredients) > 1

        if is_multi_herb and ci_score is None:
            risk_level = "HIGH"
            risk_score = 0.85
            summary = (
                "High Section 3(e) objection probability. Combining multiple herbal extracts is prima facie treated "
                "by Indian Patent Examiners as a 'mere admixture' unless unexpected synergism is quantitatively proven."
            )
            grounds = (
                "Indian Patents Act 1970, Section 3(e): 'a substance obtained by a mere admixture resulting only in the "
                "aggregation of the properties of the components thereof or a process for producing such substance' is not patentable."
            )
            evidence = [
                "Execute Chou-Talalay Combination Index (CI) assay to demonstrate CI < 0.9 (Synergism).",
                "Provide in-vitro / in-vivo comparative data: Herb A alone vs. Herb B alone vs. Claimed Combination.",
                "Submit Isobologram analysis demonstrating statistically significant enhancement over arithmetic sum.",
            ]
        elif ci_score is not None and ci_score < 0.85:
            risk_level = "LOW"
            risk_score = 0.25
            summary = (
                f"Section 3(e) hurdle successfully overcome. Measured Combination Index (CI = {ci_score}) demonstrates "
                f"clear super-additive synergism rather than mere property aggregation."
            )
            grounds = "Section 3(e) exception via proved non-obvious synergistic bioactivity."
            evidence = [
                "Incorporate CI calculation tables directly into Complete Specification (Form 2, Example section).",
                "Attach Isobologram graph in drawings schedule.",
            ]
        else:
            risk_level = "MODERATE"
            risk_score = 0.50
            summary = "Single-herb extract formulation. Section 3(e) admixture bar is not directly triggered, but Section 3(d) novelty must be addressed."
            grounds = "Section 3(e) / Section 3(d) new form of known substance."
            evidence = [
                "Provide comparative efficacy data establishing significantly enhanced therapeutic profile over standard extract.",
            ]

        return Section3EEvaluation(
            risk_level=risk_level,
            risk_score=risk_score,
            requires_bioactivity_synergy=is_multi_herb,
            chou_talalay_ci_score=ci_score,
            summary=summary,
            statutory_grounds=grounds,
            recommended_experimental_evidence=evidence,
        )
