"""Interactive Statute & Clause Inspector Search Endpoints."""

from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Query, HTTPException, status
from app.services.rag_engine import RAGEngine

router = APIRouter()


@router.get("/clauses", response_model=List[Dict[str, Any]], status_code=status.HTTP_200_OK)
async def get_statute_clauses(
    query: str = Query("Section 3", description="Keyword or section number to search"),
    document_filter: Optional[str] = Query(None, description="Filter by doc code (e.g. IPA_1970, BDA_2024, DCA_1940)"),
    limit: int = Query(5, ge=1, le=20),
):
    """
    Search statute clauses with exact page numbers and bounding-box coordinates for the split-screen PDF viewer.
    """
    try:
        results = await RAGEngine.search_clauses(
            query=query,
            document_filter=document_filter,
            limit=limit,
        )
        return results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error searching statute clauses: {str(e)}",
        )
