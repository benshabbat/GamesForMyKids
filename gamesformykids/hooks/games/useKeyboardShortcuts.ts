'use client';

import { useEffect, useCallback } from 'react';

interface UseKeyboardShortcutsProps {
  gameStarted: boolean;
  showHelp: boolean;
  toggleHints: () => void;
  toggleDebug: () => void;
  toggleHelp: () => void;
  shufflePieces: () => void;
  resetGame: () => void;
}

export function useKeyboardShortcuts({
  gameStarted,
  showHelp,
  toggleHints,
  toggleDebug,
  toggleHelp,
  shufflePieces,
  resetGame
}: UseKeyboardShortcutsProps): void {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) return; // Skip if Ctrl/Cmd is pressed
    
    switch (e.key.toLowerCase()) {
      case 'h':
        if (gameStarted) toggleHints();
        break;
      case 'd':
        toggleDebug();
        break;
      case 's':
        if (gameStarted) shufflePieces();
        break;
      case 'r':
        if (gameStarted) resetGame();
        break;
      case 'escape':
        if (showHelp) toggleHelp();
        break;
      case '?':
        toggleHelp();
        break;
    }
  }, [gameStarted, showHelp, toggleHints, toggleDebug, toggleHelp, shufflePieces, resetGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
}
