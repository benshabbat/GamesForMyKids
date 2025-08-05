/**
 * Performance utilities for Next.js 15 optimizations
 */

import { cache } from 'react';
import { unstable_cache } from 'next/cache';

// React 19 cache for server-side memoization
export const memoizedFetch = cache(async (url: string) => {
  const response = await fetch(url);
  return response.json();
});

// Next.js cache with revalidation
export const cachedGameData = unstable_cache(
  async (gameId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    return { gameId, data: `Game data for ${gameId}` };
  },
  ['game-data'],
  { 
    revalidate: 3600, // 1 hour
    tags: ['games'] 
  }
);

// Performance monitoring utilities
export const performanceMonitor = {
  measureComponentRender: (componentName: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const startTime = performance.now();
      return () => {
        const endTime = performance.now();
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.info(`${componentName} render time: ${endTime - startTime}ms`);
        }
      };
    }
    return () => {};
  },

  markInteraction: (interactionName: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`interaction-${interactionName}-start`);
      return () => {
        performance.mark(`interaction-${interactionName}-end`);
        performance.measure(
          `interaction-${interactionName}`,
          `interaction-${interactionName}-start`,
          `interaction-${interactionName}-end`
        );
      };
    }
    return () => {};
  }
};

// Web Vitals metric type
interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Web Vitals tracking
export const trackWebVital = (metric: WebVitalMetric) => {
  if (process.env.NODE_ENV === 'production') {
    // Track to analytics service
    // eslint-disable-next-line no-console
    console.info('Web Vital:', metric);
  }
};
