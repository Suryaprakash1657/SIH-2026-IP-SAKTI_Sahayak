"""Biological Diversity (Amendment) Act 2024 Endpoints."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.bda import (
    BDAComplianceRequest,
    BDAComplianceResponse,
)
from app.services.bda_evaluator import BDAEvaluator

router = APIRouter()


@router.post("/evaluate", response_model=BDAComplianceResponse, status_code=status.HTTP_200_OK)
async def evaluate_bda_compliance(request: BDAComplianceRequest):
    """
    Evaluate BDA 2024 compliance, SBB intimation / NBA approval triggers, and calculate ABS fee liabilities.
    """
    try:
        response = BDAEvaluator.evaluate_compliance(request)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error evaluating BDA 2024 compliance: {str(e)}",
        )
