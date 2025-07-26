import { useState, useEffect } from "react";
import { Transport, TransportGameState } from "@/lib/types/game";
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
import { GAME_CONSTANTS, TRANSPORT_HEBREW_PRONUNCIATIONS, TRANSPORT_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

export function useTransportGame(transports: Transport[]) {
  const [gameState, setGameState] = useState<TransportGameState>({
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

  const getAvailableTransports = (): Transport[] => {
    const baseTransports = TRANSPORT_GAME_CONSTANTS.BASE_TRANSPORTS_COUNT;
    const additionalTransports = Math.floor((gameState.level - 1) / TRANSPORT_GAME_CONSTANTS.LEVEL_THRESHOLD) 
      * TRANSPORT_GAME_CONSTANTS.TRANSPORTS_INCREMENT;
    const totalTransports = Math.min(baseTransports + additionalTransports, transports.length);
    return transports.slice(0, totalTransports);
  };

  const generateOptions = (correctTransport: Transport): Transport[] => {
    const availableTransports = getAvailableTransports();
    
    return generateGameOptions(correctTransport, availableTransports, GAME_CONSTANTS.OPTIONS_COUNT, 'name');
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakTransportName = async (transportName: string): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await speakItemName(transportName, (name) => {
        const pronunciation = TRANSPORT_HEBREW_PRONUNCIATIONS[name];
        return pronunciation || name;
      });
      
    } catch (error) {
      console.error("שגיאה בהשמעת שם כלי התחבורה:", error);
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
    
    const availableTransports = getAvailableTransports();
    const randomTransport = getRandomItem(availableTransports);
    const options = generateOptions(randomTransport);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomTransport,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakTransportName(randomTransport.name);
  };

  const handleTransportClick = async (selectedTransport: Transport) => {
    if (!gameState.currentChallenge) return;

    if (selectedTransport.name === gameState.currentChallenge.name) {
      playSuccessSound();
      
      const availableTransports = getAvailableTransports();
      const randomTransport = getRandomItem(availableTransports);
      const options = generateOptions(randomTransport);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomTransport,
          options,
        }));
        
        await delay(300);
        await speakTransportName(randomTransport.name);
      };
      
      await handleCorrectGameAnswer(
        gameState, 
        setGameState, 
        onComplete
      );
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakTransportName(gameState.currentChallenge.name);
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
    speakTransportName,
    startGame,
    handleTransportClick,
    resetGame,
    getAvailableTransports,
  };
}
