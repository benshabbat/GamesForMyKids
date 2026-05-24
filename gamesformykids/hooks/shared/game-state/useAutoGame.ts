'use client';

import { GameLogicState } from "@/lib/types/hooks/game-state";
import { GameType } from "@/lib/types/core/base";
import { useAutoGameConfig } from './useGameConfig';
import { useGameSessionStore } from '@/lib/stores/gameSessionStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { useUIStore } from '@/lib/stores/uiStore';

/**
 * DRIVER hook — use inside the auto-game component tree only.
 *
 * Calls `useAutoGameConfig().useGameHook()` which invokes the game-specific
 * hook (looked up from GAME_HOOKS_MAP) and writes its results into the Zustand
 * stores (gameSessionStore, gameProgressStore, gameActionsStore).
 *
 * Throws if the current game type is not registered in GAME_HOOKS_MAP — only
 * use this in components guaranteed to be rendered under a valid game route.
 *
 * Callers: AutoGamePage, AutoGameHeader, AutoGameBody.
 *
 * For components that only need to *read* game state that another hook has
 * already written, use `useUniversalGame` instead.
 */
export function useAutoGame(): GameLogicState {
  // קבלת קונפיגורציה (Zustand-backed)
  const { config, items, CardComponent, useGameHook, gameType } = useAutoGameConfig();

  // הפעלת game hook (מעדכן את gameSessionStore + gameActionsStore)
  const gameHookResult = useGameHook();

  // Session state from Zustand
  const currentChallenge = useGameSessionStore((s) => s.currentChallenge);
  const options          = useGameSessionStore((s) => s.options);
  const showCelebration  = useGameSessionStore((s) => s.showCelebration);

  // Progress state from Zustand
  const score        = useGameProgressStore((s) => s.score);
  const level        = useGameProgressStore((s) => s.level);
  const isGameActive = useGameProgressStore((s) => s.isGameActive);

  // Actions from the hook result (freshest closures)
  const { startGame, handleItemClick, resetGame, speakItemName,
          hints, hasMoreHints, showNextHint, currentAccuracy } = gameHookResult;

  // UI state from Zustand
  const showProgressModal    = useUIStore((s) => s.showProgressModal);
  const setShowProgressModal = useUIStore((s) => s.setShowProgressModal);

  const gameState = isGameActive
    ? { isPlaying: isGameActive, showCelebration, currentChallenge, options, score, level }
    : null;

  return {
    // Game State
    gameState,
    isGameActive: !!gameState,
    isPlaying: isGameActive,
    showCelebration,
    currentChallenge,
    options,
    score,
    level,

    // Game Progress
    streak: 0,
    timeSpent: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    currentAccuracy: currentAccuracy ?? 0,

    // Game Actions
    startGame: startGame ?? (() => {}),
    resetGame: resetGame ?? (() => {}),
    handleItemClick: handleItemClick ?? (() => {}),
    speakItemName: speakItemName ?? (() => {}),
    pauseGame: () => {},
    resumeGame: () => {},
    resetProgress: () => {},
    navigateToGame: () => {},
    handleCorrectAnswer: () => {},
    handleWrongAnswer: () => {},

    // Enhanced Features
    hints: hints?.map((hint) => {
      const h = hint as string | { text?: string };
      return typeof h === 'string' ? h : h.text ?? '';
    }),
    hasMoreHints,
    showNextHint,

    // UI State
    showProgressModal,
    setShowProgressModal,

    // Configuration
    config,
    items,
    CardComponent,
    gameType: gameType as GameType,
  };
}

