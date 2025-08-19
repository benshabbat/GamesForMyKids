'use client';

/**
 * ===============================================
 * useAutoGame Hook - לוגיקת המשחק בhook מותאם 🎮
 * ===============================================
 * 
 * מפשט את AutoGamePage על ידי:
 * - הפרדת הלוגיקה להוק מותאם
 * - ניהול UI state
 * - אינטגרציה עם הקונטקסטים
 */

import { useState } from 'react';
import { GameLogicState } from "@/lib/types/hooks/game-state";
import { useAutoGameConfig } from '@/contexts/GameConfigContext';

/**
 * 🎮 Hook מותאם שמרכז את כל לוגיקת המשחק
 */
export function useAutoGame(): GameLogicState {
  // קבלת קונפיגורציה
  const { config, items, CardComponent, useGameHook, gameType } = useAutoGameConfig();
  
  // UI state
  const [showProgressModal, setShowProgressModal] = useState(false);
  
  // הפעלת game hook
  const gameHookResult = useGameHook();
  const {
    gameState,
    speakItemName,
    startGame,
    handleItemClick,
    resetGame,
    hints,
    hasMoreHints,
    showNextHint,
    currentAccuracy,
    progressStats,
  } = gameHookResult;
  
  return {
    // Game State
    gameState,
    isPlaying: gameState?.isPlaying || false,
    showCelebration: gameState?.showCelebration || false,
    currentChallenge: gameState?.currentChallenge || null,
    options: gameState?.options || null,
    score: gameState?.score || 0,
    level: gameState?.level || 1,
    
    // Game Actions
    startGame,
    resetGame,
    handleItemClick,
    speakItemName,
    
    // Enhanced Features
    hints: hints?.map(hint => typeof hint === 'string' ? hint : hint.text || ''),
    hasMoreHints,
    showNextHint,
    currentAccuracy,
    progressStats: progressStats ? (progressStats as unknown as Record<string, unknown>) : undefined,
    
    // UI State
    showProgressModal,
    setShowProgressModal,
    
    // Configuration
    config,
    items,
    CardComponent,
    gameType,
  };
}
