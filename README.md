# Never Lose Argument - Fallacy Checker

Aplikasi web yang menggunakan AI untuk menganalisis teks dan mengidentifikasi logical fallacies (kesalahan logika) dengan arsitektur yang bersih dan terstruktur.

## 🎯 Fitur Utama

- **Analisis Teks**: Menganalisis teks untuk mengidentifikasi kesalahan logika menggunakan Google Gemini AI
- **Deteksi Sentimen**: Menentukan sentimen dari teks yang dianalisis  
- **Tingkat Kekuatan & Agresivitas**: Mengukur tingkat kekuatan dan agresivitas argumen
- **Interface Responsif**: Desain yang responsif dan mendukung dark mode
- **Informasi Fallacy**: Halaman informasi tentang berbagai jenis logical fallacy

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Flask (Python), LangChain, Google Gemini AI
- **Infrastructure**: Docker, Nginx, GitHub Actions
- **Architecture**: Clean Architecture dengan separation of concerns

## 📋 Persyaratan Sistem

### Untuk Pengembangan Lokal
- Node.js (versi 18.0.0 atau lebih baru)
- Python (versi 3.11 atau lebih baru)
- npm atau yarn
- Google AI Studio API Key
- Docker dan Docker Compose (opsional)

## Cara Menjalankan Aplikasi

### 1. Pengembangan Lokal

#### Frontend

1. Masuk ke direktori frontend:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # atau
   yarn install
   ```

3. Buat file `.env.local` di direktori frontend berdasarkan `.env.example`:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

4. Jalankan development server:
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
   Frontend akan berjalan di http://localhost:3000

#### Backend

1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```

2. Buat dan aktifkan virtual environment (disarankan):
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Buat file `.env` di direktori backend berdasarkan `.env.example`:
   ```
   GOOGLE_API_KEY=your_google_api_key
   ```

5. Jalankan server:
   ```bash
   python app.py
   ```
   Backend akan berjalan di http://localhost:5000



## 🏗️ Struktur Proyek

```
never-lose-argument/
├── backend/                 # 🐍 Backend API (Flask + Google Gemini AI)
│   ├── app/                # Core application logic
│   ├── tests/              # Unit tests
│   ├── docs/               # Backend documentation
│   └── requirements.txt    # Python dependencies
├── frontend/               # ⚛️ Frontend App (Next.js + React)
│   ├── src/               # Source code
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Feature-based modules
│   │   └── services/      # API integration
│   ├── docs/              # Frontend documentation
│   └── package.json       # Node.js dependencies
├── nginx/                  # 🌐 Reverse proxy configuration
├── .github/               # 🔄 CI/CD workflows
├── docker-compose.yml     # 🐳 Development environment
└── docker-compose.prod.yml # 🚀 Production environment
```
## 📚 Dokumentasi Lengkap

- **[Frontend Documentation](./frontend/docs/index.md)** - Complete frontend documentation
- **[Backend Documentation](./backend/docs/api.md)** - API reference and backend guide
- **[Architecture Guide](./backend/ARCHITECTURE.md)** - System architecture overview
- **[Deployment Guide](./frontend/docs/DEPLOYMENT.md)** - Production deployment guide

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

**Catatan**: Pastikan semua GitHub Actions workflow berhasil sebelum merge PR.

## 📄 License

MIT License - lihat file LICENSE untuk detail lengkap.

## 🙏 Acknowledgments

- **Google Gemini AI** untuk model bahasa yang powerful
- **Next.js & React** untuk frontend framework yang modern
- **Flask & LangChain** untuk backend yang efisien
- **Tailwind CSS** untuk styling yang responsif