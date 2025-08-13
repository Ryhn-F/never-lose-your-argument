# Never Lose Argument - Backend API

Backend API untuk aplikasi "Never Lose Argument" yang menganalisis teks untuk mendeteksi logical fallacies menggunakan AI.

## 🎯 Overview

Backend ini adalah **stateless microservice** yang fokus pada satu tugas: menganalisis teks untuk mendeteksi logical fallacies menggunakan Google Gemini AI. Dirancang untuk bekerja dengan frontend NextJS yang menggunakan Clerk untuk autentikasi.

## 🚀 Tech Stack

- **Framework**: Flask (Python)
- **AI/ML**: LangChain + Google Gemini
- **Validation**: Pydantic + Marshmallow
- **Deployment**: Docker
- **Testing**: Pytest

## 🏗️ Architecture

```
Frontend (NextJS + Clerk)  ←→  Backend API (Flask)  ←→  Google Gemini AI
     │                              │
     ├─ Authentication              ├─ Text Analysis
     ├─ User Management             ├─ Fallacy Detection
     ├─ Data Storage                └─ Response Formatting
     └─ UI/UX
```

**Key Principles:**

- ✅ **Stateless**: No database, no sessions
- ✅ **Single Responsibility**: Only text analysis
- ✅ **Scalable**: Easy horizontal scaling
- ✅ **Simple**: Minimal dependencies

## Struktur Project

```
## 📁 Project Structure

```

never-lose-argument-backend/
├── app/
│ ├── api/v1/routes/
│ │ ├── analysis.py # 🎯 Main analysis endpoint
│ │ └── health.py # 💚 Health check endpoint
│ ├── core/
│ │ ├── config.py # ⚙️ Configuration management
│ │ ├── exceptions.py # 🚨 Error handling
│ │ └── middleware.py # 🔄 Request/response middleware
│ ├── services/
│ │ └── llm_service.py # 🤖 AI/LLM integration
│ └── utils/ # 🛠️ Helper functions
├── tests/ # 🧪 Unit tests
├── docs/ # 📚 Documentation
│ ├── api.md # API documentation
│ ├── development.md # Development guide
│ ├── deployment.md # Deployment guide
│ └── integration.md # Frontend integration
├── .env.example # Environment template
├── Dockerfile # Container configuration
├── docker-compose.yml # Local development
├── requirements.txt # Python dependencies
├── run.py # Application entry point
├── test_api.py # Manual API testing
├── ARCHITECTURE.md # Architecture documentation
└── README.md # This file

```

```

## Quick Start

### Prerequisites

- Python 3.11+
- Google AI Studio API Key
- Docker (optional)

### Installation

1. Clone repository

```bash
git clone <repository-url>
cd never-lose-argument-backend
```

2. Setup virtual environment

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# atau
venv\Scripts\activate     # Windows
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Setup environment variables

```bash
cp .env.example .env
# Edit .env dengan GOOGLE_API_KEY yang sesuai
```

5. Run application

```bash
python run.py
```

## 🔌 API Endpoints

### Authentication

get JWT Template 
```javascript
await window.Clerk.session.getToken({ template: 'Fardhan' })
```

All API endpoints (except health checks) require authentication using Clerk JWT tokens. This backend now uses the **official Clerk Python SDK** for simplified and more reliable authentication.

Include the token in the Authorization header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

**Key improvements in the new implementation:**
- ✅ Uses official Clerk Python SDK
- ✅ Simplified configuration (only requires `CLERK_SECRET_KEY`)
- ✅ Better error handling and debugging
- ✅ Automatic JWKS management

### `POST /api/v1/analysis/` 🔒

Menganalisis teks untuk mendeteksi logical fallacies. **Requires authentication.**

**Request:**

```json
{
  "text": "Jangan percaya dia, dia kan mantan kriminal!"
}
```

**Response:**

```json
{
  "sentiment": "negative",
  "strong": 7,
  "contains_fallacies": true,
  "aggressiveness": 6,
  "language": "id",
  "fallacies": [
    {
      "text": "Jangan percaya dia, dia kan mantan kriminal!",
      "type": "Ad Hominem",
      "explanation": "Menyerang karakter seseorang daripada argumennya"
    }
  ],
  "processing_time": 2.34,
  "model_used": "gemini-2.0-flash",
  "user_id": "user_2abc123def"
}
```

