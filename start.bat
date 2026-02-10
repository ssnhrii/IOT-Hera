@echo off
cls
echo ========================================
echo   HERA - Start Backend ^& Frontend
echo ========================================
echo.

echo Starting Backend Server...
start "HERA Backend" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 2 /nobreak >nul

echo Starting Frontend Server...
start "HERA Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo   SERVERS STARTED!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo 2 terminal windows telah dibuka.
echo Untuk stop, tutup terminal atau tekan Ctrl+C
echo.
pause
