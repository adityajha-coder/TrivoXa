const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        page.on('console', msg => {
            console.log(`[BROWSER CONSOLE] ${msg.type()}: ${msg.text()}`);
        });

        page.on('pageerror', error => {
            console.log(`[BROWSER PAGEERROR] ${error.message}\n${error.stack}`);
        });

        console.log("Navigating to app...");
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
        
        console.log("Clicking Code & Git Explorer...");
        await page.evaluate(() => {
            document.querySelector('[data-page="code-git-explorer"]').click();
        });
        
        await new Promise(r => setTimeout(r, 1000));
        
        console.log("Typing 'vuejs/core'...");
        await page.evaluate(() => {
            document.getElementById('explorer-input').value = 'vuejs/core';
            document.getElementById('explorer-btn').click();
        });

        console.log("Waiting for search...");
        await new Promise(r => setTimeout(r, 8000));
        
        console.log("Checking for canvas...");
        const html = await page.evaluate(() => {
            const el = document.getElementById('structure-3d');
            return el ? el.innerHTML : 'No element';
        });
        console.log("Canvas innerHTML length: " + html.length);

        console.log("Done.");
        await browser.close();
    } catch (e) {
        console.error("Puppeteer Script Error:", e);
    }
})();
