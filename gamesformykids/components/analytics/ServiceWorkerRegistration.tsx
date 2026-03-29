'use client';

import { useServiceWorkerRegistration } from './useServiceWorkerRegistration';

export default function ServiceWorkerRegistration() {
  useServiceWorkerRegistration();
  return null; // This component doesn't render anything
}
