'use client';

/**
 * ===============================================
 * useAutoGame Hook - לוגיקת המשחק בhook מותאם 🎮
 * ===============================================
 * 
 * מפשט את AutoGamePage על ידי:
 * - הפרדת הלוגיקה להוק מותאם
 * - ניהול UI state  Zustand (ללא useState)
 * - אינטגרציה עם Zustand stores
 */

'use client';

import { GameLogicState } from "@/lib/types/hooks/game-state";
import { GameType } from "@/lib/types/core/base";
import { useAutoGameConfig } from './useGameConfig';
import { useGameSessionStore } from '@/lib/stores/gameSessionStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { useUIStore } from '@/lib/stores/uiStore';

/**
 * 🎮 Hook מותאם שמרכז את כל לוגיקת המשחק
 * קורא מ-Zustand stores ישירות — ללא props drilling
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
          hints, hasMoreHints, showNextHint, currentAccuracy, progressStats } = gameHookResult;

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
    currentAccuracy,

    // Game Actions
    startGame,
    resetGame,
    handleItemClick,
    speakItemName,
    pauseGame: () => {},
    resumeGame: () => {},
    resetProgress: () => {},
    navigateToGame: () => {},
    handleCorrectAnswer: () => {},
    handleWrongAnswer: () => {},

    // Enhanced Features
    hints: hints?.map((hint: string | { text?: string }) =>
      typeof hint === 'string' ? hint : hint.text || '',
    ),
    hasMoreHints,
    showNextHint,
    progressStats: progressStats ? (progressStats as unknown as Record<string, unknown>) : undefined,

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

