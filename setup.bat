@echo off
cls
echo ========================================
echo   HERA - Setup 2 Folder Terpisah
echo ========================================
echo.
echo Script ini akan membuat:
echo   1. IOT-Hera-Backend (untuk backend)
echo   2. IOT-Hera-Frontend (untuk frontend)
echo.
echo Lokasi: C:\laragon\www\
echo.
pause

cd /d C:\laragon\www

echo.
echo ========================================
echo [1/6] Clone Backend Branch...
echo ========================================
git clone -b backend https://github.com/ssnhrii/IOT-Hera.git IOT-Hera-Backend
if errorlevel 1 (
    echo.
    echo ERROR: Gagal clone backend!
    echo Mungkin folder sudah ada?
    pause
    exit /b 1
)
echo ✓ Backend berhasil di-clone

echo.
echo ========================================
echo [2/6] Clone Frontend Branch...
echo ========================================
git clone -b frontend https://github.com/ssnhrii/IOT-Hera.git IOT-Hera-Frontend
if errorlevel 1 (
    echo.
    echo ERROR: Gagal clone frontend!
    echo Mungkin folder sudah ada?
    pause
    exit /b 1
)
echo ✓ Frontend berhasil di-clone

echo.
echo ========================================
echo [3/6] Install Backend Dependencies...
echo ========================================
cd IOT-Hera-Backend\backend
echo Installing npm packages... (ini bisa lama)
call npm install
if errorlevel 1 (
    echo.
    echo ERROR: Gagal install backend dependencies!
    pause
    exit /b 1
)
echo ✓ Backend dependencies terinstall

echo.
echo ========================================
echo [4/6] Setup Backend .env...
echo ========================================
if not exist .env (
    copy .env.example .env
    echo ✓ File .env dibuat
    echo.
    echo PENTING: Edit backend\.env dan isi DB_PASSWORD!
) else (
    echo ✓ File .env sudah ada
)

echo.
echo ========================================
echo [5/6] Install Frontend Dependencies...
echo ========================================
cd ..\..\IOT-Hera-Frontend\frontend
echo Installing npm packages... (ini bisa lama)
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo.
    echo ERROR: Gagal install frontend dependencies!
    pause
    exit /b 1
)
echo ✓ Frontend dependencies terinstall

echo.
echo ========================================
echo [6/6] Setup Frontend .env...
echo ========================================
if not exist .env (
    copy .env.example .env
    echo ✓ File .env dibuat
) else (
    echo ✓ File .env sudah ada
)

cd ..\..

echo.
echo ========================================
echo   SETUP SELESAI!
echo ========================================
echo.
echo Folder yang dibuat:
echo   ✓ C:\laragon\www\IOT-Hera-Backend
echo   ✓ C:\laragon\www\IOT-Hera-Frontend
echo.
echo ========================================
echo   CARA MENJALANKAN
echo ========================================
echo.
echo BACKEND (Terminal 1):
echo   cd C:\laragon\www\IOT-Hera-Backend\backend
echo   npm run dev
echo   URL: http://localhost:5000
echo.
echo FRONTEND (Terminal 2 - BARU):
echo   cd C:\laragon\www\IOT-Hera-Frontend\frontend
echo   npm run dev
echo   URL: http://localhost:5173
echo.
echo ========================================
echo   PENTING!
echo ========================================
echo.
echo 1. Edit file: IOT-Hera-Backend\backend\.env
echo    Isi DB_PASSWORD dengan password MySQL kamu
echo.
echo 2. Pastikan MySQL sudah jalan
echo.
echo 3. Jalankan backend dan frontend di terminal TERPISAH
echo.
echo 4. Folder IOT-Hera lama bisa dihapus
echo.
pause
