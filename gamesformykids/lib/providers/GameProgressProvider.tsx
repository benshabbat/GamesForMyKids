'use client'

/**
 * GameProgressProvider — effects-only component:
 *  1. Timer tick (setInterval while isGameActive && !timerPaused)
 *  2. Reset progress on game-type change
 */

import { useEffect, ReactNode } from 'react'
import { useGameProgressStore } from '@/lib/stores/gameProgressStore'
import { useGameTypeStore } from '@/lib/stores/gameTypeStore'

interface GameProgressProviderProps {
  children: ReactNode
  maxLevel?: number
  pointsPerCorrect?: number
}

export function GameProgressProvider({ children }: GameProgressProviderProps) {
  const currentGameType = useGameTypeStore((s) => s.currentGameType)
  const isGameActive = useGameProgressStore((s) => s.isGameActive)
  const timerPaused = useGameProgressStore((s) => s.timerPaused)

  useEffect(() => {
    if (currentGameType) {
      useGameProgressStore.getState().resetProgress()
    }
  }, [currentGameType])

  useEffect(() => {
    if (!isGameActive || timerPaused) return
    const interval = setInterval(() => {
      useGameProgressStore.getState().tickTimer()
    }, 1000)
    return () => clearInterval(interval)
  }, [isGameActive, timerPaused])

  return <>{children}</>
}
