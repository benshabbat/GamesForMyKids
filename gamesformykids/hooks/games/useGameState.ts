'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseGameStateReturn {
  gameStarted: boolean;
  isCompleted: boolean;
  timer: number;
  difficulty: number;
  showHints: boolean;
  showDebug: boolean;
  showHelp: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  setDifficulty: React.Dispatch<React.SetStateAction<number>>;
  toggleHints: () => void;
  toggleDebug: () => void;
  toggleHelp: () => void;
  handleDifficultyChange: (newDifficulty: number, onDifficultyChange?: (difficulty: number) => void) => void;
  goHome: () => void;
}

export function useGameState(): UseGameStateReturn {
  const [gameStarted, setGameStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [difficulty, setDifficulty] = useState(9);
  const [showHints, setShowHints] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !isCompleted) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, isCompleted]);

  // Toggle functions
  const toggleHints = useCallback(() => {
    setShowHints(prev => !prev);
  }, []);

  const toggleDebug = useCallback(() => {
    setShowDebug(prev => !prev);
  }, []);

  const toggleHelp = useCallback(() => {
    setShowHelp(prev => !prev);
  }, []);

  // Handle difficulty change
  const handleDifficultyChange = useCallback((
    newDifficulty: number, 
    onDifficultyChange?: (difficulty: number) => void
  ) => {
    setDifficulty(newDifficulty);
    if (onDifficultyChange) {
      onDifficultyChange(newDifficulty);
    }
  }, []);

  // Go back to home/games selection
  const goHome = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, []);

  return {
    gameStarted,
    isCompleted,
    timer,
    difficulty,
    showHints,
    showDebug,
    showHelp,
    setGameStarted,
    setIsCompleted,
    setTimer,
    setDifficulty,
    toggleHints,
    toggleDebug,
    toggleHelp,
    handleDifficultyChange,
    goHome
  };
}
