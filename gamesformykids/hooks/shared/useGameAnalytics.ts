import { useEffect, useRef } from "react";
import { BaseGameState, BaseGameItem } from "@/lib/types/base";

/**
 * Hook לבדיקת ביצועים ואנליטיקס של המשחק
 * עוקב ומנתח את ביצועי השחקן
 */
export function useGameAnalytics<T extends BaseGameItem = BaseGameItem>(gameState: BaseGameState<T>) {
  const startTime = useRef<number>(Date.now());
  const correctAnswers = useRef<number>(0);
  const totalAnswers = useRef<number>(0);

  useEffect(() => {
    if (gameState.score > 0) {
      correctAnswers.current = gameState.score / 10;
    }
  }, [gameState.score]);

  const recordAnswer = (isCorrect: boolean) => {
    totalAnswers.current++;
    if (isCorrect) {
      correctAnswers.current++;
    }
  };

  const getStats = () => ({
    playTime: Date.now() - startTime.current,
    accuracy: totalAnswers.current > 0 ? (correctAnswers.current / totalAnswers.current) * 100 : 0,
    totalAnswers: totalAnswers.current,
    correctAnswers: correctAnswers.current,
    level: gameState.level,
    score: gameState.score,
  });

  const resetStats = () => {
    startTime.current = Date.now();
    correctAnswers.current = 0;
    totalAnswers.current = 0;
  };

  return {
    recordAnswer,
    getStats,
    resetStats,
  };
}
