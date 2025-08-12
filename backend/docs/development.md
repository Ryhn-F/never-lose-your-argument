# Development Guide

## Setup Development Environment

### Prerequisites

- Python 3.11+
- Google AI Studio API Key
- Git

### Local Development Setup

1. **Clone repository**

```bash
git clone <repository-url>
cd never-lose-argument-backend
```

2. **Create virtual environment**

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# atau
venv\Scripts\activate     # Windows
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Setup environment variables**

```bash
cp .env.example .env
```

Edit `.env` file dengan konfigurasi yang sesuai:

- `GOOGLE_API_KEY`: API key dari Google AI Studio (wajib)
- `CORS_ORIGINS`: Domain frontend yang diizinkan (optional)

5. **Run application**

```bash
python run.py
```

Application akan berjalan di `http://localhost:5000`

6. **Test API**

```bash
# Test dengan script yang disediakan
python test_api.py

# Atau test manual dengan curl
curl -X POST http://localhost:5000/api/v1/analysis/ \
  -H "Content-Type: application/json" \
  -d '{"text": "Jangan percaya dia, dia kan mantan kriminal!"}'
```

## Development dengan Docker

1. **Build dan run dengan docker-compose**

```bash
docker-compose up --build
```

## Project Structure

```
app/
├── __init__.py              # Application factory
├── api/                     # API routes
│   └── v1/                  # API version 1
│       ├── routes/          # Route handlers
│       │   ├── analysis.py  # Text analysis endpoint
│       │   └── health.py    # Health check endpoint
│       └── schemas/         # Request/response schemas
│           └── analysis.py  # Analysis request schema
├── core/                    # Core application components
│   ├── config.py           # Configuration management
│   ├── exceptions.py       # Custom exceptions
│   └── middleware.py       # Middleware functions
├── services/                # Business logic services
│   └── llm_service.py      # LLM integration
└── utils/                   # Utility functions
    ├── validators.py       # Input validation
    └── helpers.py          # Helper functions
```

## API Endpoints

### Analysis

- `POST /api/v1/analysis/` - Analyze text for logical fallacies
- `GET /api/v1/health/` - Health check endpoint

### Manual testing

```bash
python test_api.py
```

## Code Quality

### Format code

```bash
black app/ tests/
```

### Lint code

```bash
flake8 app/ tests/
```

## Environment Variables

| Variable         | Description                    | Required | Default                |
| ---------------- | ------------------------------ | -------- | ---------------------- |
| `SECRET_KEY`     | Flask secret key               | No       | dev-secret-key         |
| `GOOGLE_API_KEY` | Google AI API key              | Yes      | -                      |
| `LLM_MODEL`      | LLM model to use               | No       | gemini-2.0-flash       |
| `LLM_PROVIDER`   | LLM provider                   | No       | google_genai           |
| `CORS_ORIGINS`   | Allowed CORS origins           | No       | http://localhost:3000  |
| `API_RATE_LIMIT` | Rate limit for API requests    | No       | 100 per minute         |

## Common Development Tasks

### Add new API endpoint

1. Create route handler in `app/api/v1/routes/`
2. Add request/response schemas in `app/api/v1/schemas/` (if needed)
3. Register blueprint in `app/api/v1/__init__.py`

### Modify analysis logic

1. Update `app/services/llm_service.py`
2. Modify prompt template or response processing
3. Test with `python test_api.py`

### Add input validation

1. Update schemas in `app/api/v1/schemas/`
2. Add validators in `app/utils/validators.py`

## Troubleshooting

### Common Issues

1. **Google API error**

   - Verify `GOOGLE_API_KEY` is correct

2. **CORS error**

   - Check `CORS_ORIGINS` in `.env`
   - Ensure frontend domain is included

3. **Import errors**

   - Check virtual environment is activated
   - Verify all dependencies are installed

4. **Rate limiting**
   - Check API usage limits
   - Implement proper error handling in frontend

## API Usage Examples

### Successful Analysis

```bash
curl -X POST http://localhost:5000/api/v1/analysis/ \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Jangan percaya dia, dia kan mantan kriminal! Semua yang dia katakan pasti bohong."
  }'
```

Response:

```json
{
  "sentiment": "negative",
  "strong": 8,
  "contains_fallacies": true,
  "aggressiveness": 7,
  "language": "id",
  "fallacies": [
    {
      "text": "Jangan percaya dia, dia kan mantan kriminal!",
      "type": "Ad Hominem",
      "explanation": "Menyerang karakter seseorang daripada argumennya"
    }
  ],
  "processing_time": 2.34,
  "model_used": "gemini-2.0-flash"
}
```

### Health Check

```bash
curl http://localhost:5000/api/v1/health/
```

Response:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "services": {
    "llm": "healthy"
  },
  "version": "1.0.0"
}
```