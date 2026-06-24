'use client';

import { makePersistStore } from './createStore';

export interface ChampionshipState {
  active: boolean;
  categoryId: string | null;
  categoryTitle: string | null;
  /** Exactly 3 gameIds chosen at start */
  gameIds: [string, string, string] | null;
  /** 0 = not started, 1-3 = current round, 4 = done */
  round: 0 | 1 | 2 | 3 | 4;
  /** Score captured at end of each round (null = not yet played) */
  scores: [number | null, number | null, number | null];
}

export interface ChampionshipActions {
  startChampionship: (categoryId: string, categoryTitle: string, gameIds: [string, string, string]) => void;
  recordRoundScore: (score: number) => void;
  resetChampionship: () => void;
}

const INITIAL: ChampionshipState = {
  active: false,
  categoryId: null,
  categoryTitle: null,
  gameIds: null,
  round: 0,
  scores: [null, null, null],
};

export const useChampionshipStore = makePersistStore<ChampionshipState & ChampionshipActions>(
  'ChampionshipStore',
  'gfk-championship',
  (set, get) => ({
    ...INITIAL,

    startChampionship: (categoryId, categoryTitle, gameIds) =>
      set(
        { active: true, categoryId, categoryTitle, gameIds, round: 1, scores: [null, null, null] },
        false,
        'championship/start',
      ),

    recordRoundScore: (score) => {
      const { round, scores } = get();
      if (round < 1 || round > 3) return;
      const idx = round - 1;
      const newScores: [number | null, number | null, number | null] = [...scores] as [number | null, number | null, number | null];
      newScores[idx] = score;
      const nextRound = (round + 1) as 1 | 2 | 3 | 4;
      set({ scores: newScores, round: nextRound }, false, 'championship/recordScore');
    },

    resetChampionship: () => set({ ...INITIAL }, false, 'championship/reset'),
  }),
  { version: 1 },
);
