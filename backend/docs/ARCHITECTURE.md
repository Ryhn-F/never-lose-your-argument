# Architecture Documentation

## Simplified Architecture Overview

Aplikasi "Never Lose Argument" backend menggunakan **simplified microservice architecture** yang fokus pada satu responsibility: text analysis untuk logical fallacy detection.

## Architecture Principles

### 1. Single Responsibility
Backend hanya bertanggung jawab untuk:
- Text analysis menggunakan AI/LLM
- Logical fallacy detection
- Response formatting

### 2. Stateless Design
- Tidak ada database atau session storage
- Setiap request independent
- Perfect untuk horizontal scaling

### 3. Separation of Concerns
- **Frontend (NextJS + Clerk)**: Authentication, user management, UI, data persistence
- **Backend (Flask + LangChain)**: Text analysis, AI processing

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (NextJS)                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Clerk Auth    │  │   User Data     │  │   History   │ │
│  │   Management    │  │   Management    │  │   Storage   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────┬───────────────────────────────┘
                              │ HTTP API Calls
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                Backend API (Flask)                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   API Routes    │  │   LLM Service   │  │   Utils &   │ │
│  │   (Analysis,    │  │   (LangChain +  │  │   Helpers   │ │
│  │    Health)      │  │    Gemini)      │  │             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────┬───────────────────────────────┘
                              │ API Calls
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                Google Gemini AI API                        │
└─────────────────────────────────────────────────────────────┘
```

## Layer Architecture

```
┌─────────────────────────────────────────┐
│              API Layer                  │
│         (Routes & Schemas)              │
├─────────────────────────────────────────┤
│            Service Layer                │
│         (LLM Integration)               │
├─────────────────────────────────────────┤
│             Core Layer                  │
│    (Config, Middleware, Exceptions)     │
└─────────────────────────────────────────┘
```

### 1. API Layer (`app/api/`)
- **Responsibility**: HTTP request/response handling
- **Components**:
  - Route handlers (`analysis.py`, `health.py`)
  - Request validation schemas
  - Error handling dan response formatting

### 2. Service Layer (`app/services/`)
- **Responsibility**: Business logic implementation
- **Components**:
  - `LLMService`: AI/ML model integration dengan LangChain
  - Text processing dan analysis logic
  - Response formatting

### 3. Core Layer (`app/core/`)
- **Responsibility**: Infrastructure dan cross-cutting concerns
- **Components**:
  - Configuration management
  - Middleware (request tracking, CORS)
  - Exception handling
  - Utility functions

## Design Patterns

### 1. Service Pattern
Business logic dienkapsulasi dalam service classes:
```python
class LLMService:
    def analyze_text(self, input_text: str) -> Classification:
        # AI processing logic here
```

### 2. Factory Pattern
Application menggunakan factory pattern:
```python
def create_app(config_class=Config):
    app = Flask(__name__)
    # Configuration and setup
    return app
```

### 3. Template Method Pattern
LLM service menggunakan template method untuk consistent processing:
```python
def analyze_text(self, input_text: str):
    # 1. Validate input
    # 2. Create prompt
    # 3. Call LLM
    # 4. Process response
    # 5. Format output
```

## Data Flow

```
HTTP Request → Route Handler → Input Validation → LLM Service → Google AI API
                                                      ↓
HTTP Response ← Response Formatting ← Result Processing ← AI Response
```

1. **Request**: HTTP POST dengan text input
2. **Validation**: Input divalidasi (length, format, etc.)
3. **Processing**: Text diproses oleh LLM service
4. **AI Call**: Request ke Google Gemini API
5. **Response**: AI response diformat dan dikembalikan

## Security Architecture

### Input Validation
```python
# Request validation
class AnalysisRequestSchema(Schema):
    text = fields.Str(
        required=True,
        validate=validate.Length(min=1, max=10000)
    )
```

### CORS Configuration
```python
# Specific origins allowed
CORS(app, origins=['http://localhost:3000', 'https://your-domain.com'])
```

### Rate Limiting
```python
@rate_limit('100 per minute')
def analyze_text():
    # Endpoint implementation
