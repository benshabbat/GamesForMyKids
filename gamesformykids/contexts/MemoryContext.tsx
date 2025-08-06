'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimalData } from "@/lib/types/games";
import { 
  playAnimalSound as playGenericAnimalSound, 
  playMemorySuccessSound, 
  createShuffledMemoryCards,  
} from "@/lib/utils/gameUtils";
import { 
  MEMORY_GAME_ANIMALS, 
  MEMORY_GAME_CONSTANTS
} from "@/lib/constants";
import { speakHebrew } from "@/lib/utils/enhancedSpeechUtils";

// Types
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface MemoryCard {
  id: number;
  animal: AnimalData;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameStats {
  moves: number;
  matches: number;
  score: number;
  timeElapsed: number;
  perfectMatches: number;
  streak: number;
}

export interface MemoryState {
  // Game State
  gameStarted: boolean;
  isCompleted: boolean;
  isGameWon: boolean;
  timer: number;
  timeLeft: number;
  isGamePaused: boolean;
  difficulty: DifficultyLevel;
  gameStats: GameStats;
  
  // Cards and Animals
  cards: MemoryCard[];
  animals: AnimalData[];
  flippedCards: number[];
  matchedPairs: string[];
  
  // Audio
  audioContext: AudioContext | null;
  
  // UI State
  showHints: boolean;
  showDebug: boolean;
}

export type MemoryAction =
  | { type: 'SET_GAME_STARTED'; payload: boolean }
  | { type: 'SET_COMPLETED'; payload: boolean }
  | { type: 'SET_GAME_WON'; payload: boolean }
  | { type: 'SET_TIMER'; payload: number }
  | { type: 'INCREMENT_TIMER' }
  | { type: 'SET_TIME_LEFT'; payload: number }
  | { type: 'DECREMENT_TIME_LEFT' }
  | { type: 'SET_GAME_PAUSED'; payload: boolean }
  | { type: 'SET_DIFFICULTY'; payload: DifficultyLevel }
  | { type: 'SET_GAME_STATS'; payload: GameStats }
  | { type: 'UPDATE_GAME_STATS'; payload: Partial<GameStats> }
  | { type: 'SET_CARDS'; payload: MemoryCard[] }
  | { type: 'SET_ANIMALS'; payload: AnimalData[] }
  | { type: 'SET_FLIPPED_CARDS'; payload: number[] }
  | { type: 'ADD_FLIPPED_CARD'; payload: number }
  | { type: 'CLEAR_FLIPPED_CARDS' }
  | { type: 'SET_MATCHED_PAIRS'; payload: string[] }
  | { type: 'ADD_MATCHED_PAIR'; payload: string }
  | { type: 'SET_AUDIO_CONTEXT'; payload: AudioContext | null }
  | { type: 'TOGGLE_HINTS' }
  | { type: 'TOGGLE_DEBUG' }
  | { type: 'RESET_GAME' }
  | { type: 'RESET_TO_MENU' };

const initialGameStats: GameStats = {
  moves: 0,
  matches: 0,
  score: 0,
  timeElapsed: 0,
  perfectMatches: 0,
  streak: 0
};

const initialState: MemoryState = {
  gameStarted: false,
  isCompleted: false,
  isGameWon: false,
  timer: 0,
  timeLeft: 0,
  isGamePaused: false,
  difficulty: 'MEDIUM',
  gameStats: initialGameStats,
  cards: [],
  animals: [],
  flippedCards: [],
  matchedPairs: [],
  audioContext: null,
  showHints: false,
  showDebug: false
};

function memoryReducer(state: MemoryState, action: MemoryAction): MemoryState {
  switch (action.type) {
    case 'SET_GAME_STARTED':
      return { ...state, gameStarted: action.payload };
    
    case 'SET_COMPLETED':
      return { ...state, isCompleted: action.payload };
    
    case 'SET_GAME_WON':
      return { ...state, isGameWon: action.payload };
    
    case 'SET_TIMER':
      return { ...state, timer: action.payload };
    
    case 'INCREMENT_TIMER':
      return { ...state, timer: state.timer + 1 };
    
    case 'SET_TIME_LEFT':
      return { ...state, timeLeft: action.payload };
    
    case 'DECREMENT_TIME_LEFT':
      return { ...state, timeLeft: Math.max(0, state.timeLeft - 1) };
    
    case 'SET_GAME_PAUSED':
      return { ...state, isGamePaused: action.payload };
    
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    
    case 'SET_GAME_STATS':
      return { ...state, gameStats: action.payload };
    
    case 'UPDATE_GAME_STATS':
      return { 
        ...state, 
        gameStats: { ...state.gameStats, ...action.payload } 
      };
    
    case 'SET_CARDS':
      return { ...state, cards: action.payload };
    
    case 'SET_ANIMALS':
      return { ...state, animals: action.payload };
    
    case 'SET_FLIPPED_CARDS':
      return { ...state, flippedCards: action.payload };
    
    case 'ADD_FLIPPED_CARD':
      return { 
        ...state, 
        flippedCards: [...state.flippedCards, action.payload] 
      };
    
    case 'CLEAR_FLIPPED_CARDS':
      return { ...state, flippedCards: [] };
    
    case 'SET_MATCHED_PAIRS':
      return { ...state, matchedPairs: action.payload };
    
    case 'ADD_MATCHED_PAIR':
      return { 
        ...state, 
        matchedPairs: [...state.matchedPairs, action.payload] 
      };
    
    case 'SET_AUDIO_CONTEXT':
      return { ...state, audioContext: action.payload };
    
    case 'TOGGLE_HINTS':
      return { ...state, showHints: !state.showHints };
    
    case 'TOGGLE_DEBUG':
      return { ...state, showDebug: !state.showDebug };
    
    case 'RESET_GAME':
      return {
        ...state,
        gameStarted: false,
        isCompleted: false,
        isGameWon: false,
        timer: 0,
        timeLeft: 0,
        isGamePaused: false,
        gameStats: initialGameStats,
        cards: [],
        flippedCards: [],
        matchedPairs: [],
        showHints: false,
        showDebug: false
      };
    
    case 'RESET_TO_MENU':
      return initialState;
    
    default:
      return state;
  }
}

// Context
interface MemoryContextType {
  state: MemoryState;
  dispatch: React.Dispatch<MemoryAction>;
  
  // Game Actions
  initializeGame: (targetDifficulty?: DifficultyLevel) => void;
  handleCardClick: (cardIndex: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  resetToMenu: () => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  
  // Computed Values
  difficultyConfig: {
    pairs: number;
    name: string;
    emoji: string;
    timeLimit: number;
  };
  isGameWon: boolean;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

// Provider Component
interface MemoryProviderProps {
  children: React.ReactNode;
}

export function MemoryProvider({ children }: MemoryProviderProps) {
  const [state, dispatch] = useReducer(memoryReducer, initialState);
  const router = useRouter();

  // Get difficulty configuration
  const getDifficultyConfig = useCallback(() => {
    return MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[state.difficulty];
  }, [state.difficulty]);

  // Get animals for current difficulty
  const getAnimalsForDifficulty = useCallback((targetDifficulty?: DifficultyLevel): AnimalData[] => {
    const currentDifficulty = targetDifficulty || state.difficulty;
    const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[currentDifficulty];
    const shuffled = [...MEMORY_GAME_ANIMALS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, config.pairs);
  }, [state.difficulty]);

  // Initialize audio context
  const initializeAudio = useCallback(() => {
    if (!state.audioContext) {
      try {
        const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const context = new AudioContextClass();
          dispatch({ type: 'SET_AUDIO_CONTEXT', payload: context });
        }
      } catch (error) {
        console.warn('Failed to initialize audio context:', error);
      }
    }
  }, [state.audioContext]);

  // Play animal sound
  const playAnimalSound = useCallback(async (animal: AnimalData) => {
    if (!state.audioContext) return;
    
    try {
      // Import ANIMAL_SOUND_FREQUENCIES here to avoid circular dependency
      const { ANIMAL_SOUND_FREQUENCIES } = await import("@/lib/constants");
      await playGenericAnimalSound(state.audioContext, animal.emoji, ANIMAL_SOUND_FREQUENCIES);
    } catch (error) {
      console.warn('Failed to play animal sound:', error);
    }
  }, [state.audioContext]);

  // Initialize game
  const initializeGame = useCallback((targetDifficulty?: DifficultyLevel) => {
    initializeAudio();
    
    const currentDifficulty = targetDifficulty || state.difficulty;
    
    if (targetDifficulty) {
      dispatch({ type: 'SET_DIFFICULTY', payload: targetDifficulty });
    }
    
    const animals = getAnimalsForDifficulty(currentDifficulty);
    const genericCards = createShuffledMemoryCards(animals);
    const cards: MemoryCard[] = genericCards.map(card => ({
      id: card.id,
      animal: card.item,
      isFlipped: card.isFlipped,
      isMatched: card.isMatched
    }));
    
    const config = MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS[currentDifficulty];
    
    dispatch({ type: 'SET_ANIMALS', payload: animals });
    dispatch({ type: 'SET_CARDS', payload: cards });
    dispatch({ type: 'SET_TIME_LEFT', payload: config.timeLimit });
    dispatch({ type: 'SET_GAME_STARTED', payload: true });
    dispatch({ type: 'SET_COMPLETED', payload: false });
    dispatch({ type: 'SET_GAME_WON', payload: false });
    dispatch({ type: 'CLEAR_FLIPPED_CARDS' });
    dispatch({ type: 'SET_MATCHED_PAIRS', payload: [] });
    dispatch({ type: 'SET_GAME_STATS', payload: initialGameStats });
  }, [getAnimalsForDifficulty, initializeAudio, state.difficulty]);

  // Handle card click
  const handleCardClick = useCallback((cardIndex: number) => {
    if (state.isGamePaused || state.isCompleted || state.timeLeft <= 0) return;
    
    const card = state.cards[cardIndex];
    if (!card || card.isFlipped || card.isMatched) return;
    
    if (state.flippedCards.includes(cardIndex)) return;
    
    // Update moves
    if (state.flippedCards.length === 0) {
      dispatch({ 
        type: 'UPDATE_GAME_STATS', 
        payload: { moves: state.gameStats.moves + 1 } 
      });
    }
    
    dispatch({ type: 'ADD_FLIPPED_CARD', payload: cardIndex });
    
    // Flip the card
    const updatedCards = [...state.cards];
    updatedCards[cardIndex] = { ...card, isFlipped: true };
    dispatch({ type: 'SET_CARDS', payload: updatedCards });
    
    // Play animal sound
    playAnimalSound(card.animal);
    speakHebrew(card.animal.name);
    
    // Check for match when two cards are flipped
    if (state.flippedCards.length === 1) {
      const firstCardIndex = state.flippedCards[0];
      const firstCard = state.cards[firstCardIndex];
      
      setTimeout(() => {
        if (firstCard.animal.name === card.animal.name) {
          // Match found
          const newMatchedCards = [...state.cards];
          newMatchedCards[firstCardIndex] = { ...firstCard, isMatched: true };
          newMatchedCards[cardIndex] = { ...card, isMatched: true };
          
          dispatch({ type: 'SET_CARDS', payload: newMatchedCards });
          dispatch({ type: 'ADD_MATCHED_PAIR', payload: card.animal.name });
          dispatch({ type: 'CLEAR_FLIPPED_CARDS' });
          
          // Update stats
          const newMatches = state.gameStats.matches + 1;
          const newStreak = state.gameStats.streak + 1;
          const newScore = state.gameStats.score + (100 * newStreak);
          
          dispatch({ 
            type: 'UPDATE_GAME_STATS', 
            payload: { 
              matches: newMatches, 
              streak: newStreak, 
              score: newScore 
            } 
          });
          
          playMemorySuccessSound(state.audioContext);
          
          // Check if game is won
          const config = getDifficultyConfig();
          if (newMatches === config.pairs) {
            dispatch({ type: 'SET_GAME_WON', payload: true });
            dispatch({ type: 'SET_COMPLETED', payload: true });
          }
        } else {
          // No match - flip cards back
          const resetCards = [...state.cards];
          resetCards[firstCardIndex] = { ...firstCard, isFlipped: false };
          resetCards[cardIndex] = { ...card, isFlipped: false };
          
          dispatch({ type: 'SET_CARDS', payload: resetCards });
          dispatch({ type: 'CLEAR_FLIPPED_CARDS' });
          dispatch({ type: 'UPDATE_GAME_STATS', payload: { streak: 0 } });
        }
      }, 1000);
    }
  }, [state, playAnimalSound, getDifficultyConfig]);

  // Game control functions
  const pauseGame = useCallback(() => {
    dispatch({ type: 'SET_GAME_PAUSED', payload: true });
  }, []);

  const resumeGame = useCallback(() => {
    dispatch({ type: 'SET_GAME_PAUSED', payload: false });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const resetToMenu = useCallback(() => {
    dispatch({ type: 'RESET_TO_MENU' });
    router.push('/games');
  }, [router]);

  const setDifficulty = useCallback((difficulty: DifficultyLevel) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
    // מתחיל את המשחק מחדש עם הרמה החדשה
    initializeGame(difficulty);
  }, [initializeGame]);

  // Timer effects
  useEffect(() => {
    if (!state.gameStarted || state.isGamePaused || state.isCompleted) return;
    
    const timerInterval = setInterval(() => {
      dispatch({ type: 'INCREMENT_TIMER' });
      dispatch({ type: 'DECREMENT_TIME_LEFT' });
      
      // Update time elapsed in stats
      dispatch({ 
        type: 'UPDATE_GAME_STATS', 
        payload: { timeElapsed: state.timer + 1 } 
      });
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [state.gameStarted, state.isGamePaused, state.isCompleted, state.timer]);

  // Check for time up
  useEffect(() => {
    if (state.timeLeft <= 0 && state.gameStarted && !state.isCompleted) {
      dispatch({ type: 'SET_COMPLETED', payload: true });
      dispatch({ type: 'SET_GAME_WON', payload: false });
    }
  }, [state.timeLeft, state.gameStarted, state.isCompleted]);

  const contextValue: MemoryContextType = {
    state,
    dispatch,
    initializeGame,
    handleCardClick,
    pauseGame,
    resumeGame,
    resetGame,
    resetToMenu,
    setDifficulty,
    difficultyConfig: getDifficultyConfig(),
    isGameWon: state.isGameWon
  };

  return (
    <MemoryContext.Provider value={contextValue}>
      {children}
    </MemoryContext.Provider>
  );
}

// Hook
export function useMemoryContext() {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error('useMemoryContext must be used within a MemoryProvider');
  }
  return context;
}
