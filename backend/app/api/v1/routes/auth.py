from flask import Blueprint, jsonify, g
from app.utils.auth import require_auth, optional_auth

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/me", methods=["GET"])
@require_auth
def get_current_user():
    """
    Get current authenticated user information
    
    Response:
    {
        "user_id": "user_xxx",
        "email": "user@example.com",
        "full_name": "John Doe",
        "token_claims": {...}
    }
    """
    return jsonify({
        "user_id": g.user_id,
        "email": g.current_user.get("email"),
        "full_name": g.current_user.get("name"),
        "token_claims": g.current_user
    }), 200


@auth_bp.route("/verify", methods=["GET"])
@require_auth
def verify_token():
    """
    Verify if the provided token is valid
    
    Response:
    {
        "valid": true,
        "user_id": "user_xxx",
        "expires_at": 1234567890
    }
    """
    return jsonify({
        "valid": True,
        "user_id": g.user_id,
        "expires_at": g.current_user.get("exp")
    }), 200


@auth_bp.route("/health", methods=["GET"])
def health_check():
    """
    Public health check endpoint (no authentication required)
    
    Response:
    {
        "status": "healthy",
        "timestamp": 1234567890
    }
    """
    import time
    return jsonify({
        "status": "healthy",
        "timestamp": int(time.time())
    }), 200


@auth_bp.route("/debug", methods=["GET", "POST", "OPTIONS"])
def debug_endpoint():
    """
    Debug endpoint to help troubleshoot CORS and routing issues
    """
    from flask import request
    import time
    
    # Handle OPTIONS request
    if request.method == 'OPTIONS':
        return '', 200
    
    return jsonify({
        "method": request.method,
        "url": request.url,
        "path": request.path,
        "headers": dict(request.headers),
        "origin": request.headers.get('Origin'),
        "timestamp": int(time.time()),
        "message": "Debug endpoint working correctly"
    }), 200


@auth_bp.route("/debug-clerk", methods=["POST"])
def debug_clerk():
    """
    Debug Clerk token verification with detailed error information
    """
    from flask import request, current_app
    from app.utils.auth import verify_clerk_token, create_httpx_request_from_flask, get_clerk_client
    from clerk_backend_api.security import authenticate_request
    from clerk_backend_api.security.types import AuthenticateRequestOptions
    import traceback
    
    try:
        # Get authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({"error": "No Authorization header provided"}), 400
        
        debug_info = {
            "auth_header_received": True,
            "auth_header_preview": auth_header[:50] + "..." if len(auth_header) > 50 else auth_header,
            "config": {
                "clerk_secret_key_configured": bool(current_app.config.get('CLERK_SECRET_KEY'))
            }
        }
        
        try:
            # Create httpx request
            httpx_request = create_httpx_request_from_flask()
            debug_info["httpx_request_created"] = True
            debug_info["request_method"] = httpx_request.method
            debug_info["request_url"] = str(httpx_request.url)
            
            # Get Clerk client
            clerk = get_clerk_client()
            debug_info["clerk_client_created"] = True
            
            # Authenticate request
            request_state = clerk.authenticate_request(
                httpx_request,
                AuthenticateRequestOptions()
            )
            
            debug_info["authentication_attempted"] = True
            debug_info["is_signed_in"] = request_state.is_signed_in
            debug_info["reason"] = request_state.reason if not request_state.is_signed_in else None
            
            if request_state.is_signed_in:
                debug_info["payload"] = request_state.payload
                return jsonify({
                    "success": True,
                    "message": "Token verification successful",
                    "user_id": request_state.payload.get('sub'),
                    "debug": debug_info
                }), 200
            else:
                return jsonify({
                    "error": f"Authentication failed: {request_state.reason}",
                    "debug": debug_info
                }), 401
                
        except Exception as e:
            debug_info["verification_error"] = str(e)
            debug_info["traceback"] = traceback.format_exc()
            return jsonify({
                "error": "Token verification failed",
                "debug": debug_info
            }), 500
            
    except Exception as e:
        return jsonify({
            "error": "Debug endpoint failed",
            "exception": str(e),
            "traceback": traceback.format_exc()
        }), 500