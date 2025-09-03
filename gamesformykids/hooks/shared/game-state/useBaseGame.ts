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

/**
 * Hook בסיסי לכל המשחקים הפשוטים
 * מכיל את כל הלוגיקה הבסיסית המשותפת + שיפורים
 */
export function useBaseGame<T extends BaseGameItem = BaseGameItem>(config: UseBaseGameConfig) {
  const { gameType, items, pronunciations, gameConstants } = config;
  
  // State בסיסי
  const [gameState, setGameState] = useState<BaseGameState<T>>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  // מעקב טעויות לצורך רמזים
  const [wrongAttempts, setWrongAttempts] = useState(0);

  // Hooks משותפים
  const { speechEnabled, playSuccessSound } = useGameAudio();
  
  // Performance optimizations
  const performanceHooks = useGamePerformance({
    items,
    currentChallenge: gameState.currentChallenge,
  });

  // Hints system
  const hintsHooks = useGameHints({
    currentChallenge: gameState.currentChallenge,
    wrongAttempts,
  });

  // Progress tracking
  const progressHooks = useProgressTracking(gameType);
  
  const { getRandomChallenge, getOptionsForChallenge } = useGameOptions({
    allItems: items,
    level: gameState.level,
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
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
      options: [],
    } as BaseGameState<T>);

    setWrongAttempts(0);
    progressHooks.startSession();

    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    await speakStartMessage();
    
    const challenge = getRandomChallenge() as T;
    const options = getOptionsForChallenge(challenge) as T[];

    setGameState((prev) => ({
      ...prev,
      currentChallenge: challenge,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakItemNameFunc(challenge.name);
  };

  // טיפול בלחיצה על פריט
  const handleItemClick = async (selectedItem: T) => {
    if (!gameState.currentChallenge || gameState.showCelebration) return;

    if (selectedItem.name === gameState.currentChallenge.name) {
      // תשובה נכונה
      playSuccessSound();
      setWrongAttempts(0); // איפוס טעויות
      
      const newScore = gameState.score + GAME_CONSTANTS.SCORE_INCREMENT;
      const newLevel = gameState.level + 1;
      
      // רישום הצלחה
      progressHooks.recordCorrectAnswer(gameState.currentChallenge, newScore, newLevel);
      
      const challenge = getRandomChallenge() as T;
      const options = getOptionsForChallenge(challenge) as T[];
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: challenge,
          options,
        }));
        
        await delay(500); // השהייה מעט יותר ארוכה כדי להימנע מחפיפת דיבור
        // השמעת שם הפריט החדש בתחילת הסיבוב הבא
        await speakItemNameFunc(challenge.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      // תשובה שגויה
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      
      // רישום טעות
      progressHooks.recordMistake(gameState.currentChallenge, 1);
      
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakItemNameFunc(gameState.currentChallenge.name);
        }
      });
    }
  };

  // איפוס משחק
  const resetGame = () => {
    progressHooks.endSession();
    setWrongAttempts(0);
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
    } as BaseGameState<T>);
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
