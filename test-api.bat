@echo off
REM Test Groq API Key
REM This validates that your API key is working

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  Groq API Key Validator                            ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.

REM Check if axios is installed
node -e "require.resolve('axios')" 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Installing axios...
    call npm install axios
    if %errorlevel% neq 0 (
        echo ❌ Failed to install axios
        pause
        exit /b 1
    )
)

echo Testing Groq API Key...
echo.

REM Run the test script
node test-groq-api.js

if %errorlevel% neq 0 (
    echo.
    echo ❌ API Key Test Failed
    echo.
    echo Possible issues:
    echo   1. API key is invalid or expired
    echo   2. Internet connection problem
    echo   3. API account has no quota
    echo.
    echo Get a new key: https://console.groq.com/keys
    echo.
    pause
    exit /b 1
)

echo.
echo ✓ API Key validation complete!
pause
