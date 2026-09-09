"""Ayush Formulation Classification Engine (D&C Act Sec 3a vs Sec 3h / Rule 158B)."""

from typing import List, Optional, Tuple
from app.schemas.diagnostic import ClassicalMatchReference, HerbIngredient


class FormulationClassifier:
    """Classifies formulations into Classical ASU vs Patent/Proprietary ASU medicine."""

    # Curated baseline of prominent First Schedule authoritative formulations for fast triage
    KNOWN_FIRST_SCHEDULE_DATABASE = [
        {
            "book": "Charaka Samhita (Chikitsa Sthana)",
            "name": "Triphala Churna",
            "ingredients": ["Terminalia chebula", "Terminalia bellirica", "Phyllanthus emblica"],
            "verse": "Chapter 1:4, Verse 41-44",
        },
        {
            "book": "Sushruta Samhita",
            "name": "Saraswatarishta",
            "ingredients": ["Bacopa monnieri", "Withania somnifera", "Zingiber officinale"],
            "verse": "Uttara Tantra, Chapter 28",
        },
        {
            "book": "Bhaishajya Ratnavali",
            "name": "Chyawanprash",
            "ingredients": ["Phyllanthus emblica", "Withania somnifera", "Piper longum", "Asparagus racemosus"],
            "verse": "Rasayana Prakarana 8-15",
        },
        {
            "book": "Siddha Vaidya Thirattu",
            "name": "Nilavembu Kudineer",
            "ingredients": ["Andrographis paniculata", "Zingiber officinale", "Piper nigrum", "Cyperus rotundus"],
            "verse": "Kudineer Section 12",
        },
        {
            "book": "Sharngadhara Samhita",
            "name": "Ashwagandharishta",
            "ingredients": ["Withania somnifera", "Woodfordia fruticosa", "Zingiber officinale"],
            "verse": "Madhyama Khanda 10:78",
        },
    ]

    @classmethod
    def evaluate_classification(
        cls,
        formulation_title: str,
        ingredients: List[HerbIngredient],
        is_novel_ratio: bool,
        extraction_method: Optional[str] = None,
    ) -> Tuple[str, str, Optional[ClassicalMatchReference]]:
        """
        Evaluate whether the formulation is:
        1. Classical ASU Drug (D&C Act Section 3(a)) - Exact classical recipe & method.
        2. Patent or Proprietary Medicine (D&C Act Section 3(h) / Rule 158B) - Novel extract, ratio, or combination.
        """
        ingredient_botanicals = [ing.botanical_name.strip().lower() for ing in ingredients]
        
        best_match: Optional[ClassicalMatchReference] = None
        highest_overlap_score = 0.0

        for entry in cls.KNOWN_FIRST_SCHEDULE_DATABASE:
            db_ingredients = [item.lower() for item in entry["ingredients"]]
            common = set(ingredient_botanicals).intersection(set(db_ingredients))
            overlap_ratio = len(common) / max(len(db_ingredients), len(ingredient_botanicals))

            if overlap_ratio > highest_overlap_score:
                highest_overlap_score = overlap_ratio
                is_verbatim = (
                    overlap_ratio == 1.0 
                    and not is_novel_ratio 
                    and (extraction_method is None or "classical" in extraction_method.lower() or "aqueous" in extraction_method.lower())
                )
                best_match = ClassicalMatchReference(
                    textbook_name=entry["book"],
                    classical_formulation=entry["name"],
                    chapter_verse=entry["verse"],
                    similarity_score=round(overlap_ratio, 2),
                    overlapping_ingredients=list(common),
                    is_verbatim_match=is_verbatim,
                )

        # Classification logic based on statutory definitions
        if best_match and best_match.is_verbatim_match:
            classification_type = "CLASSICAL_ASU_DRUG (D&C Act Sec 3(a))"
            regulatory_framework = (
                "Classical formulation licensing under Rule 158B(1). "
                "Exempt from new safety/efficacy clinical trials; citation of First Schedule text is sufficient."
            )
        else:
            classification_type = "PATENT_OR_PROPRIETARY_ASU_MEDICINE (D&C Act Sec 3(h))"
            regulatory_framework = (
                "Proprietary formulation licensing under Rule 158B(II). "
                "Requires proof of effectiveness, safety study reports, and standardized phytochemical profiling."
            )

        return classification_type, regulatory_framework, best_match
