'use client'

/**
 * useGameType — reads game type state from useGameTypeStore and
 * provides navigation helpers via useRouter.
 */

import { useCallback } from 'react'
import { GameType } from '@/lib/types/core/base'
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs'
import { GAME_ITEMS_MAP } from '@/lib/constants/gameItemsMap'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants/routes'
import { useGameTypeStore } from '@/lib/stores/gameTypeStore'
import { GameTypeContextValue } from '@/lib/types/contexts/game-type'

export function useGameType(): GameTypeContextValue {
  const router = useRouter()
  const currentGameType = useGameTypeStore((s) => s.currentGameType)
  const previousGameType = useGameTypeStore((s) => s.previousGameType)
  const gameHistory = useGameTypeStore((s) => s.gameHistory)
  const setCurrentGameType = useGameTypeStore((s) => s.setCurrentGameType)
  const clearGameHistory = useGameTypeStore((s) => s.clearGameHistory)

  const navigateToGame = useCallback(
    (gameType: GameType) => {
      setCurrentGameType(gameType)
      router.push(ROUTES.game(gameType))
    },
    [setCurrentGameType, router],
  )

  const goToPreviousGame = useCallback(() => {
    if (previousGameType) navigateToGame(previousGameType)
  }, [previousGameType, navigateToGame])

  const isGameSupported = useCallback(
    (gameType: string): boolean => gameType in GAME_UI_CONFIGS,
    [],
  )

  const getGameConfig = useCallback(
    (gameType: GameType) => GAME_UI_CONFIGS[gameType] || null,
    [],
  )

  const getGameItems = useCallback(
    (gameType: GameType) => GAME_ITEMS_MAP[gameType] || null,
    [],
  )

  const currentGameConfig = currentGameType ? getGameConfig(currentGameType) : null
  const currentGameItems = currentGameType ? getGameItems(currentGameType) : null

  return {
    gameState: { currentGameType, previousGameType, gameHistory },
    currentGameType,
    currentGameConfig,
    currentGameItems,
    setCurrentGameType,
    navigateToGame,
    goToPreviousGame,
    clearGameHistory,
    isGameSupported,
    getGameConfig,
    getGameItems,
  }
}

export function useCurrentGameType(): GameType | null {
  return useGameTypeStore((s) => s.currentGameType)
}

export function useCurrentGameConfig() {
  const gameType = useGameTypeStore((s) => s.currentGameType)
  return gameType ? GAME_UI_CONFIGS[gameType] ?? null : null
}
