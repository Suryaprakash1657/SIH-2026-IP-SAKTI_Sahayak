"""Dual Jurisdiction Analysis Endpoints."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.jurisdiction import (
    JurisdictionComparisonRequest,
    DualJurisdictionResponse,
)
from app.services.dual_jurisdiction import DualJurisdictionService

router = APIRouter()


@router.post("/compare", response_model=DualJurisdictionResponse, status_code=status.HTTP_200_OK)
async def compare_jurisdictions(request: JurisdictionComparisonRequest):
    """
    Compare domestic India patent hurdles against export markets (USPTO, EPO, PCT).
    """
    try:
        response = DualJurisdictionService.evaluate_jurisdictions(request)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error comparing jurisdictions: {str(e)}",
        )
