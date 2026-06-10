from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "AI Skin Detection API"
    database_url: str
    mongodb_uri: str
    secret_key: str
    access_token_expire_minutes: int = 60

    class Config:
        env_file = ".env"

settings = Settings()
