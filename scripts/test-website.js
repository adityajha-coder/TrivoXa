/**
 * TrivoXa Developer Toolkit — Full Website Test
 * 
 * Tests:
 *   1. Frontend server (port 8080) is alive
 *   2. Backend API server (port 3001) is alive
 *   3. All CSS files load correctly
 *   4. All JS files load correctly
 *   5. All page routes render (hash-based SPA)
 *   6. All API endpoints respond
 *   7. PWA assets (manifest, service worker, icons)
 *
 * Usage:
 *   node scripts/test-website.js
 *   npm run test:site
 */

const http = require('http');

const FRONTEND = 'http://localhost:8080';
const BACKEND = 'http://localhost:3001';

// ── Helpers ──────────────────────────────────────────────

let passed = 0;
let failed = 0;
let skipped = 0;

const colors = {
    green: (t) => `\x1b[32m${t}\x1b[0m`,
    red: (t) => `\x1b[31m${t}\x1b[0m`,
    yellow: (t) => `\x1b[33m${t}\x1b[0m`,
    cyan: (t) => `\x1b[36m${t}\x1b[0m`,
    dim: (t) => `\x1b[2m${t}\x1b[0m`,
    bold: (t) => `\x1b[1m${t}\x1b[0m`,
};

function fetch(url, options = {}, redirectCount = 0) {
    return new Promise((resolve, reject) => {
        if (redirectCount > 5) {
            reject(new Error('TOO_MANY_REDIRECTS'));
            return;
        }

        const timeout = setTimeout(() => {
            reject(new Error('TIMEOUT'));
        }, 5000);

        const req = http.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                clearTimeout(timeout);
                const location = res.headers.location;
                const nextUrl = location.startsWith('http') ? location : new URL(location, url).href;
                resolve(fetch(nextUrl, options, redirectCount + 1));
                return;
            }

            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                clearTimeout(timeout);
                resolve({ status: res.statusCode, body, headers: res.headers });
            });
        });

        req.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}

function fetchPost(url, data) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('TIMEOUT')), 5000);
        const body = JSON.stringify(data);
        const urlObj = new URL(url);

        const req = http.request({
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
            },
        }, (res) => {
            let resBody = '';
            res.on('data', (chunk) => resBody += chunk);
            res.on('end', () => {
                clearTimeout(timeout);
                resolve({ status: res.statusCode, body: resBody, headers: res.headers });
            });
        });

        req.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });

        req.write(body);
        req.end();
    });
}

async function test(name, fn) {
    try {
        await fn();
        passed++;
        console.log(`  ${colors.green('✓')} ${name}`);
    } catch (err) {
        if (err.message === 'SKIP') {
            skipped++;
            console.log(`  ${colors.yellow('○')} ${name} ${colors.dim('(skipped)')}`);
        } else {
            failed++;
            const msg = err.message === 'TIMEOUT' ? 'Request timed out' : err.message;
            console.log(`  ${colors.red('✗')} ${name} ${colors.dim(`— ${msg}`)}`);
        }
    }
}

// ── Test Suites ──────────────────────────────────────────

async function testFrontendServer() {
    console.log(`\n${colors.bold('▸ Frontend Server')} ${colors.dim(`(${FRONTEND})`)}`);

    await test('index.html loads (200)', async () => {
        const res = await fetch(`${FRONTEND}/index.html`);
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
        if (!res.body.includes('<div id="app">')) throw new Error('Missing #app container');
        if (!res.body.includes('TrivoXa')) throw new Error('Missing TrivoXa title');
    });

    await test('index.html contains all script tags', async () => {
        const res = await fetch(`${FRONTEND}/index.html`);
        const requiredScripts = [
            'js/utils/helpers.js', 'js/auth/apiAuth.js', 'js/git/apiGithub.js',
            'js/utils/api.js', 'js/auth/authModal.js', 'js/ui/settingsModal.js', 'js/ui/navbar.js',
            'js/ui/loader.js', 'js/dashboard/dashboard.js', 'js/ai/aiChat.js',
            'js/ai/aiArchitect.js', 'js/ai/aiStacks.js', 'js/ai/askAi.js',
            'js/git/githubUser.js', 'js/git/githubStructure.js', 'js/git/githubGit.js',
            'js/workspace/workspaceDB.js', 'js/workspace/workspace.js', 'js/docs/docs.js',
            'js/tools/toolsVault.js', 'js/tools/commands.js', 'js/tools/freeApis.js',
            'js/git/codeGitExplorer.js', 'js/core/router.js',
            'js/core/app.js'
        ];
        const missing = requiredScripts.filter(s => !res.body.includes(s));
        if (missing.length > 0) throw new Error(`Missing scripts: ${missing.join(', ')}`);
    });

    await test('No reference to deleted files', async () => {
        const res = await fetch(`${FRONTEND}/index.html`);
        if (res.body.includes('firebase-init')) throw new Error('Still references firebase-init.js');
        if (res.body.includes('groq-proxy')) throw new Error('Still references groq-proxy.js');
    });
}

