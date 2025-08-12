from marshmallow import Schema, fields, validate


class AnalysisRequestSchema(Schema):
    """Schema for analysis request"""

    text = fields.Str(
        required=True,
        validate=validate.Length(min=1, max=10000),
        error_messages={"required": "Text field is required"},
    )