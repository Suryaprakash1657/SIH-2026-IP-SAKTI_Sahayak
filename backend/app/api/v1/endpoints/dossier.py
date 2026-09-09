"""Automated Regulatory Dossier & Form Generator Endpoints."""

import os
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse
from app.schemas.dossier import (
    DossierGenerationRequest,
    DossierGenerationResponse,
)
from app.services.pdf_dossier import PDFDossierService
from app.core.config import settings

router = APIRouter()


@router.post("/generate", response_model=DossierGenerationResponse, status_code=status.HTTP_201_CREATED)
async def generate_dossier(request: DossierGenerationRequest):
    """
    Generate pre-filled IPO Form 1, Form 2 Specification Draft, Section 10(4)(d)(ii) declaration, and NBA Form III.
    """
    try:
        response = PDFDossierService.generate_dossier_pdf(request)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating patent dossier: {str(e)}",
        )


@router.get("/download/{dossier_id}", status_code=status.HTTP_200_OK)
async def download_dossier(dossier_id: str):
    """
    Download the generated PDF dossier file.
    """
    filename = f"IP_SAKTI_Dossier_{dossier_id}.pdf"
    file_path = os.path.join(settings.STORAGE_DOSSIERS_DIR, filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Dossier file with ID '{dossier_id}' not found.",
        )

    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="application/pdf",
    )
