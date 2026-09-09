"""Application Settings and Environment Configuration."""

from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Global configuration settings for IP-SAKTI Sahayak backend."""

    # App Info
    PROJECT_NAME: str = "IP-SAKTI Sahayak API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    APP_ENV: str = "development"
    DEBUG: bool = True

    # Server Bindings
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # PostgreSQL & pgvector
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/ipsakti_db"
    DB_POOL_SIZE: int = 20
    DB_MAX_OVERFLOW: int = 10
    DB_ECHO: bool = False

    # AI & Google Gemini
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL_PRIMARY: str = "gemini-2.0-flash"
    GEMINI_MODEL_REASONING: str = "gemini-2.0-pro-exp-02-05"
    GEMINI_EMBEDDING_MODEL: str = "text-embedding-004"
    VECTOR_DIMENSION: int = 768

    # Security
    SECRET_KEY: str = "default_insecure_secret_key_please_change_in_production_32bytes"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    # CORS
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Directories
    STATUTES_DIR: str = "../data/statutes"
    PHARMACOPOEIA_DIR: str = "../data/pharmacopoeia"
    STORAGE_EXPORTS_DIR: str = "./storage/exports"
    STORAGE_DOSSIERS_DIR: str = "./storage/generated_dossiers"

    # Feature Flags
    ENABLE_TKDL_HEATMAP_SIMULATION: bool = True
    ENABLE_CHOU_TALALAY_SYNERGISM: bool = True
    ENABLE_BDA_2024_ABS_CALCULATOR: bool = True
    ENABLE_DUAL_JURISDICTION_ANALYSIS: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
