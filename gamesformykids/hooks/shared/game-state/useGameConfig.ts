'use client'

/**
 * Game config hooks — reads game configuration from useGameTypeStore
 * and maps to config / items / CardComponent / hook.
 */

import { useMemo } from 'react'
import { GameType, BaseGameItem } from '@/lib/types/core/base'
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs'
import { GAME_HOOKS_MAP, AutoGameType } from './gameHooksMap'
import { GameCardMap } from '@/components/shared/GameCardMap'
import {
  GameConfigContextValue,
} from '@/lib/types/contexts/game-config'
import { useGameTypeStore } from '@/lib/stores/gameTypeStore'

// ---------------------------------------------------------------------------
// Core logic
// ---------------------------------------------------------------------------
function buildGameConfigValue(
  gameType: GameType | null,
  storeItems: BaseGameItem[] | null,
): GameConfigContextValue {
  if (!gameType) {
    return {
      gameType: null,
      config: null,
      items: null,
      CardComponent: null,
      useGameHook: null,
      isSupported: false,
      isReady: false,
      error: null,
    }
  }

  try {
    const config = GAME_UI_CONFIGS[gameType]
    const useGameHook = GAME_HOOKS_MAP[gameType as AutoGameType]
    const items = storeItems
    const CardComponent = GameCardMap[gameType] ?? null

    const isSupported = !!(config && (gameType in GAME_HOOKS_MAP) && items?.length && CardComponent)

    let error: string | null = null
    if (!config) error = 'Config not found for game type: ' + gameType
    else if (!(gameType in GAME_HOOKS_MAP)) error = 'Hook not found for game type: ' + gameType
    else if (!items) error = 'Items not found for game type: ' + gameType
    else if (!CardComponent) error = 'Card component not found for game type: ' + gameType

    return { gameType, config, items, CardComponent, useGameHook, isSupported, isReady: isSupported, error }
  } catch (err) {
    return {
      gameType,
      config: null,
      items: null,
      CardComponent: null,
      useGameHook: null,
      isSupported: false,
      isReady: false,
      error: err instanceof Error ? err.message : 'שגיאה לא ידועה',
    }
  }
}

// ---------------------------------------------------------------------------
// Core hook
// ---------------------------------------------------------------------------
export function useGameConfig(overrideGameType?: AutoGameType | GameType): GameConfigContextValue {
  const storeGameType = useGameTypeStore((s) => s.currentGameType)
  const storeItems    = useGameTypeStore((s) => s.gameItems)
  const gameType = (overrideGameType ?? storeGameType) as GameType | null
  return useMemo(() => buildGameConfigValue(gameType, storeItems), [gameType, storeItems])
}

// ---------------------------------------------------------------------------
// Specialised hooks
// ---------------------------------------------------------------------------
export function useAutoGameConfig(overrideGameType?: AutoGameType | GameType) {
  const cfg = useGameConfig(overrideGameType)

  if (!cfg.isReady || cfg.error || !cfg.gameType) {
    throw new Error(cfg.error || 'Game type ' + cfg.gameType + ' is not supported by AutoGamePage')
  }

  const gameHook = GAME_HOOKS_MAP[cfg.gameType as AutoGameType]
  if (!gameHook) {
    throw new Error('Game hook not found for ' + cfg.gameType)
  }

  return {
    config: cfg.config!,
    items: cfg.items!,
    CardComponent: cfg.CardComponent!,
    useGameHook: gameHook,
    gameType: cfg.gameType,
  }
}

