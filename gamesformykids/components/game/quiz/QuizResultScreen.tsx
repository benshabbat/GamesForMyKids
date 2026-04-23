'use client';

import { QUIZ_THEMES, type QuizTheme } from './quizTheme';

interface Props {
  correctCount: number;
  total: number;
  score?: number;
  onRestart: () => void;
  title?: string;
  theme: QuizTheme;
}

export function QuizResultScreen({
  correctCount,
  total,
  score,
  onRestart,
  title = 'כל הכבוד!',
  theme,
}: Props) {
  const t = QUIZ_THEMES[theme];
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '👍' : '💪';

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${t.gradient} flex flex-col items-center justify-center p-4`}
      dir="rtl"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-4">{emoji}</div>
        <h2 className={`text-2xl font-bold ${t.text} mb-2`}>{title}</h2>
        <p className="text-gray-600 mb-4">
          ענית נכון על {correctCount} מתוך {total} שאלות
        </p>
        {score !== undefined && (
          <>
            <div className={`text-5xl font-black ${t.text} mb-1`}>{score}</div>
            <p className="text-gray-400 text-sm mb-6">נקודות</p>
          </>
        )}
        <button
          onClick={onRestart}
          className={`w-full py-3 rounded-2xl ${t.button} text-white font-bold text-lg transition-all`}
        >
          שחק שוב
        </button>
      </div>
    </div>
  );
}
