'use client';

import { SIMPLE_PUZZLES } from '../constants/simplePuzzlesData';
import PuzzleCard from './PuzzleCard';

export default function PuzzleSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SIMPLE_PUZZLES.map((puzzle) => (
        <PuzzleCard key={puzzle.id} puzzle={puzzle} />
      ))}
    </div>
  );
}
