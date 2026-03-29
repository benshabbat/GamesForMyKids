/**
 * ===============================================
 * Auth Store — Zustand
 * ===============================================
 * גלובל אמת יחידה לסטייט האותנטיקציה.
 * AuthContext (קיים) מאתחל את ה-Supabase subscription
 * ומעדכן את ה-store — כל שאר הקומפוננטות קוראות מהסטור ישירות.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setIsGuest: (isGuest: boolean) => void;
  /** עדכון מלא בפעולה אחת (לשימוש מ-AuthContext) */
  setAuthState: (state: Partial<AuthState>) => void;
  reset: () => void;
}

const INITIAL_STATE: AuthState = {
  user: null,
  session: null,
  loading: true,
  isGuest: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    (set) => ({
      ...INITIAL_STATE,

      setUser: (user) => set({ user }, false, 'auth/setUser'),
      setSession: (session) => set({ session }, false, 'auth/setSession'),
      setLoading: (loading) => set({ loading }, false, 'auth/setLoading'),
      setIsGuest: (isGuest) => set({ isGuest }, false, 'auth/setIsGuest'),

      setAuthState: (state) => set(state, false, 'auth/setAuthState'),

      reset: () => set(INITIAL_STATE, false, 'auth/reset'),
    }),
    { name: 'AuthStore' }
  )
);

// ── Selectors ──────────────────────────────────────────────
/** האם המשתמש מחובר (לא אורח ולא טוען) */
export const selectIsLoggedIn = (s: AuthState) =>
  !s.loading && !!s.user && !s.isGuest;

/** האם המשתמש יכול לשחק (מחובר או אורח) */
export const selectCanPlay = (s: AuthState) =>
  !s.loading && (!!s.user || s.isGuest);
