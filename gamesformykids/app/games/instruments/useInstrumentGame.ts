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
import { GAME_CONSTANTS, INSTRUMENT_HEBREW_PRONUNCIATIONS, INSTRUMENT_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

export function useInstrumentGame(instruments: BaseGameItem[]) {
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
  const getAvailableInstruments = (): BaseGameItem[] => {
    const baseInstruments = INSTRUMENT_GAME_CONSTANTS.BASE_COUNT;
    const additionalInstruments = Math.floor((gameState.level - 1) / INSTRUMENT_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * INSTRUMENT_GAME_CONSTANTS.INCREMENT;
    const totalInstruments = Math.min(baseInstruments + additionalInstruments, instruments.length);
    return instruments.slice(0, totalInstruments);
  };

  const generateOptions = (correctInstrument: BaseGameItem): BaseGameItem[] => {
    const availableInstruments = getAvailableInstruments();
    return generateGameOptions(correctInstrument, availableInstruments, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---
  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakInstrumentName = async (instrumentName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(instrumentName, (name) => {
        const pronunciation = INSTRUMENT_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
    } catch (error) {
      console.error("Error playing instrument name:", error);
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
    
    const availableInstruments = getAvailableInstruments();
    const randomInstrument = getRandomItem(availableInstruments);
    const options = generateOptions(randomInstrument);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomInstrument,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakInstrumentName(randomInstrument.name);
  };

  const handleInstrumentClick = async (selectedInstrument: BaseGameItem) => {
    if (!gameState.currentChallenge) return;

    if (selectedInstrument.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableInstruments = getAvailableInstruments();
      const randomInstrument = getRandomItem(availableInstruments);
      const options = generateOptions(randomInstrument);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomInstrument,
          options,
        }));
        
        await delay(300);
        await speakInstrumentName(randomInstrument.name);
      };
      
      await handleCorrectGameAnswer(gameState, setGameState, onComplete);
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakInstrumentName(gameState.currentChallenge.name);
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
    speakInstrumentName,
    startGame,
    handleInstrumentClick,
    resetGame,
    getAvailableInstruments,
  };
}
