'use client';

import type { GamePhase } from '../useTakiGame';

interface TakiResultScreenProps {
  phase: Extract<GamePhase, 'won' | 'lost'>;
  message: string;
  playerScore: number;
  computerScore: number;
  onRestart: () => void;
}

export default function TakiResultScreen({ phase, message, playerScore, computerScore, onRestart }: TakiResultScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
      <div className="text-8xl">{phase === 'won' ? '🎉' : '😢'}</div>
      <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
        {phase === 'won' ? 'ניצחת!' : 'המחשב ניצח!'}
      </h2>
      <p className="text-green-200 text-xl">{message}</p>
      <div className="flex gap-6 text-white text-xl font-semibold">
        <span>🧑 אתה: {playerScore}</span>
        <span>🤖 מחשב: {computerScore}</span>
      </div>
      <button
        onClick={onRestart}
        className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95 mt-2"
      >
        🔄 שחק שוב
      </button>
    </div>
  );
}
