'use client';

import { makeStore } from './createStore';

interface SpeedBurstState {
  enabled: boolean;
}

interface SpeedBurstActions {
  toggle: () => void;
  reset: () => void;
}

export const useSpeedBurstStore = makeStore<SpeedBurstState & SpeedBurstActions>(
  'SpeedBurstStore',
  (set) => ({
    enabled: false,
    toggle: () => set((s) => ({ enabled: !s.enabled }), false, 'speedBurst/toggle'),
    reset: () => set({ enabled: false }, false, 'speedBurst/reset'),
  }),
);
