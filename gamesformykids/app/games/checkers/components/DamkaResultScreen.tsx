'use client';

import { useDamkaGame } from '../useDamkaGame';
import GameResultCard from '@/components/game/shared/GameResultCard';

export default function DamkaResultScreen() {
  const { phase, playerScore, computerScore, startGame } = useDamkaGame();

  return (
    <GameResultCard
      emoji={phase === 'won' ? '🎉' : '😢'}
      title={phase === 'won' ? 'ניצחת!' : 'המחשב ניצח!'}
      gradientClass="from-amber-50 to-yellow-100"
      buttonClass="from-amber-400 to-orange-500"
      onRestart={startGame}
      restartLabel="🔄 שחק שוב"
    >
      <div className="flex gap-6 text-gray-700 text-xl font-semibold justify-center">
        <span>🔴 אתה: {playerScore}</span>
        <span>⚪ מחשב: {computerScore}</span>
      </div>
    </GameResultCard>
  );
}
