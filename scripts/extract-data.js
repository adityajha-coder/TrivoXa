/**
 * One-time script to extract hardcoded data from JS files into JSON.
 * Run: node scripts/extract-data.js
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

// --- 1. Extract freeApis.js → data/apis.json ---
console.log('Extracting APIs...');
const apisContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'pages', 'tools', 'freeApis.js'), 'utf8');
// Find the apis array between "apis: [" and the closing "],"
const apisMatch = apisContent.match(/apis:\s*\[([\s\S]*?)\],\s*\n\s*categories/);
if (apisMatch) {
    const arr = eval('[' + apisMatch[1] + ']');
    fs.writeFileSync(path.join(dataDir, 'apis.json'), JSON.stringify(arr, null, 2));
    console.log(`  ✓ Extracted ${arr.length} APIs → data/apis.json`);
} else {
    console.log('  ✗ Could not find apis array');
}

// --- 2. Extract toolsVault.js → data/tools.json + data/extensions.json ---
console.log('Extracting Tools & Extensions...');
const tvContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'pages', 'tools', 'toolsVault.js'), 'utf8');

// Tools
const toolsMatch = tvContent.match(/tools:\s*\[([\s\S]*?)\],\s*\n\s*\n\s*vsCodeExtensions/);
if (toolsMatch) {
    const arr = eval('[' + toolsMatch[1] + ']');
    fs.writeFileSync(path.join(dataDir, 'tools.json'), JSON.stringify(arr, null, 2));
    console.log(`  ✓ Extracted ${arr.length} tool categories → data/tools.json`);
} else {
    console.log('  ✗ Could not find tools array');
}

// VS Code Extensions
const extMatch = tvContent.match(/vsCodeExtensions:\s*\[([\s\S]*?)\],\s*\n\s*\n\s*activeExtCategory/);
if (extMatch) {
    const arr = eval('[' + extMatch[1] + ']');
    fs.writeFileSync(path.join(dataDir, 'extensions.json'), JSON.stringify(arr, null, 2));
    console.log(`  ✓ Extracted ${arr.length} extension categories → data/extensions.json`);
} else {
    console.log('  ✗ Could not find vsCodeExtensions array');
}

// --- 3. Extract commands.js → data/commands.json ---
console.log('Extracting Commands...');
const cmdContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'pages', 'tools', 'commands.js'), 'utf8');

const cmdData = {};

// Git commands
const gitMatch = cmdContent.match(/gitCommands:\s*\[([\s\S]*?)\],\s*\n\s*\n\s*npmCommands/);
if (gitMatch) {
    cmdData.gitCommands = eval('[' + gitMatch[1] + ']');
    console.log(`  ✓ Extracted ${cmdData.gitCommands.length} git commands`);
}

// npm commands
const npmMatch = cmdContent.match(/npmCommands:\s*\[([\s\S]*?)\],\s*\n\s*\n\s*terminalCommands/);
if (npmMatch) {
    cmdData.npmCommands = eval('[' + npmMatch[1] + ']');
    console.log(`  ✓ Extracted ${cmdData.npmCommands.length} npm commands`);
}

// Terminal commands
const termMatch = cmdContent.match(/terminalCommands:\s*\[([\s\S]*?)\],\s*\n\s*\n\s*dockerCommands/);
if (termMatch) {
    cmdData.terminalCommands = eval('[' + termMatch[1] + ']');
    console.log(`  ✓ Extracted ${cmdData.terminalCommands.length} terminal commands`);
}

// Docker commands
const dockerMatch = cmdContent.match(/dockerCommands:\s*\[([\s\S]*?)\],\s*\n\s*\n\s*httpCommands/);
if (dockerMatch) {
    cmdData.dockerCommands = eval('[' + dockerMatch[1] + ']');
    console.log(`  ✓ Extracted ${cmdData.dockerCommands.length} docker commands`);
}

// HTTP commands
const httpMatch = cmdContent.match(/httpCommands:\s*\[([\s\S]*?)\],\s*\n\s*\n\s*flowSteps/);
if (httpMatch) {
    cmdData.httpCommands = eval('[' + httpMatch[1] + ']');
    console.log(`  ✓ Extracted ${cmdData.httpCommands.length} HTTP status codes`);
}

// Flow steps
const flowMatch = cmdContent.match(/flowSteps:\s*(\{[\s\S]*?\}),\s*\n\s*\n\s*render/);
if (flowMatch) {
    cmdData.flowSteps = eval('(' + flowMatch[1] + ')');
    console.log(`  ✓ Extracted flow steps for ${Object.keys(cmdData.flowSteps).length} categories`);
}

fs.writeFileSync(path.join(dataDir, 'commands.json'), JSON.stringify(cmdData, null, 2));
console.log(`  ✓ Wrote data/commands.json`);

console.log('\n✅ All data extracted successfully!');
