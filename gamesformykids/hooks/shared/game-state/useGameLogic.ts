'use client'

/**
 * useGameLogic and sub-hooks — aggregate state from multiple Zustand stores.
 */

import { GameType, BaseGameItem } from '@/lib/types/core/base'
import { GameUIConfig } from '@/lib/constants/ui/gameConfigs'
import { useGameSessionStore } from '@/lib/stores/gameSessionStore'
import { useGameProgressStore } from '@/lib/stores/gameProgressStore'
import { useGameActionsStore } from '@/lib/stores/gameActionsStore'
import { useUIStore } from '@/lib/stores/uiStore'
import { useGameConfig } from './useGameConfig'

interface GameCardProps {
  item: BaseGameItem
  onClick: (item: BaseGameItem) => void
}

interface GameState {
  isPlaying: boolean
  showCelebration: boolean
  currentChallenge: BaseGameItem | null
  options: BaseGameItem[]
  score: number
  level: number
}

export interface GameLogicContextValue {
  gameState: GameState | null
  isPlaying: boolean
  showCelebration: boolean
  currentChallenge: BaseGameItem | null
  options: BaseGameItem[] | null
  score: number
  level: number
  startGame: () => void | Promise<void>
  resetGame: () => void
  handleItemClick: (item: BaseGameItem) => void | Promise<void>
  speakItemName: (itemName: string) => void | Promise<void>
  hints?: string[]
  hasMoreHints?: boolean
  showNextHint?: () => void
  currentAccuracy?: number
  showProgressModal: boolean
  setShowProgressModal: (show: boolean) => void
  config: GameUIConfig
  items: readonly BaseGameItem[]
  CardComponent: React.ComponentType<GameCardProps>
  gameType: GameType
  isReady: boolean
  error: string | null
}

export function useGameLogic(): GameLogicContextValue {
  const currentChallenge = useGameSessionStore((s) => s.currentChallenge)
  const options          = useGameSessionStore((s) => s.options)
  const showCelebration  = useGameSessionStore((s) => s.showCelebration)

  const score        = useGameProgressStore((s) => s.score)
  const level        = useGameProgressStore((s) => s.level)
  const isGameActive = useGameProgressStore((s) => s.isGameActive)

  const startGame       = useGameActionsStore((s) => s.startGame)
  const resetGame       = useGameActionsStore((s) => s.resetGame)
  const handleItemClick = useGameActionsStore((s) => s.handleItemClick)
  const speakItemName   = useGameActionsStore((s) => s.speakItemName)
  const hints           = useGameActionsStore((s) => s.hints)
  const hasMoreHints    = useGameActionsStore((s) => s.hasMoreHints)
  const showNextHint    = useGameActionsStore((s) => s.showNextHint)
  const currentAccuracy = useGameActionsStore((s) => s.currentAccuracy)

  const showProgressModal    = useUIStore((s) => s.showProgressModal)
  const setShowProgressModal = useUIStore((s) => s.setShowProgressModal)

  const { config, items, CardComponent, gameType, isReady, error } = useGameConfig()

  const gameState: GameState | null = isGameActive
    ? { isPlaying: isGameActive, showCelebration, currentChallenge, options, score, level }
    : null

  return {
    gameState,
    isPlaying: isGameActive,
    showCelebration,
    currentChallenge,
    options,
    score,
    level,
    startGame: startGame ?? (() => {}),
    resetGame: resetGame ?? (() => {}),
    handleItemClick: handleItemClick ?? (() => {}),
    speakItemName: speakItemName ?? (() => {}),
    ...(hints !== undefined ? { hints } : {}),
    ...(hasMoreHints !== undefined ? { hasMoreHints } : {}),
    ...(showNextHint !== undefined ? { showNextHint } : {}),
    ...(currentAccuracy !== undefined ? { currentAccuracy } : {}),
    showProgressModal,
    setShowProgressModal,
    config: config!,
    items: items ?? [],
    CardComponent: CardComponent!,
    gameType: gameType as GameType,
    isReady: isReady ?? false,
    error,
  }
}

// ---------------------------------------------------------------------------
// Sub-hooks
// ---------------------------------------------------------------------------
export function useGameState() {
  const currentChallenge = useGameSessionStore((s) => s.currentChallenge)
  const options          = useGameSessionStore((s) => s.options)
  const showCelebration  = useGameSessionStore((s) => s.showCelebration)
  const score        = useGameProgressStore((s) => s.score)
  const level        = useGameProgressStore((s) => s.level)
  const isGameActive = useGameProgressStore((s) => s.isGameActive)

  const gameState: GameState | null = isGameActive
    ? { isPlaying: isGameActive, showCelebration, currentChallenge, options, score, level }
    : null

  return { gameState, isPlaying: isGameActive, showCelebration, currentChallenge, options, score, level }
}

export function useGameActions() {
  const startGame       = useGameActionsStore((s) => s.startGame)
  const resetGame       = useGameActionsStore((s) => s.resetGame)
  const handleItemClick = useGameActionsStore((s) => s.handleItemClick)
  const speakItemName   = useGameActionsStore((s) => s.speakItemName)
  return { startGame, resetGame, handleItemClick, speakItemName }
}

export function useGameUI() {
  const showProgressModal    = useUIStore((s) => s.showProgressModal)
  const setShowProgressModal = useUIStore((s) => s.setShowProgressModal)
  return { showProgressModal, setShowProgressModal }
}

export function useGameConfigFromLogic() {
  const { config, items, CardComponent, gameType } = useGameConfig()
  return { config, items, CardComponent, gameType }
}

export function useGameHints() {
  const hints           = useGameActionsStore((s) => s.hints)
  const hasMoreHints    = useGameActionsStore((s) => s.hasMoreHints)
  const showNextHint    = useGameActionsStore((s) => s.showNextHint)
  const currentAccuracy = useGameActionsStore((s) => s.currentAccuracy)
  return { hints, hasMoreHints, showNextHint, currentAccuracy }
}
