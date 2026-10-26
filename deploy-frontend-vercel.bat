@echo off
TITLE Deploy Frontend to Vercel
COLOR 0A
echo =========================================================================
echo    AI RESUME SCREENING SYSTEM - VERCEL FRONTEND DEPLOYMENT
echo =========================================================================
echo.

cd /d "C:\Health Dashboard\frontend"

echo Deploying Next.js frontend to Vercel...
echo (If prompted, press Enter to accept the defaults)
echo.

npx vercel deploy --prod

echo.
echo =========================================================================
echo   Deployment completed! Check the URL shown above to view your live app.
echo =========================================================================
echo.
pause
