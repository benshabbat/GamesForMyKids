'use client';

import { PitchBackground } from './SoccerShared';

interface Props {
  score: number;
  total: number;
  category: string;
  onRestart: (category: string) => void;
  onMenu: () => void;
}

export default function SoccerResultScreen({ score, total, category, onRestart, onMenu }: Props) {
  const pct = Math.round((score / total) * 100);
  const trophy = pct === 100 ? '🏆' : pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '⚽';
  const msg = pct === 100 ? 'שחקן על!' : pct >= 80 ? 'מצוין!' : pct >= 60 ? 'כל הכבוד!' : 'אפשר טוב יותר!';

  return (
    <PitchBackground>
      <div className="flex flex-col items-center justify-center min-h-screen p-6" dir="rtl">
        <div className="text-9xl mb-4">{trophy}</div>
        <h2 className="text-4xl font-black text-white mb-3">{msg}</h2>
        <div className="bg-white bg-opacity-20 rounded-2xl px-8 py-5 mb-8 text-center">
          <p className="text-2xl text-white font-bold">{score} / {total}</p>
          <p className="text-green-200 text-lg">{pct}% הצלחה</p>
        </div>
        <div className="w-full max-w-xs bg-white bg-opacity-20 rounded-full h-4 mb-8">
          <div className="h-4 rounded-full bg-yellow-400 transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex gap-4">
          <button onClick={() => onRestart(category)}
            className="px-6 py-3 bg-yellow-400 text-green-900 rounded-xl font-black shadow-lg active:scale-95">
            שחק שוב ⚽
          </button>
          <button onClick={onMenu}
            className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-xl font-bold shadow active:scale-95">
            תפריט
          </button>
        </div>
      </div>
    </PitchBackground>
  );
}
