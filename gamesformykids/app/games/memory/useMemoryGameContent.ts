'use client';

import { useEffect } from "react";
import { useMemoryStore } from "./stores/useMemoryStore";
import { useGameProgress, useAchievements } from "@/hooks";
import { useAuth } from "@/hooks/shared/auth/useAuth";

export interface UseMemoryGameContentReturn {
  gameStarted: boolean;
  isGameWon: boolean;
}

/**
 * לוגיקת עדכון ניקוד, רמה וזמן משחק בסיום.
 * מכיל גם את ה-side-effects של הטיימר.
 * מחזיר רק את הערכים שה-UI צריך לצרוך.
 */
export function useMemoryGameContent(): UseMemoryGameContentReturn {
  const {
    gameStarted,
    isGameWon,
    gameStats,
    timer,
    difficulty,
    isGamePaused,
    isCompleted,
    timeLeft,
    incrementTimer,
    decrementTimeLeft,
    setCompleted,
    setGameWon,
  } = useMemoryStore();

  // ── Timer ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!gameStarted || isGamePaused || isCompleted) return;
    const id = setInterval(() => {
      incrementTimer();
      decrementTimeLeft();
    }, 1000);
    return () => clearInterval(id);
  }, [gameStarted, isGamePaused, isCompleted, incrementTimer, decrementTimeLeft]);

  // ── Time-up check ────────────────────────────────────────────────────────
  useEffect(() => {
    if (timeLeft <= 0 && gameStarted && !isCompleted) {
      setCompleted(true);
      setGameWon(false);
    }
  }, [timeLeft, gameStarted, isCompleted, setCompleted, setGameWon]);

  const { user } = useAuth();
  const { updateScore, updateLevel, addPlayTime } = useGameProgress("memory");
  const { checkScoreAchievements, checkLevelAchievements } = useAchievements("memory");

  useEffect(() => {
    if (!isGameWon || !user || gameStats.score <= 0) return;

    updateScore("memory", gameStats.score);

    const levelMap: Record<string, number> = { EASY: 1, MEDIUM: 2, HARD: 3 };
    const currentLevel = levelMap[difficulty] ?? 1;
    updateLevel("memory", currentLevel);

    if (timer > 0) {
      addPlayTime("memory", timer);
    }

    checkScoreAchievements("memory", gameStats.score);
    checkLevelAchievements("memory", currentLevel);
  }, [
    isGameWon,
    user,
    gameStats.score,
    timer,
    difficulty,
    updateScore,
    updateLevel,
    addPlayTime,
    checkScoreAchievements,
    checkLevelAchievements,
  ]);

  return { gameStarted, isGameWon };
}
