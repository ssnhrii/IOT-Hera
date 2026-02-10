@echo off
cls
echo ========================================
echo   HERA - Run Backend and Frontend
echo ========================================
echo.
echo PENTING: Script ini membutuhkan 2 folder terpisah!
echo.
echo Pastikan sudah menjalankan setup.bat terlebih dahulu
echo untuk membuat folder IOT-Hera-Backend dan IOT-Hera-Frontend
echo.
pause

cd /d C:\laragon\www

echo.
echo Checking folders...
if not exist "IOT-Hera-Backend\backend" (
    echo ERROR: Folder IOT-Hera-Backend tidak ditemukan!
    echo Jalankan setup.bat terlebih dahulu.
    pause
    exit /b 1
)

if not exist "IOT-Hera-Frontend\frontend" (
    echo ERROR: Folder IOT-Hera-Frontend tidak ditemukan!
    echo Jalankan setup.bat terlebih dahulu.
    pause
    exit /b 1
)

echo ✓ Folders found!
echo.

echo ========================================
echo Starting Backend...
echo ========================================
start "HERA Backend" cmd /k "cd /d C:\laragon\www\IOT-Hera-Backend\backend && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo Starting Frontend...
echo ========================================
start "HERA Frontend" cmd /k "cd /d C:\laragon\www\IOT-Hera-Frontend\frontend && npm run dev"

echo.
echo ========================================
echo   SERVERS STARTED!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo 2 terminal windows telah dibuka:
echo   1. HERA Backend (port 5000)
echo   2. HERA Frontend (port 5173)
echo.
echo Untuk stop server, tutup terminal windows tersebut
echo atau tekan Ctrl+C di masing-masing terminal
echo.
pause
