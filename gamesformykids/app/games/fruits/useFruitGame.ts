import { useState, useEffect } from "react";
import { BaseGameItem, BaseGameState } from "@/lib/types";
import { initSpeechAndAudio } from "@/lib/utils/enhancedSpeechUtils";
import { 
  delay, 
  playSuccessSound as playSound, 
  generateOptions as generateGameOptions,
  getRandomItem,
  speakItemName,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS, FRUIT_HEBREW_PRONUNCIATIONS, FRUIT_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

export function useFruitGame(fruits: BaseGameItem[]) {
  const [gameState, setGameState] = useState<BaseGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  // --- Utility Functions ---

  const getAvailableFruits = (): BaseGameItem[] => {
    const baseFruits = FRUIT_GAME_CONSTANTS.BASE_COUNT;
    const additionalFruits = Math.floor((gameState.level - 1) / FRUIT_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * FRUIT_GAME_CONSTANTS.INCREMENT;
    const totalFruits = Math.min(baseFruits + additionalFruits, fruits.length);
    return fruits.slice(0, totalFruits);
  };

  const generateOptions = (correctFruit: BaseGameItem): BaseGameItem[] => {
    const availableFruits = getAvailableFruits();
    
    return generateGameOptions(correctFruit, availableFruits, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakFruitName = async (fruitName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(fruitName, (name) => {
        const pronunciation = FRUIT_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
      
    } catch (error) {
      console.error("שגיאה בהשמעת שם הפרי:", error);
    }
  };

  const startGame = async () => {
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
      options: [],
    });

    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    
    await speakStartMessage();
    
    const availableFruits = getAvailableFruits();
    const randomFruit = getRandomItem(availableFruits);
    const options = generateOptions(randomFruit);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomFruit,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakFruitName(randomFruit.name);
  };

  const handleFruitClick = async (selectedFruit: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedFruit.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableFruits = getAvailableFruits();
      const randomFruit = getRandomItem(availableFruits);
      const options = generateOptions(randomFruit);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomFruit,
          options,
        }));
        
        await delay(300);
        await speakFruitName(randomFruit.name);
      };
      
      await handleCorrectGameAnswer(
        gameState, 
        setGameState, 
        onComplete
      );
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakFruitName(gameState.currentChallenge.name);
        }
      });
    }
  };

  const resetGame = () => {
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
    });
  };

  return {
    gameState,
    speakFruitName,
    startGame,
    handleFruitClick,
    resetGame,
    getAvailableFruits,
  };
}
