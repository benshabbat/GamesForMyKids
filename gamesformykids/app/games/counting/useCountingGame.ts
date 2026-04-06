'use client';

import { useState, useEffect } from "react";
import { CountingChallenge, CountingGameState } from "@/lib/types/games";
import { initSpeechAndAudio, speakHebrew } from "@/lib/utils/speech/enhancedSpeechUtils";
import { 
  delay, 
  playSuccessSound as playSound, 
  getRandomItem,
  handleWrongGameAnswer,
  handleCorrectGameAnswer,
  speakStartMessage
} from "@/lib/utils/game/gameUtils";
import { GAME_CONSTANTS, COUNTING_GAME_CONSTANTS } from "@/lib/constants";
import { useGameAudioStore } from "@/lib/stores/gameAudioStore";

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

  const audioContext = useGameAudioStore((s) => s.audioContext);
  const speechEnabled = useGameAudioStore((s) => s.speechEnabled);
  const setAudioContext = useGameAudioStore((s) => s.setAudioContext);
  const setSpeechEnabled = useGameAudioStore((s) => s.setSpeechEnabled);

  useEffect(() => {
    if (!audioContext && !speechEnabled) {
      initSpeechAndAudio(setSpeechEnabled, setAudioContext);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Utility Functions ---

  const getMaxCount = (): number => {
    return Math.min(
      COUNTING_GAME_CONSTANTS.BASE_COUNT + 
      Math.floor((gameState.level - 1) / COUNTING_GAME_CONSTANTS.LEVEL_THRESHOLD) * 
      COUNTING_GAME_CONSTANTS.INCREMENT,
      15 // מקסימום מוחלט של ספירה
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
    try {
      console.log("StartGame function called");
      
      // עדכון ראשוני - מעבר למצב משחק
      setGameState(prev => ({
        ...prev,
        isPlaying: true,
        currentChallenge: null,
        score: 0,
        level: 1,
        showCelebration: false,
        options: [],
      }));

      console.log("Game state updated to playing mode");
      
      await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
      await speakStartMessage();
      
      const challenge = generateCountingChallenge();
      const options = generateOptions(challenge.correctAnswer);

      console.log("Generated challenge:", challenge);
      console.log("Generated options:", options);

      // עדכון שני - הוספת האתגר
      setGameState((prev) => ({
        ...prev,
        currentChallenge: challenge,
        options,
      }));

      console.log("Challenge set in game state");

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
        (v) => setGameState((prev) => ({ ...prev, showCelebration: v })),
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
