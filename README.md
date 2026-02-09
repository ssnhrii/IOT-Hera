# HERA Web Application

**HERA (Pemindai Cerdas Nusantara)** - Smart Scanner for Disaster Victim Detection

Sistem berbasis web yang mengintegrasikan teknologi Ground Penetrating Radar (GPR) dengan analisis AI untuk mendeteksi korban setelah bencana tanah longsor dan banjir di Indonesia.

## 🎯 Fitur Utama

### **Untuk Guest (Tanpa Login):**
1. 📋 **Lihat Laporan Kegiatan** - Baca dokumentasi operasi SAR
2. 🆘 **Kirim Aduan Bantuan** - Laporkan situasi darurat (tidak perlu login!)
3. ⚠️ **Info Bencana BMKG** - Lihat data bencana real-time dari BMKG

### **Untuk Petugas (Perlu Login):**
1. � **Dashboard** - Dashboard lengkap dengan semua informasi penting
2. �📡 **Visualisasi GPR** - Lihat data GPR dalam format 2D/3D
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

## 📋 Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm atau yarn

## � Login Credentials

Sistem sudah dilengkapi dengan 2 user default:

**Admin:**
- Email: `admin@hera.go.id`
- Password: `admin123`
- Role: admin

**Petugas:**
- Email: `petugas@hera.go.id`
- Password: `petugas123`
- Role: petugas

Lihat [LOGIN_CREDENTIALS.md](LOGIN_CREDENTIALS.md) untuk detail lengkap.

## �🚀 Quick Start

### 1. Install MySQL

**Windows:**
- Download: https://dev.mysql.com/downloads/installer/
- Install dan set password root

**Linux:**
```bash
sudo apt install mysql-server
```

**macOS:**
```bash
brew install mysql
```

### 2. Buat Database

```bash
mysql -u root -p
CREATE DATABASE hera_db;
EXIT;
```

### 3. Setup Backend

```bash
cd backend
npm install

# Buat file .env
cp .env.example .env
# Edit .env dan isi DB_PASSWORD dengan password MySQL Anda

npm run dev
```

### 4. Setup Frontend

```bash
cd frontend
npm install

# Buat file .env
cp .env.example .env

npm run dev
```

### 5. Akses Aplikasi

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## 📁 Struktur Project

```
hera-web-application/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── config/         # Database config
│   │   ├── models/         # Sequelize models
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   └── server.js       # Entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React Context
│   │   ├── services/      # API services
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
├── CARA_RUNNING_MYSQL.md  # Panduan lengkap
└── README.md              # File ini
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=hera_db
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=24h

CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📚 Dokumentasi

- **[LOGIN_CREDENTIALS.md](LOGIN_CREDENTIALS.md)** - Kredensial login default

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

### Access Denied
Pastikan password di `.env` sesuai dengan password MySQL

## 📝 Development Status

- ✅ Project structure initialized
- ✅ MySQL database configured
- ✅ User model created
- ⏳ Remaining models (GPRScan, AIAnalysis, Report, HelpRequest, DisasterData)
- ⏳ Services implementation
- ⏳ API endpoints
- ⏳ Frontend components

## 👥 User Roles

1. **Guest** - Public access
   - View public reports
   - Submit help requests
   - View BMKG disaster data

2. **Petugas** - Authenticated officers
   - All Guest features
   - GPR data visualization
   - AI analysis results
   - Manage reports
   - Manage help requests

## 🔐 Security

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Input sanitization
- CORS protection
- Helmet security headers

## 📄 License

MIT

## 🆘 Support

Jika ada masalah, baca file **CARA_RUNNING_MYSQL.md** untuk troubleshooting lengkap.

---

**Made with ❤️ for Indonesia's Disaster Response**
