const CACHE_NAME = "TrivoXa";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/public/favicon.svg",
  "/public/manifest.json",
  "/public/icons/icon-192.svg",
  "/public/icons/icon-512.svg",
  "/css/base.css",
  "/css/layout.css",
  "/css/components.css",
  "/css/pages.css",
  "/css/animations.css",
  "/js/utils/helpers.js",
  "/js/utils/api.js",
  "/js/ui/navbar.js",
  "/js/components/ui/loader.js",
  "/js/dashboard/dashboard.js",
  "/js/pages/main/workspace.js",
  "/js/pages/main/docs.js",
  "/js/pages/tools/toolsVault.js",
  "/js/pages/tools/commands.js",
  "/js/pages/tools/freeApis.js",
  "/js/pages/tools/packageScout.js",
  "/js/pages/ai/aiChat.js",
  "/js/pages/ai/aiArchitect.js",
  "/js/pages/ai/aiStacks.js",
  "/js/pages/ai/askAi.js",
  "/js/pages/gitExplorer/githubUser.js",
  "/js/pages/gitExplorer/githubStructure.js",
  "/js/pages/gitExplorer/githubGit.js",
  "/js/pages/gitExplorer/codeGitExplorer.js",
  "/js/core/router.js",
  "/js/core/app.js",
];

// API responses worth caching for offline use
const API_CACHE = "vertex-api-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_NAME && k !== API_CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // skip our local proxy calls — don't cache AI responses
  if (url.includes("/api/")) return;

  // GitHub and npm API calls: network-first, cache fallback
  if (url.includes("api.github.com") || url.includes("registry.npmjs.org")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches
            .open(API_CACHE)
            .then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  // CDN libraries (three.js, monaco, fontawesome, etc): cache-first
  if (
    url.includes("cdnjs.cloudflare.com") ||
    url.includes("unpkg.com") ||
    url.includes("fonts.googleapis.com") ||
    url.includes("fonts.gstatic.com") ||
    url.includes("fontawesome")
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));
          return response;
        });
      }),
    );
    return;
  }

  // static assets: cache first, then network
  event.respondWith(
    caches
      .match(event.request)
      .then((cached) => cached || fetch(event.request)),
  );
});

// Listen for messages from the app
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    self.skipWaiting();
  }
});
