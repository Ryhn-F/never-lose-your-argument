# Fallacy Checker

Aplikasi web yang menggunakan AI untuk menganalisis teks dan mengidentifikasi logical fallacies (kesalahan logika) dengan arsitektur yang bersih dan terstruktur.

## 🎯 Fitur Utama

- **Analisis Teks**: Menganalisis teks untuk mengidentifikasi kesalahan logika
- **Deteksi Sentimen**: Menentukan sentimen dari teks yang dianalisis  
- **Tingkat Kekuatan & Agresivitas**: Mengukur tingkat kekuatan dan agresivitas argumen
- **Contoh Teks**: Menyediakan contoh teks untuk memudahkan pengujian
- **Interface Responsif**: Desain yang responsif dan mendukung dark mode
- **Informasi Fallacy**: Halaman informasi tentang berbagai jenis logical fallacy

## 🛠️ Teknologi Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Architecture**: Clean Architecture dengan separation of concerns
- **Development**: ESLint, PostCSS

## 🏗️ Arsitektur

Proyek ini mengimplementasikan **Clean Architecture** dengan struktur yang jelas:

```
src/
├── app/                     # Next.js App Router pages
├── components/              # Reusable components
│   ├── ui/                 # Basic UI components
│   └── layout/             # Layout components
├── features/               # Feature-based modules
│   ├── analysis/           # Analysis feature
│   └── fallacy-info/       # Fallacy information feature
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and configurations
│   ├── constants/          # Application constants
│   ├── types/              # Type definitions
│   └── utils/              # Helper functions
└── services/               # External API services
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm atau yarn
- Backend API yang kompatibel

### Instalasi

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

5. **Buka browser**: http://localhost:3000

### Build untuk Production

```bash
npm run build
npm start
```

## 📚 Dokumentasi Lengkap

Untuk dokumentasi yang lebih detail, lihat folder `docs/`:

- **[📖 Dokumentasi Lengkap](./docs/index.md)** - Index semua dokumentasi
- **[🏗️ Arsitektur](./docs/ARCHITECTURE.md)** - Clean Architecture dan design patterns
- **[🧩 Komponen](./docs/COMPONENTS.md)** - Dokumentasi semua UI dan feature components
- **[🔌 API](./docs/API.md)** - Integrasi API dan endpoint documentation
- **[🚀 Deployment](./docs/DEPLOYMENT.md)** - Panduan deployment ke berbagai platform

## 🔧 Development

### Menambah Fitur Baru

1. Buat feature module di `src/features/[feature-name]/`
2. Definisikan types di `src/lib/types/`
3. Buat service di `src/services/` jika perlu
4. Buat custom hook di `src/hooks/` jika perlu
5. Buat UI components di feature module
6. Integrasikan ke dalam pages

### Code Style Guidelines

- Gunakan TypeScript untuk semua file
- Ikuti naming conventions yang konsisten
- Buat components yang reusable
- Implementasikan proper error handling
- Tulis JSDoc untuk functions yang kompleks

## 🧪 Testing

```bash
# Install testing dependencies (belum diimplementasikan)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository ke Vercel
2. Set environment variables
3. Deploy otomatis dari main branch

### Docker
```bash
docker build -t fallacy-checker .
docker run -p 3000:3000 fallacy-checker
```

Lihat [DEPLOYMENT.md](./docs/DEPLOYMENT.md) untuk panduan lengkap deployment ke berbagai platform.

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail lengkap.

## 🔗 Links

- **[Live Demo](https://fallacychecker.com)** (jika sudah deploy)
- **[API Documentation](./docs/API.md)**
- **[Architecture Guide](./docs/ARCHITECTURE.md)**
- **[Component Library](./docs/COMPONENTS.md)**