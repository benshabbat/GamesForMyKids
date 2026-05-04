/**
 * ===============================================
 * Game Session Store — Zustand
 * ===============================================
 * מנהל את סטייט הסשן הנוכחי של המשחק:
 * - האתגר הנוכחי
 * - אפשרויות הבחירה
 * - מצב החגיגה
 * - מונה ניסיונות שגויים (לרמזים)
 *
 * מחליף את ה-localState ב-useBaseGame (useState)
 * וחלק מ-GameLogicContext, כך שכל קומפוננט
 * יכול לגשת לנתוני הסשן ישירות ללא props drilling.
 */

import { makeStore } from './createStore';
import type { BaseGameItem } from '@/lib/types/core/base';

// ── State ──────────────────────────────────────────────────
export interface GameSessionState {
  currentChallenge: BaseGameItem | null;
  options: BaseGameItem[];
  showCelebration: boolean;
  wrongAttempts: number;
}

// ── Actions ────────────────────────────────────────────────
export interface GameSessionActions {
  setChallenge: (challenge: BaseGameItem | null) => void;
  setOptions: (options: BaseGameItem[]) => void;
  setShowCelebration: (show: boolean) => void;
  incrementWrongAttempts: () => void;
  resetWrongAttempts: () => void;
  setChallengeAndOptions: (challenge: BaseGameItem, options: BaseGameItem[]) => void;
  resetSession: () => void;
}

const INITIAL_STATE: GameSessionState = {
  currentChallenge: null,
  options: [],
  showCelebration: false,
  wrongAttempts: 0,
};

export const useGameSessionStore = makeStore<GameSessionState & GameSessionActions>('GameSessionStore', (set) => ({
      ...INITIAL_STATE,

      setChallenge: (challenge) =>
        set({ currentChallenge: challenge }, false, 'session/setChallenge'),

      setOptions: (options) =>
        set({ options }, false, 'session/setOptions'),

      setShowCelebration: (show) =>
        set({ showCelebration: show }, false, 'session/setShowCelebration'),

      incrementWrongAttempts: () =>
        set((s) => ({ wrongAttempts: s.wrongAttempts + 1 }), false, 'session/incrementWrongAttempts'),

      resetWrongAttempts: () =>
        set({ wrongAttempts: 0 }, false, 'session/resetWrongAttempts'),

      setChallengeAndOptions: (challenge, options) =>
        set({ currentChallenge: challenge, options }, false, 'session/setChallengeAndOptions'),

      resetSession: () =>
        set({ ...INITIAL_STATE }, false, 'session/resetSession'),
    }));
