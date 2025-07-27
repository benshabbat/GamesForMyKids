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
import { GAME_CONSTANTS, WEATHER_HEBREW_PRONUNCIATIONS, WEATHER_GAME_CONSTANTS } from "@/lib/constants";

export function useWeatherGame(weathers: BaseGameItem[]) {
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

  const getAvailableWeathers = (): BaseGameItem[] => {
    const baseWeathers = WEATHER_GAME_CONSTANTS.BASE_COUNT;
    const additionalWeathers = Math.floor((gameState.level - 1) / WEATHER_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * WEATHER_GAME_CONSTANTS.INCREMENT;
    const totalWeathers = Math.min(baseWeathers + additionalWeathers, weathers.length);
    return weathers.slice(0, totalWeathers);
  };

  const generateOptions = (correctWeather: BaseGameItem): BaseGameItem[] => {
    const availableWeathers = getAvailableWeathers();
    
    return generateGameOptions(correctWeather, availableWeathers, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakWeatherName = async (weatherName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(weatherName, (name) => {
        const pronunciation = WEATHER_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
      
    } catch (error) {
      console.error("שגיאה בהשמעת שם מזג האוויר:", error);
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
    
    const availableWeathers = getAvailableWeathers();
    const randomWeather = getRandomItem(availableWeathers);
    const options = generateOptions(randomWeather);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomWeather,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakWeatherName(randomWeather.name);
  };

  const handleWeatherClick = async (selectedWeather: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedWeather.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableWeathers = getAvailableWeathers();
      const randomWeather = getRandomItem(availableWeathers);
      const options = generateOptions(randomWeather);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomWeather,
          options,
        }));
        
        await delay(300);
        await speakWeatherName(randomWeather.name);
      };
      
      await handleCorrectGameAnswer(
        gameState, 
        setGameState, 
        onComplete
      );
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakWeatherName(gameState.currentChallenge.name);
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
    speakWeatherName,
    startGame,
    handleWeatherClick,
    resetGame,
    getAvailableWeathers,
  };
}