### Authentication Endpoints

- `GET /api/v1/auth/me` 🔒 - Get current user information
- `GET /api/v1/auth/verify` 🔒 - Verify token validity
- `GET /api/v1/auth/health` - Authentication service health check
- `POST /api/v1/auth/debug-clerk` - Debug Clerk token verification (detailed error info)

### `GET /api/v1/health/`

Health check endpoint untuk monitoring.

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00Z",
  "services": { "llm": "healthy" },
  "version": "1.0.0"
}
```

## 🧪 Testing

```bash
# Run unit tests
pytest

# Manual API testing
python test_api.py

# Test authentication (new Clerk SDK)
python scripts/test_clerk_auth.py

# Migration checker
python scripts/migrate_to_clerk_sdk.py

# Test specific endpoint (requires valid JWT token)
curl -X POST http://localhost:5000/api/v1/analysis/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"text": "Test text here"}'
```

## 📚 Documentation

- **[API Documentation](docs/api.md)** - Complete API reference
- **[Authentication Guide](docs/authentication.md)** - Clerk authentication setup
- **[CORS Troubleshooting](docs/troubleshooting-cors.md)** - Fix CORS and connection issues
- **[Development Guide](docs/development.md)** - Setup and development
- **[Deployment Guide](docs/deployment.md)** - Production deployment
- **[Integration Guide](docs/integration.md)** - Frontend integration
- **[Architecture](ARCHITECTURE.md)** - System architecture

## 🤝 Integration dengan Frontend

Backend ini dirancang untuk bekerja dengan frontend NextJS + Clerk:

```typescript
// Frontend example with Clerk authentication
import { useAuth } from '@clerk/nextjs';

const analyzeText = async (text: string) => {
  const { getToken } = useAuth();
  const token = await getToken();
  
  const response = await fetch("http://localhost:5000/api/v1/analysis/", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ text }),
  });
  return response.json();
};
```

Lihat [docs/integration.md](docs/integration.md) untuk panduan lengkap.

## 🚀 Deployment Options

- **Docker**: `docker-compose up`
- **Heroku**: One-click deploy
- **AWS ECS**: Container deployment
- **Google Cloud Run**: Serverless containers
- **DigitalOcean**: App Platform

Lihat [docs/deployment.md](docs/deployment.md) untuk panduan detail.

## 🔧 Configuration

| Variable                | Description              | Required | Default                 |
| ----------------------- | ------------------------ | -------- | ----------------------- |
| `GOOGLE_API_KEY`        | Google AI API key        | ✅ Yes   | -                       |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key    | ❌ No    | -                       |
| `CLERK_SECRET_KEY`      | Clerk secret key         | ✅ Yes   | -                       |
| `CORS_ORIGINS`          | Allowed origins          | ❌ No    | `http://localhost:3000` |
| `API_RATE_LIMIT`        | Rate limit               | ❌ No    | `100 per minute`        |

## 🤖 AI Model

- **Provider**: Google Gemini AI
- **Model**: `gemini-2.0-flash` (configurable)
- **Features**:
  - Logical fallacy detection
  - Sentiment analysis
  - Aggressiveness scoring
  - Multi-language support

## 🔒 Security

- ✅ Input validation dan sanitization
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Error handling
- ✅ No sensitive data storage

## 📈 Performance

- **Response Time**: 1-5 seconds (depending on text length)
- **Throughput**: 100+ requests/minute
- **Scalability**: Horizontal scaling ready
- **Memory**: ~50MB per instance

## 🐛 Troubleshooting

**Common Issues:**

1. **Google API Error**: Check `GOOGLE_API_KEY` in `.env`
2. **CORS Error**: Verify `CORS_ORIGINS` configuration
3. **Rate Limit**: Implement proper retry logic in frontend

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language model
- **LangChain** for AI integration framework
- **Flask** for lightweight web framework
- **Clerk** for authentication (frontend integration)
