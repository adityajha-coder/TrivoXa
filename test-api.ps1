# Groq API Key Tester for PowerShell

Clear-Host
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════╗"
Write-Host "║  Groq API Key Validator                            ║"
Write-Host "╚════════════════════════════════════════════════════╝"
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org"
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Testing Groq API Key..."
Write-Host ""

# Run the test
try {
    & node devtools/test-groq-api.js
    $exitCode = $LASTEXITCODE
} catch {
    Write-Host "❌ Test script failed" -ForegroundColor Red
    Write-Host $_.Exception.Message
    $exitCode = 1
}

if ($exitCode -ne 0) {
    Write-Host ""
    Write-Host "❌ API Key validation failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "  1. API key is invalid or expired"
    Write-Host "  2. Internet connection problem"
    Write-Host "  3. Groq account has no quota"
    Write-Host ""
    Write-Host "Get a new key: https://console.groq.com/keys" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "✓ API Key is valid!" -ForegroundColor Green
Write-Host ""
