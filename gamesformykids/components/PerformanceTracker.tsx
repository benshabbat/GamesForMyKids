"use client";

import { useEffect } from 'react';
import { PerformanceMonitor } from '@/lib/utils/performanceMonitor';

export default function PerformanceTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    PerformanceMonitor.measureFCP();
    PerformanceMonitor.measureLCP();
    
    // Log metrics after page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        PerformanceMonitor.logPerformanceMetrics();
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return null;
}
