'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Defer service worker registration to not block initial paint
    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then(() => {
            // Service Worker registered successfully
          })
          .catch(() => {
            // Service Worker registration failed
          });
      }
    };

    // Register after initial load to not impact FCP
    if (document.readyState === 'complete') {
      setTimeout(registerServiceWorker, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(registerServiceWorker, 100);
      });
    }
  }, []);

  return null; // This component doesn't render anything
}
