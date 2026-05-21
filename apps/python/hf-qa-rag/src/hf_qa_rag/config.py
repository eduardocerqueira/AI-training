from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# apps/python/hf-qa-rag/
APP_ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=APP_ROOT / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    hf_token: str = ""
    hf_model: str = "Qwen/Qwen2.5-1.5B-Instruct"
    knowledge_path: Path = APP_ROOT / "knowledge" / "qa.txt"
    api_url: str = "http://127.0.0.1:8000"


settings = Settings()
