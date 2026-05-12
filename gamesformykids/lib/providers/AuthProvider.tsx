'use client'

/**
 * AuthProvider — Supabase subscription runner
 * Sets auth state in useAuthStore on mount and subscribes to auth changes.
 */

import { useEffect, ReactNode } from 'react'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/stores/authStore'
import { useUIStore } from '@/lib/stores/uiStore'

export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { setAuthState } = useAuthStore.getState()

    if (!isSupabaseConfigured) {
      setAuthState({ user: null, session: null, isGuest: true, loading: false })
      return
    }

    const sessionTimeout = setTimeout(() => {
      const isGuest = localStorage.getItem('guestMode') === 'true'
      setAuthState({ user: null, session: null, isGuest, loading: false })
    }, 5000)

    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(sessionTimeout)
      if (session) localStorage.removeItem('guestMode')
      const isGuest = !session && localStorage.getItem('guestMode') === 'true'
      setAuthState({ user: session?.user ?? null, session, isGuest, loading: false })
    }).catch(() => {
      clearTimeout(sessionTimeout)
      const isGuest = localStorage.getItem('guestMode') === 'true'
      setAuthState({ user: null, session: null, isGuest, loading: false })
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (session) localStorage.removeItem('guestMode')
        const isGuest = !session && localStorage.getItem('guestMode') === 'true'
        useAuthStore.getState().setAuthState({
          user: session?.user ?? null,
          session,
          isGuest,
          loading: false,
        })

        if (event === 'SIGNED_OUT' && !isGuest) {
          useUIStore.getState().addNotification(
            'פג תוקף ההתחברות — אנא התחבר שוב כדי לשמור את ההתקדמות',
            'warning',
          )
        }
      },
    )

    return () => subscription.unsubscribe()
  }, [])

  return <>{children}</>
}
