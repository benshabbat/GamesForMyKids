/**
 * ===============================================
 * Achievements Store — Zustand
 * ===============================================
 * מנהל הישגי המשתמש מ-Supabase.
 * קומפוננטים מרובים ישתפו את אותו ה-state ללא בקשות כפולות.
 *
 * מחליף את useState ב-useAchievements.ts.
 */

import { makeStore } from './createStore';
import type { Achievement } from '@/hooks/shared/progress/useAchievements';
import { INITIAL_REMOTE_SLICE, type RemoteDataSlice } from './utils/RemoteDataSlice';

// ── State ────────────────────────────────────────────────────────────
export interface AchievementsState extends RemoteDataSlice {
  achievements: Achievement[];
}

// ── Actions ────────────────────────────────────────────────
export interface AchievementsStoreActions {
  setAchievements: (achievements: Achievement[]) => void;
  prependAchievement: (achievement: Achievement) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLoadedForUserId: (userId: string | null) => void;
  reset: () => void;
}

const initialState: AchievementsState = {
  achievements: [],
  ...INITIAL_REMOTE_SLICE,
};

// ── Store ──────────────────────────────────────────────────
export const useAchievementsStore = makeStore<AchievementsState & AchievementsStoreActions>('AchievementsStore', (set) => ({
      ...initialState,

      setAchievements: (achievements) =>
        set({ achievements }, false, 'achievements/setAll'),

      prependAchievement: (achievement) =>
        set(
          (state) => ({ achievements: [achievement, ...state.achievements] }),
          false,
          'achievements/prepend',
        ),

      setLoading: (loading) => set({ loading }, false, 'achievements/setLoading'),

      setError: (error) => set({ error }, false, 'achievements/setError'),

      setLoadedForUserId: (userId) =>
        set({ loadedForUserId: userId }, false, 'achievements/setLoadedForUserId'),

      reset: () => set(initialState, false, 'achievements/reset'),
    }));
