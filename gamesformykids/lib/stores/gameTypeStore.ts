/**
 * ===============================================
 * Game Type Store — Zustand
 * ===============================================
 * מנהל את סוג המשחק הנוכחי, ההיסטוריה, והניווט.
 * מחליף את ה-useState ב-GameTypeContext.
 * הניווט (router.push) נשאר בקומפוננטת ה-Provider
 * כיוון שהוא דורש useRouter מ-React.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GameType } from '@/lib/types/core/base';

export interface GameTypeState {
  currentGameType: GameType | null;
  previousGameType: GameType | null;
  gameHistory: GameType[];
}

export interface GameTypeActions {
  setCurrentGameType: (gameType: GameType) => void;
  clearGameHistory: () => void;
}

const INITIAL_STATE: GameTypeState = {
  currentGameType: null,
  previousGameType: null,
  gameHistory: [],
};

export const useGameTypeStore = create<GameTypeState & GameTypeActions>()(
  devtools(
    (set) => ({
      ...INITIAL_STATE,

      setCurrentGameType: (gameType) =>
        set(
          (state) => ({
            previousGameType: state.currentGameType,
            currentGameType: gameType,
            gameHistory: [
              ...state.gameHistory.filter((g) => g !== gameType),
              gameType,
            ],
          }),
          false,
          'gameType/setCurrentGameType',
        ),

      clearGameHistory: () =>
        set(
          (state) => ({
            gameHistory: state.currentGameType ? [state.currentGameType] : [],
          }),
          false,
          'gameType/clearGameHistory',
        ),
    }),
    { name: 'GameTypeStore' },
  ),
);

