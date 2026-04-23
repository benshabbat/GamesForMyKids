'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePuzzleStore } from './store/puzzleStore';
import { ROUTES } from '@/lib/constants/routes';

function useRouterBridge() {
  const router = useRouter();
  useEffect(() => {
    usePuzzleStore.setState({ goHome: () => router.push(ROUTES.HOME) });
  }, [router]);
}

function useAudioInit() {
  useEffect(() => {
    usePuzzleStore.getState().initAudio();
  }, []);
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
  useAudioInit();
  usePuzzleTimer();
  useKeyboardShortcuts();
}
