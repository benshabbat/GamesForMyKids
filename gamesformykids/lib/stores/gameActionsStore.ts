/**
 * ===============================================
 * Game Actions Store — Zustand
 * ===============================================
 * מאחסן את פונקציות הפעולה של המשחק הנוכחי.
 * מתעדכן על ידי GameLogicProvider בכל render.
 *
 * מחליף את ה-React Context שב-GameLogicContext,
 * כך שכל קומפוננט יכול לגשת ישירות לפונקציות
 * המשחק ללא props drilling.
 */

import { makeStore } from './createStore';
import type { BaseGameItem } from '@/lib/types/core/base';

const NOOP = () => {};
const ASYNC_NOOP = async (): Promise<void> => {};

export interface GameActionsState {
  startGame: () => void | Promise<void>;
  resetGame: () => void;
  handleItemClick: (item: BaseGameItem) => void | Promise<void>;
  speakItemName: (name: string) => void | Promise<void>;
  hints: string[];
  hasMoreHints: boolean;
  showNextHint: () => void;
  currentAccuracy: number;
}

export interface GameActionsStoreActions {
  setGameActions: (actions: Partial<GameActionsState>) => void;
}

export const useGameActionsStore = makeStore<GameActionsState & GameActionsStoreActions>('GameActionsStore', (set) => ({
      startGame: ASYNC_NOOP,
      resetGame: NOOP,
      handleItemClick: ASYNC_NOOP,
      speakItemName: ASYNC_NOOP,
      hints: [],
      hasMoreHints: false,
      showNextHint: NOOP,
      currentAccuracy: 0,

      setGameActions: (actions) => set(actions, false, 'gameActions/setGameActions'),
    }));
