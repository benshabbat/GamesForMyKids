/**
 * ===============================================
 * Auth Store — Zustand
 * ===============================================
 * גלובל אמת יחידה לסטייט האותנטיקציה.
 * AuthContext (קיים) מאתחל את ה-Supabase subscription
 * ומעדכן את ה-store — כל שאר הקומפוננטות קוראות מהסטור ישירות.
 */

import { makeStore } from './createStore';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

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
  /** התנתקות — מנקה Supabase, localStorage ו-store */
  signOut: () => Promise<void>;
  reset: () => void;
}

// True only while the user is deliberately signing out. AuthProvider reads it
// to avoid showing the "session expired" toast for an intentional sign-out.
let intentionalSignOut = false;
export const isIntentionalSignOut = () => intentionalSignOut;

/** Sign out of Supabase, flagging the resulting SIGNED_OUT event as user-initiated. */
export async function signOutIntentionally(): Promise<void> {
  if (!isSupabaseConfigured) return;
  intentionalSignOut = true;
  try {
    await supabase.auth.signOut().catch(() => {});
  } finally {
    intentionalSignOut = false;
  }
}

const INITIAL_STATE: AuthState = {
  user: null,
  session: null,
  loading: true,
  isGuest: false,
};

export const useAuthStore = makeStore<AuthState & AuthActions>('AuthStore', (set) => ({
      ...INITIAL_STATE,

      setUser: (user) => set({ user }, false, 'auth/setUser'),
      setSession: (session) => set({ session }, false, 'auth/setSession'),
      setLoading: (loading) => set({ loading }, false, 'auth/setLoading'),
      setIsGuest: (isGuest) => set({ isGuest }, false, 'auth/setIsGuest'),

      setAuthState: (state) => set(state, false, 'auth/setAuthState'),

      signOut: async () => {
        await signOutIntentionally();
        if (typeof localStorage !== 'undefined') localStorage.removeItem('guestMode');
        set({ user: null, session: null, isGuest: false, loading: false }, false, 'auth/signOut');
      },

      reset: () => set(INITIAL_STATE, false, 'auth/reset'),
    }));

