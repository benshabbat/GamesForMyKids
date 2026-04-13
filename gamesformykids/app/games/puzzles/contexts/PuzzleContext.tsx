'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePuzzleStore } from '../store/puzzleStore';
import { type PuzzleState } from '../types/puzzle';

/**
 * PuzzleProvider — lightweight wrapper that:
 * 1. Injects Next.js router into the store (for goHome)
 * 2. Initialises audio/speech once
 * 3. Runs the timer interval reactively
 * 4. Registers keyboard shortcuts
 *
 * No React Context or useReducer — all state lives in the Zustand store.
 */
export function PuzzleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const gameStarted = usePuzzleStore(s => s.gameStarted);
  const isCompleted = usePuzzleStore(s => s.isCompleted);

  // Inject router-based navigation
  useEffect(() => {
    usePuzzleStore.setState({ goHome: () => router.push('/') });
  }, [router]);

  // Initialise audio / speech once on mount
  useEffect(() => {
    usePuzzleStore.getState().initAudio();
  }, []);

  // Timer
  useEffect(() => {
    if (!gameStarted || isCompleted) return;
    const interval = setInterval(() => {
      usePuzzleStore.setState(s => ({ timer: s.timer + 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, isCompleted]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { gameStarted, showHelp, resetGame, toggleHints, toggleHelp, toggleDebug, shufflePieces } =
        usePuzzleStore.getState();
      switch (event.key.toLowerCase()) {
        case 'r':   if (gameStarted) resetGame(); break;
        case 'h':   event.shiftKey ? toggleHints() : toggleHelp(); break;
        case 'd':   toggleDebug(); break;
        case 's':   if (gameStarted) shufflePieces(); break;
        case 'escape': if (showHelp) toggleHelp(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <>{children}</>;
}

/**
 * usePuzzleContext — backward-compatible hook that returns the same shape
 * all existing components expect, now sourced from the Zustand store.
 */
export function usePuzzleContext() {
  const store = usePuzzleStore();

  const state: PuzzleState = {
    gameStarted:    store.gameStarted,
    isCompleted:    store.isCompleted,
    timer:          store.timer,
    difficulty:     store.difficulty,
    score:          store.score,
    showHints:      store.showHints,
    showDebug:      store.showDebug,
    showHelp:       store.showHelp,
    pieces:         store.pieces,
    placedPieces:   store.placedPieces,
    image:          store.image,
    imageLoaded:    store.imageLoaded,
    draggedPiece:   store.draggedPiece,
    touchState:     store.touchState,
    selectedPuzzle: store.selectedPuzzle,
  };

  return {
    state,
    dispatch:                store.dispatch,
    initializeGame:          store.initializeGame,
    initializeSimpleGame:    store.initializeSimpleGame,
    handleDropLogic:         store.handleDropLogic,
    handleImageUpload:       store.handleImageUpload,
    handlePreMadeImageSelect: store.handlePreMadeImageSelect,
    shufflePieces:           store.shufflePieces,
    resetGame:               store.resetGame,
    goHome:                  store.goHome,
    goToMenu:                store.goToMenu,
    toggleHints:             store.toggleHints,
    toggleDebug:             store.toggleDebug,
    toggleHelp:              store.toggleHelp,
    changeDifficulty:        store.changeDifficulty,
    handlePuzzleSelect:      store.handlePuzzleSelect,
    handleDragStart:         store.handleDragStart,
    handleTouchStart:        store.handleTouchStart,
    handleTouchMove:         store.handleTouchMove,
    handleTouchEnd:          store.handleTouchEnd,
    handleDragOver:          store.handleDragOver,
    handleDrop:              store.handleDrop,
    showFeedback:            store.showFeedback,
    speak:                   store.speak,
  };
}
