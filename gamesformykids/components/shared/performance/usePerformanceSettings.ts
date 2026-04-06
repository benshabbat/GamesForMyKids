'use client';

import { useMemoryManagement } from '../../../hooks/shared/analytics/useMemoryManagement';
import { usePerformanceSettingsStore } from '@/lib/stores/performanceSettingsStore';

export function usePerformanceSettings() {
  const performanceMode = usePerformanceSettingsStore((s) => s.performanceMode);
  const animationsEnabled = usePerformanceSettingsStore((s) => s.animationsEnabled);
  const preloadingEnabled = usePerformanceSettingsStore((s) => s.preloadingEnabled);
  const setPerformanceMode = usePerformanceSettingsStore((s) => s.setPerformanceMode);
  const setAnimationsEnabled = usePerformanceSettingsStore((s) => s.setAnimationsEnabled);
  const setPreloadingEnabled = usePerformanceSettingsStore((s) => s.setPreloadingEnabled);

  const memoryManager = useMemoryManagement({
    maxAudioFiles: performanceMode === 'fast' ? 5 : performanceMode === 'balanced' ? 10 : 20,
    maxImageFiles: performanceMode === 'fast' ? 5 : performanceMode === 'balanced' ? 10 : 20,
    autoCleanup: performanceMode !== 'high',
  });

  const stats = memoryManager.getStats();

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
