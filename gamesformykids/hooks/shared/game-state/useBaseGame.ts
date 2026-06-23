'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { BaseGameItem, BaseGameState } from "@/lib/types/core/base";
import { UseBaseGameConfig } from "@/lib/types/hooks/game-state";
import { useGameAudio } from "../audio/useGameAudio";
import { useGameOptions } from "./useGameOptions";
import { useGameHints } from "../ui/useGameHints";
import { useSessionStats } from "../progress/useSessionStats";
import { useGameCompletion } from "../progress/useGameCompletion";
import {
  delay,
  speakItemName as speakItemNameUtil,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage,
  getRandomItem,
  generateOptions,
} from "@/lib/utils/game/gameUtils";
import { GAME_CONSTANTS } from "@/lib/constants";
import { useGameProgressStore, useGameStore } from "@/lib/stores";
import { useGameSessionStore } from "@/lib/stores/gameSessionStore";
import { trackEvent } from "@/lib/analytics/trackEvent";

/**
 * Hook בסיסי לכל המשחקים הפשוטים
 * מכיל את כל הלוגיקה הבסיסית המשותפת + שיפורים
 */
export function useBaseGame<T extends BaseGameItem = BaseGameItem>(config: UseBaseGameConfig) {
  const { gameType, items, pronunciations, gameConstants, customAudio, uniqueByField } = config;

  // Mistakes from the last completed session — persists until the next startGame
  const [lastMistakeItems, setLastMistakeItems] = useState<T[]>([]);
  // When set, the game uses only these items (mistake review mode)
  const [reviewItems, setReviewItems] = useState<T[] | null>(null);

  const effectiveItems = (reviewItems ?? items) as T[];

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
  
  // Hints system
  const hintsHooks = useGameHints({
    currentChallenge,
    wrongAttempts,
  });

  // Progress tracking
  const progressHooks = useSessionStats(gameType);

  // Supabase progress persistence — single atomic upsert per session
  const { saveGameResultRef } = useGameCompletion(gameType);
  const sessionStartRef = useRef(Date.now());

  // Save on unmount (user navigates away mid-game).
  // Read saveGameResultRef.current at cleanup time so we always call the
  // latest version (auth may load after this effect mounts).
  useEffect(() => {
    sessionStartRef.current = Date.now();
    return () => {
      const { score: s, level: l, isGameActive } = useGameProgressStore.getState();
      if (isGameActive && (s > 0 || l > 1)) {
        const durationSeconds = Math.round((Date.now() - sessionStartRef.current) / 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        saveGameResultRef.current({ score: s, level: l, durationSeconds });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const { getRandomChallenge, getOptionsForChallenge } = useGameOptions({
    allItems: effectiveItems,
    level,
    baseCount: gameConstants.BASE_COUNT,
    increment: gameConstants.INCREMENT,
    levelThreshold: gameConstants.LEVEL_THRESHOLD,
    ...(uniqueByField ? { uniqueByField } : {}),
  });

  // פונקציות דיבור
  const speakItemNameFunc = async (itemName: string): Promise<void> => {
    if (customAudio) {
      try {
        await customAudio(itemName);
      } catch (error) {
        console.error("Error playing custom audio:", error);
      }
      return;
    }

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

  // Helper shared by startGame and startMistakeReview
  const _beginSession = async (firstChallenge: T, firstOptions: T[]) => {
    const progressStore = useGameProgressStore.getState();
    const { score: prevScore, level: prevLevel, isGameActive } = progressStore;
    if (isGameActive && (prevScore > 0 || prevLevel > 1)) {
      const durationSeconds = Math.round((Date.now() - sessionStartRef.current) / 1000);
      saveGameResultRef.current({ score: prevScore, level: prevLevel, durationSeconds });
    }
    progressStore.resetProgress();
    progressStore.setGameActive(true);
    sessionStartRef.current = Date.now();
    useGameStore.getState().startGame(gameType);
    trackEvent('game_start', { game_type: gameType });
    useGameSessionStore.getState().resetSession();
    progressHooks.startSession();
    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    await speakStartMessage();
    useGameSessionStore.getState().setChallengeAndOptions(firstChallenge, firstOptions);
    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakItemNameFunc(firstChallenge.name);
  };

  // התחלת משחק
  const startGame = async () => {
    setReviewItems(null); // reset to full item pool
    const challenge = getRandomChallenge() as T;
    const newOptions = getOptionsForChallenge(challenge) as T[];
    await _beginSession(challenge, newOptions);
  };

  // התחלת סשן תרגול טעויות — משחק רק עם הפריטים שהמשתמש פספס
  const startMistakeReview = useCallback(async () => {
    if (lastMistakeItems.length < 2) return;
    setReviewItems(lastMistakeItems);
    // Pick first challenge directly from lastMistakeItems (reviewItems update is async)
    const challenge = getRandomItem(lastMistakeItems) as T;
    const pool = lastMistakeItems as T[];
    const newOptions = generateOptions(challenge, pool, GAME_CONSTANTS.OPTIONS_COUNT, 'name') as T[];
    await _beginSession(challenge, newOptions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMistakeItems]);

  // טיפול בלחיצה על פריט
  const handleItemClick = async (selectedItem: T) => {
    if (!currentChallenge || showCelebration) return;

    if (selectedItem.name === currentChallenge.name) {
      // תשובה נכונה
      trackEvent('correct_answer', { game_type: gameType });
      playSuccessSound();
      useGameSessionStore.getState().resetWrongAttempts();

      // Update streak counter and award milestone bonus points
      const { streakCount, bestStreak } = useGameProgressStore.getState();
      const newStreak = streakCount + 1;
      useGameProgressStore.getState().updateProgress({
        streakCount: newStreak,
        bestStreak: Math.max(newStreak, bestStreak),
      });
      // Milestone bonuses: 5→+5pts, 10→+10pts, 20→+20pts
      const STREAK_BONUS: Record<number, number> = { 5: 5, 10: 10, 20: 20 };
      const bonus = STREAK_BONUS[newStreak];
      if (bonus) useGameProgressStore.getState().incrementScore(bonus);

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
      trackEvent('wrong_answer', { game_type: gameType });
      useGameSessionStore.getState().incrementWrongAttempts();
      // Reset streak on wrong answer
      useGameProgressStore.getState().updateProgress({ streakCount: 0 });
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
    // Capture final score/level before resetting local state
    const { score: finalScore, level: finalLevel } = useGameProgressStore.getState();

    // Preserve mistake items so the start screen can offer a review round
    const mistakeNames = progressHooks.currentSession?.mistakes?.map((m) => m.item) ?? [];
    const capturedMistakes = (items as T[]).filter((item) => mistakeNames.includes(item.name));
    setLastMistakeItems(capturedMistakes);
    setReviewItems(null);

    progressHooks.endSession();
    useGameStore.getState().endGame();
    useGameProgressStore.getState().setGameActive(false);
    useGameProgressStore.getState().resetProgress();
    useGameSessionStore.getState().resetSession();

    trackEvent('game_complete', { game_type: gameType, score: finalScore });

    // Persist progress to Supabase — single atomic upsert
    if (finalScore > 0 || finalLevel > 1) {
      const durationSeconds = Math.round((Date.now() - sessionStartRef.current) / 1000);
      saveGameResultRef.current({ score: finalScore, level: finalLevel, durationSeconds });
    }
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
    // תרגול טעויות
    lastMistakeItems,
    startMistakeReview,
  };
}
