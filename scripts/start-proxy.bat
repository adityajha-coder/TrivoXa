@echo off
REM Groq Proxy - Troubleshooting and Startup Helper
REM This script helps diagnose and fix common issues
cd /d "%~dp0\.."

echo.
echo  ╔════════════════════════════════════════════════════╗
echo  ║  Groq Proxy Troubleshooter & Launcher             ║
echo  ╚════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo.
    echo Please download and install Node.js from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js is installed: 
node --version
echo.

REM Check if npm works
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not found!
    echo Please reinstall Node.js
    pause
    exit /b 1
)

echo ✓ npm is available
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo ⚠️  node_modules not found. Installing dependencies...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        echo Try running manually: npm install
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed!
    echo.
)

REM Check for required packages
echo Checking required packages...
node -e "const pkgs=['express','cors','axios','body-parser']; pkgs.forEach(p=>{try{require.resolve(p);console.log('  ✓ '+p)}catch(e){console.log('  ❌ '+p);throw new Error('Missing: '+p)}})" 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Reinstalling packages...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  All checks passed! Starting Groq Proxy...        ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Start the proxy with error handling
echo Starting on localhost:3001...
echo.

node server\groq-proxy.js
if %errorlevel% neq 0 (
    echo.
    echo ❌ Groq Proxy failed to start!
    echo.
    echo Common issues:
    echo   1. Port 3001 in use - Kill it and retry
    echo   2. Invalid API key - Check settings
    echo   3. Missing dependencies - Run: npm install
    echo.
    pause
    exit /b 1
)
