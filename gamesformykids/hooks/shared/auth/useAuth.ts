'use client'

/**
 * useAuth — reads from useAuthStore and returns stable Supabase action callbacks.
 */

import { useCallback } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/authStore'

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
        // handle_new_user() copies raw_user_meta_data->>'full_name' into profiles
        // (and UserProfile reads user_metadata.full_name); keep `name` for compatibility.
        options: { data: { name: name || '', full_name: name?.trim() || null } },
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
