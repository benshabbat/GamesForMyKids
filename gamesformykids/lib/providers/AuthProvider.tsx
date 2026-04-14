'use client'

/**
 * AuthProvider — Supabase subscription runner
 * Sets auth state in useAuthStore on mount and subscribes to auth changes.
 */

import { useEffect, ReactNode } from 'react'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/authStore'

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
