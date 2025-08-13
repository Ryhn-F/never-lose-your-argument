import os
from functools import wraps
from flask import request, jsonify, g, current_app
from clerk_backend_api import Clerk
from clerk_backend_api.security import authenticate_request
from clerk_backend_api.security.types import AuthenticateRequestOptions
import httpx
import logging

logger = logging.getLogger(__name__)


class AuthError(Exception):
    """Custom authentication error"""
    def __init__(self, message: str, status_code: int = 401):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


def get_clerk_client():
    """Get Clerk client instance"""
    return Clerk(bearer_auth=current_app.config['CLERK_SECRET_KEY'])


def create_httpx_request_from_flask():
    """Convert Flask request to httpx.Request for Clerk authentication"""
    # Get the authorization header
    headers = dict(request.headers)
    
    # Create httpx request object
    httpx_request = httpx.Request(
        method=request.method,
        url=str(request.url),
        headers=headers
    )
    
    return httpx_request


def verify_clerk_token() -> dict:
    """
    Verify Clerk token using the official SDK
    
    Returns:
        dict: Token payload if valid
        
    Raises:
        AuthError: If token is invalid or verification fails
    """
    try:
        # Create httpx request from Flask request
        httpx_request = create_httpx_request_from_flask()
        
        # Get Clerk client
        clerk = get_clerk_client()
        
        # Authenticate the request
        request_state = clerk.authenticate_request(
            httpx_request,
            AuthenticateRequestOptions()
        )
        
        if not request_state.is_signed_in:
            raise AuthError(f"Authentication failed: {request_state.reason}")
        
        # Return the token payload
        return request_state.payload
        
    except Exception as e:
        logger.error(f"Token verification failed: {e}")
        if isinstance(e, AuthError):
            raise
        raise AuthError("Token verification failed")


def require_auth(f):
    """
    Decorator to require authentication for API endpoints
    
    Usage:
        @require_auth
        def protected_endpoint():
            # Access user info via g.current_user
            return jsonify({"user_id": g.current_user["sub"]})
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Skip authentication for OPTIONS requests (CORS preflight)
        if request.method == 'OPTIONS':
            return f(*args, **kwargs)
            
        try:
            # Verify token using Clerk SDK
            payload = verify_clerk_token()
            
            # Store user info in Flask's g object for use in the request
            g.current_user = payload
            g.user_id = payload.get('sub')  # Clerk uses 'sub' for user ID
            
            return f(*args, **kwargs)
            
        except AuthError as e:
            return jsonify({"error": e.message}), e.status_code
        except Exception as e:
            logger.error(f"Authentication error: {e}")
            # In development, provide more detailed error information
            if current_app.config.get('DEBUG'):
                return jsonify({"error": f"Authentication failed: {str(e)}"}), 500
            else:
                return jsonify({"error": "Authentication failed"}), 500
    
    return decorated_function


def optional_auth(f):
    """
    Decorator for optional authentication - doesn't fail if no token provided
    
    Usage:
        @optional_auth
        def endpoint_with_optional_auth():
            if g.current_user:
                # User is authenticated
                return jsonify({"message": f"Hello {g.current_user['sub']}"})
            else:
                # Anonymous user
                return jsonify({"message": "Hello anonymous user"})
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            # Try to verify token
            payload = verify_clerk_token()
            g.current_user = payload
            g.user_id = payload.get('sub')
        except Exception as e:
            logger.debug(f"Optional auth failed: {e}")
            g.current_user = None
            g.user_id = None
        
        return f(*args, **kwargs)
    
    return decorated_function


def get_current_user_id() -> str:
    """
    Get current authenticated user ID
    
    Returns:
        str: User ID if authenticated, None otherwise
    """
    return getattr(g, 'user_id', None)


def get_current_user() -> dict:
    """
    Get current authenticated user data
    
    Returns:
        dict: User data if authenticated, None otherwise
    """
    return getattr(g, 'current_user', None)