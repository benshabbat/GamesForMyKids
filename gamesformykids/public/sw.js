// GamesForMyKids Service Worker - Optimized for FCP
const CACHE_NAME = 'games-for-my-kids-v2';
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
  // Only cache critical assets for faster FCP
];

const NON_CRITICAL_ASSETS = [
  '/games',
  '/games/puzzles',
  '/games/memory',
  '/games/counting',
  // Add other important routes here
];

// Install event - cache only critical assets first
self.addEventListener('install', (event) => {
  console.log('🎮 GamesForMyKids Service Worker installing...');
  event.waitUntil(
    Promise.all([
      // Cache critical assets immediately
      caches.open(CACHE_NAME).then((cache) => {
        console.log('📦 Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      }),
      // Cache non-critical assets after a delay
      new Promise((resolve) => {
        setTimeout(() => {
          caches.open(CACHE_NAME).then((cache) => {
            console.log('📦 Caching non-critical assets');
            return cache.addAll(NON_CRITICAL_ASSETS).then(resolve);
          }).catch(resolve); // Don't fail if non-critical assets fail
        }, 2000);
      })
    ]).catch((error) => {
      console.log('❌ Cache install failed:', error);
    })
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
