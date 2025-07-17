import { useState, useEffect } from "react";
import { CountingGameState, CountingChallenge } from "@/lib/types/game";
import { initSpeechAndAudio, speakHebrew } from "@/lib/utils/enhancedSpeechUtils";
import { 
  delay, 
  playSuccessSound as playSound, 
  getRandomItem,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS, COUNTING_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

// אימוג'ים לספירה עם שמות בעברית
const COUNTING_ITEMS = [
  { emoji: "🐶", name: "כלב", plural: "כלבים" },
  { emoji: "🐱", name: "חתול", plural: "חתולים" },
  { emoji: "🍎", name: "תפוח", plural: "תפוחים" },
  { emoji: "🌟", name: "כוכב", plural: "כוכבים" },
  { emoji: "⚽", name: "כדור", plural: "כדורים" },
  { emoji: "🌸", name: "פרח", plural: "פרחים" },
  { emoji: "🎈", name: "בלון", plural: "בלונים" },
  { emoji: "🦋", name: "פרפר", plural: "פרפרים" },
  { emoji: "🍊", name: "תפוז", plural: "תפוזים" },
  { emoji: "🧸", name: "דובי", plural: "דובים" },
  { emoji: "🏀", name: "כדורסל", plural: "כדורי סל" },
  { emoji: "🎀", name: "סרט", plural: "סרטים" },
];

export function useCountingGame() {
  const [gameState, setGameState] = useState<CountingGameState>({
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

  const getMaxCount = (): number => {
    return Math.min(
      COUNTING_GAME_CONSTANTS.BASE_MAX_COUNT + 
      Math.floor((gameState.level - 1) / COUNTING_GAME_CONSTANTS.LEVEL_THRESHOLD) * 
      COUNTING_GAME_CONSTANTS.COUNT_INCREMENT,
      COUNTING_GAME_CONSTANTS.ABSOLUTE_MAX_COUNT
    );
  };

  const generateCountingChallenge = (): CountingChallenge => {
    const maxCount = getMaxCount();
    const count = Math.floor(Math.random() * maxCount) + 1; // 1 עד maxCount
    const item = getRandomItem(COUNTING_ITEMS);
    
    return {
      emojis: item.emoji.repeat(count), // נשאיר לתאימות לאחור
      correctAnswer: count,
      itemName: item.name,
      itemPlural: item.plural,
      emoji: item.emoji
    };
  };

  const generateOptions = (correctAnswer: number): number[] => {
    const maxCount = getMaxCount();
    const allNumbers = Array.from({ length: maxCount }, (_, i) => i + 1);
    
    // וידוא שהתשובה הנכונה נכללת
    const incorrectNumbers = allNumbers.filter(num => num !== correctAnswer);
    
    // בחירת 3 מספרים שגויים
    const shuffledIncorrect = incorrectNumbers.sort(() => Math.random() - 0.5);
    const selectedIncorrect = shuffledIncorrect.slice(0, 3);
    
    // שילוב עם התשובה הנכונה וערבוב
    const options = [...selectedIncorrect, correctAnswer].sort(() => Math.random() - 0.5);
    
    return options;
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakQuestion = async (challenge: CountingChallenge): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      const questionText = `כמה ${challenge.itemPlural} יש?`;
      await speakHebrew(questionText);
    } catch (error) {
      console.error("שגיאה בהשמעת השאלה:", error);
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
    
    const challenge = generateCountingChallenge();
    const options = generateOptions(challenge.correctAnswer);

    console.log("Generated challenge:", challenge);
    console.log("Generated options:", options);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: challenge,
      options,
    }));

    await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
    await speakQuestion(challenge);
  };

  const handleNumberClick = async (selectedNumber: number) => {
    if (!gameState.currentChallenge) return;

    if (selectedNumber === gameState.currentChallenge.correctAnswer) {
      playSuccessSound();
      
      const challenge = generateCountingChallenge();
      const options = generateOptions(challenge.correctAnswer);
      
      console.log("Next challenge:", challenge);
      console.log("Next options:", options);
      
      const onComplete = async () => {
        setGameState((prev) => ({
          ...prev,
          currentChallenge: challenge,
          options,
        }));
        
        await delay(300);
        await speakQuestion(challenge);
      };
      
      await handleCorrectGameAnswer(
        gameState, 
        setGameState, 
        onComplete
      );
    } else {
      await handleWrongGameAnswer(async () => {
        if (gameState.currentChallenge) {
          await speakQuestion(gameState.currentChallenge);
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
    speakQuestion: () => gameState.currentChallenge ? speakQuestion(gameState.currentChallenge) : Promise.resolve(),
    startGame,
    handleNumberClick,
    resetGame,
  };
}