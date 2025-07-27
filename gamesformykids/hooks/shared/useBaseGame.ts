import { useState } from "react";
import { BaseGameItem, BaseGameState } from "@/lib/types/base";
import { useGameAudio } from "./useGameAudio";
import { useGameOptions } from "./useGameOptions";
import { 
  delay, 
  speakItemName as speakItemNameUtil,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS } from "@/lib/constants";

interface UseBaseGameConfig {
  items: BaseGameItem[];
  pronunciations: Record<string, string>;
  gameConstants: {
    BASE_COUNT: number;
    INCREMENT: number;
    LEVEL_THRESHOLD: number;
  };
}

/**
 * Hook בסיסי לכל המשחקים הפשוטים
 * מכיל את כל הלוגיקה הבסיסית המשותפת
 */
export function useBaseGame<T extends BaseGameItem = BaseGameItem>(config: UseBaseGameConfig) {
  const { items, pronunciations, gameConstants } = config;
  
  // State בסיסי
  const [gameState, setGameState] = useState<BaseGameState<T>>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  // Hooks משותפים
  const { speechEnabled, playSuccessSound } = useGameAudio();
  
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
    if (!gameState.currentChallenge) return;

    if (selectedItem.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const challenge = getRandomChallenge() as T;
      const options = getOptionsForChallenge(challenge) as T[];
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: challenge,
          options,
        }));
        
        await delay(300);
        await speakItemNameFunc(challenge.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakItemNameFunc(gameState.currentChallenge.name);
        }
      });
    }
  };

  // איפוס משחק
  const resetGame = () => {
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
  };
}
