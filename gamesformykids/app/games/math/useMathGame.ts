import { useState, useEffect } from "react";
import { MathGameState, MathChallenge } from "@/lib/types/game";
import { initSpeechAndAudio, speakHebrew } from "@/lib/utils/enhancedSpeechUtils";
import { 
  delay, 
  playSuccessSound as playSound, 
  getRandomItem,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/gameUtils";
import { GAME_CONSTANTS, MATH_GAME_CONSTANTS } from "@/lib/constants/gameConstants";

// אימוג'ים לחיבור וחיסור
const MATH_ITEMS = [
  { emoji: "🍎", name: "תפוח", plural: "תפוחים" },
  { emoji: "🌟", name: "כוכב", plural: "כוכבים" },
  { emoji: "🐶", name: "כלב", plural: "כלבים" },
  { emoji: "🎈", name: "בלון", plural: "בלונים" },
  { emoji: "🍭", name: "סוכריה", plural: "סוכריות" },
  { emoji: "🦋", name: "פרפר", plural: "פרפרים" },
];

export function useMathGame() {
  const [gameState, setGameState] = useState<MathGameState>({
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

  const getMaxNumber = (): number => {
    return Math.min(
      MATH_GAME_CONSTANTS.BASE_MAX_NUMBER + 
      Math.floor((gameState.level - 1) / MATH_GAME_CONSTANTS.LEVEL_THRESHOLD) * 
      MATH_GAME_CONSTANTS.NUMBER_INCREMENT,
      MATH_GAME_CONSTANTS.ABSOLUTE_MAX_NUMBER
    );
  };

  const generateMathChallenge = (): MathChallenge => {
    const maxNumber = getMaxNumber();
    const item = getRandomItem(MATH_ITEMS);
    
    // קביעת סוג הפעולה בהתאם לרמה
    const operations = gameState.level >= 3 ? ['addition', 'subtraction'] : ['addition'];
    const operation = getRandomItem(operations) as 'addition' | 'subtraction';
    
    let firstNumber: number;
    let secondNumber: number;
    let correctAnswer: number;
    
    if (operation === 'addition') {
      // חיבור - שני מספרים שהסכום שלהם לא עובר את המקסימום
      firstNumber = Math.floor(Math.random() * (maxNumber - 1)) + 1;
      secondNumber = Math.floor(Math.random() * (maxNumber - firstNumber)) + 1;
      correctAnswer = firstNumber + secondNumber;
    } else {
      // חיסור - התוצאה תמיד חיובית
      correctAnswer = Math.floor(Math.random() * maxNumber) + 1;
      secondNumber = Math.floor(Math.random() * correctAnswer) + 1;
      firstNumber = correctAnswer + secondNumber;
    }
    
    return {
      firstNumber,
      secondNumber,
      operation,
      correctAnswer,
      itemName: item.name,
      itemPlural: item.plural,
      emoji: item.emoji
    };
  };

  const generateOptions = (correctAnswer: number): number[] => {
    const maxNumber = getMaxNumber();
    const allNumbers = Array.from({ length: maxNumber + 5 }, (_, i) => i); // כולל 0 ועד מעבר למקסימום
    
    // וידוא שהתשובה הנכונה נכללת
    const incorrectNumbers = allNumbers.filter(num => num !== correctAnswer);
    
    // בחירת 3 מספרים שגויים קרובים לתשובה הנכונה
    const closeNumbers = incorrectNumbers.filter(num => 
      Math.abs(num - correctAnswer) <= 3 && num >= 0
    );
    
    // אם אין מספיק מספרים קרובים, הוסף מספרים אקראיים
    const shuffledIncorrect = closeNumbers.length >= 3 
      ? closeNumbers.sort(() => Math.random() - 0.5)
      : [...closeNumbers, ...incorrectNumbers.filter(num => num >= 0)].sort(() => Math.random() - 0.5);
    
    const selectedIncorrect = shuffledIncorrect.slice(0, 3);
    
    // שילוב עם התשובה הנכונה וערבוב
    const options = [...selectedIncorrect, correctAnswer].sort(() => Math.random() - 0.5);
    
    return options;
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  const speakQuestion = async (challenge: MathChallenge): Promise<void> => {
    if (!speechEnabled) return;
    
    try {
      const operationText = challenge.operation === 'addition' ? 'ועוד' : 'פחות';
      const questionText = `${challenge.firstNumber} ${challenge.itemPlural} ${operationText} ${challenge.secondNumber} ${challenge.itemPlural}, כמה ${challenge.itemPlural} יש?`;
      await speakHebrew(questionText);
    } catch (error) {
      console.error("שגיאה בהשמעת השאלה:", error);
    }
  };

  const startGame = async () => {
    try {
      console.log("Math game starting");
      
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
      
      const challenge = generateMathChallenge();
      const options = generateOptions(challenge.correctAnswer);

      console.log("Generated math challenge:", challenge);
      console.log("Generated options:", options);

      setGameState((prev) => ({
        ...prev,
        currentChallenge: challenge,
        options,
      }));

      await delay(GAME_CONSTANTS.DELAYS.NEXT_ITEM_DELAY);
      await speakQuestion(challenge);
    } catch (error) {
      console.error("Error in startGame:", error);
    }
  };

  const handleNumberClick = async (selectedNumber: number) => {
    if (!gameState.currentChallenge) return;

    if (selectedNumber === gameState.currentChallenge.correctAnswer) {
      playSuccessSound();
      
      const challenge = generateMathChallenge();
      const options = generateOptions(challenge.correctAnswer);
      
      console.log("Next math challenge:", challenge);
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