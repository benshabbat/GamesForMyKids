'use client';

import { useEffect } from 'react';

export function useServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service Worker registration failed silently
      });
    }
  }, []);
}
