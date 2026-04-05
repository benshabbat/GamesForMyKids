"use client";

/**
 * ===============================================
 * Universal Game Context  no React context
 * ===============================================
 * useUniversalGame() reads directly from GameLogicContext sub-hooks.
 * UniversalGameProvider is a no-op passthrough kept for backward
 * compatibility with existing provider trees.
 */

import {
  UniversalGameContextValue,
  UniversalGameProviderProps,
} from '@/lib/types/contexts/universal-game';
import {
  useGameLogic,
  useGameState,
  useGameActions,
  useGameConfig as useGameConfigFromLogic,
  useGameHints,
  useGameUI,
} from './GameLogicContext';

// ---------------------------------------------------------------------------
// Provider  no-op passthrough
// ---------------------------------------------------------------------------
export function UniversalGameProvider({ children }: UniversalGameProviderProps) {
  return <>{children}</>;
}

// ---------------------------------------------------------------------------
// Main hook  aggregates from GameLogicContext sub-hooks directly
// ---------------------------------------------------------------------------
export function useUniversalGame(): UniversalGameContextValue {
  const { isReady, error } = useGameLogic();
  const { gameState, isPlaying, showCelebration, currentChallenge, options, score, level } =
    useGameState();
  const { startGame, resetGame, handleItemClick, speakItemName } = useGameActions();
  const { config, items, CardComponent, gameType } = useGameConfigFromLogic();
  const { hints, hasMoreHints, showNextHint, currentAccuracy } = useGameHints();
  const { showProgressModal, setShowProgressModal } = useGameUI();

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
    config,
    items: items || [],
    CardComponent,
    gameType,
    hints: hints || [],
    hasMoreHints: hasMoreHints || false,
    showNextHint: showNextHint || (() => {}),
    currentAccuracy: currentAccuracy || 0,
    showProgressModal,
    setShowProgressModal,
  };
}

// ---------------------------------------------------------------------------
// Specialised sub-hooks (unchanged API)
// ---------------------------------------------------------------------------
export function useGameData() {
  const { gameState, isPlaying, showCelebration, currentChallenge, options, score, level, isReady, error } =
    useUniversalGame();
  return { gameState, isPlaying, showCelebration, currentChallenge, options, score, level, isReady, error };
}

export function useGameControls() {
  const { startGame, resetGame, handleItemClick, speakItemName } = useUniversalGame();
  return { startGame, resetGame, handleItemClick, speakItemName };
}

export function useGameConfiguration() {
  const { config, items, CardComponent, gameType } = useUniversalGame();
  return { config, items, CardComponent, gameType };
}

export function useGameEnhancements() {
  const { hints, hasMoreHints, showNextHint, currentAccuracy, showProgressModal, setShowProgressModal } =
    useUniversalGame();
  return { hints, hasMoreHints, showNextHint, currentAccuracy, showProgressModal, setShowProgressModal };
}