async function testCSSAssets() {
    console.log(`\n${colors.bold('▸ CSS Assets')}`);
    const cssFiles = ['base.css', 'layout.css', 'components.css', 'pages.css', 'animations.css'];

    for (const file of cssFiles) {
        await test(`css/${file} loads (200)`, async () => {
            const res = await fetch(`${FRONTEND}/css/${file}`);
            if (res.status !== 200) throw new Error(`Status ${res.status}`);
            if (res.body.length < 100) throw new Error(`File too small (${res.body.length} bytes)`);
        });
    }
}

async function testJSAssets() {
    console.log(`\n${colors.bold('▸ JS Assets')}`);
    const jsFiles = [
        'js/utils/helpers.js', 'js/auth/apiAuth.js', 'js/git/apiGithub.js',
        'js/utils/api.js', 'js/auth/authModal.js', 'js/ui/settingsModal.js', 'js/ui/navbar.js',
        'js/ui/loader.js', 'js/dashboard/dashboard.js', 'js/ai/aiChat.js',
        'js/ai/aiArchitect.js', 'js/ai/aiStacks.js', 'js/ai/askAi.js',
        'js/git/githubUser.js', 'js/git/githubStructure.js', 'js/git/githubGit.js',
        'js/workspace/workspaceDB.js', 'js/workspace/workspace.js', 'js/docs/docs.js',
        'js/tools/toolsVault.js', 'js/tools/commands.js', 'js/tools/freeApis.js',
        'js/git/codeGitExplorer.js', 'js/core/router.js',
        'js/core/app.js'
    ];

    for (const file of jsFiles) {
        const name = file.split('/').pop();
        await test(`${name} loads (200)`, async () => {
            const res = await fetch(`${FRONTEND}/${file}`);
            if (res.status !== 200) throw new Error(`Status ${res.status}`);
            if (res.body.length < 50) throw new Error(`File too small (${res.body.length} bytes)`);
        });
    }
}

async function testDeletedFilesGone() {
    console.log(`\n${colors.bold('▸ Deleted Files (should 404)')}`);
    const deletedFiles = [
        'js/utils/firebase-init.js',
        'server/groq-proxy.js',
        'scripts/start-proxy.bat',
        'scripts/start-proxy.ps1',
        'scripts/test-api.bat',
        'scripts/test-api.ps1',
    ];

    for (const file of deletedFiles) {
        const name = file.split('/').pop();
        await test(`${name} returns 404 (deleted)`, async () => {
            const res = await fetch(`${FRONTEND}/${file}`);
            // serve returns 200 with index.html for SPA fallback on missing files
            // so we check if the response is the actual file or a fallback
            if (res.status === 200 && !res.body.includes('<!DOCTYPE html>')) {
                throw new Error(`File still exists! Status 200`);
            }
        });
    }
}

async function testPWAAssets() {
    console.log(`\n${colors.bold('▸ PWA Assets')}`);

    await test('manifest.json loads', async () => {
        const res = await fetch(`${FRONTEND}/public/manifest.json`);
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
        const manifest = JSON.parse(res.body);
        if (!manifest.name) throw new Error('Missing name in manifest');
        if (!manifest.icons || manifest.icons.length === 0) throw new Error('Missing icons');
    });

    await test('service worker (sw.js) loads', async () => {
        const res = await fetch(`${FRONTEND}/public/sw.js`);
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
    });

    await test('favicon.svg loads', async () => {
        const res = await fetch(`${FRONTEND}/public/favicon.svg`);
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
    });

    await test('icon-192.svg loads', async () => {
        const res = await fetch(`${FRONTEND}/public/icons/icon-192.svg`);
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
    });

    await test('icon-512.svg loads', async () => {
        const res = await fetch(`${FRONTEND}/public/icons/icon-512.svg`);
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
    });
}

