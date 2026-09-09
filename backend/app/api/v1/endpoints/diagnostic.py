"""Formulation Diagnostic Wizard Endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.diagnostic import (
    FormulationDiagnosticRequest,
    FormulationDiagnosticResponse,
    BDABriefEvaluation,
)
from app.services.classification import FormulationClassifier
from app.services.section3_evaluator import Section3Evaluator

router = APIRouter()


@router.post("/evaluate", response_model=FormulationDiagnosticResponse, status_code=status.HTTP_200_OK)
async def evaluate_formulation(
    request: FormulationDiagnosticRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Complete Ayush formulation legal, patentability, and regulatory diagnostic:
    1. First Schedule classical text baseline matching (D&C Act Sec 3(a) vs Sec 3(h) / Rule 158B).
    2. Indian Patents Act Section 3(p) Traditional Knowledge bar & TKDL risk scoring.
    3. Indian Patents Act Section 3(e) Mere Admixture vs Synergism requirement.
    4. BDA 2024 high-level ABS exemption triage.
    """
    try:
        # Step 1: Classical vs Proprietary classification
        classification, regulatory_path, classical_match = FormulationClassifier.evaluate_classification(
            formulation_title=request.title,
            ingredients=request.ingredients,
            is_novel_ratio=request.is_novel_ratio,
            extraction_method=request.extraction_method,
        )

        # Step 2: Section 3(p) evaluation
        sec_3p = Section3Evaluator.evaluate_section_3p(
            ingredients=request.ingredients,
            classical_match=classical_match,
            is_novel_ratio=request.is_novel_ratio,
        )

        # Step 3: Section 3(e) evaluation
        sec_3e = Section3Evaluator.evaluate_section_3e(
            ingredients=request.ingredients,
            is_novel_ratio=request.is_novel_ratio,
        )

        # Step 4: BDA 2024 brief evaluation
        is_all_cultivated = all(ing.is_cultivated for ing in request.ingredients)
        bda_brief = BDABriefEvaluation(
            is_exempt_from_abs=is_all_cultivated,
            exemption_clause="Section 7 / Section 40 (Cultivated Bio-Resource Exemption)" if is_all_cultivated else None,
            requires_sbb_intimation=True,
            requires_nba_approval=False,
            estimated_abs_rate="0.0% (Exempt)" if is_all_cultivated else "0.1% - 0.2% of ex-factory sales",
        )

        # Synthesis & Recommendation
        if sec_3p.risk_level == "HIGH" and sec_3e.risk_level == "HIGH":
            primary_rec = "High Section 3(p)/3(e) rejection barrier at IPO. Pivot claims to standardized extraction method or execute Chou-Talalay synergism testing before filing."
        elif sec_3e.risk_level == "HIGH":
            primary_rec = "Provide experimental Chou-Talalay Combination Index assay (CI < 0.9) to substantiate non-obvious synergism under Section 3(e)."
        else:
            primary_rec = "Defensible patent filing pathway available. Ensure mandatory source coordinates are cited in Form 2 Specification."

        reasoning = (
            f"Formulation '{request.title}' classified under {classification}. "
            f"Section 3(p) Risk: {sec_3p.risk_level} ({sec_3p.risk_score}). "
            f"Section 3(e) Risk: {sec_3e.risk_level} ({sec_3e.risk_score}). "
            f"Regulatory Licensing: {regulatory_path}"
        )

        return FormulationDiagnosticResponse(
            assessment_id=1,
            title=request.title,
            classification_type=classification,
            regulatory_framework=regulatory_path,
            first_schedule_match=classical_match,
            section_3p=sec_3p,
            section_3e=sec_3e,
            bda_2024=bda_brief,
            primary_recommendation=primary_rec,
            full_ai_reasoning=reasoning,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error evaluating formulation diagnostic: {str(e)}",
        )
