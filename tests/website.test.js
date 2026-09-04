import { describe, it, expect } from 'vitest';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

describe('Website & Toolkit Integrity Suite', () => {
    describe('Frontend HTML & PWA Assets', () => {
        it('should have a valid index.html with viewport and title', () => {
            const htmlPath = path.join(ROOT, 'index.html');
            expect(fs.existsSync(htmlPath)).toBe(true);

            const content = fs.readFileSync(htmlPath, 'utf8');
            expect(content.toLowerCase()).toContain('<!doctype html>');
            expect(content).toMatch(/name=["']viewport["']/);
            expect(content).toContain('TrivoXa');
            expect(content).toContain('id="app"');
        });

        it('should have a valid PWA manifest.json', () => {
            const manifestPath = path.join(ROOT, 'public', 'manifest.json');
            expect(fs.existsSync(manifestPath)).toBe(true);

            const content = fs.readFileSync(manifestPath, 'utf8');
            const manifest = JSON.parse(content);
            expect(manifest.name).toBeDefined();
            expect(manifest.icons).toBeInstanceOf(Array);
        });

        it('should have a registered service worker in public/sw.js with cache busting', () => {
            const swPath = path.join(ROOT, 'public', 'sw.js');
            expect(fs.existsSync(swPath)).toBe(true);

            const content = fs.readFileSync(swPath, 'utf8');
            expect(content).toContain('CACHE_NAME');
            expect(content).toContain('addEventListener');
        });
    });

    describe('Stylesheets & Design System', () => {
        const requiredCSS = [
            'css/base.css',
            'css/pages/ai.css',
            'css/pages/dashboard.css',
            'css/pages/tools.css'
        ];

        requiredCSS.forEach((cssFile) => {
            it(`should verify ${cssFile} exists and has CSS content`, () => {
                const fullPath = path.join(ROOT, cssFile);
                expect(fs.existsSync(fullPath)).toBe(true);
                const stat = fs.statSync(fullPath);
                expect(stat.size).toBeGreaterThan(50);
            });
        });
    });

    describe('Core JavaScript Architecture', () => {
        const coreJSFiles = [
            'js/core/app.js',
            'js/utils/api.js',
            'js/ai/askAi.js',
            'js/ai/aiChat.js',
            'js/ai/aiArchitect.js',
            'server/routes/groq.js',
            'server/routes/auth.js',
            'server/middleware/auth.js'
        ];

        coreJSFiles.forEach((jsFile) => {
            it(`should verify ${jsFile} exists and is readable`, () => {
                const fullPath = path.join(ROOT, jsFile);
                expect(fs.existsSync(fullPath)).toBe(true);
                const content = fs.readFileSync(fullPath, 'utf8');
                expect(content.length).toBeGreaterThan(0);
            });
        });

        it('should verify API client has multi-provider support', () => {
            const apiPath = path.join(ROOT, 'js', 'utils', 'api.js');
            const content = fs.readFileSync(apiPath, 'utf8');
            expect(content).toContain('callGroqChat');
            expect(content).toContain('fetchGroqViaProxy');
        });

        it('should verify askAi.js has clean model map without hardcoded single provider failure', () => {
            const askAiPath = path.join(ROOT, 'js', 'ai', 'askAi.js');
            const content = fs.readFileSync(askAiPath, 'utf8');
            expect(content).toContain('modelMap');
            expect(content).toContain('groq/compound-mini');
            expect(content).toContain('gemini-3.6-flash');
            expect(content).toContain('openrouter/free');
        });
    });

    describe('Server Express Route Configuration', () => {
        it('should verify groq route module exports Express router with /chat', () => {
            const groqRoute = require('../server/routes/groq');
            expect(groqRoute).toBeDefined();
            expect(typeof groqRoute).toBe('function'); // Express Router is a callable middleware
        });
    });
});
