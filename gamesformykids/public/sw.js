// GamesForMyKids Service Worker
const CACHE_NAME = 'games-for-my-kids-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  // Core app files will be cached dynamically
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🎮 GamesForMyKids Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        console.log('📦 Caching static assets');
        // Cache assets one by one to avoid failures
        const cachePromises = STATIC_ASSETS.map(async (asset) => {
          try {
            await cache.add(asset);
            console.log(`✅ Cached: ${asset}`);
          } catch (error) {
            console.log(`❌ Failed to cache ${asset}:`, error);
          }
        });
        await Promise.allSettled(cachePromises);
      })
      .catch((error) => {
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

  // Skip requests to external domains
  if (!event.request.url.includes(self.location.origin)) {
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
            // Don't cache failed responses or non-basic responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Don't cache authentication-related responses
            if (response.status === 401 || response.status === 403) {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();
            
            // Cache the response for future use (for GET requests only)
            if (event.request.method === 'GET') {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                })
                .catch((error) => {
                  console.log('❌ Failed to cache response:', error);
                });
            }

            return response;
          })
          .catch((error) => {
            console.log('🌐 Network request failed:', error);
            
            // For manifest.json specifically, try to serve from cache
            if (event.request.url.includes('manifest.json')) {
              return caches.match('/manifest.json');
            }
            
            // For other requests, return a custom offline response
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
