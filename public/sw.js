const CACHE_NAME = "TrivoXa-v12";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/public/favicon.svg",
  "/public/manifest.json",
  "/public/icons/icon-192.svg",
  "/public/icons/icon-512.svg",
  "/public/og-image.png",
  "/public/hero-3d.jpg",
  "/css/base.css",
  "/css/layout.css",
  "/css/components.css",
  "/css/pages.css",
  "/css/pages/dashboard.css",
  "/css/pages/hero.css",
  "/css/pages/ai.css",
  "/css/pages/git-explorer.css",
  "/css/pages/tools.css",
  "/css/pages/workspace.css",
  "/css/animations.css",
  "/js/utils/helpers.js",
  "/js/auth/apiAuth.js",
  "/js/git/apiGithub.js",
  "/js/utils/api.js",
  "/js/auth/authModal.js",
  "/js/ui/settingsModal.js",
  "/js/ui/navbar.js",
  "/js/ui/loader.js",
  "/js/dashboard/heroSection.js",
  "/js/dashboard/overviewSection.js",
  "/js/dashboard/dashboard.js",
  "/js/ai/aiChat.js",
  "/js/ai/aiArchitect.js",
  "/js/ai/aiStacks.js",
  "/js/ai/askAi.js",
  "/js/git/githubUser.js",
  "/js/git/githubStructure.js",
  "/js/git/githubGit.js",
  "/js/workspace/workspaceDB.js",
  "/js/workspace/workspace.js",
  "/js/docs/docs.js",
  "/js/tools/toolsVault.js",
  "/js/tools/commands.js",
  "/js/tools/freeApis.js",
  "/js/git/codeGitExplorer.js",
  "/js/core/router.js",
  "/js/core/app.js",
  "/data/apis.json",
  "/data/commands.json",
  "/data/tools.json",
  "/data/extensions.json",
];

// API responses caching for offline use
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

  // skip our local proxy calls
  if (url.includes("/api/")) return;

  // GitHub and npm API calls
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

  // CDN libraries
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
