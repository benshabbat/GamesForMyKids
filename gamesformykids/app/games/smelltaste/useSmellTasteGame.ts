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
import { GAME_CONSTANTS, SMELL_TASTE_HEBREW_PRONUNCIATIONS, SMELL_TASTE_GAME_CONSTANTS } from "@/lib/constants";

export function useSmellTasteGame(smellTasteItems: BaseGameItem[]) {
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
  const getAvailableSmellTasteItems = (): BaseGameItem[] => {
    const baseSmellTasteItems = SMELL_TASTE_GAME_CONSTANTS.BASE_COUNT;
    const additionalSmellTasteItems = Math.floor((gameState.level - 1) / SMELL_TASTE_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * SMELL_TASTE_GAME_CONSTANTS.INCREMENT;
    const totalSmellTasteItems = Math.min(baseSmellTasteItems + additionalSmellTasteItems, smellTasteItems.length);
    return smellTasteItems.slice(0, totalSmellTasteItems);
  };

  const generateOptions = (correctSmellTasteItem: BaseGameItem): BaseGameItem[] => {
    const availableSmellTasteItems = getAvailableSmellTasteItems();
    return generateGameOptions(correctSmellTasteItem, availableSmellTasteItems, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---
  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakSmellTasteItemName = async (smellTasteItemName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(smellTasteItemName, (name) => {
        const pronunciation = SMELL_TASTE_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing smell/taste item name:", error);
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
    
    const availableSmellTasteItems = getAvailableSmellTasteItems();
    const randomSmellTasteItem = getRandomItem(availableSmellTasteItems);
    const options = generateOptions(randomSmellTasteItem);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomSmellTasteItem,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakSmellTasteItemName(randomSmellTasteItem.name);
  };

  const handleSmellTasteItemClick = async (selectedSmellTasteItem: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedSmellTasteItem.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableSmellTasteItems = getAvailableSmellTasteItems();
      const randomSmellTasteItem = getRandomItem(availableSmellTasteItems);
      const options = generateOptions(randomSmellTasteItem);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomSmellTasteItem,
          options,
        }));
        
        await delay(300);
        await speakSmellTasteItemName(randomSmellTasteItem.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakSmellTasteItemName(gameState.currentChallenge.name);
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
    speakSmellTasteItemName,
    startGame,
    handleSmellTasteItemClick,
    resetGame,
    getAvailableSmellTasteItems,
  };
}
