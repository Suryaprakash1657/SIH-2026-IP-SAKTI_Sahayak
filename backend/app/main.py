"""IP-SAKTI Sahayak - FastAPI Application Entrypoint."""

from contextlib import asynccontextmanager
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.api.v1.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context for startup and shutdown hooks."""
    # Startup: e.g. verify DB connection or load caches
    print(f"Starting {settings.PROJECT_NAME} in {settings.APP_ENV} mode...")
    yield
    # Shutdown: clean up connections
    print(f"Shutting down {settings.PROJECT_NAME}...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-Powered Legal, Patent & Regulatory Compliance Portal for the Ayush Ecosystem (SIH26045)",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS if isinstance(settings.CORS_ORIGINS, list) else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API v1 Router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/health", tags=["Health Check"], status_code=status.HTTP_200_OK)
async def health_check():
    """System health and readiness probe."""
    return {
        "status": "healthy",
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.APP_ENV,
    }


@app.get("/", tags=["Root"])
async def root():
    """Root entrypoint redirecting to API documentation."""
    return {
        "message": "Welcome to IP-SAKTI Sahayak API Gateway",
        "docs_url": "/docs",
        "health_check": "/health",
        "version": settings.VERSION,
    }
