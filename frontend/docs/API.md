# API Documentation

## Overview

Dokumentasi ini menjelaskan integrasi antara frontend Fallacy Checker dengan backend API untuk analisis teks dan deteksi logical fallacies.

## Base URL

```
Production: https://api.fallacychecker.com
Development: http://localhost:8000
```

Environment variable: `NEXT_PUBLIC_BACKEND_URL`

## Authentication

Saat ini API tidak memerlukan authentication. Untuk implementasi future:
- API Key authentication
- JWT token authentication
- Rate limiting per IP/user

## Endpoints

### POST /analysis

Menganalisis teks untuk mengidentifikasi logical fallacies, sentimen, dan metrics lainnya.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "text": "string (required, max 5000 characters)"
}
```

**Example:**
```json
{
  "text": "Jangan percaya pada apa yang dia katakan, dia kan mantan kriminal! Semua yang dia ucapkan pasti bohong."
}
```

#### Response

**Success Response (200 OK):**
```json
{
  "sentiment": "negative",
  "language": "id",
  "strong": 6,
  "aggressiveness": 8,
  "contains_fallacies": true,
  "fallacies": [
    {
      "text": "Jangan percaya pada apa yang dia katakan, dia kan mantan kriminal!",
      "type": "Ad Hominem",
      "explanation": "Menyerang karakter atau latar belakang seseorang daripada argumennya."
    }
  ]
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "error": "Teks tidak boleh kosong",
  "code": "VALIDATION_ERROR"
}
```

**422 Unprocessable Entity:**
```json
{
  "error": "Teks terlalu panjang (maksimal 5000 karakter)",
  "code": "TEXT_TOO_LONG"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Terjadi kesalahan server internal",
  "code": "INTERNAL_ERROR"
}
```

## Data Types

### AnalysisResult

| Field | Type | Description |
|-------|------|-------------|
| `sentiment` | `string` | Sentimen teks: "positive", "negative", "neutral" |
| `language` | `string` | Bahasa yang terdeteksi: "id", "en" |
| `strong` | `number` | Tingkat kekuatan argumen (0-10) |
| `aggressiveness` | `number` | Tingkat agresivitas (0-10) |
| `contains_fallacies` | `boolean` | Apakah teks mengandung logical fallacies |
| `fallacies` | `Fallacy[]` | Array dari fallacies yang ditemukan |

### Fallacy

| Field | Type | Description |
|-------|------|-------------|
| `text` | `string` | Bagian teks yang mengandung fallacy |
| `type` | `string` | Jenis fallacy (lihat Fallacy Types) |
| `explanation` | `string` | Penjelasan mengapa ini adalah fallacy |

### Fallacy Types

Jenis-jenis logical fallacy yang dapat dideteksi:

| Type | Description |
|------|-------------|
| `Ad Hominem` | Menyerang karakter atau sifat pribadi lawan bicara |
| `Appeal to Authority` | Menyatakan sesuatu benar karena otoritas mengatakan demikian |
| `Bandwagon Fallacy` | Berasumsi sesuatu benar karena banyak orang percaya |
| `False Dichotomy` | Menyajikan hanya dua opsi ketika ada lebih banyak alternatif |
| `Slippery Slope` | Berasumsi satu peristiwa akan memicu rangkaian peristiwa buruk |
| `Strawman Argument` | Mengubah argumen lawan untuk membuatnya mudah diserang |

## Client Implementation

### Service Class

```typescript
export class AnalysisService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  }

  async analyzeText(text: string): Promise<ApiResponse<AnalysisResult>> {
    try {
      validateAnalysisText(text);
      const sanitizedText = sanitizeText(text);

      const response = await fetch(`${this.baseUrl}/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: sanitizedText }),
      });

      if (!response.ok) {
        return {
          error: `Server error: ${response.status}`,
          status: response.status
        };
      }

      const data: AnalysisResult = await response.json();
      return { data, status: response.status };

    } catch (error) {
      return {
        error: error.message,
        status: 400
      };
    }
  }
}
```

### Custom Hook Usage

```typescript
export const useAnalysis = () => {
  const [state, setState] = useState({
    result: null,
    isLoading: false,
    error: '',
  });

  const analyzeText = useCallback(async (text: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: '' }));

    const response = await analysisService.analyzeText(text);
    
    if (response.error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error!,
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      isLoading: false,
      result: response.data!,
    }));
  }, []);

  return { ...state, analyzeText };
};
```

## Error Handling

### Client-Side Validation

```typescript
export const validateAnalysisText = (text: string): void => {
  if (!text || typeof text !== 'string') {
    throw new ValidationError('Teks tidak boleh kosong');
  }

  if (text.trim().length === 0) {
    throw new ValidationError('Silakan masukkan teks untuk dianalisis');
  }

  if (text.length > 5000) {
    throw new ValidationError('Teks terlalu panjang (maksimal 5000 karakter)');
  }
};
```

### Error Response Handling

```typescript
if (!response.ok) {
  const errorData = await response.json();
  return {
    error: errorData.error || `Server error: ${response.status}`,
    status: response.status
  };
}
```

## Rate Limiting

**Current**: No rate limiting implemented

**Future Implementation**:
- 100 requests per minute per IP
- 1000 requests per hour per IP
- Exponential backoff for retry logic

## Caching Strategy

**Current**: No caching implemented

**Future Implementation**:
- Client-side caching untuk identical requests
- Server-side caching untuk common text patterns
- Cache invalidation strategy

## Monitoring & Analytics

**Metrics to Track**:
- Request volume dan response times
- Error rates by type
- Most common fallacy types detected
- User engagement patterns

**Tools**:
- Application Performance Monitoring (APM)
- Error tracking (Sentry)
- Analytics dashboard

## Security Considerations

### Input Sanitization
```typescript
export const sanitizeText = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};
```

### CORS Configuration
```javascript
// Backend CORS settings
{
  origin: ['https://fallacychecker.com', 'http://localhost:3000'],
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}
```

### Content Security Policy
```
Content-Security-Policy: default-src 'self'; connect-src 'self' https://api.fallacychecker.com
```

## Testing

### API Testing Examples

```typescript
// Unit test for service
describe('AnalysisService', () => {
  it('should analyze text successfully', async () => {
    const mockResponse = {
      sentiment: 'negative',
      contains_fallacies: true,
      fallacies: [...]
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analysisService.analyzeText('test text');
    expect(result.data).toEqual(mockResponse);
  });
});
```

### Integration Testing

```typescript
// Integration test
describe('Analysis Integration', () => {
  it('should handle complete analysis workflow', async () => {
    render(<AnalysisPage />);
    
    const textarea = screen.getByLabelText(/masukkan teks/i);
    const button = screen.getByRole('button', { name: /analisis/i });
    
    fireEvent.change(textarea, { target: { value: 'test text' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/hasil analisis/i)).toBeInTheDocument();
    });
  });
});
```

## Changelog

### v1.0.0
- Initial API implementation
- Basic analysis endpoint
- Fallacy detection support
- Indonesian language support

### Future Versions
- v1.1.0: Authentication support
- v1.2.0: Multiple language support
- v1.3.0: Batch analysis endpoint
- v2.0.0: Real-time analysis WebSocket