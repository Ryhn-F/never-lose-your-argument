from flask import Blueprint
from app.api.v1.routes.analysis import analysis_bp
from app.api.v1.routes.health import health_bp

# Create main v1 blueprint
api_v1 = Blueprint("api_v1", __name__)

# Register route blueprints
api_v1.register_blueprint(analysis_bp, url_prefix="/analysis")
api_v1.register_blueprint(health_bp, url_prefix="/health")
