'use client'

/**
 * GameLogicProvider — effects-only component:
 * Runs the game-specific hook and syncs resulting actions into useGameActionsStore.
 */

import { useEffect, ReactNode } from 'react'
import { GameType } from '@/lib/types/core/base'
import { AutoGameType } from '@/lib/constants/gameHooksMap'
import { useAutoGameConfig } from '@/hooks/shared/game-state/useGameConfig'
import { useGameActionsStore } from '@/lib/stores/gameActionsStore'

interface GameLogicProviderProps {
  children: ReactNode
  gameType?: AutoGameType | GameType
}

export function GameLogicProvider({ children, gameType }: GameLogicProviderProps) {
  // Pass gameType as an override so that during SSR/SSG the Zustand store (which is
  // populated only via useEffect) is bypassed. This prevents "Game type null" errors
  // when pages are prerendered in parallel Next.js build workers.
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

  return <>{children}</>
}
