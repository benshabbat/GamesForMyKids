'use client'

/**
 * GameTypeProvider — seeds initial game type and pre-loaded items into
 * useGameTypeStore. Uses useMemo (not useEffect) so the store is populated
 * synchronously on the first render, avoiding a flash of missing items.
 */

import { useLayoutEffect, ReactNode } from 'react'
import { GameType, BaseGameItem } from '@/lib/types/core/base'
import { useGameTypeStore } from '@/lib/stores/gameTypeStore'

interface GameTypeProviderProps {
  children: ReactNode
  initialGameType?: GameType | string
  initialGameItems?: BaseGameItem[]
}

export function GameTypeProvider({ children, initialGameType, initialGameItems }: GameTypeProviderProps) {
  useLayoutEffect(() => {
    const store = useGameTypeStore.getState()
    if (initialGameType) store.setCurrentGameType(initialGameType as GameType)
    if (initialGameItems) store.setGameItems(initialGameItems)
  }, [initialGameType, initialGameItems])

  return <>{children}</>
}
