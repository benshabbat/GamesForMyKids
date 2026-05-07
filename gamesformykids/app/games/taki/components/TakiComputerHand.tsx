'use client';

import { useTakiGame } from '../useTakiGame';
import { FaceDownCard } from './TakiCardView';

export default function TakiComputerHand() {
  const { computerHand } = useTakiGame();

  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-gray-400 text-xs">🤖 מחשב — {computerHand.length} קלפים</p>
      <div className="flex flex-wrap justify-center gap-1 max-w-full">
        {computerHand.map((_, i) => (
          <FaceDownCard key={i} small />
        ))}
      </div>
    </div>
  );
}
