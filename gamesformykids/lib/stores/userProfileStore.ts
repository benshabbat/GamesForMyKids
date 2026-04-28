/**
 * ===============================================
 * User Profile Store — Zustand
 * ===============================================
 * מנהל פרופיל המשתמש והגדרותיו ב-Supabase.
 * מונע בקשות כפולות: קומפוננטים מרובים שמשתמשים ב-useUserProfile
 * ישתפו את אותו ה-state ורק בקשה אחת תישלח ל-Supabase.
 *
 * מחליף את useState ב-useUserProfile.ts.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UserProfile, UserSettings } from '@/hooks/shared/user/useUserProfile';
import { INITIAL_REMOTE_SLICE, type RemoteDataSlice } from './utils/RemoteDataSlice';

// ── State ────────────────────────────────────────────────────────────
export interface UserProfileState extends RemoteDataSlice {
  profile: UserProfile | null;
  settings: UserSettings | null;
}

// ── Actions ────────────────────────────────────────────────
export interface UserProfileStoreActions {
  setProfile: (profile: UserProfile | null) => void;
  setSettings: (settings: UserSettings | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLoadedForUserId: (userId: string | null) => void;
  reset: () => void;
}

const initialState: UserProfileState = {
  profile: null,
  settings: null,
  ...INITIAL_REMOTE_SLICE,
};

// ── Store ──────────────────────────────────────────────────
export const useUserProfileStore = create<UserProfileState & UserProfileStoreActions>()(
  devtools(
    (set) => ({
      ...initialState,

      setProfile: (profile) => set({ profile }, false, 'userProfile/setProfile'),

      setSettings: (settings) => set({ settings }, false, 'userProfile/setSettings'),

      setLoading: (loading) => set({ loading }, false, 'userProfile/setLoading'),

      setError: (error) => set({ error }, false, 'userProfile/setError'),

      setLoadedForUserId: (userId) =>
        set({ loadedForUserId: userId }, false, 'userProfile/setLoadedForUserId'),

      reset: () => set(initialState, false, 'userProfile/reset'),
    }),
    { name: 'UserProfileStore' },
  ),
);
