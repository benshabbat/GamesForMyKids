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
import { GAME_CONSTANTS, ANIMAL_HEBREW_PRONUNCIATIONS, ANIMAL_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

export function useAnimalGame(animals: BaseGameItem[]) {
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

  const getAvailableAnimals = (): BaseGameItem[] => {
    const baseAnimals = ANIMAL_GAME_CONSTANTS.BASE_COUNT;
    const additionalAnimals = Math.floor((gameState.level - 1) / ANIMAL_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * ANIMAL_GAME_CONSTANTS.INCREMENT;
    const totalAnimals = Math.min(baseAnimals + additionalAnimals, animals.length);
    return animals.slice(0, totalAnimals);
  };

  const generateOptions = (correctAnimal: BaseGameItem): BaseGameItem[] => {
    const availableAnimals = getAvailableAnimals();
    
    return generateGameOptions(correctAnimal, availableAnimals, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakAnimalName = async (animalName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(animalName, (name) => {
        const pronunciation = ANIMAL_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
      
    } catch (error) {
      console.error("שגיאה בהשמעת שם החיה:", error);
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
    
    const availableAnimals = getAvailableAnimals();
    const randomAnimal = getRandomItem(availableAnimals);
    const options = generateOptions(randomAnimal);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomAnimal,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakAnimalName(randomAnimal.name);
  };

  const handleAnimalClick = async (selectedAnimal: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedAnimal.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableAnimals = getAvailableAnimals();
      const randomAnimal = getRandomItem(availableAnimals);
      const options = generateOptions(randomAnimal);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomAnimal,
          options,
        }));
        
        await delay(300);
        await speakAnimalName(randomAnimal.name);
      };
      
      await handleCorrectGameAnswer(
        gameState, 
        setGameState, 
        onComplete
      );
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakAnimalName(gameState.currentChallenge.name);
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
    speakAnimalName,
    startGame,
    handleAnimalClick,
    resetGame,
    getAvailableAnimals,
  };
}
