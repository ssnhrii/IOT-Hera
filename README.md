# HERA Web Application

**HERA (Pemindai Cerdas Nusantara)** - Smart Scanner for Disaster Victim Detection

Sistem berbasis web yang mengintegrasikan teknologi Ground Penetrating Radar (GPR) dengan analisis AI untuk mendeteksi korban setelah bencana tanah longsor dan banjir di Indonesia.

## 📂 Repository Structure

Repository ini menggunakan branch terpisah untuk memudahkan kolaborasi:

- **`main`** - Branch utama (hanya README.md)
- **`frontend`** - Branch untuk development frontend (React + Vite + Tailwind)
- **`backend`** - Branch untuk development backend (Node.js + Express + MySQL)

## 🚀 Quick Start

### Clone Repository

```bash
git clone https://github.com/ssnhrii/IOT-Hera.git
cd IOT-Hera
```

### Untuk Frontend Developer

```bash
# Checkout branch frontend
git checkout frontend

# Install dependencies
cd frontend
npm install

# Setup environment
cp .env.example .env

# Run development server
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173`

### Untuk Backend Developer

```bash
# Checkout branch backend
git checkout backend

# Install dependencies
cd backend
npm install

# Setup environment
cp .env.example .env
# Edit .env dan isi DB_PASSWORD

# Run development server
npm run dev
```

Backend akan berjalan di: `http://localhost:5000`

## 🎯 Fitur Utama

### Untuk Guest (Tanpa Login):
1. 📋 **Lihat Laporan Kegiatan** - Baca dokumentasi operasi SAR
2. 🆘 **Kirim Aduan Bantuan** - Laporkan situasi darurat (tidak perlu login!)
3. ⚠️ **Info Bencana BMKG** - Lihat data bencana real-time dari BMKG

### Untuk Petugas (Perlu Login):
1. 📊 **Dashboard** - Dashboard lengkap dengan semua informasi penting
2. 📡 **Visualisasi GPR** - Lihat data GPR dalam format 2D/3D
3. 🤖 **Analisis AI** - Deteksi objek organik/inorganik otomatis
4. 📋 **Management Laporan** - Create, Read, Update, Delete laporan kegiatan
5. 👀 **Lihat Aduan Bantuan** - Kelola dan tanggapi aduan dari masyarakat
6. ⚠️ **Info Bencana BMKG** - Akses penuh data bencana

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT + bcrypt
- **Testing**: Jest + Supertest

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Visualization**: D3.js (2D) + Three.js (3D)
- **Maps**: Leaflet
- **HTTP Client**: Axios

## 🔐 Login Credentials

**Petugas:**
- Email: `petugas@hera.go.id`
- Password: `petugas123`

## 👥 Workflow Kolaborasi

### Untuk Frontend Developer

```bash
# Update dari remote
git checkout frontend
git pull origin frontend

# Buat perubahan
# ... edit files ...

# Commit dan push
git add .
git commit -m "feat: add new feature"
git push origin frontend
```

### Untuk Backend Developer

```bash
# Update dari remote
git checkout backend
git pull origin backend

# Buat perubahan
# ... edit files ...

# Commit dan push
git add .
git commit -m "feat: add new API endpoint"
git push origin backend
```

### Merge ke Main (Setelah Testing)

```bash
# Checkout main
git checkout main

# Merge frontend
git merge frontend

# Merge backend
git merge backend

# Push ke main
git push origin main
```

## 📋 Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm atau yarn

## 🐛 Troubleshooting

### MySQL Connection Error
```bash
# Cek MySQL service running
# Windows:
net start MySQL80

# Linux:
sudo systemctl start mysql
```

### Port Already in Use
Ubah PORT di `.env` backend dan update `VITE_API_URL` di frontend

## 📄 License

MIT

---

**Made with ❤️ for Indonesia's Disaster Response**
