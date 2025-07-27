import { useState, useEffect } from "react";
import { BaseGameItem, BaseGameState } from "@/lib/types/base";
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
import { GAME_CONSTANTS, EMOTION_HEBREW_PRONUNCIATIONS, EMOTION_GAME_CONSTANTS } from "@/lib/constants";

// הגדרת state של משחק הרגשות
export interface EmotionGameState extends BaseGameState {
  currentChallenge: BaseGameItem | null;
  options: BaseGameItem[];
  isCorrect: boolean | null;
}

export function useEmotionGame(emotions: BaseGameItem[]) {
  const [gameState, setGameState] = useState<EmotionGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
    isCorrect: null,
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  // --- Utility Functions ---
  const getAvailableEmotions = (): BaseGameItem[] => {
    const baseEmotions = EMOTION_GAME_CONSTANTS.BASE_COUNT;
    const additionalEmotions = Math.floor((gameState.level - 1) / EMOTION_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * EMOTION_GAME_CONSTANTS.INCREMENT;
    const totalEmotions = Math.min(baseEmotions + additionalEmotions, emotions.length);
    return emotions.slice(0, totalEmotions);
  };

  const generateOptions = (correctEmotion: BaseGameItem): BaseGameItem[] => {
    const availableEmotions = getAvailableEmotions();
    return generateGameOptions(correctEmotion, availableEmotions, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---
  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakEmotionName = async (emotionName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(emotionName, (name) => {
        const pronunciation = EMOTION_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing emotion name:", error);
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
      isCorrect: null,
    } as EmotionGameState);

    await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
    await speakStartMessage();
    
    const availableEmotions = getAvailableEmotions();
    const randomEmotion = getRandomItem(availableEmotions);
    const options = generateOptions(randomEmotion);

    setGameState((prev: EmotionGameState) => ({
      ...prev,
      currentChallenge: randomEmotion,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakEmotionName(randomEmotion.name);
  };

  const handleEmotionClick = async (selectedEmotion: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedEmotion.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableEmotions = getAvailableEmotions();
      const randomEmotion = getRandomItem(availableEmotions);
      const options = generateOptions(randomEmotion);
      
      const onComplete = async () => {
        setGameState((prev: EmotionGameState) => ({
          ...prev,
          currentChallenge: randomEmotion,
          options,
        }));
        
        await delay(300);
        await speakEmotionName(randomEmotion.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakEmotionName(gameState.currentChallenge.name);
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
      isCorrect: null,
    } as EmotionGameState);
  };

  return {
    gameState,
    speakEmotionName,
    startGame,
    handleEmotionClick,
    resetGame,
    getAvailableEmotions,
  };
}
