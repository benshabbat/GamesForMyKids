"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { GameType, BaseGameItem } from '@/lib/types/base';
import { GameUIConfig } from '@/lib/constants/ui/gameConfigs';
import { useGameLogic, useGameState, useGameActions, useGameConfigFromLogic, useGameHints, useGameUI } from '@/contexts';

/**
 * ===============================================
 * Universal Game Context - כל הלוגיקה במקום אחד! 🎯
 * ===============================================
 * 
 * Context מאוחד שמכיל את כל מה שצריך למשחק:
 * - אפס props drilling
 * - כל הלוגיקה במקום אחד
 * - פשוט לשימוש
 */

interface GameCardProps {
  item: BaseGameItem;
  onClick: (item: BaseGameItem) => void;
}

interface UniversalGameContextValue {
  // Game State
  gameState: unknown;
  isPlaying: boolean;
  showCelebration: boolean;
  currentChallenge: BaseGameItem | null;
  options: BaseGameItem[];
  score: number;
  level: number;
  isReady: boolean;
  error: string | null;
  
  // Game Actions
  startGame: () => void;
  resetGame: () => void;
  handleItemClick: (item: BaseGameItem) => void;
  speakItemName: (itemName: string) => void;
  
  // Game Config
  config: GameUIConfig;
  items: BaseGameItem[];
  CardComponent: React.ComponentType<GameCardProps>;
  gameType: GameType;
  
  // Hints & UI
  hints: string[];
  hasMoreHints: boolean;
  showNextHint: () => void;
  currentAccuracy: number;
  showProgressModal: boolean;
  setShowProgressModal: (show: boolean) => void;
}

const UniversalGameContext = createContext<UniversalGameContextValue | undefined>(undefined);

interface UniversalGameProviderProps {
  children: ReactNode;
}

/**
 * 🎮 Universal Game Provider - כל הלוגיקה במקום אחד!
 * מקבל את כל הנתונים מהקונטקסטים הקיימים ומרכז אותם
 */
export function UniversalGameProvider({ children }: UniversalGameProviderProps) {
  // 🎮 איסוף כל הנתונים מהקונטקסטים הקיימים
  const { isReady, error } = useGameLogic();
  const { gameState, isPlaying, showCelebration, currentChallenge, options, score, level } = useGameState();
  const { startGame, resetGame, handleItemClick, speakItemName } = useGameActions();
  const { config, items, CardComponent, gameType } = useGameConfigFromLogic();
  const { hints, hasMoreHints, showNextHint, currentAccuracy } = useGameHints();
  const { showProgressModal, setShowProgressModal } = useGameUI();

  const value: UniversalGameContextValue = {
    // Game State
    gameState,
    isPlaying,
    showCelebration,
    currentChallenge,
    options: options || [],
    score,
    level,
    isReady,
    error,
    
    // Game Actions
    startGame,
    resetGame,
    handleItemClick,
    speakItemName,
    
    // Game Config
    config,
    items: items || [],
    CardComponent,
    gameType,
    
    // Hints & UI
    hints: hints || [],
    hasMoreHints: hasMoreHints || false,
    showNextHint: showNextHint || (() => {}),
    currentAccuracy: currentAccuracy || 0,
    showProgressModal,
    setShowProgressModal,
  };

  return (
    <UniversalGameContext.Provider value={value}>
      {children}
    </UniversalGameContext.Provider>
  );
}

/**
 * 🎯 Hook יחיד לכל מה שצריך למשחק!
 * אפס props drilling - הכל במקום אחד
 */
export function useUniversalGame(): UniversalGameContextValue {
  const context = useContext(UniversalGameContext);
  if (context === undefined) {
    throw new Error('useUniversalGame must be used within a UniversalGameProvider');
  }
  return context;
}

/**
 * 🎮 Hooks ייעודיים לחלקים ספציפיים (אופציונלי)
 */
export function useGameData() {
  const { gameState, isPlaying, showCelebration, currentChallenge, options, score, level, isReady, error } = useUniversalGame();
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
  const { hints, hasMoreHints, showNextHint, currentAccuracy, showProgressModal, setShowProgressModal } = useUniversalGame();
  return { hints, hasMoreHints, showNextHint, currentAccuracy, showProgressModal, setShowProgressModal };
}
