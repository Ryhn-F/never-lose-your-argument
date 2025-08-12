# Fallacy Checker - Dokumentasi Proyek

## Deskripsi Proyek

Fallacy Checker adalah aplikasi web yang menggunakan AI untuk menganalisis teks dan mengidentifikasi logical fallacies (kesalahan logika) di dalamnya. Aplikasi ini dibangun dengan Next.js 15, React 19, TypeScript, dan Tailwind CSS dengan arsitektur yang bersih dan terstruktur.

## Fitur Utama

- **Analisis Teks**: Menganalisis teks untuk mengidentifikasi kesalahan logika
- **Deteksi Sentimen**: Menentukan sentimen dari teks yang dianalisis
- **Tingkat Kekuatan & Agresivitas**: Mengukur tingkat kekuatan dan agresivitas argumen
- **Contoh Teks**: Menyediakan contoh teks untuk memudahkan pengujian
- **Interface Responsif**: Desain yang responsif dan mendukung dark mode
- **Informasi Fallacy**: Halaman informasi tentang berbagai jenis logical fallacy

## Teknologi yang Digunakan

- **Frontend Framework**: Next.js 15 dengan App Router
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useCallback)
- **HTTP Client**: Fetch API
- **Development**: ESLint, PostCSS

## Struktur Proyek

```
src/
├── app/                     # Next.js App Router pages
│   ├── about/              # About page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── ui/                 # Basic UI components
│   │   ├── Alert.tsx
│   │   ├── Button.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── TextArea.tsx
│   │   └── index.ts
│   └── layout/             # Layout components
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── index.ts
├── features/               # Feature-based modules
│   ├── analysis/           # Analysis feature
│   │   └── components/
│   │       ├── AnalysisForm.tsx
│   │       ├── AnalysisResults.tsx
│   │       ├── FallacyItem.tsx
│   │       └── index.ts
│   └── fallacy-info/       # Fallacy information feature
│       └── components/
│           ├── FallacyDescription.tsx
│           └── index.ts
├── hooks/                  # Custom React hooks
│   └── useAnalysis.ts
├── lib/                    # Utilities and configurations
│   ├── constants/          # Application constants
│   │   └── fallacies.ts
│   ├── types/              # Type definitions
│   │   └── analysis.ts
│   └── utils/              # Helper functions
│       ├── colors.ts
│       └── validation.ts
└── services/               # External API services
    └── analysis.service.ts
```

## Arsitektur Clean Architecture

Proyek ini mengimplementasikan prinsip Clean Architecture dengan separation of concerns yang jelas:

### 1. **Entities (Domain Layer)**
- **Location**: `src/lib/types/`
- **Purpose**: Mendefinisikan tipe data dan interface core business logic
- **Files**: `analysis.ts`

### 2. **Use Cases (Application Layer)**
- **Location**: `src/hooks/`, `src/services/`
- **Purpose**: Business logic dan orchestration
- **Files**: `useAnalysis.ts`, `analysis.service.ts`

### 3. **Interface Adapters (Presentation Layer)**
- **Location**: `src/features/`, `src/components/`
- **Purpose**: UI components dan presentasi data
- **Files**: Feature components, UI components

### 4. **Frameworks & Drivers (Infrastructure Layer)**
- **Location**: `src/app/`, `src/lib/utils/`
- **Purpose**: Framework-specific code dan external dependencies
- **Files**: Next.js pages, utility functions

## Instalasi dan Setup

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Backend API yang kompatibel

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd fallacy-checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` dan atur `NEXT_PUBLIC_BACKEND_URL`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build untuk production**
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## API Integration

Aplikasi ini berkomunikasi dengan backend API melalui endpoint:

- **POST** `/analysis` - Menganalisis teks dan mengembalikan hasil analisis

### Request Format
```json
{
  "text": "Teks yang akan dianalisis"
}
```

### Response Format
```json
{
  "sentiment": "positive|negative|neutral",
  "language": "id|en",
  "strong": 7,
  "aggressiveness": 3,
  "contains_fallacies": true,
  "fallacies": [
    {
      "text": "Bagian teks yang mengandung fallacy",
      "type": "Ad Hominem",
      "explanation": "Penjelasan tentang fallacy"
    }
  ]
}
```

## Pengembangan

### Menambah Fitur Baru

1. **Buat feature module** di `src/features/[feature-name]/`
2. **Definisikan types** di `src/lib/types/`
3. **Buat service** di `src/services/` jika perlu
4. **Buat custom hook** di `src/hooks/` jika perlu
5. **Buat UI components** di feature module
6. **Integrasikan** ke dalam pages

### Code Style Guidelines

- Gunakan TypeScript untuk semua file
- Ikuti naming conventions yang konsisten
- Buat components yang reusable
- Implementasikan proper error handling
- Tulis JSDoc untuk functions yang kompleks
- Gunakan barrel exports (`index.ts`) untuk clean imports

### Testing

Untuk menambahkan testing (belum diimplementasikan):
- Unit tests dengan Jest dan React Testing Library
- Integration tests untuk API calls
- E2E tests dengan Playwright

## Deployment

### Vercel (Recommended)
1. Connect repository ke Vercel
2. Set environment variables
3. Deploy otomatis dari main branch

### Docker
```bash
docker build -t fallacy-checker .
docker run -p 3000:3000 fallacy-checker
```

## Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## License

MIT License - lihat file LICENSE untuk detail lengkap.