from flask import Flask
from flask_cors import CORS
from app.core.config import Config
from app.core.middleware import setup_middleware
from app.api.v1 import api_v1


def create_app(config_class=Config):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Disable strict slashes to avoid redirects that break CORS preflight
    app.url_map.strict_slashes = False

    # Initialize CORS with proper preflight handling
    cors_origins = app.config.get('CORS_ORIGINS', 'http://localhost:3000').split(',')
    CORS(app, 
         origins=cors_origins,
         methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
         allow_headers=['Content-Type', 'Authorization', 'X-Requested-With'],
         supports_credentials=True)

    # Setup middleware
    setup_middleware(app)

    # Register blueprints
    app.register_blueprint(api_v1, url_prefix="/api/v1")

    return app
