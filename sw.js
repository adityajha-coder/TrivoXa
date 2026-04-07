const CACHE_NAME = 'vertex-v3';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/favicon.svg',
    '/manifest.json',
    '/css/base.css?v=5',
    '/css/layout.css?v=5',
    '/css/components.css?v=4',
    '/css/pages.css?v=4',
    '/css/animations.css?v=4',
    '/js/utils/helpers.js?v=6',
    '/js/utils/api.js?v=6',
    '/js/components/navbar.js?v=6',
    '/js/components/loader.js?v=6',
    '/js/pages/dashboard.js?v=8',
    '/js/pages/askAi.js?v=11',
    '/js/pages/docs.js?v=5',
    '/js/pages/codeGitExplorer.js?v=8',
    '/js/pages/freeApis.js?v=14',
    '/js/pages/packageScout.js?v=7',
    '/js/pages/commands.js?v=7',
    '/js/pages/workspace.js?v=7',
    '/js/pages/toolsVault.js?v=11',
    '/js/pages/ai/aiChat.js?v=1',
    '/js/pages/ai/aiArchitect.js?v=1',
    '/js/pages/ai/aiCodegen.js?v=1',
    '/js/pages/ai/aiAnalyzer.js?v=1',
    '/js/pages/ai/aiStacks.js?v=1',
    '/js/pages/gitExplorer/githubUser.js?v=1',
    '/js/pages/gitExplorer/githubStructure.js?v=1',
    '/js/pages/gitExplorer/githubGit.js?v=1',
    '/js/router.js?v=7',
    '/js/search.js?v=1',
    '/js/app.js?v=6'
];

// API responses worth caching for offline use
const API_CACHE = 'vertex-api-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CACHE_NAME && k !== API_CACHE).map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const url = event.request.url;

    // skip our local proxy calls — don't cache AI responses
    if (url.includes('/api/')) return;

    // GitHub and npm API calls: network-first, cache fallback
    if (url.includes('api.github.com') || url.includes('registry.npmjs.org')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(API_CACHE).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // CDN libraries (three.js, monaco, fontawesome, etc): cache-first
    if (url.includes('cdnjs.cloudflare.com') || url.includes('unpkg.com') || url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com') || url.includes('fontawesome')) {
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) return cached;
                return fetch(event.request).then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                });
            })
        );
        return;
    }

    // static assets: cache first, then network
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});

// Listen for messages from the app
self.addEventListener('message', event => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
