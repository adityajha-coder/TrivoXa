@echo off
REM Groq Proxy + TrivoXa App Launcher for Windows
REM This script starts both the Groq Proxy and TrivoXa App in separate windows
cd /d "%~dp0\.."

echo.
echo  ╔════════════════════════════════════════════════════╗
echo  ║  Groq API + TrivoXa Launcher                        ║
echo  ╚════════════════════════════════════════════════════╝
echo.

REM Check if node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.

REM Ask user which to run
echo Please select what to run:
echo 1. Start Groq Proxy only
echo 2. Start TrivoXa App only
echo 3. Start Both (Recommended)
echo.

REM Default to option 3 if just running the file
set choice=3
if "%1"=="" (
    set /p choice="Enter your choice (1-3, default 3): "
    if "!choice!"=="" set choice=3
)

REM Run selected option
if "%choice%"=="1" (
    echo.
    echo 🚀 Starting Groq Proxy on localhost:3001...
    echo.
    node server\groq-proxy.js
) else if "%choice%"=="2" (
    echo.
    echo 🚀 Starting TrivoXa App Server...
    echo.
    npm start
) else if "%choice%"=="3" (
    echo.
    echo 🚀 Starting Groq Proxy on localhost:3001...
    start "Groq Proxy" cmd /k "node server\groq-proxy.js"
    
    timeout /t 2 /nobreak
    
    echo 🚀 Starting TrivoXa App Server (will open in 2 seconds)...
    start "TrivoXa App" cmd /k "npm start"
    
    echo.
    echo ✓ Both servers started!
    echo   - Groq Proxy: http://localhost:3001
    echo   - TrivoXa App: Check the "TrivoXa App" window for the URL
    echo.
    echo Keep both windows open while using the app.
    echo Close them to stop the servers.
    echo.
) else (
    echo ❌ Invalid choice
    exit /b 1
)

pause
