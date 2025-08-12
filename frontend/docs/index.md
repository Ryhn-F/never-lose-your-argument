# Fallacy Checker - Dokumentasi Lengkap

## Selamat Datang

Selamat datang di dokumentasi lengkap untuk aplikasi **Fallacy Checker** - aplikasi web yang menggunakan AI untuk menganalisis teks dan mengidentifikasi logical fallacies (kesalahan logika).

## Daftar Isi

### 📚 Dokumentasi Utama

1. **[README](./README.md)** - Overview proyek, instalasi, dan penggunaan dasar
2. **[ARCHITECTURE](./ARCHITECTURE.md)** - Arsitektur aplikasi dan prinsip Clean Architecture
3. **[COMPONENTS](./COMPONENTS.md)** - Dokumentasi lengkap semua komponen UI dan feature
4. **[API](./API.md)** - Dokumentasi integrasi API dan endpoint
5. **[DEPLOYMENT](./DEPLOYMENT.md)** - Panduan deployment ke berbagai platform

### 🚀 Quick Start

Untuk memulai dengan cepat:

1. **Setup Proyek**:
   ```bash
   git clone <repository-url>
   cd fallacy-checker
   npm install
   cp .env.example .env
   ```

2. **Konfigurasi Environment**:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

3. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```

4. **Buka Browser**: http://localhost:3000

### 🏗️ Arsitektur Overview

Aplikasi ini dibangun dengan **Clean Architecture** dan **separation of concerns**:

```
┌─────────────────────────────────────────┐
│           Frameworks & Drivers          │
│         (Next.js, Tailwind CSS)         │
├─────────────────────────────────────────┤
│          Interface Adapters             │
│        (Components, Controllers)        │
├─────────────────────────────────────────┤
│             Use Cases                   │
│        (Hooks, Services)                │
├─────────────────────────────────────────┤
│              Entities                   │
│         (Types, Constants)              │
└─────────────────────────────────────────┘
```

### 📁 Struktur Proyek

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

### 🎯 Fitur Utama

- **Analisis Teks**: Menganalisis teks untuk mengidentifikasi kesalahan logika
- **Deteksi Sentimen**: Menentukan sentimen dari teks yang dianalisis
- **Tingkat Kekuatan & Agresivitas**: Mengukur tingkat kekuatan dan agresivitas argumen
- **Contoh Teks**: Menyediakan contoh teks untuk memudahkan pengujian
- **Interface Responsif**: Desain yang responsif dan mendukung dark mode
- **Informasi Fallacy**: Halaman informasi tentang berbagai jenis logical fallacy

### 🛠️ Teknologi Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Development**: ESLint, PostCSS

### 📖 Panduan Berdasarkan Role

#### Untuk Developer

1. **Mulai dengan**: [ARCHITECTURE.md](./ARCHITECTURE.md) untuk memahami struktur kode
2. **Lanjut ke**: [COMPONENTS.md](./COMPONENTS.md) untuk memahami komponen yang tersedia
3. **Integrasikan API**: [API.md](./API.md) untuk integrasi backend

#### Untuk DevOps/Deployment

1. **Setup Environment**: [README.md](./README.md) bagian instalasi
2. **Deploy Aplikasi**: [DEPLOYMENT.md](./DEPLOYMENT.md) untuk berbagai platform
3. **Monitor Performance**: [DEPLOYMENT.md](./DEPLOYMENT.md) bagian monitoring

#### Untuk Product Manager/Designer

1. **Overview Fitur**: [README.md](./README.md) bagian fitur utama
2. **UI Components**: [COMPONENTS.md](./COMPONENTS.md) untuk memahami komponen UI
3. **User Flow**: [API.md](./API.md) untuk memahami data flow

### 🔧 Development Workflow

#### 1. Setup Development Environment

```bash
# Clone dan setup
git clone <repository-url>
cd fallacy-checker
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan konfigurasi yang sesuai

