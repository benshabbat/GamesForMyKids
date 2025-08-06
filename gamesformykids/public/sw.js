// GamesForMyKids Service Worker - Optimized for 100% Lighthouse
const CACHE_NAME = 'games-for-my-kids-v3';
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
];

const STATIC_ASSETS = [
  '/games',
  '/favicon.ico',
];

// Install event - ultra-fast critical asset caching
self.addEventListener('install', (event) => {
  console.log('🎮 Ultra-fast Service Worker installing...');
  event.waitUntil(
    Promise.all([
      // Cache critical assets immediately with high priority
      caches.open(CACHE_NAME).then((cache) => {
        console.log('📦 Caching critical assets with priority');
        return cache.addAll(CRITICAL_ASSETS);
      }),
      // Cache static assets with lower priority
      new Promise((resolve) => {
        setTimeout(() => {
          caches.open(CACHE_NAME).then((cache) => {
            console.log('📦 Caching static assets');
            return cache.addAll(STATIC_ASSETS).then(resolve).catch(resolve);
          });
        }, 100); // Micro delay to not block critical path
      })
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('✅ GamesForMyKids Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  // Skip non-HTTP requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();
            
            // Cache the response for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.log('🌐 Network request failed:', error);
            // You could return a custom offline page here
            return new Response('אופס! נראה שאין חיבור לאינטרנט', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain; charset=utf-8'
              })
            });
          });
      })
  );
});
