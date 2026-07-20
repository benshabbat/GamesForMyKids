'use client';
import { useEffect } from 'react';
import { useSudokuStore } from './sudokuStore';
import { generatePuzzle } from './sudokuLogic';
import { speak } from '@/lib/utils/speech/enhancedSpeechUtils';

export function useSudoku() {
  const store = useSudokuStore();
  const { phase, size, difficulty, applyPuzzle, errorCell, clearError, selected, selectCell, inputNumber } = store;

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

  // Clear the transient wrong-answer flash.
  useEffect(() => {
    if (!errorCell) return;
    const timer = setTimeout(clearError, 500);
    return () => clearTimeout(timer);
  }, [errorCell, clearError]);

  // Speak a congratulation when the puzzle is solved.
  useEffect(() => {
    if (phase === 'won') speak('כל הכבוד! פתרת את הסודוקו!');
  }, [phase]);

  // Keyboard: digits fill the selected cell, arrows move selection.
  useEffect(() => {
    if (phase !== 'playing') return;
    const onKey = (e: KeyboardEvent) => {
      const digit = Number(e.key);
      if (digit >= 1 && digit <= size) {
        e.preventDefault();
        inputNumber(digit);
        return;
      }
      if (!selected) return;
      const { row, col } = selected;
      const moves: Record<string, [number, number]> = {
        ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1],
      };
      const move = moves[e.key];
      if (move) {
        e.preventDefault();
        const nextRow = Math.min(size - 1, Math.max(0, row + move[0]));
        const nextCol = Math.min(size - 1, Math.max(0, col + move[1]));
        selectCell(nextRow, nextCol);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, size, selected, selectCell, inputNumber]);

  return store;
}
