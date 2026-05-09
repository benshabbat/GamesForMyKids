'use client';

import { useCatchFruitGame } from '../useCatchFruitGame';
import LivesDisplay from '@/components/game/shared/LivesDisplay';

export default function CatchFruitHUD() {
  const { score, lives, timeLeft } = useCatchFruitGame();
  return (
    <div className="flex gap-5 mb-3 text-white text-center">
      <div>
        <p className="text-2xl font-black text-yellow-300">{score}</p>
        <p className="text-xs text-yellow-500">ניקוד</p>
      </div>
      <div>
        <LivesDisplay lives={lives} />
        <p className="text-xs text-red-400">חיים</p>
      </div>
      <div>
        <p className="text-2xl font-black text-blue-200">{timeLeft}s</p>
        <p className="text-xs text-blue-400">זמן</p>
      </div>
    </div>
  );
}
