/**
 * ===============================================
 * Progress Tracking Store — Zustand (persist)
 * ===============================================
 * מנהל היסטוריית משחקים ב-localStorage.
 *
 * מחליף את useState + localStorage ב-useProgressTracking.ts.
 * ה-key הישן: 'gameProgress'  ← שומרים את אותו המפתח ב-persist.
 *
 * currentSession + progressStats נשארים מחושבים מקומית (derived state).
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { GameSession } from '@/lib/types/hooks/progress';

// ── State ──────────────────────────────────────────────────
export interface ProgressTrackingState {
  allSessions: GameSession[];
}

// ── Actions ────────────────────────────────────────────────
export interface ProgressTrackingActions {
  addSession: (session: GameSession) => void;
  updateCurrentSession: (id: string, updates: Partial<GameSession>) => void;
  clearProgress: () => void;
  getSessionsByGameType: (gameType: string) => GameSession[];
}

// ── Store ──────────────────────────────────────────────────
export const useProgressTrackingStore = create<ProgressTrackingState & ProgressTrackingActions>()(
  devtools(
    persist(
      (set, get) => ({
        allSessions: [],

        addSession: (session) =>
          set(
            (state) => ({ allSessions: [...state.allSessions, session] }),
            false,
            'progress/addSession',
          ),

        updateCurrentSession: (id, updates) =>
          set(
            (state) => ({
              allSessions: state.allSessions.map((s) =>
                s.id === id ? { ...s, ...updates } : s,
              ),
            }),
            false,
            'progress/updateSession',
          ),

        clearProgress: () => set({ allSessions: [] }, false, 'progress/clear'),

        getSessionsByGameType: (gameType) =>
          get().allSessions.filter((s) => s.gameType === gameType),
      }),
      { name: 'gameProgress' },
    ),
    { name: 'ProgressTrackingStore' },
  ),
);
