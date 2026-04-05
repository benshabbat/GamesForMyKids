'use client'

/**
 * Auth Context
 *
 * State (user, session, loading, isGuest) lives in useAuthStore (Zustand).
 * This provider is responsible for:
 *   - Supabase auth subscription (onAuthStateChange)
 *   - Providing auth action methods via context
 *
 * Components should prefer reading auth state directly from useAuthStore
 * rather than via useAuth() to avoid unnecessary re-renders.
 */

import { createContext, useContext, useEffect, useCallback } from 'react'
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase/client'
import { useAuthStore } from '@/lib/stores'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isGuest: boolean
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithGitHub: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string }>
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<{ error?: string }>
  continueAsGuest: () => void
  requireAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Read state from Zustand store (single source of truth)
  const user = useAuthStore((s) => s.user)
  const session = useAuthStore((s) => s.session)
  const loading = useAuthStore((s) => s.loading)
  const isGuest = useAuthStore((s) => s.isGuest)
  const { setAuthState } = useAuthStore.getState()

  useEffect(() => {
    // If Supabase is not configured, fall back to guest mode immediately
    if (!isSupabaseConfigured) {
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
      return
    }

    // Check if user chose guest mode
    const guestMode = localStorage.getItem('guestMode')
    if (guestMode === 'true') {
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
      return
    }

    // Timeout safety net
    const sessionTimeout = setTimeout(() => {
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
    }, 5000)

    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(sessionTimeout)
      setAuthState({
        user: session?.user ?? null,
        session,
        isGuest: false,
        loading: false,
      })
    }).catch(() => {
      clearTimeout(sessionTimeout)
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (session) {
          localStorage.removeItem('guestMode')
        }
        setAuthState({
          user: session?.user ?? null,
          session,
          isGuest: !session,
          loading: false,
        })
      },
    )

    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut().catch(() => {})
    }
    localStorage.removeItem('guestMode')
    useAuthStore.getState().setAuthState({ user: null, session: null, isGuest: false, loading: false })
  }, [])

  const continueAsGuest = useCallback(() => {
    localStorage.setItem('guestMode', 'true')
    useAuthStore.getState().setAuthState({ user: null, session: null, isGuest: true, loading: false })
  }, [])

  const requireAuth = useCallback(() => false, [])

  const signInWithGoogle = useCallback(async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    }).catch(() => {})
  }, [])

  const signInWithGitHub = useCallback(async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    }).catch(() => {})
  }, [])

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) return { error: 'שירות ההתחברות אינו זמין כרגע' }
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return error ? { error: error.message } : {}
    } catch {
      return { error: 'שגיאה בהתחברות' }
    }
  }, [])

  const signUpWithEmail = useCallback(async (email: string, password: string, name?: string) => {
    if (!isSupabaseConfigured) return { error: 'שירות ההתחברות אינו זמין כרגע' }
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: name || '' } },
      })
      return error ? { error: error.message } : {}
    } catch {
      return { error: 'שגיאה ברישום' }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isGuest,
        signOut,
        signInWithGoogle,
        signInWithGitHub,
        signInWithEmail,
        signUpWithEmail,
        continueAsGuest,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
