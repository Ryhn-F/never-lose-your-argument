# API Documentation

## Base URL

```
http://localhost:5000/api/v1
```

## Authentication

**Tidak ada autentikasi yang diperlukan.** Backend ini adalah stateless API service yang fokus pada text analysis. Autentikasi dihandle oleh frontend NextJS dengan Clerk.

## Endpoints

### POST /analysis/

Menganalisis teks untuk mendeteksi logical fallacies dan karakteristik lainnya.

**Request Body:**

```json
{
  "text": "Teks yang akan dianalisis untuk logical fallacies"
}
```

**Validation:**

- `text`: Required, string, minimum 1 karakter, maksimum 10,000 karakter

**Response (200 OK):**

```json
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
```

**Response Fields:**

- `sentiment`: Sentimen teks (positive, negative, neutral)
- `strong`: Kekuatan pernyataan (1-10)
- `contains_fallacies`: Boolean, apakah teks mengandung logical fallacies
- `aggressiveness`: Tingkat agresivitas teks (1-10)
- `language`: Bahasa yang terdeteksi (id, en, dll)
- `fallacies`: Array objek fallacy yang ditemukan
  - `text`: Bagian teks yang mengandung fallacy
  - `type`: Jenis logical fallacy
  - `explanation`: Penjelasan mengapa ini adalah fallacy
- `processing_time`: Waktu pemrosesan dalam detik
- `model_used`: Model AI yang digunakan

**Error Responses:**

```json
// 400 Bad Request - Input tidak valid
{
  "error": "Request body is required"
}

// 400 Bad Request - Text kosong
{
  "error": "Text field is required"
}

// 400 Bad Request - Text terlalu panjang
{
  "error": "Text too long (max 10,000 characters)"
}

// 500 Internal Server Error - Error server
{
  "error": "Internal server error"
}
```

### GET /health/

Health check endpoint untuk monitoring status aplikasi.

**Response (200 OK):**

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

**Response (503 Service Unavailable):**

```json
{
  "status": "unhealthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "services": {
    "llm": "unhealthy"
  },
  "version": "1.0.0"
}
```

## Rate Limiting

- Default: 100 requests per minute per IP
- Dapat dikonfigurasi melalui environment variable `API_RATE_LIMIT`

## CORS

- Default: `http://localhost:3000` (untuk development NextJS)
- Dapat dikonfigurasi melalui environment variable `CORS_ORIGINS`
- Multiple origins dipisahkan dengan koma

## Response Headers

Setiap response menyertakan headers:

- `X-Request-ID`: Unique request identifier
- `X-Processing-Time`: Processing time dalam detik
- `Access-Control-Allow-Origin`: CORS header

## Example Usage

### cURL Examples

**Analyze text:**

```bash
curl -X POST http://localhost:5000/api/v1/analysis/ \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Jangan percaya dia, dia kan mantan kriminal! Semua yang dia katakan pasti bohong karena dia lulusan sekolah rendahan."
  }'
```

**Health check:**

```bash
curl -X GET http://localhost:5000/api/v1/health/
```

### JavaScript/TypeScript Example

```javascript
// Analyze text
const analyzeText = async (text) => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/analysis/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
};

// Usage
const result = await analyzeText('Jangan percaya dia, dia kan mantan kriminal!');
console.log('Analysis result:', result);
```

### Python Example

```python
import requests
import json

def analyze_text(text):
    url = "http://localhost:5000/api/v1/analysis/"
    data = {"text": text}
    
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Usage
result = analyze_text("Jangan percaya dia, dia kan mantan kriminal!")
if result:
    print(f"Contains fallacies: {result['contains_fallacies']}")
    for fallacy in result['fallacies']:
        print(f"- {fallacy['type']}: {fallacy['text']}")
```

## Error Handling

Semua error response mengikuti format:

```json
{
  "error": "Deskripsi error"
}
```

**Common HTTP Status Codes:**

- `200 OK`: Request berhasil
- `400 Bad Request`: Input tidak valid
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service tidak tersedia

# Simple monitoring script
while true; do
  curl -f http://localhost:5000/api/v1/health/ || echo "Service down!"
  sleep 30
done
```