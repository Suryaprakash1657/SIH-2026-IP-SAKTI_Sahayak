"""Main API v1 Router Aggregator."""

from fastapi import APIRouter
from app.api.v1.endpoints import (
    diagnostic,
    synergism,
    bda,
    inspector,
    jurisdiction,
    pivot,
    dossier,
)

api_router = APIRouter()

api_router.include_router(diagnostic.router, prefix="/diagnostic", tags=["Formulation Diagnostic Wizard"])
api_router.include_router(synergism.router, prefix="/synergism", tags=["Section 3(e) Synergism Calculator"])
api_router.include_router(bda.router, prefix="/bda", tags=["BDA 2024 ABS Compliance"])
api_router.include_router(inspector.router, prefix="/inspector", tags=["Statute & Clause Inspector"])
api_router.include_router(jurisdiction.router, prefix="/jurisdiction", tags=["Dual-Jurisdiction Switch"])
api_router.include_router(pivot.router, prefix="/pivot", tags=["Alternative IP Pivot Engine"])
api_router.include_router(dossier.router, prefix="/dossier", tags=["Automated Dossier Generator"])