```

## External Dependencies

### AI/ML Integration
```
LLMService → LangChain → Google Gemini API
```

**Benefits:**
- LangChain provides abstraction layer
- Easy to switch AI providers
- Structured output dengan Pydantic

### No Database Dependency
- **Stateless**: Setiap request independent
- **Scalable**: Easy horizontal scaling
- **Simple**: No database maintenance
- **Fast**: No database queries

## Scalability Architecture

### Horizontal Scaling
```
Load Balancer
    ├── Backend Instance 1
    ├── Backend Instance 2
    ├── Backend Instance 3
    └── Backend Instance N
```

**Characteristics:**
- Stateless design memungkinkan unlimited scaling
- No shared state between instances
- Load balancer distributes requests

### Vertical Scaling
- Increase CPU/memory per instance
- Optimize worker processes
- Better for handling complex analysis

### Caching Strategy (Optional)
```python
# Response caching untuk identical requests
@cache.memoize(timeout=300)
def analyze_text_cached(text_hash):
    return llm_service.analyze_text(text)
```

## Error Handling Architecture

### Exception Hierarchy
```
Exception (Base)
└── APIException
    ├── ValidationError (400)
    ├── RateLimitError (429)
    └── InternalError (500)
```

### Error Response Format
```json
{
  "error": "Error description",
  "request_id": "abc123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Monitoring Architecture

### Health Checks
```python
def health_check():
    # Check LLM service availability
    # Return status dan service health
```

### Request Tracking
```python
# Every request gets unique ID
g.request_id = generate_request_id()
response.headers['X-Request-ID'] = g.request_id
```

### Performance Metrics
- Response time tracking
- Error rate monitoring
- AI API usage tracking

## Configuration Architecture

### Environment-based Configuration
```python
class Config:           # Base configuration
class DevelopmentConfig(Config):  # Development
class ProductionConfig(Config):   # Production
class TestingConfig(Config):      # Testing
```

### Secret Management
- Environment variables untuk development
- External secret management untuk production
- Configuration validation

## Integration Architecture

### Frontend Integration
```typescript
// NextJS frontend calls backend API
const analyzeText = async (text: string) => {
  const response = await fetch('/api/analysis', {
    method: 'POST',
    body: JSON.stringify({ text })
  });
  return response.json();
};
```

### Authentication Flow
```
User → NextJS → Clerk Auth → Protected Pages → API Calls → Backend
```

**Benefits:**
- Frontend handles all authentication
- Backend remains stateless
- Better user experience
- Easier to maintain

## Deployment Architecture

### Container Architecture
```dockerfile
FROM python:3.11-slim
# Minimal dependencies
# Single responsibility
# Health checks included
```

### Cloud Deployment Options
1. **AWS ECS/Fargate**: Serverless containers
2. **Google Cloud Run**: Fully managed containers
3. **Heroku**: Simple PaaS deployment
4. **DigitalOcean App Platform**: Managed deployment

## Performance Considerations

### Response Time Optimization
- Efficient prompt engineering
- Minimal text preprocessing
- Optimized AI API calls

### Memory Management
- No persistent data storage
- Efficient request processing
- Garbage collection optimization

### Network Optimization
- Connection pooling untuk AI API
- Proper timeout handling
- Retry logic implementation

## Future Architecture Considerations

### Potential Enhancements
1. **Caching Layer**: Redis untuk frequent requests
2. **Queue System**: Celery untuk async processing
3. **Multiple AI Providers**: Fallback mechanisms
4. **Analytics**: Request/usage tracking
5. **A/B Testing**: Different analysis models

### Microservice Evolution
```
Current: Frontend ←→ Analysis API ←→ AI Service

Future: Frontend ←→ API Gateway ←→ Analysis Service
                                ├→ Caching Service
                                ├→ Analytics Service
                                └→ Multiple AI Services
```

## Architecture Benefits

### Current Architecture Benefits
✅ **Simple**: Easy to understand dan maintain  
✅ **Fast**: Minimal overhead, direct AI integration  
✅ **Scalable**: Stateless design, horizontal scaling  
✅ **Reliable**: Single responsibility, fewer failure points  
✅ **Cost-effective**: No database costs, efficient resource usage  
✅ **Developer-friendly**: Easy setup, clear separation of concerns  

### Trade-offs
❌ **No persistence**: Analysis history handled by frontend  
❌ **No user management**: Delegated to frontend  
❌ **Limited analytics**: No built-in usage tracking  

**Conclusion**: Architecture ini optimal untuk use case current dengan fokus pada simplicity, performance, dan maintainability.