import { useState, useEffect } from "react";
import { Profession, ProfessionGameState } from "@/lib/types/game";
import { initSpeechAndAudio, speakHebrew } from "@/lib/utils/enhancedSpeechUtils";
import { 
  delay, 
  playSuccessSound as playSound, 
  getRandomItem,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS } from "@/lib/constants/gameConstants";

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

  const getRandomProfessions = (correctProfession: Profession, count: number = 4): Profession[] => {
    const otherProfessions = professions.filter(p => p.id !== correctProfession.id);
    const shuffled = otherProfessions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count - 1);
    
    // הוספת המקצוע הנכון וערבוב
    const options = [...selected, correctProfession];
    return options.sort(() => Math.random() - 0.5);
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakProfessionName = async (profession: Profession): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
    //   await speakHebrew(`זה ${profession.name}`);
    //   await delay(600);
      await speakHebrew(profession.description);
    } catch (error) {
      console.error("שגיאה בהשמעת שם המקצוע:", error);
    }
  };

  const speakChallenge = async (profession: Profession): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      // הקראת שם המקצוע
    //   await speakHebrew(profession.name);
    //   await delay(1000);
      // הקראת התיאור המלא עם זמן נוסף
      await speakHebrew(profession.description);
      await delay(5000);
      await speakHebrew("איזה מקצוע זה?");
    } catch (error) {
      console.error("שגיאה בהשמעת האתגר:", error);
    }
  };

  const speakAllOptions = async (options: Profession[]): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      await delay(1000);
      await speakHebrew("האפשרויות הן:");
      
      for (let i = 0; i < options.length; i++) {
        await delay(600);
        await speakHebrew(options[i].name);
      }
    } catch (error) {
      console.error("שגיאה בהשמעת האפשרויות:", error);
    }
  };

  const startGame = async () => {
    try {
      console.log("Profession game starting");
      
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
      const options = getRandomProfessions(randomProfession);

      console.log("Generated profession challenge:", randomProfession);
      console.log("Generated options:", options);

      setGameState((prev) => ({
        ...prev,
        currentChallenge: randomProfession,
        options,
      }));

      await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
      await speakChallenge(randomProfession);
      await speakAllOptions(options);
    } catch (error) {
      console.error("Error in startGame:", error);
    }
  };

  const handleProfessionClick = async (selectedProfession: Profession) => {
    if (!gameState.currentChallenge) return;

    if (selectedProfession.id === gameState.currentChallenge.id) {
      playSuccessSound();
      
      const nextProfession = getRandomItem(professions);
      const options = getRandomProfessions(nextProfession);
      
      console.log("Next profession challenge:", nextProfession);
      console.log("Next options:", options);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: nextProfession,
          options,
        }));
        
        await delay(300);
        await speakChallenge(nextProfession);
        await speakAllOptions(options);
      };
      
      await handleCorrectGameAnswer(
        gameState, 
        setGameState, 
        onComplete
      );
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakChallenge(gameState.currentChallenge);
          await speakAllOptions(gameState.options);
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
