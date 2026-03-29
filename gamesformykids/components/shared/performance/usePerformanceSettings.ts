'use client';

import React from 'react';
import { useMemoryManagement } from '../../../hooks/shared/analytics/useMemoryManagement';

export function usePerformanceSettings() {
  const [performanceMode, setPerformanceMode] = React.useState<'high' | 'balanced' | 'fast'>('balanced');
  const [animationsEnabled, setAnimationsEnabled] = React.useState(true);
  const [preloadingEnabled, setPreloadingEnabled] = React.useState(true);

  const memoryManager = useMemoryManagement({
    maxAudioFiles: performanceMode === 'fast' ? 5 : performanceMode === 'balanced' ? 10 : 20,
    maxImageFiles: performanceMode === 'fast' ? 5 : performanceMode === 'balanced' ? 10 : 20,
    autoCleanup: performanceMode !== 'high',
  });

  const stats = memoryManager.getStats();

  // טעינת הגדרות שמורות
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('performance-settings');
      if (saved) {
        try {
          const settings = JSON.parse(saved);
          setPerformanceMode(settings.performanceMode || 'balanced');
          setAnimationsEnabled(settings.animationsEnabled ?? true);
          setPreloadingEnabled(settings.preloadingEnabled ?? true);
        } catch {
          // use defaults
        }
      }
    }
  }, []);

  const saveSettings = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'performance-settings',
        JSON.stringify({ performanceMode, animationsEnabled, preloadingEnabled })
      );
    }
  }, [performanceMode, animationsEnabled, preloadingEnabled]);

  // שמירה אוטומטית כשמשתנים
  React.useEffect(() => {
    saveSettings();
  }, [saveSettings]);

  return {
    performanceMode,
    setPerformanceMode,
    animationsEnabled,
    setAnimationsEnabled,
    preloadingEnabled,
    setPreloadingEnabled,
    stats,
    cleanup: memoryManager.cleanup,
  };
}
