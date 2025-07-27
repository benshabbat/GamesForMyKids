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
import { GAME_CONSTANTS, CLOTHING_HEBREW_PRONUNCIATIONS, CLOTHING_GAME_CONSTANTS } from "@/lib/constants";

export function useClothingGame(clothingItems: BaseGameItem[]) {
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
  const getAvailableClothingItems = (): BaseGameItem[] => {
    const baseClothingItems = CLOTHING_GAME_CONSTANTS.BASE_COUNT;
    const additionalClothingItems = Math.floor((gameState.level - 1) / CLOTHING_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * CLOTHING_GAME_CONSTANTS.INCREMENT;
    const totalClothingItems = Math.min(baseClothingItems + additionalClothingItems, clothingItems.length);
    return clothingItems.slice(0, totalClothingItems);
  };

  const generateOptions = (correctClothingItem: BaseGameItem): BaseGameItem[] => {
    const availableClothingItems = getAvailableClothingItems();
    return generateGameOptions(correctClothingItem, availableClothingItems, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---
  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakClothingItemName = async (clothingItemName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(clothingItemName, (name) => {
        const pronunciation = CLOTHING_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing clothing item name:", error);
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
    
    const availableClothingItems = getAvailableClothingItems();
    const randomClothingItem = getRandomItem(availableClothingItems);
    const options = generateOptions(randomClothingItem);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomClothingItem,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakClothingItemName(randomClothingItem.name);
  };

  const handleClothingItemClick = async (selectedClothingItem: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedClothingItem.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableClothingItems = getAvailableClothingItems();
      const randomClothingItem = getRandomItem(availableClothingItems);
      const options = generateOptions(randomClothingItem);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomClothingItem,
          options,
        }));
        
        await delay(300);
        await speakClothingItemName(randomClothingItem.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakClothingItemName(gameState.currentChallenge.name);
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
    speakClothingItemName,
    startGame,
    handleClothingItemClick,
    resetGame,
    getAvailableClothingItems,
  };
}
