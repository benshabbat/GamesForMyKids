import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PerformanceSettingsState {
  performanceMode: 'high' | 'balanced' | 'fast';
  animationsEnabled: boolean;
  preloadingEnabled: boolean;
  setPerformanceMode: (mode: 'high' | 'balanced' | 'fast') => void;
  setAnimationsEnabled: (enabled: boolean) => void;
  setPreloadingEnabled: (enabled: boolean) => void;
}

export const usePerformanceSettingsStore = create<PerformanceSettingsState>()(
  devtools(
    persist(
      (set) => ({
        performanceMode: 'balanced',
        animationsEnabled: true,
        preloadingEnabled: true,
        setPerformanceMode: (mode) => set({ performanceMode: mode }),
        setAnimationsEnabled: (enabled) => set({ animationsEnabled: enabled }),
        setPreloadingEnabled: (enabled) => set({ preloadingEnabled: enabled }),
      }),
      { name: 'performance-settings' }
    ),
    { name: 'PerformanceSettingsStore' }
  )
);
