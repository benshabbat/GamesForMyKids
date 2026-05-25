/**
 * ===============================================
 * Progress Tracking Store — Zustand (persist)
 * ===============================================
 * מנהל היסטוריית משחקים ב-localStorage.
 *
 * מחליף את useState + localStorage ב-useProgressTracking.ts.
 * ה-key הישן: 'gameProgress'  ← שומרים את אותו המפתח ב-persist.
 *
 * currentSession נשאר מחושב מקומית ב-useSessionStats (derived state).
 */

import { makePersistStore } from './createStore';
import type { GameSession } from '@/lib/types/hooks/progress';

/** Cap localStorage growth — keep only the most recent N sessions. */
const MAX_SESSIONS = 200;

// ── State ──────────────────────────────────────────────────
export interface ProgressTrackingState {
  allSessions: GameSession[];
}

// ── Actions ────────────────────────────────────────────────
export interface ProgressTrackingActions {
  addSession: (session: GameSession) => void;
}

// ── Store ──────────────────────────────────────────────────
export const useProgressTrackingStore = makePersistStore<ProgressTrackingState & ProgressTrackingActions>(
  'ProgressTrackingStore',
  'gameProgress',
  (set) => ({
    allSessions: [],

    addSession: (session) =>
      set(
        (state) => {
          const next = [...state.allSessions, session];
          return { allSessions: next.length > MAX_SESSIONS ? next.slice(-MAX_SESSIONS) : next };
        },
        false,
        'progress/addSession',
      ),
  }),
);
