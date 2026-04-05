'use client'

/**
 * AuthContext  fully migrated to Zustand
 *
 * No React context. useAuth() reads state from useAuthStore and returns
 * stable action callbacks.
 *
 * AuthProvider is kept solely as a Supabase subscription runner:
 * it runs the onAuthStateChange useEffect and renders {children} directly.
 */

import { useEffect, useCallback, ReactNode } from 'react'
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase/client'
import { useAuthStore } from '@/lib/stores'

// ---------------------------------------------------------------------------
// AuthProvider  subscription effect only, no React context
// ---------------------------------------------------------------------------
export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { setAuthState } = useAuthStore.getState()

    if (!isSupabaseConfigured) {
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
      return
    }

    const guestMode = localStorage.getItem('guestMode')
    if (guestMode === 'true') {
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
      return
    }

    const sessionTimeout = setTimeout(() => {
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
    }, 5000)

    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(sessionTimeout)
      setAuthState({ user: session?.user ?? null, session, isGuest: false, loading: false })
    }).catch(() => {
      clearTimeout(sessionTimeout)
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (session) localStorage.removeItem('guestMode')
        useAuthStore.getState().setAuthState({
          user: session?.user ?? null,
          session,
          isGuest: !session,
          loading: false,
        })
      },
    )

    return () => subscription.unsubscribe()
  }, [])

  return <>{children}</>
}

// ---------------------------------------------------------------------------
// useAuth  reads Zustand store + returns stable action callbacks
// ---------------------------------------------------------------------------
interface AuthHookReturn {
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

export function useAuth(): AuthHookReturn {
  const user = useAuthStore((s) => s.user)
  const session = useAuthStore((s) => s.session)
  const loading = useAuthStore((s) => s.loading)
  const isGuest = useAuthStore((s) => s.isGuest)

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut().catch(() => {})
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
      options: { redirectTo: window.location.origin + '/auth/callback' },
    }).catch(() => {})
  }, [])

  const signInWithGitHub = useCallback(async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin + '/auth/callback' },
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

  return {
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
  }
}
