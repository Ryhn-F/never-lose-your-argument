from flask import jsonify


class APIException(Exception):
    """Base API exception class"""

    status_code = 500
    message = "Internal server error"

    def __init__(self, message=None, status_code=None):
        if message:
            self.message = message
        if status_code:
            self.status_code = status_code
        super().__init__(self.message)


class ValidationError(APIException):
    """Validation error exception"""

    status_code = 400
    message = "Validation error"


class AuthenticationError(APIException):
    """Authentication error exception"""

    status_code = 401
    message = "Authentication required"


class AuthorizationError(APIException):
    """Authorization error exception"""

    status_code = 403
    message = "Access forbidden"


class NotFoundError(APIException):
    """Resource not found exception"""

    status_code = 404
    message = "Resource not found"


class RateLimitError(APIException):
    """Rate limit exceeded exception"""

    status_code = 429
    message = "Rate limit exceeded"


def handle_api_exception(error):
    """Global exception handler for API exceptions"""
    response = jsonify(
        {"error": {"message": error.message, "status_code": error.status_code}}
    )
    response.status_code = error.status_code
    return response


def register_error_handlers(app):
    """Register error handlers with Flask app"""
    app.register_error_handler(APIException, handle_api_exception)
