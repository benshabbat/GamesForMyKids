'use client'

/**
 * useUniversalGame and sub-hooks — aggregates from useGameLogic sub-hooks.
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
  useGameHints,
  useGameUI,
} from './useGameLogic'

export function useUniversalGame(): UniversalGameContextValue {
  const { isReady, error } = useGameLogic()
  const { gameState, isPlaying, showCelebration, currentChallenge, options, score, level } =
    useGameState()
  const { startGame, resetGame, handleItemClick, speakItemName } = useGameActions()
  const { config, items, CardComponent, gameType } = useGameConfigFromLogic()
  const { hints, hasMoreHints, showNextHint, currentAccuracy } = useGameHints()
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
    startGame: startGame ?? (() => {}),
    resetGame: resetGame ?? (() => {}),
    handleItemClick: handleItemClick ?? (() => {}),
    speakItemName: speakItemName ?? (() => {}),
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

export function useGameData() {
  const { gameState, isPlaying, showCelebration, currentChallenge, options, score, level, isReady, error } =
    useUniversalGame()
  return { gameState, isPlaying, showCelebration, currentChallenge, options, score, level, isReady, error }
}

export function useGameControls() {
  const { startGame, resetGame, handleItemClick, speakItemName } = useUniversalGame()
  return { startGame, resetGame, handleItemClick, speakItemName }
}

export function useGameConfiguration() {
  const { config, items, CardComponent, gameType } = useUniversalGame()
  return { config, items, CardComponent, gameType }
}

export function useGameEnhancements() {
  const { hints, hasMoreHints, showNextHint, currentAccuracy, showProgressModal, setShowProgressModal } =
    useUniversalGame()
  return { hints, hasMoreHints, showNextHint, currentAccuracy, showProgressModal, setShowProgressModal }
}
