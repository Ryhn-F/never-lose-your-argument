#!/usr/bin/env python3
"""
Application entry point
"""
import os
from app import create_app
from app.core.config import Config, DevelopmentConfig, ProductionConfig

# Determine configuration based on environment
config_class = DevelopmentConfig
if os.environ.get("FLASK_ENV") == "production":
    config_class = ProductionConfig

# Validate configuration
try:
    config_class.validate_config()
except EnvironmentError as e:
    print(f"Configuration error: {e}")
    print("Please check your .env file and ensure GOOGLE_API_KEY is set.")
    exit(1)

# Create Flask app
app = create_app(config_class)

if __name__ == "__main__":
    # Development server
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=app.config["DEBUG"],
    )
