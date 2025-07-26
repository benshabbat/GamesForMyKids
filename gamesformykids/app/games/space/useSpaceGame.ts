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
import { GAME_CONSTANTS, SPACE_HEBREW_PRONUNCIATIONS, SPACE_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

export function useSpaceGame(spaceObjects: BaseGameItem[]) {
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
  const getAvailableSpaceObjects = (): BaseGameItem[] => {
    const baseSpaceObjects = SPACE_GAME_CONSTANTS.BASE_COUNT;
    const additionalSpaceObjects = Math.floor((gameState.level - 1) / SPACE_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * SPACE_GAME_CONSTANTS.INCREMENT;
    const totalSpaceObjects = Math.min(baseSpaceObjects + additionalSpaceObjects, spaceObjects.length);
    return spaceObjects.slice(0, totalSpaceObjects);
  };

  const generateOptions = (correctSpaceObject: BaseGameItem): BaseGameItem[] => {
    const availableSpaceObjects = getAvailableSpaceObjects();
    return generateGameOptions(correctSpaceObject, availableSpaceObjects, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---
  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakSpaceObjectName = async (spaceObjectName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(spaceObjectName, (name) => {
        const pronunciation = SPACE_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing space object name:", error);
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
    
    const availableSpaceObjects = getAvailableSpaceObjects();
    const randomSpaceObject = getRandomItem(availableSpaceObjects);
    const options = generateOptions(randomSpaceObject);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomSpaceObject,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakSpaceObjectName(randomSpaceObject.name);
  };

  const handleSpaceObjectClick = async (selectedSpaceObject: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedSpaceObject.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableSpaceObjects = getAvailableSpaceObjects();
      const randomSpaceObject = getRandomItem(availableSpaceObjects);
      const options = generateOptions(randomSpaceObject);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomSpaceObject,
          options,
        }));
        
        await delay(300);
        await speakSpaceObjectName(randomSpaceObject.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakSpaceObjectName(gameState.currentChallenge.name);
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
    speakSpaceObjectName,
    startGame,
    handleSpaceObjectClick,
    resetGame,
    getAvailableSpaceObjects,
  };
}
