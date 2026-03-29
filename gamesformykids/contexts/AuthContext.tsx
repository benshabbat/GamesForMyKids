'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
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
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    const { setAuthState } = useAuthStore.getState()

    // If Supabase is not configured, fall back to guest mode immediately
    if (!isSupabaseConfigured) {
      setIsGuest(true)
      setLoading(false)
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
      return
    }

    // Check if user chose guest mode
    const guestMode = localStorage.getItem('guestMode')
    if (guestMode === 'true') {
      setIsGuest(true)
      setLoading(false)
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
      return
    }

    // Get initial session with timeout to avoid hanging if Supabase is down
    const sessionTimeout = setTimeout(() => {
      setIsGuest(true)
      setLoading(false)
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
    }, 5000)

    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(sessionTimeout)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      setAuthState({ user: session?.user ?? null, session, isGuest: false, loading: false })
    }).catch(() => {
      clearTimeout(sessionTimeout)
      setIsGuest(true)
      setLoading(false)
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Clear guest mode if user signs in
        if (session) {
          setIsGuest(false)
          localStorage.removeItem('guestMode')
        }

        // Sync with Zustand store
        setAuthState({
          user: session?.user ?? null,
          session,
          isGuest: !session,
          loading: false,
        })
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut().catch(() => {})
    }
    setUser(null)
    setSession(null)
    setIsGuest(false)
    localStorage.removeItem('guestMode')
    useAuthStore.getState().setAuthState({ user: null, session: null, isGuest: false, loading: false })
  }, [])

  const continueAsGuest = useCallback(() => {
    setIsGuest(true)
    setLoading(false)
    localStorage.setItem('guestMode', 'true')
    useAuthStore.getState().setAuthState({ user: null, session: null, isGuest: true, loading: false })
  }, [])

  const requireAuth = useCallback(() => {
    // Return false — all features available to guests
    return false
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    }).catch(() => {})
  }, [])

  const signInWithGitHub = useCallback(async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    }).catch(() => {})
  }, [])

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) return { error: 'שירות ההתחברות אינו זמין כרגע' }
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        return { error: error.message }
      }
      return {}
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
        options: {
          data: {
            name: name || '',
          },
        },
      })
      if (error) {
        return { error: error.message }
      }
      return {}
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
