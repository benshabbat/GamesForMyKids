'use client';

import { useEffect } from 'react';
import { usePuzzleStore } from './store/puzzleStore';
import { useGameAudio } from '@/hooks/shared/audio/useGameAudio';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';

function useRouterBridge() {
  // bridge removed — UniversalGameNavigation handles routing
}

function usePuzzleTimer() {
  const gameStarted = usePuzzleStore(s => s.gameStarted);
  const isCompleted = usePuzzleStore(s => s.isCompleted);
  useEffect(() => {
    if (!gameStarted || isCompleted) return;
    const interval = setInterval(() => {
      usePuzzleStore.setState(s => ({ timer: s.timer + 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, isCompleted]);
}

// Saves the result once per solved puzzle. This lives here (mounted once per game)
// rather than in CompletionBanner, which is rendered twice in the custom layout
// (mobile + desktop, one hidden by CSS) and would save once per mounted copy.
function usePuzzleCompletionSave() {
  const { saveGameResultRef } = useGameCompletion('puzzles');
  const isCompleted = usePuzzleStore(s => s.isCompleted);
  useEffect(() => {
    if (!isCompleted) return;
    // Read final score and elapsed time directly from the store to avoid stale closures.
    const { score, timer } = usePuzzleStore.getState();
    saveGameResultRef.current({ score, level: 1, durationSeconds: timer });
  }, [isCompleted, saveGameResultRef]);
}

function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { gameStarted, showHelp, resetGame, toggleHints, toggleHelp, toggleDebug, shufflePieces } =
        usePuzzleStore.getState();
      switch (event.key.toLowerCase()) {
        case 'r':      if (gameStarted) resetGame(); break;
        case 'h':      if (event.shiftKey) { toggleHints(); } else { toggleHelp(); } break;
        case 'd':      toggleDebug(); break;
        case 's':      if (gameStarted) shufflePieces(); break;
        case 'escape': if (showHelp) toggleHelp(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}

export function usePuzzleSetup() {
  useRouterBridge();
  useGameAudio();
  usePuzzleTimer();
  usePuzzleCompletionSave();
  useKeyboardShortcuts();
}
