'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isGuest: boolean
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithGitHub: () => Promise<void>
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
    // Check if user chose guest mode
    const guestMode = localStorage.getItem('guestMode')
    if (guestMode === 'true') {
      setIsGuest(true)
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
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
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setIsGuest(false)
    localStorage.removeItem('guestMode')
  }

  const continueAsGuest = () => {
    setIsGuest(true)
    setLoading(false)
    localStorage.setItem('guestMode', 'true')
  }

  const requireAuth = () => {
    // Return false for now - make all features available to guests
    // This can be changed later for specific features that require auth
    return false
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

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
