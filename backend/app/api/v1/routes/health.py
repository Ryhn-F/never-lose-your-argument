from flask import Blueprint, jsonify, request
from datetime import datetime
from app.services.llm_service import LLMService

health_bp = Blueprint("health", __name__)


@health_bp.route("/", methods=["GET", "OPTIONS"])
def health_check():
    """Health check endpoint"""
    
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return '', 200

    # Check LLM service
    try:
        llm_service = LLMService()
        llm_status = "healthy" if llm_service.health_check() else "unhealthy"
    except Exception:
        llm_status = "unhealthy"

    overall_status = "healthy" if llm_status == "healthy" else "unhealthy"

    return jsonify(
        {
            "status": overall_status,
            "timestamp": datetime.utcnow().isoformat(),
            "services": {"llm": llm_status},
            "version": "1.0.0",
        }
    ), (200 if overall_status == "healthy" else 503)