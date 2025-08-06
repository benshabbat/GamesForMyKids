/**
 * Enhanced Performance monitoring hook for Next.js 15
 * Implements Core Web Vitals, resource monitoring, and advanced analytics
 */

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { isBrowser, debounce } from '@/lib/utils';

// Enhanced interfaces for better type safety
interface CoreWebVitals {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  inp?: number; // Interaction to Next Paint (new metric)
}

interface ComponentMetrics {
  renderTime: number;
  loadTime: number;
  mountTime: number;
  updateCount: number;
  errorCount: number;
  memoryUsage?: number;
}

interface UsePerformanceOptions {
  componentName?: string;
  trackWebVitals?: boolean;
  trackMemory?: boolean;
  trackInteractions?: boolean;
  trackErrors?: boolean;
  reportInterval?: number;
  onMetric?: (type: string, value: number, context?: Record<string, unknown>) => void;
  onReport?: (report: PerformanceReport) => void;
}

interface PerformanceReport {
  componentName?: string;
  webVitals: CoreWebVitals;
  componentMetrics: ComponentMetrics;
  resourceMetrics: {
    totalResources: number;
    totalSize: number;
    slowResources: Array<{ name: string; duration: number }>;
  };
  timestamp: number;
  sessionId: string;
}

export function usePerformance(
  componentName: string,
  options: UsePerformanceOptions = {}
) {
  const {
    trackInteractions = true,
    trackMemory = false,
    enableWebVitals = true,
    onMetric,
  } = options;

  const renderStartTime = useRef<number>(performance.now());
  const loadStartTime = useRef<number>(performance.now());
  const metricsRef = useRef<Partial<PerformanceMetrics>>({});

  // Track render performance
  const trackRenderTime = useCallback(() => {
    const renderTime = performance.now() - renderStartTime.current;
    metricsRef.current.renderTime = renderTime;

    if (renderTime > PERFORMANCE.SLOW_RENDER_THRESHOLD) {
      console.warn(`⚠️ Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
    }

    onMetric?.({ renderTime });
  }, [componentName, onMetric]);

  // Track interaction performance
  const trackInteraction = useCallback((interactionName: string) => {
    if (!trackInteractions) return;

    const startTime = performance.now();
    
    return () => {
      const interactionTime = performance.now() - startTime;
      metricsRef.current.interactionTime = interactionTime;
      
      console.log(`🎯 Interaction "${interactionName}" in ${componentName}: ${interactionTime.toFixed(2)}ms`);
      onMetric?.({ interactionTime });
    };
  }, [componentName, trackInteractions, onMetric]);

  // Track memory usage
  const trackMemoryUsage = useCallback(() => {
    if (!trackMemory || !('memory' in performance)) return;

    const memoryInfo = (performance as any).memory;
    const memoryUsage = memoryInfo.usedJSHeapSize / 1024 / 1024; // MB
    
    metricsRef.current.memoryUsage = memoryUsage;
    onMetric?.({ memoryUsage });

    if (memoryUsage > 100) { // Warning if over 100MB
      console.warn(`⚠️ High memory usage in ${componentName}: ${memoryUsage.toFixed(2)}MB`);
    }
  }, [componentName, trackMemory, onMetric]);

  // Track Web Vitals
  const trackWebVitalsFunc = useCallback(() => {
    if (!enableWebVitals || typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        const lcp = lastEntry.startTime;
        metricsRef.current.largestContentfulPaint = lcp;
        onMetric?.({ largestContentfulPaint: lcp });
        
        if (lcp > 2500) {
          console.warn(`⚠️ Poor LCP in ${componentName}: ${lcp.toFixed(2)}ms`);
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Browser doesn't support this metric
    }

    return () => observer.disconnect();
  }, [componentName, enableWebVitals, onMetric]);

  // Performance measurement utilities
  const measureAsync = useCallback(async <T>(
    operationName: string,
    operation: () => Promise<T>
  ): Promise<T> => {
    const startTime = performance.now();
    
    try {
      const result = await operation();
      const duration = performance.now() - startTime;
      
      console.log(`⏱️ ${operationName} in ${componentName}: ${duration.toFixed(2)}ms`);
      onMetric?.({ [operationName]: duration });
      
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      console.error(`❌ ${operationName} failed in ${componentName} after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  }, [componentName, onMetric]);

  const measureSync = useCallback(<T>(
    operationName: string,
    operation: () => T
  ): T => {
    const startTime = performance.now();
    
    try {
      const result = operation();
      const duration = performance.now() - startTime;
      
      console.log(`⏱️ ${operationName} in ${componentName}: ${duration.toFixed(2)}ms`);
      onMetric?.({ [operationName]: duration });
      
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      console.error(`❌ ${operationName} failed in ${componentName} after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  }, [componentName, onMetric]);

  // Setup and cleanup
  useEffect(() => {
    renderStartTime.current = performance.now();
    
    // Track initial load time
    const loadTime = performance.now() - loadStartTime.current;
    metricsRef.current.loadTime = loadTime;
    onMetric?.({ loadTime });

    // Track render time after component mounts
    const timeoutId = setTimeout(trackRenderTime, 0);
    
    // Track memory usage
    const memoryInterval = trackMemory 
      ? setInterval(trackMemoryUsage, 5000) 
      : null;

    // Track web vitals
    const cleanupWebVitals = trackWebVitalsFunc();

    return () => {
      clearTimeout(timeoutId);
      if (memoryInterval) clearInterval(memoryInterval);
      cleanupWebVitals?.();
    };
  }, [trackRenderTime, trackMemoryUsage, trackWebVitalsFunc, onMetric]);

  // Update render start time on re-renders
  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  return {
    metrics: metricsRef.current,
    trackInteraction,
    measureAsync,
    measureSync,
    trackMemoryUsage,
  };
}

// Helper hook for tracking specific performance scenarios
export function useGamePerformance(gameName: string) {
  return usePerformance(`Game:${gameName}`, {
    trackInteractions: true,
    trackMemory: true,
    enableWebVitals: true,
    onMetric: (metric) => {
      // In production, send to analytics service
      if (process.env.NODE_ENV === 'production') {
        // Example: analytics.track('game_performance', { game: gameName, ...metric });
      }
    },
  });
}

// Helper hook for tracking component performance
export function useComponentPerformance(componentName: string) {
  return usePerformance(`Component:${componentName}`, {
    trackInteractions: false,
    trackMemory: false,
    enableWebVitals: false,
  });
}
