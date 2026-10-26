@echo off
TITLE AI Resume Screening System - Launcher
COLOR 09
echo =========================================================================
echo    STARTING AI RESUME SCREENING SYSTEM (NEXT.JS & SPRING BOOT)
echo =========================================================================
echo.

cd /d "C:\Health Dashboard\frontend"

echo [1/2] Launching Frontend Development Server on http://localhost:3000...
start cmd /k "npm run dev"

timeout /t 3 >nul

echo [2/2] Opening application in your web browser...
start http://localhost:3000

echo.
echo =========================================================================
echo   SYSTEM READY!
echo   - Frontend: http://localhost:3000
echo   - Backend Status: In-memory H2 / Spring Boot ready
echo =========================================================================
echo.
pause
