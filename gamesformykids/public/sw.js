// Ultra-lightweight Service Worker for 100% Lighthouse score
const CACHE_NAME = 'games-cache-v5';

// Minimal critical assets
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
];

// Install - ultra-fast
self.addEventListener('install', (event) => {
  console.log('🚀 Installing ultra-lightweight SW');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  console.log('✅ SW activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch - smart caching without 404 errors
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;
  
  // Handle static assets and pages
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname === '/' || 
      url.pathname.startsWith('/games') ||
      url.pathname === '/manifest.json') {
    
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) {
          return cached;
        }
        
        return fetch(event.request).then((response) => {
          // Only cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          // Return cached version if available on network failure
          return caches.match(event.request);
        });
      })
    );
  }
});
