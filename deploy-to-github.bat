@echo off
TITLE Deploy AI Resume Screening System to GitHub
COLOR 0B
echo =========================================================================
echo    AI RESUME SCREENING SYSTEM - ONE-CLICK GITHUB DEPLOYMENT
echo =========================================================================
echo.

cd /d "C:\Health Dashboard"

echo [1/3] Checking Git Status...
git status -s

echo.
echo [2/3] Preparing branch 'main'...
git branch -M main

echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/your-name/ai-resume-screening.git): "

if "%REPO_URL%"=="" (
    echo Error: No repository URL provided!
    echo Please create an empty repo at https://github.com/new and run this script again.
    pause
    exit /b 1
)

echo.
echo [3/3] Setting remote and pushing to GitHub...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo Pushing code to %REPO_URL% on branch main...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo =========================================================================
    echo   SUCCESS! Your code is now live on GitHub!
    echo =========================================================================
    echo   Next, go to https://vercel.com to import this repository and deploy.
) else (
    echo.
    echo [!] Push failed. Please verify your GitHub login or token permissions.
)

echo.
pause
