from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "AI Skin Detection API"
    database_url: str = "sqlite:///./test.db"
    mongodb_uri: str = "mongodb://localhost:27017/ai_skin"
    secret_key: str = "dev-secret-key"
    access_token_expire_minutes: int = 20
    refresh_token_expire_days: int = 7

    class Config:
        env_file = ".env"

settings = Settings()
