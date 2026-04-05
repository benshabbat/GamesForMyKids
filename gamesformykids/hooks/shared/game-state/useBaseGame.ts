'use client';

import { useState } from "react";
import { BaseGameItem, BaseGameState, GameType } from "@/lib/types/core/base";
import { UseBaseGameConfig } from "@/lib/types/hooks/game-state";
import { useGameAudio } from "../audio/useGameAudio";
import { useGameOptions } from "./useGameOptions";
import { useGamePerformance } from "../analytics/useGamePerformance";
import { useGameHints } from "../ui/useGameHints";
import { useProgressTracking } from "../progress/useProgressTracking";
import { 
  delay, 
  speakItemName as speakItemNameUtil,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/game/gameUtils";
import { GAME_CONSTANTS } from "@/lib/constants";
import { useGameProgressStore, useGameStore } from "@/lib/stores";

/**
 * Hook בסיסי לכל המשחקים הפשוטים
 * מכיל את כל הלוגיקה הבסיסית המשותפת + שיפורים
 */
export function useBaseGame<T extends BaseGameItem = BaseGameItem>(config: UseBaseGameConfig) {
  const { gameType, items, pronunciations, gameConstants } = config;

  // ── Zustand store reads (score / level / isPlaying) ─────
  const score          = useGameProgressStore((s) => s.score);
  const level          = useGameProgressStore((s) => s.level);
  const isGameActive   = useGameProgressStore((s) => s.isGameActive);

  // ── Local state — only game-specific UI fields ───────────
  const [localState, setLocalState] = useState<{
    currentChallenge: T | null;
    options: T[];
    showCelebration: boolean;
  }>({
    currentChallenge: null,
    options: [],
    showCelebration: false,
  });

  // Reconstruct the familiar gameState shape for callers (backward compat)
  const gameState: BaseGameState<T> = {
    currentChallenge: localState.currentChallenge,
    options:          localState.options,
    showCelebration:  localState.showCelebration,
    score,
    level,
    isPlaying: isGameActive,
  };

  // מעקב טעויות לצורך רמזים
  const [wrongAttempts, setWrongAttempts] = useState(0);

  // Hooks משותפים
  const { speechEnabled, playSuccessSound } = useGameAudio();
  
  // Performance optimizations
  const performanceHooks = useGamePerformance({
    items,
    currentChallenge: localState.currentChallenge,
  });

  // Hints system
  const hintsHooks = useGameHints({
    currentChallenge: localState.currentChallenge,
    wrongAttempts,
  });

  // Progress tracking
  const progressHooks = useProgressTracking(gameType);
  
  const { getRandomChallenge, getOptionsForChallenge } = useGameOptions({
    allItems: items,
    level,
    baseCount: gameConstants.BASE_COUNT,
    increment: gameConstants.INCREMENT,
    levelThreshold: gameConstants.LEVEL_THRESHOLD,
  });

  // פונקציות דיבור
  const speakItemNameFunc = async (itemName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemNameUtil(itemName, (name: string) => {
        const pronunciation = pronunciations[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing item name:", error);
    }
  };

  // התחלת משחק
  const startGame = async () => {
    // Reset Zustand stores
    const progressStore = useGameProgressStore.getState();
    progressStore.resetProgress();
    progressStore.setGameActive(true);
    useGameStore.getState().startGame(gameType);

    setLocalState({ currentChallenge: null, options: [], showCelebration: false });
    setWrongAttempts(0);
    progressHooks.startSession();

    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    await speakStartMessage();
    
    const challenge = getRandomChallenge() as T;
    const options = getOptionsForChallenge(challenge) as T[];

    setLocalState((prev) => ({ ...prev, currentChallenge: challenge, options }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakItemNameFunc(challenge.name);
  };

  // טיפול בלחיצה על פריט
  const handleItemClick = async (selectedItem: T) => {
    if (!localState.currentChallenge || localState.showCelebration) return;

    if (selectedItem.name === localState.currentChallenge.name) {
      // תשובה נכונה
      playSuccessSound();
      setWrongAttempts(0);

      // Read current store values for progress tracking
      const { score: currentScore, level: currentLevel } = useGameProgressStore.getState();
      progressHooks.recordCorrectAnswer(
        localState.currentChallenge,
        currentScore + GAME_CONSTANTS.SCORE_INCREMENT,
        currentLevel + 1,
      );
      
      const challenge = getRandomChallenge() as T;
      const options = getOptionsForChallenge(challenge) as T[];
      
      const onComplete = async () => {
        setLocalState((prev) => ({ ...prev, currentChallenge: challenge, options }));
        await delay(500);
        await speakItemNameFunc(challenge.name);
      };

      // handleCorrectGameAnswer now updates score/level via store internally
      await handleCorrectGameAnswer(
        (v) => setLocalState((prev) => ({ ...prev, showCelebration: v })),
        onComplete,
      );

      // Sync updated store values to global game session
      const updated = useGameProgressStore.getState();
      useGameStore.getState().updateProgress(updated.score, updated.level);
    } else {
      // תשובה שגויה
      setWrongAttempts((prev) => prev + 1);
      progressHooks.recordMistake(localState.currentChallenge, 1);
      
      await handleWrongGameAnswer(async () => {
        if (localState.currentChallenge) {
          await speakItemNameFunc(localState.currentChallenge.name);
        }
      });
    }
  };

  // איפוס משחק
  const resetGame = () => {
    progressHooks.endSession();
    useGameStore.getState().endGame();
    useGameProgressStore.getState().setGameActive(false);
    useGameProgressStore.getState().resetProgress();
    setWrongAttempts(0);
    setLocalState({ currentChallenge: null, options: [], showCelebration: false });
  };

  return {
    gameState,
    speakItemName: speakItemNameFunc,
    startGame,
    handleItemClick,
    resetGame,
    // שיפורים חדשים
    hints: hintsHooks.hints || [],
    hasMoreHints: hintsHooks.hasMoreHints || false,
    showNextHint: hintsHooks.showNextHint || (() => {}),
    currentAccuracy: progressHooks.getCurrentAccuracy() || 0,
    progressStats: progressHooks.progressStats || null,
    performanceHooks, // לשימוש בקומפוננטים
  };
}
