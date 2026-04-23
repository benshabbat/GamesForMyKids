'use client'

/**
 * Game config hooks — reads game configuration from useGameTypeStore
 * and maps to config / items / CardComponent / hook.
 */

import { useMemo } from 'react'
import { GameType, BaseGameItem } from '@/lib/types/core/base'
import { GAME_UI_CONFIGS, GameUIConfig } from '@/lib/constants/ui/gameConfigs'
import { GAME_HOOKS_MAP, AutoGameType } from '@/lib/constants/gameHooksMap'
import { GAME_ITEMS_MAP } from '@/lib/constants/gameItemsMap'
import { GameCardMap } from '@/components/shared/GameCardMap'
import { Metadata } from 'next'
import {
  GameConfigContextValue,
} from '@/lib/types/contexts/game-config'
import type { GameItemCardProps } from '@/lib/types/components/cards'
import { useGameTypeStore } from '@/lib/stores/gameTypeStore'

// ---------------------------------------------------------------------------
// Core logic
// ---------------------------------------------------------------------------
function buildGameConfigValue(gameType: GameType | null): GameConfigContextValue {
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
    const items = GAME_ITEMS_MAP[gameType] as BaseGameItem[]
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
  const gameType = (overrideGameType ?? storeGameType) as GameType | null
  return useMemo(() => buildGameConfigValue(gameType), [gameType])
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

export function useGameUIConfig(): GameUIConfig | null {
  return useGameConfig().config
}

export function useGameItems(): BaseGameItem[] | null {
  return useGameConfig().items
}

export function useGameCardComponent(): React.ComponentType<GameItemCardProps> | null {
  return useGameConfig().CardComponent
}

// ---------------------------------------------------------------------------
// Metadata helpers
// ---------------------------------------------------------------------------
export function generateGameMetadata(
  gameType: GameType,
  gameUrlType?: string,
  baseUrl = 'https://gamesformykids.vercel.app',
): Metadata {
  const config = GAME_UI_CONFIGS[gameType]
  const urlGameType = gameUrlType || gameType

  if (!config) return { title: 'משחק לא נמצא', description: 'המשחק שחיפשת לא נמצא' }

  const description = config.metadata?.description || config.subTitle
  const keywords =
    config.metadata?.keywords ||
    (config.title + ', משחקים לילדים, חינוכי, גיל 2-5, פעוטות, למידה, ' + gameType)
  const ogImage = config.metadata?.ogImagePath || '/images/games/' + gameType + '-og.png'
  const twitterImage =
    config.metadata?.twitterImagePath || '/images/games/' + gameType + '-twitter.png'

  return {
    title: config.title,
    description,
    keywords,
    openGraph: {
      title: config.title,
      description,
      type: 'article',
      url: baseUrl + '/games/' + urlGameType,
      images: [{ url: ogImage, width: 1200, height: 630, alt: config.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description,
      images: [twitterImage],
    },
    alternates: { canonical: '/games/' + urlGameType },
  }
}

export function useGameMetadata(gameUrlType?: string): Metadata {
  const gameType = useGameTypeStore((s) => s.currentGameType)
  if (!gameType) return { title: 'משחק לא נמצא', description: 'המשחק שחיפשת לא נמצא' }
  return generateGameMetadata(gameType as GameType, gameUrlType)
}
