'use client'

/**
 * useGameEffects — replaces GameProgressProvider.
 * Call this once at the top of UltimateGamePage.
 *
 * Effects:
 *  1. Timer tick (1s interval while game is active and timer not paused)
 *  2. Progress reset on game-type change
 *
 * NOTE: The game-hook actions sync (setGameActions) is intentionally NOT here.
 * It lives in <GameLogicSync> — a child component that doesn't subscribe to
 * the store, so it doesn't cause an infinite render loop.
 */

import { useEffect } from 'react'
import { useGameProgressStore } from '@/lib/stores/gameProgressStore'
import { useGameTypeStore } from '@/lib/stores/gameTypeStore'

export function useGameEffects() {
  const currentGameType = useGameTypeStore((s) => s.currentGameType)
  const isGameActive = useGameProgressStore((s) => s.isGameActive)
  const timerPaused = useGameProgressStore((s) => s.timerPaused)

  // Reset progress when game type changes
  useEffect(() => {
    if (currentGameType) {
      useGameProgressStore.getState().resetProgress()
    }
  }, [currentGameType])

  // Timer tick
  useEffect(() => {
    if (!isGameActive || timerPaused) return
    const interval = setInterval(() => {
      useGameProgressStore.getState().tickTimer()
    }, 1000)
    return () => clearInterval(interval)
  }, [isGameActive, timerPaused])
}
