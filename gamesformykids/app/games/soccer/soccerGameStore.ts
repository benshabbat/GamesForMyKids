'use client';

import { makeStore } from '@/lib/stores/createStore';
import type { SoccerQuestion, SoccerCategory } from './data/soccer';

interface SoccerGameState {
  questions: SoccerQuestion[];
  category: SoccerCategory;
  showGoal: boolean;
}

interface SoccerGameActions {
  setQuestions: (qs: SoccerQuestion[], cat: SoccerCategory) => void;
  setShowGoal: (v: boolean) => void;
  reset: () => void;
}

const INITIAL: SoccerGameState = {
  questions: [],
  category: 'הכל',
  showGoal: false,
};

export const useSoccerGameStore = makeStore<SoccerGameState & SoccerGameActions>(
  'SoccerGameStore',
  (set) => ({
    ...INITIAL,
    setQuestions: (questions, category) => set({ questions, category }),
    setShowGoal:  (showGoal) => set({ showGoal }),
    reset:        () => set(INITIAL),
  }),
);
