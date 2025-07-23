import { useState, useEffect } from "react";
import { Profession, ProfessionGameState } from "@/lib/types/game";
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
import { GAME_CONSTANTS, PROFESSION_HEBREW_PRONUNCIATIONS } from "@/lib/constants/gameConstants";

export function useProfessionGame(professions: Profession[]) {
  const [gameState, setGameState] = useState<ProfessionGameState>({
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

  const generateOptions = (correctProfession: Profession): Profession[] => {
    return generateGameOptions(correctProfession, professions, GAME_CONSTANTS.OPTIONS_COUNT, 'id');
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakProfessionName = async (profession: Profession): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      console.log("Speaking profession:", profession.id);
      const pronunciation = PROFESSION_HEBREW_PRONUNCIATIONS[profession.id];
      const textToSpeak = pronunciation || profession.description;
      
      console.log("Text to speak:", textToSpeak);
      
      await speakItemName(profession.id, (id) => {
        const pronunciation = PROFESSION_HEBREW_PRONUNCIATIONS[id];
        return pronunciation || profession.description;
      });
      
      console.log("Finished speaking profession");
    } catch (error) {
      console.error("שגיאה בהשמעת שם המקצוע:", error);
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
    
    const randomProfession = getRandomItem(professions);
    const options = generateOptions(randomProfession);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomProfession,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    console.log("About to speak profession name:", randomProfession.id);
    await speakProfessionName(randomProfession);
    console.log("Finished speaking profession name");
  };

  const handleProfessionClick = async (selectedProfession: Profession) => {
    if (!gameState.currentChallenge) return;

    if (selectedProfession.id === gameState.currentChallenge.id) {
      playSuccessSound();
      
      const randomProfession = getRandomItem(professions);
      const options = generateOptions(randomProfession);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: randomProfession,
          options,
        }));
        
        await delay(300);
        console.log("About to speak new profession:", randomProfession.id);
        await speakProfessionName(randomProfession);
        console.log("Finished speaking new profession");
      };
      
      await handleCorrectGameAnswer(
        gameState, 
        setGameState, 
        onComplete
      );
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          console.log("Wrong answer - repeating profession:", gameState.currentChallenge.id);
          await speakProfessionName(gameState.currentChallenge);
          console.log("Finished repeating profession");
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
    speakProfessionName,
    startGame,
    handleProfessionClick,
    resetGame,
  };
}