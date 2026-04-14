'use client'

/**
 * useGameEffects — replaces GameProgressProvider + GameLogicProvider.
 * Call this once at the top of UltimateGamePage.
 *
 * Effects:
 *  1. Timer tick (1s interval while game is active and timer not paused)
 *  2. Progress reset on game-type change
 *  3. Runs the game-specific hook and syncs actions to useGameActionsStore
 */

import { useEffect } from 'react'
import { GameType } from '@/lib/types/core/base'
import { AutoGameType } from '@/lib/constants/gameHooksMap'
import { useGameProgressStore } from '@/lib/stores/gameProgressStore'
import { useGameTypeStore } from '@/lib/stores/gameTypeStore'
import { useGameActionsStore } from '@/lib/stores/gameActionsStore'
import { useAutoGameConfig } from './useGameConfig'

export function useGameEffects(gameType?: AutoGameType | GameType) {
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

  // Run game-specific hook and sync actions
  const { useGameHook } = useAutoGameConfig(gameType)
  const gameHookResult = useGameHook()

  useEffect(() => {
    useGameActionsStore.getState().setGameActions({
      startGame: gameHookResult.startGame,
      resetGame: gameHookResult.resetGame,
      handleItemClick: gameHookResult.handleItemClick,
      speakItemName: gameHookResult.speakItemName,
      hints: gameHookResult.hints?.map(
        (h: string | { text?: string }) => (typeof h === 'string' ? h : h.text || ''),
      ) ?? [],
      hasMoreHints: gameHookResult.hasMoreHints ?? false,
      showNextHint: gameHookResult.showNextHint ?? (() => {}),
      currentAccuracy: gameHookResult.currentAccuracy ?? 0,
    })
  })
}
