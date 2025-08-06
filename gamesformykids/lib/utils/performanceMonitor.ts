/**
 * Performance monitoring utilities for FCP optimization
 */

// Type for gtag
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, parameters?: Record<string, unknown>) => void;
  }
}

export class PerformanceMonitor {
  private static metrics: Record<string, number> = {};

  static measureFCP(): Promise<number> {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          for (const entry of entries) {
            if (entry.name === 'first-contentful-paint') {
              const fcp = entry.startTime;
              this.metrics.fcp = fcp;
              console.log(`🎯 FCP: ${fcp.toFixed(2)}ms`);
              observer.disconnect();
              resolve(fcp);
              break;
            }
          }
        });
        observer.observe({ type: 'paint', buffered: true });
      } else {
        // Fallback for browsers without PerformanceObserver
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const estimated = navigation.loadEventEnd - navigation.fetchStart;
          this.metrics.fcp = estimated;
          resolve(estimated);
        }, 100);
      }
    });
  }

  static measureLCP(): Promise<number> {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = lastEntry.startTime;
          this.metrics.lcp = lcp;
          console.log(`🎯 LCP: ${lcp.toFixed(2)}ms`);
          resolve(lcp);
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        
        // Disconnect after 10 seconds
        setTimeout(() => observer.disconnect(), 10000);
      } else {
        resolve(0);
      }
    });
  }

  static logPerformanceMetrics() {
    console.log('📊 Performance Metrics:', this.metrics);
    
    // Send to analytics if needed
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_timing', {
        name: 'FCP',
        value: Math.round(this.metrics.fcp || 0)
      });
    }
  }

  static getMetrics() {
    return { ...this.metrics };
  }
}

// Auto-measure on component mount
export function usePerformanceMonitoring() {
  if (typeof window === 'undefined') return;
  
  PerformanceMonitor.measureFCP();
  PerformanceMonitor.measureLCP();
  
  // Log metrics after page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      PerformanceMonitor.logPerformanceMetrics();
    }, 1000);
  });
}
