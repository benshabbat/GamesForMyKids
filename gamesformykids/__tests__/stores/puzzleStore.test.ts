import { describe, expect, it, vi } from 'vitest';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import { calculateFinalScore } from '@/app/games/puzzles/utils/puzzleScoring';
import type { PuzzlePiece } from '@/app/games/puzzles/utils/puzzleTypes';

const store = usePuzzleStore;

// 2x2 puzzle: piece i belongs at row floor(i / 2), col i % 2 (== grid index i).
const makePieces = (): PuzzlePiece[] =>
  Array.from({ length: 4 }, (_, i) => ({
    id: i,
    canvas: {} as HTMLCanvasElement,
    correctRow: Math.floor(i / 2),
    correctCol: i % 2,
    currentRow: null,
    currentCol: null,
    isPlaced: false,
    isCorrect: false,
    expectedPosition: { row: Math.floor(i / 2), col: i % 2 },
  }));

// Solves the puzzle, placing the last piece when the timer reads `finishTimer` seconds.
function solveAt(finishTimer: number) {
  store.setState({
    difficulty: 4,
    timer: 0,
    score: 0,
    isCompleted: false,
    pieces: makePieces(),
    placedPieces: new Array(4).fill(null),
    showFeedback: vi.fn(),
    speak: vi.fn(),
  } as unknown as Parameters<typeof store.setState>[0]);

  const pieces = makePieces();
  [0, 1, 2].forEach(i => store.getState().handleDropLogic(pieces[i]!, i));
  store.setState({ timer: finishTimer });
  store.getState().handleDropLogic(pieces[3]!, 3);
  return store.getState();
}

describe('puzzle drop scoring', () => {
  it('completes the puzzle once every piece is in the right cell', () => {
    expect(solveAt(30).isCompleted).toBe(true);
  });

  it('scores a faster solve higher than a slower one', () => {
    const fast = solveAt(20).score;
    const slow = solveAt(200).score;
    expect(fast).toBeGreaterThan(slow);
  });

  it('never rewards extra time: a solve at 250s scores less than one at 100s', () => {
    expect(solveAt(250).score).toBeLessThan(solveAt(100).score);
  });

  it('uses correct pieces as the base score plus the completion and time bonuses', () => {
    expect(solveAt(40).score).toBe(calculateFinalScore(4, 40));
    expect(solveAt(40).score).toBe(4 + 50 + (300 - 40));
  });

  it('floors the time bonus at zero for very slow solves', () => {
    expect(solveAt(10_000).score).toBe(4 + 50);
  });
});
