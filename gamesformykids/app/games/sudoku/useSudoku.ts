'use client';
import { useEffect } from 'react';
import { useSudokuStore } from './sudokuStore';
import { generatePuzzle } from './sudokuLogic';
import { speak } from '@/lib/utils/speech/enhancedSpeechUtils';
import { useKeyboardControls } from '@/hooks/shared/game-controls';

export function useSudoku() {
  const store = useSudokuStore();
  const {
    phase, size, difficulty, applyPuzzle, errorCell, clearError, lockedCell, clearLocked,
    selected, selectCell, inputNumber,
  } = store;

  // Generate the puzzle off the render that shows the "generating" spinner,
  // so the UI can paint before the (potentially slow) backtracking solver runs.
  useEffect(() => {
    if (phase !== 'generating') return;
    const timer = setTimeout(() => {
      const { puzzle, solution, given } = generatePuzzle(size, difficulty);
      applyPuzzle(puzzle, solution, given);
    }, 30);
    return () => clearTimeout(timer);
  }, [phase, size, difficulty, applyPuzzle]);

  // Clear the transient wrong-answer flash. Held a bit longer than the CSS
  // transition so a child has time to register cause and effect.
  useEffect(() => {
    if (!errorCell) return;
    speak('אופס, נסה שוב');
    const timer = setTimeout(clearError, 800);
    return () => clearTimeout(timer);
  }, [errorCell, clearError]);

  // Clear the transient "can't overwrite this cell" flash.
  useEffect(() => {
    if (!lockedCell) return;
    const timer = setTimeout(clearLocked, 500);
    return () => clearTimeout(timer);
  }, [lockedCell, clearLocked]);

  // Speak a congratulation when the puzzle is solved.
  useEffect(() => {
    if (phase === 'won') speak('כל הכבוד! פתרת את הסודוקו!');
  }, [phase]);

  // Keyboard: digits fill the selected cell, arrows move selection.
  const moveSelection = (dr: number, dc: number) => {
    if (!selected) return;
    const nextRow = Math.min(size - 1, Math.max(0, selected.row + dr));
    const nextCol = Math.min(size - 1, Math.max(0, selected.col + dc));
    selectCell(nextRow, nextCol);
  };
  useKeyboardControls({
    ...Object.fromEntries(
      Array.from({ length: size }, (_, i) => [String(i + 1), () => inputNumber(i + 1)]),
    ),
    ArrowUp: () => moveSelection(-1, 0),
    ArrowDown: () => moveSelection(1, 0),
    ArrowLeft: () => moveSelection(0, -1),
    ArrowRight: () => moveSelection(0, 1),
  }, phase === 'playing');

  return store;
}
