// Service Worker Test Script
// This file can be used to test service worker functionality

console.log('🧪 Testing Service Worker...');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('📋 Current registrations:', registrations.length);
    registrations.forEach((registration, index) => {
      console.log(`Registration ${index + 1}:`, {
        scope: registration.scope,
        state: registration.active ? registration.active.state : 'inactive'
      });
    });
  });

  // Test cache availability
  if ('caches' in window) {
    caches.keys().then(cacheNames => {
      console.log('💾 Available caches:', cacheNames);
      
      cacheNames.forEach(cacheName => {
        caches.open(cacheName).then(cache => {
          cache.keys().then(keys => {
            console.log(`Cache "${cacheName}" contains:`, keys.map(k => k.url));
          });
        });
      });
    });
  }
} else {
  console.log('❌ Service Worker not supported');
}
