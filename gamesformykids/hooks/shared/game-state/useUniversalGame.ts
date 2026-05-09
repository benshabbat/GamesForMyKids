'use client'

/**
 * READER hook — use in shared UI components and the ultimate-game tree.
 *
 * Aggregates already-computed game state by reading from the Zustand stores
 * via the useGameLogic sub-hooks. It does NOT call any game-specific hook and
 * does NOT write to any store.
 *
 * This is safe to call from any component that is rendered inside a context
 * where the game has already been driven (by useAutoGame or a game-specific
 * hook). It never throws for an unrecognised game type.
 *
 * Callers: UltimateGamePage, UltimateStartScreen, AutoStartScreen, and all
 * shared game UI components (GameChallengeSection, GameMainContent,
 * GameStartButton, GameStatsButton, ColoredShapeCard, CelebrationBox, …).
 *
 * For the component tree that must also *drive* the game (invoke the
 * game-specific hook), use `useAutoGame` instead.
 */

import { GameType } from '@/lib/types/core/base'
import {
  UniversalGameContextValue,
} from '@/lib/types/contexts/universal-game'
import {
  useGameLogic,
  useGameState,
  useGameActions,
  useGameConfigFromLogic,
  useHintActions,
  useGameUI,
} from './useGameLogic'

export function useUniversalGame(): UniversalGameContextValue {
  const { isReady, error } = useGameLogic()
  const { gameState, isPlaying, showCelebration, currentChallenge, options, score, level } =
    useGameState()
  const { startGame, resetGame, handleItemClick, speakItemName } = useGameActions()
  const { config, items, CardComponent, gameType } = useGameConfigFromLogic()
  const { hints, hasMoreHints, showNextHint, currentAccuracy } = useHintActions()
  const { showProgressModal, setShowProgressModal } = useGameUI()

  return {
    gameState,
    isPlaying,
    showCelebration,
    currentChallenge,
    options: options || [],
    score,
    level,
    isReady,
    error,
    startGame,
    resetGame,
    handleItemClick,
    speakItemName,
    config: config!,
    items: items || [],
    CardComponent: CardComponent!,
    gameType: gameType as GameType,
    hints: hints || [],
    hasMoreHints: hasMoreHints || false,
    showNextHint: showNextHint || (() => {}),
    currentAccuracy: currentAccuracy || 0,
    showProgressModal,
    setShowProgressModal,
  }
}

