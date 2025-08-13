import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Base configuration class"""

    # Flask
    SECRET_KEY = os.environ.get("SECRET_KEY") or "dev-secret-key-change-in-production"
    DEBUG = os.environ.get("FLASK_DEBUG", "False").lower() == "true"

    # AI/LLM
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
    LLM_MODEL = os.environ.get("LLM_MODEL", "gemini-2.0-flash")
    LLM_PROVIDER = os.environ.get("LLM_PROVIDER", "google_genai")

    # API
    API_RATE_LIMIT = os.environ.get("API_RATE_LIMIT", "100 per minute")
    CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "http://localhost:3000")

    # Clerk Authentication
    CLERK_PUBLISHABLE_KEY = os.environ.get("CLERK_PUBLISHABLE_KEY")
    CLERK_SECRET_KEY = os.environ.get("CLERK_SECRET_KEY")

    @classmethod
    def validate_config(cls):
        """Validate required configuration"""
        required_vars = ["GOOGLE_API_KEY", "CLERK_SECRET_KEY"]

        missing_vars = []
        for var in required_vars:
            if not os.environ.get(var):
                missing_vars.append(var)

        if missing_vars:
            raise EnvironmentError(
                f"Missing required environment variables: {', '.join(missing_vars)}"
            )


class DevelopmentConfig(Config):
    """Development configuration"""

    DEBUG = True


class ProductionConfig(Config):
    """Production configuration"""

    DEBUG = False


class TestingConfig(Config):
    """Testing configuration"""

    TESTING = True
