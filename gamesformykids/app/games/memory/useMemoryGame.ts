import { useState, useEffect } from "react";
import { Card } from "@/lib/types/base";
import { AnimalData } from "@/lib/types/games";

import { 
  playAnimalSound as playGenericAnimalSound, 
  playMemorySuccessSound, 
  createShuffledMemoryCards,  
} from "@/lib/utils/gameUtils";
import { 
  MEMORY_GAME_ANIMALS, 
  ANIMAL_SOUND_FREQUENCIES,
  MEMORY_GAME_CONSTANTS
} from "@/lib/constants";
import { speakHebrew } from "@/lib/utils/enhancedSpeechUtils";

type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

interface GameStats {
  moves: number;
  matches: number;
  score: number;
  timeElapsed: number;
  perfectMatches: number;
  streak: number;
}

export function useMemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('MEDIUM');
  const [gameStats, setGameStats] = useState<GameStats>({
    moves: 0,
    matches: 0,
    score: 0,
    timeElapsed: 0,
    perfectMatches: 0,
    streak: 0
  });
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);

  // קבלת נתוני החיות בהתאם לרמת הקושי
  const getDifficultyConfig = () => MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[difficulty];
  
  const getAnimalsForDifficulty = (targetDifficulty?: DifficultyLevel): AnimalData[] => {
    const currentDifficulty = targetDifficulty || difficulty;
    const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[currentDifficulty];
    return MEMORY_GAME_ANIMALS.slice(0, config.pairs);
  };

  const createShuffledCards = (targetDifficulty?: DifficultyLevel): Card[] => {
    // קבל את החיות הנוכחיות בהתאם לרמת הקושי
    const currentDifficulty = targetDifficulty || difficulty;
    const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[currentDifficulty];
    const currentAnimals = MEMORY_GAME_ANIMALS.slice(0, config.pairs);
    const currentEmojis = currentAnimals.map((animal) => animal.emoji);
    
    const genericCards = createShuffledMemoryCards(currentEmojis);
    return genericCards.map(card => ({
      id: card.id,
      emoji: card.item as string,
      isFlipped: card.isFlipped,
      isMatched: card.isMatched
    }));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioContext(
        new (
          window.AudioContext ||
          (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        )()
      );
    }
  }, []);

  // טיימר המשחק
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameStarted && !isGamePaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
        setGameStats(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameStarted, isGamePaused, timeLeft]);

  const handleTimeUp = () => {
    setIsGamePaused(true);
    speakHebrew("הזמן נגמר! בואו ננסה שוב!");
  };

  const playAnimalSound = (emoji: string) => {
    playGenericAnimalSound(audioContext, emoji, ANIMAL_SOUND_FREQUENCIES);
  };

  const playSuccessSound = () => {
    playMemorySuccessSound(audioContext);
  };

  const calculateScore = (isPerfectMatch: boolean, currentStreak: number, timeBonus: number = 0) => {
    let score = MEMORY_GAME_CONSTANTS.SCORING.BASE_MATCH_SCORE;
    
    // בונוס רמת קושי
    score *= MEMORY_GAME_CONSTANTS.SCORING.DIFFICULTY_MULTIPLIER[difficulty];
    
    // בונוס זוג מושלם
    if (isPerfectMatch) {
      score += MEMORY_GAME_CONSTANTS.SCORING.PERFECT_MATCH_BONUS;
    }
    
    // בונוס זמן
    if (timeBonus > 0) {
      score += timeBonus * MEMORY_GAME_CONSTANTS.SCORING.TIME_BONUS_MULTIPLIER;
    }
    
    // בונוס רצף
    if (currentStreak > 1) {
      score *= MEMORY_GAME_CONSTANTS.SCORING.STREAK_MULTIPLIER;
    }
    
    return Math.round(score);
  };

  const initializeGame = (newDifficulty?: DifficultyLevel) => {
    const targetDifficulty = newDifficulty || difficulty;
    
    if (newDifficulty) {
      setDifficulty(newDifficulty);
    }
    
    const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[targetDifficulty];
    
    setCards(createShuffledCards(targetDifficulty));
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsGameStarted(true);
    setIsGamePaused(false);
    setTimeLeft(config.timeLimit);
    setGameStats({
      moves: 0,
      matches: 0,
      score: 0,
      timeElapsed: 0,
      perfectMatches: 0,
      streak: 0
    });
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2 || isGamePaused || timeLeft <= 0) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    playAnimalSound(card.emoji);
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    // עדכון מונה המהלכים
    if (newFlipped.length === 1) {
      setGameStats(prev => ({ ...prev, moves: prev.moves + 1 }));
    }

    if (newFlipped.length === 2) {
      checkForMatch(newFlipped);
    }
  };

  const speakCongrats = () => {
    speakHebrew("כל הכבוד!");
  };

  const checkForMatch = ([firstId, secondId]: number[]) => {
    const firstCard = cards.find((c) => c.id === firstId);
    const secondCard = cards.find((c) => c.id === secondId);
    if (!firstCard || !secondCard) return;

    const isMatch = firstCard.emoji === secondCard.emoji;
    const isPerfectMatch = gameStats.moves === matchedPairs.length * 2; // זוג במהלך הראשון

    setTimeout(() => {
      if (isMatch) {
        playSuccessSound();
        speakCongrats();
        
        const newStreak = gameStats.streak + 1;
        const timeBonus = Math.max(0, timeLeft - 30); // בונוס זמן
        const matchScore = calculateScore(isPerfectMatch, newStreak, timeBonus);
        
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          )
        );
        setMatchedPairs((prev) => [...prev, firstCard.emoji]);
        setGameStats(prev => ({
          ...prev,
          matches: prev.matches + 1,
          score: prev.score + matchScore,
          perfectMatches: isPerfectMatch ? prev.perfectMatches + 1 : prev.perfectMatches,
          streak: newStreak
        }));
      } else {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          )
        );
        setGameStats(prev => ({ ...prev, streak: 0 })); // איפוס רצף
      }
      setFlippedCards([]);
    }, MEMORY_GAME_CONSTANTS.FLIP_DURATION);
  };

  const isGameWon = matchedPairs.length === getDifficultyConfig().pairs && timeLeft > 0 && isGameStarted;
  
  useEffect(() => {
    if (isGameWon && isGameStarted) {
      setIsGamePaused(true);
      // בונוס השלמה מוכפל לפי רמת הקושי
      const completionBonus = MEMORY_GAME_CONSTANTS.SCORING.MIN_MOVES_BONUS * 
                            MEMORY_GAME_CONSTANTS.SCORING.DIFFICULTY_MULTIPLIER[difficulty];
      setGameStats(prev => ({ ...prev, score: prev.score + completionBonus }));
      setTimeout(() => {
        const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[difficulty];
        const finalScore = gameStats.score + completionBonus;
        speakHebrew(`מעולה! סיימתם ברמת ${config.name} עם ${finalScore} נקודות!`);
      }, 500);
    }
  }, [isGameWon, isGameStarted, difficulty, gameStats.score]);

  const pauseGame = () => setIsGamePaused(!isGamePaused);
  
  const resetGame = () => initializeGame(difficulty);

  const changeDifficulty = (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    // אם המשחק כבר התחיל, מתחיל משחק חדש עם הרמה החדשה
    if (isGameStarted) {
      initializeGame(newDifficulty);
    }
  };

  return {
    // נתונים בסיסיים
    animals: getAnimalsForDifficulty(),
    cards,
    isGameStarted,
    matchedPairs,
    isGameWon,
    
    // רמת קושי
    difficulty,
    difficultyConfig: getDifficultyConfig(),
    
    // סטטיסטיקות משחק
    gameStats,
    timeLeft,
    isGamePaused,
    
    // פעולות
    initializeGame,
    handleCardClick,
    setDifficulty: changeDifficulty,
    pauseGame,
    resetGame,
  };
}
