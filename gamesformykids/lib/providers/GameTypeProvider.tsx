'use client'

/**
 * GameTypeProvider — seeds initial game type into useGameTypeStore.
 */

import { useEffect, ReactNode } from 'react'
import { GameType } from '@/lib/types/core/base'
import { useGameTypeStore } from '@/lib/stores/gameTypeStore'

interface GameTypeProviderProps {
  children: ReactNode
  initialGameType?: GameType | string
}

export function GameTypeProvider({ children, initialGameType }: GameTypeProviderProps) {
  useEffect(() => {
    if (initialGameType) {
      useGameTypeStore.getState().setCurrentGameType(initialGameType as GameType)
    }
  }, [initialGameType])

  return <>{children}</>
}
