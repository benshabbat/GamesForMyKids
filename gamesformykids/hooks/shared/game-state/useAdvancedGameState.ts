import { useState, useCallback, useMemo } from "react";
import { BaseGameState, BaseGameItem } from "@/lib/types/base";
import { UseAdvancedGameStateConfig } from "@/lib/types/hooks/game-state";

/**
 * Hook מתקדם לניהול מצב משחק
 * מספק פונקציות נוחות לעדכון מצב המשחק
 */
export function useAdvancedGameState<T extends BaseGameItem = BaseGameItem>(
  config: UseAdvancedGameStateConfig<T>
) {
  const { initialState } = config;
  const [gameState, setGameState] = useState<BaseGameState<T>>(initialState);

  // מחושב על פי הניקוד - כל 30 נקודות = רמה חדשה
  const level = useMemo(() => {
    return Math.floor(gameState.score / 30) + 1;
  }, [gameState.score]);

  // פונקציות מחושבות
  const updateScore = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
    }));
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
    }));
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
    }));
  }, []);

  const showCelebration = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showCelebration: true,
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        showCelebration: false,
      }));
    }, 1500);
  }, []);

  const setCurrentChallenge = useCallback((challenge: T | null) => {
    setGameState(prev => ({
      ...prev,
      currentChallenge: challenge,
    }));
  }, []);

  const setOptions = useCallback((options: T[]) => {
    setGameState(prev => ({
      ...prev,
      options,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, [initialState]);

  return {
    gameState: {
      ...gameState,
      level, // level מחושב אוטומטית
    },
    setGameState,
    updateScore,
    startGame,
    endGame,
    showCelebration,
    setCurrentChallenge,
    setOptions,
    resetGame,
  };
}
