// Service Worker for DevRoadmaps — Offline Support
const CACHE_NAME = 'devroadmaps-v5';
const STATIC_ASSETS = [
  './',
  './index.html',
  './roadmap.html',
  './css/style.css',
  './js/main.js',
  './js/community.js',
  './js/learning-paths.js',
  './js/timer.js',
  './roadmaps/index.json',
];

// Cache roadmap JSON files
const ROADMAP_FILES = [
  'frontend', 'backend', 'fullstack', 'ml-ai', 'devops', 'mobile',
  'cybersecurity', 'data-engineer', 'blockchain', 'game-dev',
  'embedded-iot', 'product-manager', 'devsecops', 'qa-engineer',
  'technical-writer', 'low-code-no-code', 'cloud-architect'
];

// Install event — cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache static assets first
      return cache.addAll(STATIC_ASSETS).then(() => {
        // Then cache all roadmap JSONs
        const roadmapPromises = ROADMAP_FILES.map(id =>
          fetch(`./roadmaps/${id}.json`)
            .then(response => {
              if (response.ok) {
                return cache.put(`./roadmaps/${id}.json`, response);
              }
              return Promise.resolve();
            })
            .catch(() => Promise.resolve())
        );
        return Promise.all(roadmapPromises);
      });
    })
  );
  self.skipWaiting();
});

// Activate event — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch event — cache-first strategy
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        // Return cached version, but update cache in background
        fetch(event.request).then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response);
            });
          }
        }).catch(() => {});
        return cached;
      }
      // Not in cache, fetch from network
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        // Offline fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      });
    })
  );
});

// Handle offline/online status
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_OFFLINE') {
    // Just acknowledging — the client handles offline detection
  }
});
