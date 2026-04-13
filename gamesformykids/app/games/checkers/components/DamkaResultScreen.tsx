'use client';

import type { GamePhase } from '../useDamkaGame';

interface DamkaResultScreenProps {
  phase: Extract<GamePhase, 'won' | 'lost'>;
  playerScore: number;
  computerScore: number;
  onRestart: () => void;
}

export default function DamkaResultScreen({ phase, playerScore, computerScore, onRestart }: DamkaResultScreenProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="text-8xl">{phase === 'won' ? '🎉' : '😢'}</div>
      <h2 className="text-4xl font-extrabold text-white">
        {phase === 'won' ? 'ניצחת!' : 'המחשב ניצח!'}
      </h2>
      <div className="flex gap-6 text-white text-xl font-semibold">
        <span>🔴 אתה: {playerScore}</span>
        <span>⚪ מחשב: {computerScore}</span>
      </div>
      <button
        onClick={onRestart}
        className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
      >
        🔄 שחק שוב
      </button>
    </div>
  );
}
