'use client';

import { usePuzzleContext } from '@/contexts';
import { SIMPLE_PUZZLES, type SimplePuzzle } from '@/app/games/puzzles/constants/simplePuzzlesData';
import PuzzleCard from './PuzzleCard';

interface PuzzleSelectorProps {
  puzzles?: SimplePuzzle[];
  onPuzzleSelect?: (puzzle: SimplePuzzle) => void;
}

export default function PuzzleSelector({ puzzles, onPuzzleSelect }: PuzzleSelectorProps) {
  const { handlePuzzleSelect } = usePuzzleContext();

  const actualPuzzles = puzzles || SIMPLE_PUZZLES;
  const actualOnPuzzleSelect = onPuzzleSelect || handlePuzzleSelect;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {actualPuzzles.map((puzzle) => (
        <PuzzleCard key={puzzle.id} puzzle={puzzle} onSelect={actualOnPuzzleSelect} />
      ))}
    </div>
  );
}
