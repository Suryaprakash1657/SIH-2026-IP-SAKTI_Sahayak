"""Alternative IP Pivot & Advisory Endpoints."""

from typing import Dict, Any, Optional
from fastapi import APIRouter, Query, HTTPException, status
from app.services.pivot_recommender import IPPivotEngine

router = APIRouter()


@router.get("/recommend", response_model=Dict[str, Any], status_code=status.HTTP_200_OK)
async def get_pivot_recommendations(
    formulation_title: str = Query("Herbal Cognitive Complex", description="Title of formulation"),
    section_3p_high_risk: bool = Query(True, description="Whether 3(p) TK risk is high"),
    section_3e_high_risk: bool = Query(True, description="Whether 3(e) admixture risk is high"),
    has_novel_extraction: bool = Query(True, description="Whether novel extraction method exists"),
):
    """
    Generate alternative IP protection pivots (Trade Secrets, Trademarks, GI, Designs) and human escalation advisory.
    """
    try:
        recommendations = IPPivotEngine.recommendpivots = IPPivotEngine.recommend_pivots(
            formulation_title=formulation_title,
            section_3p_high_risk=section_3p_high_risk,
            section_3e_high_risk=section_3e_high_risk,
            has_novel_extraction=has_novel_extraction,
        )
        return recommendations
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating IP pivots: {str(e)}",
        )
