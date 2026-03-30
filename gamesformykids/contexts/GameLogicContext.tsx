'use client';

/**
 * ===============================================
 * GameLogic Context - לוגיקת המשחק בקונטקסט 🎮
 * ===============================================
 * 
 * מכיל את כל הלוגיקה של המשחק בקונטקסט:
 * - הפעלת ה-game hook
 * - ניהול UI state  
 * - אספקת כל הנתונים לקומפוננטים
 * 
 * AutoGamePage פשוט מקבל הכל מהקונטקסט!
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { BaseGameItem, GameType } from "@/lib/types/core/base";
import { GameUIConfig } from "@/lib/constants/ui/gameConfigs";
import { useAutoGameConfig } from './GameConfigContext';

interface GameCardProps {
  item: BaseGameItem;
  onClick: (item: BaseGameItem) => void;
}

interface GameState {
  isPlaying: boolean;
  showCelebration: boolean;
  currentChallenge: BaseGameItem | null;
  options: BaseGameItem[];
  score: number;
  level: number;
}

export interface GameLogicContextValue {
  // Game State
  gameState: GameState | null;
  isPlaying: boolean;
  showCelebration: boolean;
  currentChallenge: BaseGameItem | null;
  options: BaseGameItem[] | null;
  score: number;
  level: number;
  
  // Game Actions
  startGame: () => void;
  resetGame: () => void;
  handleItemClick: (item: BaseGameItem) => void;
  speakItemName: (itemName: string) => void;
  
  // Enhanced Features
  hints?: string[];
  hasMoreHints?: boolean;
  showNextHint?: () => void;
  currentAccuracy?: number;
  
  // UI State
  showProgressModal: boolean;
  setShowProgressModal: (show: boolean) => void;
  
  // Configuration - זמין לכל הקומפוננטים
  config: GameUIConfig;
  items: readonly BaseGameItem[];
  CardComponent: React.ComponentType<GameCardProps>;
  gameType: GameType,
  
  // Status
  isReady: boolean;
  error: string | null;
}

// Create context
const GameLogicContext = createContext<GameLogicContextValue | undefined>(undefined);

// Provider Props
interface GameLogicProviderProps {
  children: ReactNode;
}

/**
 * 🎮 GameLogic Provider - מספק את כל לוגיקת המשחק
 */
export function GameLogicProvider({ children }: GameLogicProviderProps) {
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
  } = gameHookResult;

  const contextValue: GameLogicContextValue = {
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
    hints: hints?.map((hint: string | { text?: string }) => typeof hint === 'string' ? hint : hint.text || ''),
    hasMoreHints,
    showNextHint,
    currentAccuracy,
    
    // UI State
    showProgressModal,
    setShowProgressModal,
    
    // Configuration
    config,
    items,
    CardComponent,
    gameType: gameType as GameType,
    
    // Status
    isReady: true,
    error: null,
  };

  return (
    <GameLogicContext.Provider value={contextValue}>
      {children}
    </GameLogicContext.Provider>
  );
}

/**
 * 🎮 Hook לשימוש בלוגיקת המשחק
 */
export function useGameLogic(): GameLogicContextValue {
  const context = useContext(GameLogicContext);
  
  if (context === undefined) {
    throw new Error('useGameLogic must be used within a GameLogicProvider');
  }
  
  return context;
}

/**
 * 🎯 Hooks מותאמים לחלקים ספציפיים
 */
export function useGameState() {
  const { gameState, isPlaying, showCelebration, currentChallenge, options, score, level } = useGameLogic();
  return { gameState, isPlaying, showCelebration, currentChallenge, options, score, level };
}

export function useGameActions() {
  const { startGame, resetGame, handleItemClick, speakItemName } = useGameLogic();
  return { startGame, resetGame, handleItemClick, speakItemName };
}

export function useGameUI() {
  const { showProgressModal, setShowProgressModal } = useGameLogic();
  return { showProgressModal, setShowProgressModal };
}

export function useGameConfig() {
  const { config, items, CardComponent, gameType } = useGameLogic();
  return { config, items, CardComponent, gameType };
}

export function useGameHints() {
  const { hints, hasMoreHints, showNextHint, currentAccuracy } = useGameLogic();
  return { hints, hasMoreHints, showNextHint, currentAccuracy };
}
