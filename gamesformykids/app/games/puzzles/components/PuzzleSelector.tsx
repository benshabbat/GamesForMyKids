'use client';

import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import { SIMPLE_PUZZLES } from '@/app/games/puzzles/constants/simplePuzzlesData';
import PuzzleCard from './PuzzleCard';

export default function PuzzleSelector() {
  const { handlePuzzleSelect } = usePuzzleStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SIMPLE_PUZZLES.map((puzzle) => (
        <PuzzleCard key={puzzle.id} puzzle={puzzle} onSelect={handlePuzzleSelect} />
      ))}
    </div>
  );
}
