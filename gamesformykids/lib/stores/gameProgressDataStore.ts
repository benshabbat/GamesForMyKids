/**
 * ===============================================
 * Game Progress Data Store — Zustand
 * ===============================================
 * מנהל נתוני התקדמות המשחק מ-Supabase (לא להתבלבל עם gameProgressStore
 * שמנהל את ה-score/level במהלך סשן המשחק הנוכחי).
 *
 * מחליף את useState ב-useGameProgress.ts.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { GameProgress } from '@/hooks/shared/progress/useGameProgress';

// ── State ──────────────────────────────────────────────────
export interface GameProgressDataState {
  progress: GameProgress[];
  loading: boolean;
  error: string | null;
  loadedForUserId: string | null;
}

// ── Actions ────────────────────────────────────────────────
export interface GameProgressDataActions {
  setProgress: (progress: GameProgress[]) => void;
  upsertProgressItem: (item: GameProgress) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLoadedForUserId: (userId: string | null) => void;
  reset: () => void;
}

const initialState: GameProgressDataState = {
  progress: [],
  loading: true,
  error: null,
  loadedForUserId: null,
};

// ── Store ──────────────────────────────────────────────────
export const useGameProgressDataStore = create<GameProgressDataState & GameProgressDataActions>()(
  devtools(
    (set) => ({
      ...initialState,

      setProgress: (progress) =>
        set({ progress }, false, 'gameProgressData/setAll'),

      upsertProgressItem: (item) =>
        set(
          (state) => {
            const idx = state.progress.findIndex((p) => p.game_type === item.game_type);
            const next = [...state.progress];
            if (idx >= 0) next[idx] = item;
            else next.push(item);
            return { progress: next };
          },
          false,
          'gameProgressData/upsert',
        ),

      setLoading: (loading) =>
        set({ loading }, false, 'gameProgressData/setLoading'),

      setError: (error) => set({ error }, false, 'gameProgressData/setError'),

      setLoadedForUserId: (userId) =>
        set({ loadedForUserId: userId }, false, 'gameProgressData/setLoadedForUserId'),

      reset: () => set(initialState, false, 'gameProgressData/reset'),
    }),
    { name: 'GameProgressDataStore' },
  ),
);
