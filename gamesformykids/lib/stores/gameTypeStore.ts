/**
 * ===============================================
 * Game Type Store — Zustand
 * ===============================================
 * מנהל את סוג המשחק הנוכחי, ההיסטוריה, והניווט.
 * מחליף את ה-useState ב-GameTypeContext.
 * הניווט (router.push) נשאר בקומפוננטת ה-Provider
 * כיוון שהוא דורש useRouter מ-React.
 */

import { makeStore } from './createStore';
import { GameType, BaseGameItem } from '@/lib/types/core/base';

export interface GameTypeState {
  currentGameType: GameType | null;
  previousGameType: GameType | null;
  gameHistory: GameType[];
  gameItems: BaseGameItem[] | null;
}

export interface GameTypeActions {
  setCurrentGameType: (gameType: GameType) => void;
  setGameItems: (items: BaseGameItem[]) => void;
  clearGameHistory: () => void;
}

const INITIAL_STATE: GameTypeState = {
  currentGameType: null,
  previousGameType: null,
  gameHistory: [],
  gameItems: null,
};

export const useGameTypeStore = makeStore<GameTypeState & GameTypeActions>('GameTypeStore', (set) => ({
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
            gameItems: null,
          }),
          false,
          'gameType/setCurrentGameType',
        ),

      setGameItems: (items) =>
        set({ gameItems: items }, false, 'gameType/setGameItems'),

      clearGameHistory: () =>
        set(
          (state) => ({
            gameHistory: state.currentGameType ? [state.currentGameType] : [],
          }),
          false,
          'gameType/clearGameHistory',
        ),
    }));

