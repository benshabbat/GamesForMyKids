'use client';

import GameResultCard from '@/components/game/shared/GameResultCard';
import { useTakiStore } from '../takiGameStore';

export default function TakiResultScreen() {
  const phase = useTakiStore(s => s.phase);
  const message = useTakiStore(s => s.message);
  const playerScore = useTakiStore(s => s.playerScore);
  const computerScore = useTakiStore(s => s.computerScore);
  const startGame = useTakiStore(s => s.startGame);

  return (
    <GameResultCard
      emoji={phase === 'won' ? '🎉' : '😢'}
      title={phase === 'won' ? 'ניצחת!' : 'המחשב ניצח!'}
      gradientClass="from-green-50 to-teal-100"
      buttonClass="from-teal-500 to-emerald-600"
      onRestart={startGame}
      restartLabel="🔄 שחק שוב"
    >
      {message && <p className="text-gray-500 text-base mb-3">{message}</p>}
      <div className="flex justify-center gap-6 text-gray-700 text-xl font-semibold">
        <span>🧑 אתה: {playerScore}</span>
        <span>🤖 מחשב: {computerScore}</span>
      </div>
    </GameResultCard>
  );
}
