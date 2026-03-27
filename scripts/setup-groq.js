#!/usr/bin/env node

/**
 * Setup Helper - Installs dependencies and verifies environment
 * Run: node setup-groq.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log(`
╔════════════════════════════════════════════════════╗
║   Groq Proxy - Setup & Diagnostic Tool            ║
╚════════════════════════════════════════════════════╝
`);

// Check Node.js version
const nodeVersion = process.version;
console.log(`✓ Node.js version: ${nodeVersion}`);

// Check if package.json exists
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found!');
    process.exit(1);
}
console.log('✓ package.json found');

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('\n⚠️  node_modules not found. Installing dependencies...\n');
    try {
        process.chdir(path.join(__dirname, '..'));
        execSync('npm install', { stdio: 'inherit' });
        console.log('\n✓ Dependencies installed successfully!');
    } catch (error) {
        console.error('❌ Failed to install dependencies');
        console.error('Try running: npm install');
        process.exit(1);
    }
} else {
    console.log('✓ node_modules exists');
    
    // Check for required packages
    const requiredPackages = ['express', 'cors', 'body-parser', 'axios'];
    let missingPackages = [];
    
    requiredPackages.forEach(pkg => {
        const pkgPath = path.join(nodeModulesPath, pkg);
        if (!fs.existsSync(pkgPath)) {
            missingPackages.push(pkg);
        }
    });
    
    if (missingPackages.length > 0) {
        console.log(`\n⚠️  Missing packages: ${missingPackages.join(', ')}`);
        console.log('Installing missing packages...\n');
        try {
            execSync('npm install', { stdio: 'inherit' });
            console.log('\n✓ Packages installed!');
        } catch (error) {
            console.error('❌ Failed to install packages');
            process.exit(1);
        }
    } else {
        console.log('✓ All required packages found');
    }
}

// Check API key
const apiKey = process.env.GROQ_API_KEY || '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';
if (apiKey.startsWith('gsk_')) {
    console.log('✓ Groq API key configured');
} else {
    console.warn('⚠️  Groq API key format may be invalid');
}

console.log(`
╔════════════════════════════════════════════════════╗
║   Setup Complete! ✓                                ║
╚════════════════════════════════════════════════════╝

Next steps:

1. Start Groq Proxy:
   npm run proxy

2. In another terminal, start Vertex App:
   npm start

3. Open http://localhost:8080 in your browser

4. Test: Go to AI Hub → AI Chat → Send a message

Ready to go! 🚀
`);