# Jalankan development server
npm run dev
```

#### 2. Menambah Fitur Baru

1. **Buat Feature Module**: `src/features/[feature-name]/`
2. **Definisikan Types**: `src/lib/types/`
3. **Buat Service**: `src/services/` (jika perlu)
4. **Buat Custom Hook**: `src/hooks/` (jika perlu)
5. **Buat UI Components**: di dalam feature module
6. **Integrasikan ke Pages**: `src/app/`

#### 3. Code Quality Standards

- **TypeScript**: Semua file menggunakan TypeScript
- **ESLint**: Ikuti aturan linting yang sudah dikonfigurasi
- **Clean Code**: Ikuti prinsip clean code dan SOLID principles
- **Component Design**: Buat komponen yang reusable dan composable
- **Error Handling**: Implementasikan proper error handling

### 🧪 Testing Strategy

#### Unit Testing
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

#### Integration Testing
- Test component integration dengan hooks
- Test API service integration
- Test complete user workflows

#### E2E Testing
- Test critical user paths
- Test error scenarios
- Test responsive behavior

### 🚀 Deployment Options

#### Vercel (Recommended)
- Automatic deployment dari Git
- Built-in CDN dan optimizations
- Serverless functions support

#### Netlify
- Static site deployment
- Form handling
- Edge functions

#### Docker
- Containerized deployment
- Scalable infrastructure
- Multi-environment support

### 📊 Performance Best Practices

1. **Code Splitting**: Feature-based code splitting
2. **Image Optimization**: Next.js Image component
3. **Bundle Analysis**: Regular bundle size monitoring
4. **Caching Strategy**: Proper HTTP caching headers
5. **Core Web Vitals**: Monitor dan optimize performance metrics

### 🔒 Security Considerations

1. **Input Validation**: Client dan server-side validation
2. **XSS Prevention**: React's built-in protection
3. **CORS Configuration**: Proper API CORS setup
4. **Environment Variables**: Secure secret management
5. **Content Security Policy**: Implement CSP headers

### 📈 Monitoring & Analytics

1. **Error Tracking**: Sentry integration
2. **Performance Monitoring**: Web Vitals tracking
3. **User Analytics**: Google Analytics integration
4. **API Monitoring**: Backend API health checks

### 🤝 Contributing

1. **Fork Repository**: Buat fork dari repository utama
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Follow Code Standards**: Ikuti guidelines yang sudah ditetapkan
4. **Write Tests**: Tambahkan tests untuk fitur baru
5. **Submit Pull Request**: Buat PR dengan deskripsi yang jelas

### 📞 Support & Help

#### Dokumentasi
- Baca dokumentasi lengkap di folder `docs/`
- Check README untuk setup dasar
- Lihat ARCHITECTURE untuk understanding mendalam

#### Issues
- Report bugs di GitHub Issues
- Request fitur baru di GitHub Discussions
- Tanya pertanyaan di GitHub Discussions

#### Community
- Join Discord server (jika ada)
- Follow updates di social media
- Contribute ke open source project

### 🔄 Changelog & Updates

#### Version 1.0.0 (Current)
- ✅ Clean Architecture implementation
- ✅ TypeScript integration
- ✅ Responsive UI dengan dark mode
- ✅ Analysis feature dengan fallacy detection
- ✅ About page dengan fallacy information
- ✅ Comprehensive documentation

#### Roadmap
- 🔄 Unit testing implementation
- 🔄 E2E testing dengan Playwright
- 🔄 Performance optimizations
- 🔄 Accessibility improvements
- 🔄 Multi-language support
- 🔄 Advanced analytics features

### 📝 License

MIT License - lihat file LICENSE untuk detail lengkap.

---

## Navigasi Cepat

- **[⬅️ Kembali ke README](./README.md)**
- **[🏗️ Lihat Arsitektur](./ARCHITECTURE.md)**
- **[🧩 Dokumentasi Komponen](./COMPONENTS.md)**
- **[🔌 API Documentation](./API.md)**
- **[🚀 Panduan Deployment](./DEPLOYMENT.md)**

---

*Dokumentasi ini akan terus diupdate seiring dengan perkembangan proyek. Jika ada pertanyaan atau saran, silakan buat issue di GitHub repository.*