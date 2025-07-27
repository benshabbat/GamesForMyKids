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
import { GAME_CONSTANTS, HOUSE_HEBREW_PRONUNCIATIONS, HOUSE_GAME_CONSTANTS } from "@/lib/constants";

export function useHouseGame(houseItems: BaseGameItem[]) {
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
  const getAvailableHouseItems = (): BaseGameItem[] => {
    const baseItems = HOUSE_GAME_CONSTANTS.BASE_COUNT;
    const additionalItems = Math.floor((gameState.level - 1) / HOUSE_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * HOUSE_GAME_CONSTANTS.INCREMENT;
    const totalItems = Math.min(baseItems + additionalItems, houseItems.length);
    return houseItems.slice(0, totalItems);
  };

  const generateOptions = (correctItem: BaseGameItem): BaseGameItem[] => {
    const availableItems = getAvailableHouseItems();
    return generateGameOptions(correctItem, availableItems, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---
  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakHouseItemName = async (itemName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(itemName, (name) => {
        const pronunciation = HOUSE_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing house item name:", error);
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
    
    const availableItems = getAvailableHouseItems();
    const randomItem = getRandomItem(availableItems);
    const options = generateOptions(randomItem);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomItem,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakHouseItemName(randomItem.name);
  };

  const handleHouseItemClick = async (selectedItem: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedItem.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableItems = getAvailableHouseItems();
      const randomItem = getRandomItem(availableItems);
      const options = generateOptions(randomItem);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomItem,
          options,
        }));
        
        await delay(300);
        await speakHouseItemName(randomItem.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakHouseItemName(gameState.currentChallenge.name);
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
    speakHouseItemName,
    startGame,
    handleHouseItemClick,
    resetGame,
    getAvailableHouseItems,
  };
}
