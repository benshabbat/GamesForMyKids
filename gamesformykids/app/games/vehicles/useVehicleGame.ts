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
import { GAME_CONSTANTS, VEHICLE_HEBREW_PRONUNCIATIONS, VEHICLE_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

export function useVehicleGame(vehicles: BaseGameItem[]) {
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
  const getAvailableVehicles = (): BaseGameItem[] => {
    const baseVehicles = VEHICLE_GAME_CONSTANTS.BASE_COUNT;
    const additionalVehicles = Math.floor((gameState.level - 1) / VEHICLE_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * VEHICLE_GAME_CONSTANTS.INCREMENT;
    const totalVehicles = Math.min(baseVehicles + additionalVehicles, vehicles.length);
    return vehicles.slice(0, totalVehicles);
  };

  const generateOptions = (correctVehicle: BaseGameItem): BaseGameItem[] => {
    const availableVehicles = getAvailableVehicles();
    return generateGameOptions(correctVehicle, availableVehicles, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---
  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakVehicleName = async (vehicleName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(vehicleName, (name) => {
        const pronunciation = VEHICLE_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing vehicle name:", error);
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
    
    const availableVehicles = getAvailableVehicles();
    const randomVehicle = getRandomItem(availableVehicles);
    const options = generateOptions(randomVehicle);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomVehicle,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakVehicleName(randomVehicle.name);
  };

  const handleVehicleClick = async (selectedVehicle: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedVehicle.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableVehicles = getAvailableVehicles();
      const randomVehicle = getRandomItem(availableVehicles);
      const options = generateOptions(randomVehicle);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomVehicle,
          options,
        }));
        
        await delay(300);
        await speakVehicleName(randomVehicle.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakVehicleName(gameState.currentChallenge.name);
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
    speakVehicleName,
    startGame,
    handleVehicleClick,
    resetGame,
    getAvailableVehicles,
  };
}
