# 🚀 HERA - Installation Guide

## 📋 Prerequisites

Pastikan sudah terinstall:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MySQL** 8.0+ ([Download](https://dev.mysql.com/downloads/installer/))
- **Git** ([Download](https://git-scm.com/))

## 📥 Step 1: Clone Repository

```bash
git clone https://github.com/ssnhrii/IOT-Hera.git
cd IOT-Hera
```

## 🌳 Step 2: Choose Development Branch

HERA menggunakan struktur branch terpisah:

### For Backend Development:
```bash
git checkout backend
```

### For Frontend Development:
```bash
git checkout frontend
```

### For Documentation Only:
```bash
git checkout main
```

## 🗄️ Step 3: Setup MySQL Database

### Windows:
1. Buka MySQL Command Line atau MySQL Workbench
2. Login sebagai root
3. Buat database:
```sql
CREATE DATABASE hera_db;
```

### Linux/Mac:
```bash
mysql -u root -p
CREATE DATABASE hera_db;
EXIT;
```

## ⚙️ Step 4: Setup Backend

```bash
# Switch to backend branch
git checkout backend

# Install dependencies
npm install

# Setup environment (file env sudah tersedia)
# Edit file env dan sesuaikan dengan konfigurasi Anda
```

### Edit file `env` di root directory:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=hera_db
DB_USER=root
DB_PASSWORD=your_mysql_password_here

JWT_SECRET=your-secret-key-min-32-characters-long
JWT_EXPIRES_IN=24h

CORS_ORIGIN=http://localhost:5173
```

**⚠️ PENTING**: 
1. Ganti `your_mysql_password_here` dengan password MySQL Anda!
2. Ganti `your-secret-key-min-32-characters-long` dengan secret key yang aman!

### Create Default User:
```bash
npm run seed
```

## 🎨 Step 5: Setup Frontend

```bash
# Switch to frontend branch
git checkout frontend

# Install dependencies (dengan legacy peer deps untuk React 19)
npm install --legacy-peer-deps

# File env sudah tersedia, biasanya tidak perlu diubah
```

File `env` frontend sudah benar:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Step 6: Run Application

### Manual (2 Terminal Terpisah)

**Terminal 1 - Backend:**
```bash
git checkout backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
git checkout frontend
npm run dev
```

### Atau buat script sendiri:

**Windows (run.bat):**
```batch
@echo off
start "Backend" cmd /k "git checkout backend && npm run dev"
timeout /t 2 /nobreak >nul
start "Frontend" cmd /k "git checkout frontend && npm run dev"
```

**Linux/Mac (run.sh):**
```bash
#!/bin/bash
git checkout backend && npm run dev &
git checkout frontend && npm run dev &
wait
```

## 🌐 Step 7: Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🔐 Step 8: Login

**Credentials:**
- Email: `petugas@hera.go.id`
- Password: `petugas123`

## ✅ Verification Checklist

### Backend Running Successfully:
- [ ] Terminal shows: `🚀 HERA Backend Server`
- [ ] Database connected: `✓ MySQL connected successfully`
- [ ] Port 5000 accessible
- [ ] Health check: http://localhost:5000/health returns OK

### Frontend Running Successfully:
- [ ] Terminal shows: `VITE v5.x.x ready`
- [ ] Port 5173 accessible
- [ ] Homepage loads without errors
- [ ] Login form accessible

### Database Working:
- [ ] User can login successfully
- [ ] No database connection errors in backend logs

## 🐛 Troubleshooting

### MySQL Connection Error:
```bash
# Check MySQL service
# Windows:
net start MySQL80

# Linux:
sudo systemctl start mysql

# Mac:
brew services start mysql
```

### Port Already in Use:
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 5173
npx kill-port 5173
```

### npm install Error:
```bash
# Clear cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend Build Error:
```bash
cd frontend
npm install --legacy-peer-deps
npm run build
```

### Database User Not Found:
```bash
cd backend
npm run seed
```

## 🔧 Development Setup

### Backend Development:
```bash
# Backend
git checkout backend
npm install -D nodemon
```

### Frontend Development:
```bash
# Frontend
git checkout frontend
npm install -D @vitejs/plugin-react
```

### Run Tests:
```bash
# Backend
git checkout backend
npm test

# Frontend
git checkout frontend
npm test
```

## 📁 Project Structure

```
HERA/
├── main branch/            # Documentation only
│   ├── README.md          # Project overview
│   ├── INSTALLATION_GUIDE.md
│   ├── LOGIN_CREDENTIALS.md
│   └── GIT_WORKFLOW.md
│
├── backend branch/         # Node.js + Express API
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   └── server.js      # Entry point
│   ├── env               # Environment variables
│   └── package.json
│
└── frontend branch/       # React + Vite
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── services/      # API services
    │   ├── hooks/         # Custom hooks
    │   └── App.jsx
    ├── env               # Environment variables
    └── package.json
```

## 🌐 Production Deployment

### Environment Variables:
```env
# Backend .env
NODE_ENV=production
DB_HOST=your-production-db-host
JWT_SECRET=your-super-secure-secret-key

# Frontend .env
VITE_API_URL=https://your-api-domain.com/api
```

### Build for Production:
```bash
# Frontend
git checkout frontend
npm run build

# Backend (PM2 recommended)
git checkout backend
npm install -g pm2
pm2 start src/server.js --name hera-backend
```

## 📞 Support

Jika mengalami masalah:
1. Cek troubleshooting section di atas
2. Pastikan semua prerequisites terinstall
3. Cek log error di terminal
4. Buat issue di GitHub repository

## 🎯 Quick Start Summary

```bash
# 1. Clone
git clone https://github.com/ssnhrii/IOT-Hera.git
cd IOT-Hera

# 2. Setup MySQL
mysql -u root -p
CREATE DATABASE hera_db;

# 3. Backend
git checkout backend
npm install
# Edit file env dengan password MySQL dan JWT secret
npm run seed

# 4. Frontend (terminal baru)
git checkout frontend
npm install --legacy-peer-deps

# 5. Run (2 terminal terpisah)
# Terminal 1: git checkout backend && npm run dev
# Terminal 2: git checkout frontend && npm run dev

# 6. Access
# http://localhost:5173
# Login: petugas@hera.go.id / petugas123
```

**🎉 Selamat! HERA sudah siap digunakan!**