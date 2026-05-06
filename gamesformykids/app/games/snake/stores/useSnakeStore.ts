'use client';

import { makeStore } from '@/lib/stores/createStore';
import type { PhaseDead as Phase } from '@/lib/types';

interface SnakeState {
  phase: Phase;
}

interface SnakeActions {
  setPhase: (phase: Phase) => void;
}

export const useSnakeStore = makeStore<SnakeState & SnakeActions>('SnakeStore', (set) => ({
  phase: 'menu',
  setPhase: (phase) => set({ phase }, false, 'snake/setPhase'),
}));
