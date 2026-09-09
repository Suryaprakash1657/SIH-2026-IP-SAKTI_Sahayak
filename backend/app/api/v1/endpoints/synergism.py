"""Synergism & Novelty Calculation Endpoints."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.synergism import (
    SynergismCalculationRequest,
    SynergismCalculationResponse,
)
from app.services.synergism_calculator import SynergismCalculator

router = APIRouter()


@router.post("/calculate", response_model=SynergismCalculationResponse, status_code=status.HTTP_200_OK)
async def calculate_synergism(request: SynergismCalculationRequest):
    """
    Calculate Chou-Talalay Combination Index (CI) and generate Section 3(e) legal rebuttal narrative.
    """
    try:
        response = SynergismCalculator.calculate_combination_index(request)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error computing synergism: {str(e)}",
        )
