const puppeteer = require('puppeteer');

const url = 'http://localhost:8080';

// pages to check
const pages = [
    '/',
    '/#dashboard',
    '/#explorer',
    '/#ask-ai',
    '/#tools',
    '/#packages',
    '/#commands',
    '/#apis',
    '/#ai-chat',
    '/#ai-architect',
    '/#ai-codegen',
    '/#ai-analyzer',
    '/#ai-stacks'
];

async function checkSite() {
    console.log('Testing site routes...');
    let browser;
    try {
        browser = await puppeteer.launch({ headless: 'new' });
    } catch (e) {
        console.error('Cant launch puppeteer - make sure its installed via npm i puppeteer');
        process.exit(1);
    }

    const page = await browser.newPage();
    let errCount = 0;

    page.on('pageerror', err => {
        console.error(`Page error: ${err.message}`);
        errCount++;
    });

    page.on('requestfailed', req => {
        const u = req.url();
        if (u.includes('google-analytics') || u.includes('api.github.com')) return;
        console.log(`Failed request: ${u} - ${req.failure()?.errorText || 'Unknown'}`);
    });

    for (const p of pages) {
        process.stdout.write(`Testing: ${p} ... `);
        try {
            await page.goto(`${url}${p}`, { waitUntil: 'networkidle2', timeout: 8000 });
            console.log('OK');
        } catch (err) {
            console.log(`Failed: ${err.message}`);
            errCount++;
        }
        await page.waitForTimeout(1000); 
    }

    await browser.close();

    console.log('---');
    if (errCount === 0) {
        console.log('Done, all looks good.');
    } else {
        console.log(`Done, found ${errCount} errors. Check the logs.`);
    }
}

checkSite().catch(console.error);

