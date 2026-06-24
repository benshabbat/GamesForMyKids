// GamesForMyKids Service Worker
// Bump CACHE_VERSION on each deploy to invalidate old caches.
const CACHE_VERSION = 'v3';
const STATIC_CACHE  = `gfk-static-${CACHE_VERSION}`;   // _next/static/* — content-addressed, cache forever
const PAGES_CACHE   = `gfk-pages-${CACHE_VERSION}`;    // HTML navigation — stale-while-revalidate
const ASSETS_CACHE  = `gfk-assets-${CACHE_VERSION}`;   // images / audio — cache-first
const ALL_CACHES    = [STATIC_CACHE, PAGES_CACHE, ASSETS_CACHE];

const PRECACHE_URLS = [
  '/', '/offline', '/manifest.json', '/favicon.ico',
  '/games/animals', '/games/colors', '/games/numbers',
  '/games/fruits', '/games/letters', '/games/shapes',
  '/games/memory', '/games/math', '/games/counting', '/games/vehicles',
];

// ── Install: pre-cache critical pages ────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGES_CACHE).then((cache) =>
      Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)))
    )
  );
  self.skipWaiting();
});

// ── Activate: delete stale caches ────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => !ALL_CACHES.includes(k)).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: strategy per request type ─────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only intercept same-origin GET requests
  if (request.method !== 'GET') return;
  let url;
  try { url = new URL(request.url); } catch { return; }
  if (url.origin !== self.location.origin) return;

  // Skip API routes and Next.js image optimisation
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/image')) return;

  // Next.js static chunks — content-addressed → cache forever
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Images and audio — cache-first
  if (/\.(png|jpe?g|svg|gif|webp|ico|mp3|wav|ogg)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, ASSETS_CACHE));
    return;
  }

  // HTML navigation and game pages — stale-while-revalidate with offline fallback
  if (request.mode === 'navigate' || url.pathname.startsWith('/games/')) {
    event.respondWith(staleWhileRevalidate(request, PAGES_CACHE));
    return;
  }
});

// ── Strategy helpers ──────────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) {
    networkFetch; // update cache in background
    return cached;
  }

  // Nothing cached — wait for network
  const response = await networkFetch;
  if (response) return response;

  // Both failed — serve offline page
  return (
    (await cache.match('/offline')) ??
    (await caches.match('/offline')) ??
    new Response('אופס! אין חיבור לאינטרנט', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  );
}
