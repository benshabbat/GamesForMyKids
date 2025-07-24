import { useState, useEffect } from "react";
import { Vegetable, VegetableGameState } from "@/lib/types/game";
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
import { GAME_CONSTANTS, VEGETABLE_HEBREW_PRONUNCIATIONS, VEGETABLE_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

export function useVegetableGame(vegetables: Vegetable[]) {
  const [gameState, setGameState] = useState<VegetableGameState>({
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
  const getAvailableVegetables = (): Vegetable[] => {
    const baseVegetables = VEGETABLE_GAME_CONSTANTS.BASE_VEGETABLES_COUNT;
    const additionalVegetables = Math.floor((gameState.level - 1) / VEGETABLE_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * VEGETABLE_GAME_CONSTANTS.VEGETABLES_INCREMENT;
    const totalVegetables = Math.min(baseVegetables + additionalVegetables, vegetables.length);
    return vegetables.slice(0, totalVegetables);
  };

  const generateOptions = (correctVegetable: Vegetable): Vegetable[] => {
    const availableVegetables = getAvailableVegetables();
    return generateGameOptions(correctVegetable, availableVegetables, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---
  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakVegetableName = async (vegetableName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(vegetableName, (name) => {
        const pronunciation = VEGETABLE_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing vegetable name:", error);
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
    
    const availableVegetables = getAvailableVegetables();
    const randomVegetable = getRandomItem(availableVegetables);
    const options = generateOptions(randomVegetable);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomVegetable,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakVegetableName(randomVegetable.name);
  };

  const handleVegetableClick = async (selectedVegetable: Vegetable) => {
    if (!gameState.currentChallenge) return;

    if (selectedVegetable.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableVegetables = getAvailableVegetables();
      const randomVegetable = getRandomItem(availableVegetables);
      const options = generateOptions(randomVegetable);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomVegetable,
          options,
        }));
        
        await delay(300);
        await speakVegetableName(randomVegetable.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakVegetableName(gameState.currentChallenge.name);
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
    speakVegetableName,
    startGame,
    handleVegetableClick,
    resetGame,
    getAvailableVegetables,
  };
}
