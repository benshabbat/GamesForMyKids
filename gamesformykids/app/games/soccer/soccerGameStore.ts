'use client';

import { makeStore } from '@/lib/stores/createStore';

/**
 * Soccer-specific UI state.
 * Question/category management is handled by createCategoryIndexQuizHook.
 */
interface SoccerGameState {
  showGoal: boolean;
}

interface SoccerGameActions {
  setShowGoal: (v: boolean) => void;
}

export const useSoccerGameStore = makeStore<SoccerGameState & SoccerGameActions>(
  'SoccerGameStore',
  (set) => ({
    showGoal: false,
    setShowGoal: (showGoal) => set({ showGoal }),
  }),
);
