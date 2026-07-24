'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useGameScores }  from '../hooks';
import { useGameActions } from '../hooks';

export function MenuScreen() {
  const { playerScore, computerScore } = useGameScores();
  const { startGame }                  = useGameActions();

  return (
    <GameMenuCard
      emoji="🎲"
      title="שש-בש"
      description="המשחק הקלאסי נגד המחשב"
      gradientClass="from-stone-950 via-amber-950 to-stone-950"
      buttonClass="from-amber-300 to-amber-500"
      onStart={startGame}
      startLabel="🎮 התחל משחק"
    >
      {(playerScore > 0 || computerScore > 0) && (
        <div className="flex justify-center gap-3 text-sm font-bold mb-2">
          <div className="flex items-center gap-2 bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800/60 rounded-xl px-4 py-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-rose-400 to-rose-600" />
            <span className="text-rose-700 dark:text-rose-200">{playerScore} ניצחונות</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700/60 rounded-xl px-4 py-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-100 dark:to-gray-300" />
            <span className="text-slate-700 dark:text-slate-200">{computerScore} ניצחונות</span>
          </div>
        </div>
      )}
      <div className="bg-amber-50 dark:bg-black/30 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-4 text-sm w-full space-y-1.5">
        <p className="font-bold text-amber-700 dark:text-amber-300 mb-2.5 text-center text-base">כיצד לשחק</p>
        {([
          ['🔴', 'אתה = אדום · זזים מ-24 ל-1'],
          ['⚪', 'מחשב = לבן · זזים מ-1 ל-24'],
          ['🎲', 'הטל קוביות ובחר אסימון'],
          ['💥', 'נחיתה על יחיד = שולח לבר'],
          ['🏠', 'מגרש הבית שלך: נקודות 1–6'],
          ['✅', 'כשכולם בבית — ניתן לצאת'],
        ] as [string, string][]).map(([icon, text]) => (
          <div key={text} className="flex items-center gap-2 text-gray-600 dark:text-amber-200/75">
            <span className="text-base w-6 text-center">{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </GameMenuCard>
  );
}
