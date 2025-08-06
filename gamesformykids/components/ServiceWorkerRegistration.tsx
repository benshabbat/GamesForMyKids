'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
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
  }, []);

  return null; // This component doesn't render anything
}
