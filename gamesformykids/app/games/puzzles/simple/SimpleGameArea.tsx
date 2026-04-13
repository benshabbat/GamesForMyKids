'use client';

import PuzzleGrid from '../shared/PuzzleGrid';
import PiecesPool from '../shared/PiecesPool';
import PuzzleStats from '../shared/PuzzleStats';

export default function SimpleGameArea() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <PuzzleStats className="mb-6" />
        <PiecesPool />
      </div>
      <div className="lg:col-span-2">
        <PuzzleGrid />
      </div>
    </div>
  );
}
