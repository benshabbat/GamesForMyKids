'use client';

import GameResultCard from '@/components/game/shared/GameResultCard';
import { useGameStatus }  from '../hooks';
import { useGameScores }  from '../hooks';
import { useGameActions } from '../hooks';

export function GameOverScreen() {
  const { phase, message }             = useGameStatus();
  const won                            = (phase as string) === 'won';
  const { playerScore, computerScore } = useGameScores();
  const { startGame }                  = useGameActions();

  return (
    <GameResultCard
      emoji={won ? '🎉' : '😢'}
      title={won ? 'ניצחת!' : 'הפסדת'}
      gradientClass={won ? 'from-stone-950 via-amber-950 to-stone-950' : 'from-stone-950 via-slate-900 to-stone-950'}
      buttonClass="from-amber-300 to-amber-500"
      onRestart={startGame}
      restartLabel="🔄 שחק שוב"
    >
      <p className="text-gray-500 dark:text-white/70 text-sm mb-4">{message}</p>
      <div className="flex justify-center gap-4 text-sm font-bold">
        <div className={`flex items-center gap-2 rounded-xl px-5 py-2.5 border ${
          won
            ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-400 dark:bg-rose-900/80 dark:border-rose-600'
            : 'bg-rose-50 border-rose-200 dark:bg-rose-950/50 dark:border-rose-900'
        }`}>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-rose-400 to-rose-600" />
          <span className="text-rose-700 dark:text-rose-200">{playerScore}</span>
        </div>
        <div className={`flex items-center gap-2 rounded-xl px-5 py-2.5 border ${
          !won
            ? 'bg-slate-200 border-slate-400 ring-2 ring-slate-300 dark:bg-slate-700/80 dark:border-slate-500'
            : 'bg-slate-100 border-slate-200 dark:bg-slate-800/50 dark:border-slate-800'
        }`}>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-100 dark:to-gray-300" />
          <span className="text-slate-700 dark:text-slate-200">{computerScore}</span>
        </div>
      </div>
    </GameResultCard>
  );
}
