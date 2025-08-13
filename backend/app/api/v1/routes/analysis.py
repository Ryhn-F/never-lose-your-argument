from flask import Blueprint, request, jsonify, g
from app.core.middleware import rate_limit
from app.core.exceptions import ValidationError
from app.services.llm_service import LLMService
from app.api.v1.schemas.analysis import AnalysisRequestSchema
from app.utils.auth import require_auth

analysis_bp = Blueprint("analysis", __name__)
llm_service = LLMService()


@analysis_bp.route("/", methods=["POST", "OPTIONS"])
@rate_limit("10 per minute")
@require_auth
def analyze_text():
    """
    Analyze text for logical fallacies

    Request body:
    {
        "text": "Text to analyze"
    }

    Response:
    {
        "sentiment": "negative",
        "strong": 7,
        "contains_fallacies": true,
        "aggressiveness": 6,
        "language": "id",
        "fallacies": [
            {
                "text": "Bagian teks yang mengandung fallacy",
                "type": "Ad Hominem",
                "explanation": "Penjelasan mengapa ini adalah logical fallacy"
            }
        ],
        "processing_time": 2.34,
        "model_used": "gemini-2.0-flash"
    }
    """
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        # Validate request data
        data = request.get_json()
        if not data:
            raise ValidationError("Request body is required")

        schema = AnalysisRequestSchema()
        validated_data = schema.load(data)

        # Perform analysis
        result = llm_service.analyze_text(validated_data["text"])

        # Convert Pydantic model to dictionary
        result_dict = result.model_dump()
        
        # Add user context to response (optional)
        result_dict["user_id"] = g.user_id

        return jsonify(result_dict), 200

    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print(f"Analysis error: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500