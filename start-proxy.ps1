# Groq Proxy Launcher for PowerShell
# This is easier than using batch files

Clear-Host
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════╗"
Write-Host "║  Groq Proxy - Launcher & Troubleshooter           ║"
Write-Host "╚════════════════════════════════════════════════════╝"
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Download from: https://nodejs.org"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    Write-Host ""
    & npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        Write-Host "Try running manually: npm install"
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host ""
    Write-Host "✓ Dependencies installed!" -ForegroundColor Green
    Write-Host ""
}

# Check for required packages
Write-Host "Checking required packages..."
$packages = @('express', 'cors', 'axios', 'body-parser')
foreach ($pkg in $packages) {
    try {
        $output = node -e "require.resolve('$pkg')"
        Write-Host "  ✓ $pkg" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ $pkg" -ForegroundColor Red
        Write-Host ""
        Write-Host "Installing missing packages..." -ForegroundColor Yellow
        & npm install
        break
    }
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════╗"
Write-Host "║  Starting Groq Proxy on localhost:3001...         ║"
Write-Host "╚════════════════════════════════════════════════════╝"
Write-Host ""

# Start the proxy
& node core/groq-proxy.js
