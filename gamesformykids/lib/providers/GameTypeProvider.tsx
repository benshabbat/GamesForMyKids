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
  const setCurrentGameType = useGameTypeStore((s) => s.setCurrentGameType)

  useEffect(() => {
    if (initialGameType) {
      setCurrentGameType(initialGameType as GameType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGameType])

  return <>{children}</>
}
