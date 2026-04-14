'use client';

import { useEffect } from 'react';

export function useServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(async () => {
          // Send CLEAR_CACHE message on every page load/refresh
          const controller = navigator.serviceWorker.controller;
          if (controller) {
            controller.postMessage({ type: 'CLEAR_CACHE' });
          } else {
            // Wait for SW to take control then clear
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              navigator.serviceWorker.controller?.postMessage({ type: 'CLEAR_CACHE' });
            }, { once: true });
          }
        })
        .catch(() => {
          // Service Worker registration failed
        });
    }
  }, []);
}
