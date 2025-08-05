'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';
import { trackWebVital } from '@/lib/performance';

export function WebVitals() {
  useEffect(() => {
    // Track Core Web Vitals (FID is deprecated, replaced by INP)
    onCLS(trackWebVital);
    onFCP(trackWebVital);
    onLCP(trackWebVital);
    onTTFB(trackWebVital);
  }, []);

  return null;
}
