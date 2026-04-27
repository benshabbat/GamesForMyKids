'use client';
import { useBalloonPopStore } from '../balloonPopStore';
import GameResultCard from '@/components/game/shared/GameResultCard';

export default function BalloonResultScreen() {
  const score     = useBalloonPopStore(s => s.score);
  const best      = useBalloonPopStore(s => s.best);
  const lives     = useBalloonPopStore(s => s.lives);
  const startGame = useBalloonPopStore(s => s.startGame);
  return (
    <GameResultCard
      emoji={lives <= 0 ? '💔' : '🎉'}
      title={lives <= 0 ? 'נגמרו החיים!' : 'הזמן נגמר!'}
      gradientClass="from-sky-200 to-blue-400"
      buttonClass="from-pink-500 to-rose-500"
      onRestart={startGame}
      restartLabel="🔄 שוב!"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-pink-50 rounded-2xl p-4">
          <p className="text-4xl font-black text-pink-500">{score}</p>
          <p className="text-xs text-pink-400">ניקוד</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-4">
          <p className="text-4xl font-black text-yellow-500">{best}</p>
          <p className="text-xs text-yellow-400">שיא</p>
        </div>
      </div>
    </GameResultCard>
  );
}
