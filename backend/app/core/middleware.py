import time
from flask import request, g
from functools import wraps


def setup_middleware(app):
    """Setup middleware for the Flask app"""

    @app.before_request
    def before_request():
        """Execute before each request"""
        g.start_time = time.time()
        g.request_id = generate_request_id()

    @app.after_request
    def after_request(response):
        """Execute after each request"""
        # Add request ID to response headers
        response.headers["X-Request-ID"] = g.request_id

        # Add processing time
        if hasattr(g, "start_time"):
            processing_time = time.time() - g.start_time
            response.headers["X-Processing-Time"] = f"{processing_time:.3f}s"

        return response


def generate_request_id():
    """Generate unique request ID"""
    import uuid

    return str(uuid.uuid4())[:8]


def rate_limit(limit_string):
    """Decorator for rate limiting (placeholder)"""

    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Simple rate limiting can be implemented here if needed
            # For now, just pass through
            return f(*args, **kwargs)

        return decorated_function

    return decorator
