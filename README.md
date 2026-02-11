# HERA Web Application

**HERA (Pemindai Cerdas Nusantara)** - Smart Scanner for Disaster Victim Detection

Sistem berbasis web yang mengintegrasikan teknologi Ground Penetrating Radar (GPR) dengan analisis AI untuk mendeteksi korban setelah bencana tanah longsor dan banjir di Indonesia.

## 🚀 Quick Start

```bash
git clone https://github.com/ssnhrii/IOT-Hera.git
cd IOT-Hera

# Setup database
mysql -u root -p
CREATE DATABASE hera_db;

# Backend (Terminal 1)
cd backend
npm install
# Edit file env dengan password MySQL
npm run seed
npm run dev

# Frontend (Terminal 2)
cd frontend
npm install --legacy-peer-deps
npm run dev
```

**📖 Panduan Lengkap**: [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)

## 🎯 Fitur Utama

### Untuk Guest (Tanpa Login):
- 📋 **Lihat Laporan Kegiatan** - Dokumentasi operasi SAR
- 🆘 **Aduan Bantuan** - Pelaporan darurat tanpa login
- ⚠️ **Info Bencana BMKG** - Data bencana real-time

### Untuk Petugas (Perlu Login):
- 📊 **Dashboard** - Dashboard lengkap dengan semua informasi
- 📡 **Visualisasi GPR** - Data GPR dalam format 2D/3D
- 🤖 **Analisis AI** - Deteksi objek organik/inorganik otomatis
- 📋 **Management Laporan** - CRUD laporan kegiatan
- 🆘 **Management Aduan** - Kelola aduan bantuan

## 🛠️ Tech Stack

**Backend**: Node.js + Express + MySQL + JWT
**Frontend**: React 18 + Vite + Tailwind CSS
**Visualization**: D3.js + Three.js + Leaflet

## 🔐 Login Credentials

**Petugas:**
- Email: `petugas@hera.go.id`
- Password: `petugas123`

## 📁 Project Structure

```
HERA/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite
└── docs/            # Documentation
```

## 📚 Documentation

- **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)** - Panduan instalasi lengkap
- **[GIT_WORKFLOW.md](GIT_WORKFLOW.md)** - Aturan Git dan kolaborasi
- **[LOGIN_CREDENTIALS.md](LOGIN_CREDENTIALS.md)** - Info login dan troubleshooting

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📋 Prerequisites

- Node.js 18+
- MySQL 8.0+
- Git

## 🐛 Troubleshooting

Lihat [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) untuk troubleshooting lengkap.

## 📄 License

MIT

---

**Made with ❤️ for Indonesia's Disaster Response**
