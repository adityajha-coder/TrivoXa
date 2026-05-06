const CACHE_NAME = 'vertex-v4';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/public/favicon.svg',
    '/public/manifest.json',
    '/public/icons/icon-192.svg',
    '/public/icons/icon-512.svg',
    '/css/base.css?v=5',
    '/css/layout.css?v=5',
    '/css/components.css?v=4',
    '/css/pages.css?v=4',
    '/css/animations.css?v=4',
    '/js/utils/helpers.js?v=7',
    '/js/utils/api.js?v=8',
    '/js/components/ui/navbar.js?v=7',
    '/js/components/ui/loader.js?v=7',
    '/js/pages/main/dashboard.js?v=8',
    '/js/pages/main/workspace.js?v=10',
    '/js/pages/main/docs.js?v=13',
    '/js/pages/tools/toolsVault.js?v=8',
    '/js/pages/tools/commands.js?v=6',
    '/js/pages/tools/freeApis.js?v=15',
    '/js/pages/tools/packageScout.js?v=8',
    '/js/pages/ai/aiChat.js?v=2',
    '/js/pages/ai/aiArchitect.js?v=2',
    '/js/pages/ai/aiCodegen.js?v=2',
    '/js/pages/ai/aiStacks.js?v=1',
    '/js/pages/ai/askAi.js?v=11',
    '/js/pages/gitExplorer/githubUser.js?v=1',
    '/js/pages/gitExplorer/githubStructure.js?v=1',
    '/js/pages/gitExplorer/githubGit.js?v=1',
    '/js/pages/gitExplorer/codeGitExplorer.js?v=10',
    '/js/core/router.js?v=7',
    '/js/core/app.js?v=6'
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
