'use client';

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
import { useGameSessionStore } from "@/lib/stores/gameSessionStore";

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

  // ── Zustand game session store (currentChallenge / options / showCelebration) ──
  const currentChallenge = useGameSessionStore((s) => s.currentChallenge) as T | null;
  const options          = useGameSessionStore((s) => s.options) as T[];
  const showCelebration  = useGameSessionStore((s) => s.showCelebration);
  const wrongAttempts    = useGameSessionStore((s) => s.wrongAttempts);

  // Reconstruct the familiar gameState shape for callers (backward compat)
  const gameState: BaseGameState<T> = {
    currentChallenge,
    options,
    showCelebration,
    score,
    level,
    isPlaying: isGameActive,
  };

  // Hooks משותפים
  const { speechEnabled, playSuccessSound } = useGameAudio();
  
  // Performance optimizations
  const performanceHooks = useGamePerformance({
    items,
    currentChallenge,
  });

  // Hints system
  const hintsHooks = useGameHints({
    currentChallenge,
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

    useGameSessionStore.getState().resetSession();
    progressHooks.startSession();

    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    await speakStartMessage();
    
    const challenge = getRandomChallenge() as T;
    const newOptions = getOptionsForChallenge(challenge) as T[];

    useGameSessionStore.getState().setChallengeAndOptions(challenge, newOptions);

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakItemNameFunc(challenge.name);
  };

  // טיפול בלחיצה על פריט
  const handleItemClick = async (selectedItem: T) => {
    if (!currentChallenge || showCelebration) return;

    if (selectedItem.name === currentChallenge.name) {
      // תשובה נכונה
      playSuccessSound();
      useGameSessionStore.getState().resetWrongAttempts();

      // Read current store values for progress tracking
      const { score: currentScore, level: currentLevel } = useGameProgressStore.getState();
      progressHooks.recordCorrectAnswer(
        currentChallenge,
        currentScore + GAME_CONSTANTS.SCORE_INCREMENT,
        currentLevel + 1,
      );
      
      const challenge = getRandomChallenge() as T;
      const newOptions = getOptionsForChallenge(challenge) as T[];
      
      const onComplete = async () => {
        useGameSessionStore.getState().setChallengeAndOptions(challenge, newOptions);
        await delay(500);
        await speakItemNameFunc(challenge.name);
      };

      // handleCorrectGameAnswer now updates score/level via store internally
      await handleCorrectGameAnswer(
        (v) => useGameSessionStore.getState().setShowCelebration(v),
        onComplete,
      );

      // Sync updated store values to global game session
      const updated = useGameProgressStore.getState();
      useGameStore.getState().updateProgress(updated.score, updated.level);
    } else {
      // תשובה שגויה
      useGameSessionStore.getState().incrementWrongAttempts();
      progressHooks.recordMistake(currentChallenge, 1);
      
      await handleWrongGameAnswer(async () => {
        if (currentChallenge) {
          await speakItemNameFunc(currentChallenge.name);
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
    useGameSessionStore.getState().resetSession();
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