async function testBackendAPI() {
    console.log(`\n${colors.bold('▸ Backend API Server')} ${colors.dim(`(${BACKEND})`)}`);

    await test('Health check — GET /', async () => {
        const res = await fetch(`${BACKEND}/`);
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
        const data = JSON.parse(res.body);
        if (data.status !== 'ok') throw new Error(`Status: ${data.status}`);
    });

    await test('Health check — GET /health', async () => {
        const res = await fetch(`${BACKEND}/health`);
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
    });

    await test('Auth endpoint responds — POST /api/auth/login', async () => {
        const res = await fetchPost(`${BACKEND}/api/auth/login`, {
            email: 'test@nonexistent.com',
            password: 'wrong'
        });
        // 400 or 401 is expected (invalid creds), but NOT 404 or 500
        if (res.status === 404) throw new Error('Route not found (404)');
        if (res.status >= 500) throw new Error(`Server error (${res.status})`);
    });

    await test('Snippets endpoint responds — GET /api/snippets', async () => {
        const res = await fetch(`${BACKEND}/api/snippets`);
        // 401 is expected (no auth token), but NOT 404
        if (res.status === 404) throw new Error('Route not found (404)');
        if (res.status >= 500) throw new Error(`Server error (${res.status})`);
    });

    await test('AI History endpoint responds — GET /api/ai-history', async () => {
        const res = await fetch(`${BACKEND}/api/ai-history`);
        if (res.status === 404) throw new Error('Route not found (404)');
        if (res.status >= 500) throw new Error(`Server error (${res.status})`);
    });

    await test('Docs History endpoint responds — GET /api/docs-history', async () => {
        const res = await fetch(`${BACKEND}/api/docs-history`);
        if (res.status === 404) throw new Error('Route not found (404)');
        if (res.status >= 500) throw new Error(`Server error (${res.status})`);
    });

    await test('Groq chat endpoint responds — POST /api/groq/chat', async () => {
        const res = await fetchPost(`${BACKEND}/api/groq/chat`, {
            messages: [{ role: 'user', content: 'test' }],
            model: 'llama-3.1-8b-instant'
        });
        // Any response that isn't 404 or connection error means the route exists
        if (res.status === 404) throw new Error('Route not found (404)');
    });
}

async function testVercelServerless() {
    console.log(`\n${colors.bold('▸ Vercel Serverless Function')}`);

    await test('api/index.js file exists', async () => {
        const res = await fetch(`${FRONTEND}/api/index.js`);
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
        if (!res.body.includes('module.exports')) throw new Error('Missing module.exports');
    });
}

async function testConfigFiles() {
    console.log(`\n${colors.bold('▸ Config Files')}`);

    await test('vercel.json loads', async () => {
        const res = await fetch(`${FRONTEND}/vercel.json`);
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
        const config = JSON.parse(res.body);
        if (!config.rewrites) throw new Error('Missing rewrites in vercel.json');
    });
}

// ── Main ─────────────────────────────────────────────────

async function main() {
    console.log(colors.bold(`
╔══════════════════════════════════════════════════════╗
║         TrivoXa Developer Toolkit — Full Test         ║
╚══════════════════════════════════════════════════════╝`));

    const startTime = Date.now();

    // Check if servers are reachable first
    let frontendUp = false;
    let backendUp = false;

    try {
        await fetch(`${FRONTEND}/index.html`);
        frontendUp = true;
    } catch {
        console.log(colors.red(`\n  ✗ Frontend server is not running on port 8080`));
        console.log(colors.dim(`    Start it with: npm run dev\n`));
    }

    try {
        await fetch(`${BACKEND}/`);
        backendUp = true;
    } catch {
        console.log(colors.yellow(`\n  ⚠ Backend API server is not running on port 3001`));
        console.log(colors.dim(`    Start it with: npm run proxy`));
        console.log(colors.dim(`    Backend tests will be skipped.\n`));
    }

    if (!frontendUp) {
        console.log(colors.red('\n  Cannot run tests — frontend server is required.\n'));
        process.exit(1);
    }

    // Run test suites
    await testFrontendServer();
    await testCSSAssets();
    await testJSAssets();
    await testDeletedFilesGone();
    await testPWAAssets();
    await testConfigFiles();
    await testVercelServerless();

    if (backendUp) {
        await testBackendAPI();
    } else {
        skipped += 7;
        console.log(colors.yellow(`\n  ○ Skipped 7 backend API tests (server not running)`));
    }

    // Summary
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const total = passed + failed + skipped;

    console.log(colors.bold(`
══════════════════════════════════════════════════════
  Results:  ${colors.green(`${passed} passed`)}  ${failed > 0 ? colors.red(`${failed} failed`) : `${failed} failed`}  ${skipped > 0 ? colors.yellow(`${skipped} skipped`) : `${skipped} skipped`}  ${colors.dim(`(${total} total)`)}
  Time:     ${elapsed}s
══════════════════════════════════════════════════════`));

    if (failed > 0) {
        console.log(colors.red('\n  ✗ Some tests failed! Check the output above.\n'));
        process.exit(1);
    } else {
        console.log(colors.green('\n  ✓ All tests passed! Website is healthy.\n'));
        process.exit(0);
    }
}

main().catch((err) => {
    console.error(colors.red('\n  Fatal error:'), err.message);
    process.exit(1);
});
