'use client';

import { useState, useCallback } from 'react';

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => setError(null), []);

  const captureError = useCallback((error: Error, context?: string) => {
    console.error(`Game Error${context ? ` (${context})` : ''}:`, error);
    setError(error);
    
    // Report to analytics/monitoring service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as Window & { gtag: (event: string, action: string, params: object) => void }).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: { context }
      });
    }
  }, []);

  if (error) throw error; // Let ErrorBoundary catch it

  return { resetError, captureError };
}