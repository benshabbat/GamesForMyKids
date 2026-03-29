"use client";

'use client';

import { useEffect } from "react";
import { useMemoryContext } from "@/contexts";
import { useGameProgress, useAchievements } from "@/hooks";
import { useAuth } from "@/contexts/AuthContext";

export interface UseMemoryGameContentReturn {
  gameStarted: boolean;
  isGameWon: boolean;
}

/**
 * לוגיקת עדכון ניקוד, רמה וזמן משחק בסיום.
 * מחזיר רק את הערכים שה-UI צריך לצרוך.
 */
export function useMemoryGameContent(): UseMemoryGameContentReturn {
  const {
    state: { gameStarted, isGameWon, gameStats, timer, difficulty },
  } = useMemoryContext();

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
