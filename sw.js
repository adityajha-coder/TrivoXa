const CACHE_NAME = 'vertex';
const STATIC_ASSETS = [
    '/index.html',
    '/favicon.svg',
    '/css/base.css',
    '/css/layout.css',
    '/css/components.css',
    '/css/pages.css',
    '/css/animations.css',
    '/js/utils/helpers.js',
    '/js/utils/api.js',
    '/js/components/navbar.js',
    '/js/components/loader.js',
    '/js/pages/dashboard.js',
    '/js/pages/askAi.js',
    '/js/pages/docs.js',
    '/js/pages/codeGitExplorer.js',
    '/js/pages/freeApis.js',
    '/js/pages/packageScout.js',
    '/js/pages/commands.js',
    '/js/pages/workspace.js',
    '/js/pages/toolsVault.js',
    '/js/pages/aiArchitect.js',
    '/js/router.js',
    '/js/search.js',
    '/js/app.js',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes('api.github.com') || event.request.url.includes('registry.npmjs.org')) {
        event.respondWith(
            fetch(event.request).then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            }).catch(() => caches.match(event.request))
        );
        return;
    }
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});
