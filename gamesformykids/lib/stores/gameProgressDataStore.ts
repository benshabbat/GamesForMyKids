/**
 * ===============================================
 * Game Progress Data Store — Zustand
 * ===============================================
 * מנהל נתוני התקדמות המשחק מ-Supabase (לא להתבלבל עם gameProgressStore
 * שמנהל את ה-score/level במהלך סשן המשחק הנוכחי).
 *
 * מחליף את useState ב-useGameProgress.ts.
 */

import { makeStore } from './createStore';
import type { GameProgress } from '@/hooks/shared/progress/useGameProgress';
import { INITIAL_REMOTE_SLICE, type RemoteDataSlice } from './utils/RemoteDataSlice';

// ── State ────────────────────────────────────────────────────────────
export interface GameProgressDataState extends RemoteDataSlice {
  progress: GameProgress[];
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
  ...INITIAL_REMOTE_SLICE,
};

// ── Store ──────────────────────────────────────────────────
export const useGameProgressDataStore = makeStore<GameProgressDataState & GameProgressDataActions>('GameProgressDataStore', (set) => ({
      ...initialState,

      setProgress: (incoming) =>
        set(
          (state) => {
            // Merge DB data with in-memory data, keeping the more recent entry per
            // game type. This prevents a concurrent profile refresh from overwriting
            // an in-memory upsertProgressItem result that raced the DB read:
            // if the profile fetch started before the game save committed, the fetch
            // returns stale data — but the in-memory version is already correct.
            const merged = [...incoming];
            for (const mem of state.progress) {
              const idx = merged.findIndex((p) => p.game_type === mem.game_type);
              if (idx < 0) {
                merged.push(mem); // in-memory has it, DB hasn't committed it yet
              } else if (
                new Date(mem.updated_at) > new Date(merged[idx]!.updated_at)
              ) {
                merged[idx] = mem; // in-memory is newer → prefer it
              }
            }
            return { progress: merged };
          },
          false,
          'gameProgressData/setAll',
        ),

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
    }));
