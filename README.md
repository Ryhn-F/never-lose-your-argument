# Check Your Statement

Aplikasi untuk memeriksa logical fallacy dalam sebuah pernyataan.

## Deskripsi

Check Your Statement adalah aplikasi yang membantu pengguna mengidentifikasi logical fallacy (kesalahan logika) dalam teks atau pernyataan. Aplikasi ini terdiri dari frontend (Next.js) dan backend (Flask) yang menggunakan AI untuk menganalisis teks.

## Persyaratan Sistem

### Untuk Pengembangan Lokal
- Node.js (versi 16.0.0 atau lebih baru)
- Python (versi 3.11 atau lebih baru)
- npm atau yarn
- Docker dan Docker Compose (opsional)

## Cara Menjalankan Aplikasi

### 1. Pengembangan Lokal (Tanpa Docker)

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

### 2. Menggunakan Docker Compose

#### Development Mode
1. Pastikan Docker dan Docker Compose terinstal di sistem Anda

2. Buat file environment yang diperlukan:
   ```bash
   # Copy file .env.example ke .env untuk backend
   cp backend/.env.example backend/.env
   
   # Copy file .env.example ke .env untuk frontend
   cp frontend/.env.example frontend/.env
   ```

3. Edit file `backend/.env` dan tambahkan API key Anda:
   ```
   GOOGLE_API_KEY=your_google_api_key
   ```

4. Build dan jalankan container dengan Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

5. Aplikasi akan tersedia di:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - Health check: http://localhost:5000/api/v1/health

#### Production Mode
1. Untuk menjalankan dalam mode production dengan nginx:
   ```bash
   # Buat SSL certificate untuk nginx
   mkdir -p nginx/ssl
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout nginx/ssl/selfsigned.key \
     -out nginx/ssl/selfsigned.crt \
     -subj "/C=ID/ST=Jakarta/L=Jakarta/O=Organization/CN=localhost"
   
   # Jalankan dengan konfigurasi production
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

2. Aplikasi akan tersedia di:
   - HTTPS: https://localhost (dengan SSL certificate)
   - HTTP: http://localhost (redirect ke HTTPS)

#### Monitoring dan Troubleshooting
- Untuk melihat status container:
  ```bash
  docker-compose ps
  ```

- Untuk melihat health status:
  ```bash
  docker inspect --format='{{.Name}}: {{.State.Health.Status}}' $(docker-compose ps -q)
  ```

- Untuk melihat log:
  ```bash
  docker-compose logs -f
  # atau untuk service tertentu
  docker-compose logs -f backend
  ```

- Untuk menghentikan aplikasi:
  ```bash
  docker-compose down
  # atau dengan menghapus volume
  docker-compose down -v
  ```


## Struktur Proyek

```
.
├── backend/             # Aplikasi backend Flask
├── frontend/           # Aplikasi frontend Next.js
├── k8/                 # Manifest Kubernetes
├── terraform/          # Konfigurasi infrastruktur Terraform
└── docker-compose.yml  # Konfigurasi Docker Compose
```

## CI/CD dan Quality Assurance

Proyek ini menggunakan GitHub Actions untuk otomasi CI/CD dengan dua workflow utama:

### Setup GitHub Secrets
Sebelum workflow dapat berjalan, setup secrets yang diperlukan:

**Required Secrets:**
- `GOOGLE_API_KEY`: API key untuk Google Gemini AI
- `SECRET_KEY`: Secret key untuk Flask session management

📖 **Panduan lengkap setup secrets**: [.github/SETUP_SECRETS.md](.github/SETUP_SECRETS.md)

### 1. Health Check & Docker Compose Validation
- **Trigger**: Push/PR ke branch `main` atau `develop`
- **Fungsi**: 
  - Validasi syntax docker-compose files
  - Build dan test semua services menggunakan secrets
  - Health check untuk backend dan frontend
  - Test API endpoints
  - Validasi konfigurasi production dengan nginx dan SSL

### 2. Quick Docker Compose Check
- **Trigger**: Perubahan pada file docker-compose, Dockerfile, atau nginx config
- **Fungsi**:
  - Validasi syntax docker-compose files
  - Check Dockerfile syntax
  - Validasi konfigurasi nginx

Workflow ini memastikan bahwa setiap perubahan tidak merusak kemampuan aplikasi untuk berjalan dengan Docker Compose.

## Kontribusi

1. Fork repository ini
2. Buat branch fitur (`git checkout -b fitur/namafitur`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur'`)
4. Push ke branch (`git push origin fitur/namafitur`)
5. Buat Pull Request

**Catatan**: Pastikan semua GitHub Actions workflow berhasil sebelum merge PR.