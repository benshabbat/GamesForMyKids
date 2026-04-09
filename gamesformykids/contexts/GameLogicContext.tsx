'use client';

/**
 * ===============================================
 * GameLogic Context  fully migrated to Zustand
 * ===============================================
 * No React context. State comes from:
 *   - useGameSessionStore  (currentChallenge / options / showCelebration / wrongAttempts)
 *   - useGameProgressStore (score / level / isGameActive)
 *   - useGameActionsStore  (startGame / handleItemClick / resetGame / speakItemName / hints)
 *   - useUIStore           (showProgressModal)
 *   - useGameConfig (GameConfigContext) — config / items / CardComponent / gameType
 *
 * GameLogicProvider is an effects-only component:
 *   it runs useGameHook() and syncs the resulting actions to useGameActionsStore.
 */

import { useEffect, ReactNode } from 'react';
import { BaseGameItem, GameType } from "@/lib/types/core/base";
import { GameUIConfig } from "@/lib/constants/ui/gameConfigs";
import { useAutoGameConfig } from './GameConfigContext';
import { AutoGameType } from '@/lib/constants/gameHooksMap';
import { useGameSessionStore } from '@/lib/stores/gameSessionStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { useGameActionsStore } from '@/lib/stores/gameActionsStore';
import { useUIStore } from '@/lib/stores/uiStore';
import { useGameConfig as useGameConfigFromGameConfig } from './GameConfigContext';

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
  startGame: () => void | Promise<void>;
  resetGame: () => void;
  handleItemClick: (item: BaseGameItem) => void | Promise<void>;
  speakItemName: (itemName: string) => void | Promise<void>;

  // Enhanced Features
  hints?: string[];
  hasMoreHints?: boolean;
  showNextHint?: () => void;
  currentAccuracy?: number;

  // UI State
  showProgressModal: boolean;
  setShowProgressModal: (show: boolean) => void;

  // Configuration
  config: GameUIConfig;
  items: readonly BaseGameItem[];
  CardComponent: React.ComponentType<GameCardProps>;
  gameType: GameType;

  // Status
  isReady: boolean;
  error: string | null;
}

// ---------------------------------------------------------------------------
// GameLogicProvider  effects-only, no React context
// ---------------------------------------------------------------------------
interface GameLogicProviderProps {
  children: ReactNode;
  gameType?: AutoGameType | GameType;
}

export function GameLogicProvider({ children, gameType }: GameLogicProviderProps) {
  // Pass gameType as an override so that during SSR/SSG the Zustand store (which is
  // populated only via useEffect) is bypassed. This prevents the "Game type null" throw
  // when pages are prerendered in parallel Next.js build workers.
  const { useGameHook } = useAutoGameConfig(gameType);
  const gameHookResult = useGameHook();

  // Sync actions + computed values to Zustand on every render
  useEffect(() => {
    useGameActionsStore.getState().setGameActions({
      startGame: gameHookResult.startGame,
      resetGame: gameHookResult.resetGame,
      handleItemClick: gameHookResult.handleItemClick,
      speakItemName: gameHookResult.speakItemName,
      hints: gameHookResult.hints?.map(
        (h: string | { text?: string }) => (typeof h === 'string' ? h : h.text || ''),
      ) ?? [],
      hasMoreHints: gameHookResult.hasMoreHints ?? false,
      showNextHint: gameHookResult.showNextHint ?? (() => {}),
      currentAccuracy: gameHookResult.currentAccuracy ?? 0,
    });
  });

  return <>{children}</>;
}

// ---------------------------------------------------------------------------
// useGameLogic  aggregates from Zustand stores (no React context)
// ---------------------------------------------------------------------------
export function useGameLogic(): GameLogicContextValue {
  // Session state
  const currentChallenge = useGameSessionStore((s) => s.currentChallenge);
  const options          = useGameSessionStore((s) => s.options);
  const showCelebration  = useGameSessionStore((s) => s.showCelebration);

  // Progress state
  const score        = useGameProgressStore((s) => s.score);
  const level        = useGameProgressStore((s) => s.level);
  const isGameActive = useGameProgressStore((s) => s.isGameActive);

  // Actions
  const startGame       = useGameActionsStore((s) => s.startGame);
  const resetGame       = useGameActionsStore((s) => s.resetGame);
  const handleItemClick = useGameActionsStore((s) => s.handleItemClick);
  const speakItemName   = useGameActionsStore((s) => s.speakItemName);
  const hints           = useGameActionsStore((s) => s.hints);
  const hasMoreHints    = useGameActionsStore((s) => s.hasMoreHints);
  const showNextHint    = useGameActionsStore((s) => s.showNextHint);
  const currentAccuracy = useGameActionsStore((s) => s.currentAccuracy);

  // UI
  const showProgressModal    = useUIStore((s) => s.showProgressModal);
  const setShowProgressModal = useUIStore((s) => s.setShowProgressModal);

  // Config
  const { config, items, CardComponent, gameType, isReady, error } =
    useGameConfigFromGameConfig();

  const gameState: GameState | null = isGameActive
    ? { isPlaying: isGameActive, showCelebration, currentChallenge, options, score, level }
    : null;

  return {
    gameState,
    isPlaying: isGameActive,
    showCelebration,
    currentChallenge,
    options,
    score,
    level,
    startGame,
    resetGame,
    handleItemClick,
    speakItemName,
    hints,
    hasMoreHints,
    showNextHint,
    currentAccuracy,
    showProgressModal,
    setShowProgressModal,
    config: config!,
    items: items ?? [],
    CardComponent: CardComponent!,
    gameType: gameType as GameType,
    isReady: isReady ?? false,
    error,
  };
}

// ---------------------------------------------------------------------------
// Specialised sub-hooks (unchanged API)
// ---------------------------------------------------------------------------
export function useGameState() {
  const currentChallenge = useGameSessionStore((s) => s.currentChallenge);
  const options          = useGameSessionStore((s) => s.options);
  const showCelebration  = useGameSessionStore((s) => s.showCelebration);
  const score        = useGameProgressStore((s) => s.score);
  const level        = useGameProgressStore((s) => s.level);
  const isGameActive = useGameProgressStore((s) => s.isGameActive);

  const gameState: GameState | null = isGameActive
    ? { isPlaying: isGameActive, showCelebration, currentChallenge, options, score, level }
    : null;

  return { gameState, isPlaying: isGameActive, showCelebration, currentChallenge, options, score, level };
}

export function useGameActions() {
  const startGame       = useGameActionsStore((s) => s.startGame);
  const resetGame       = useGameActionsStore((s) => s.resetGame);
  const handleItemClick = useGameActionsStore((s) => s.handleItemClick);
  const speakItemName   = useGameActionsStore((s) => s.speakItemName);
  return { startGame, resetGame, handleItemClick, speakItemName };
}

export function useGameUI() {
  const showProgressModal    = useUIStore((s) => s.showProgressModal);
  const setShowProgressModal = useUIStore((s) => s.setShowProgressModal);
  return { showProgressModal, setShowProgressModal };
}

export function useGameConfig() {
  const { config, items, CardComponent, gameType } = useGameConfigFromGameConfig();
  return { config, items, CardComponent, gameType };
}

export function useGameHints() {
  const hints           = useGameActionsStore((s) => s.hints);
  const hasMoreHints    = useGameActionsStore((s) => s.hasMoreHints);
  const showNextHint    = useGameActionsStore((s) => s.showNextHint);
  const currentAccuracy = useGameActionsStore((s) => s.currentAccuracy);
  return { hints, hasMoreHints, showNextHint, currentAccuracy };
}

