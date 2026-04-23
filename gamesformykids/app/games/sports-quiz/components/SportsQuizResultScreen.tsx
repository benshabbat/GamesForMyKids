'use client';

interface Props {
  correctCount: number;
  total: number;
  score: number;
  onRestart: () => void;
}

export default function SportsQuizResultScreen({ correctCount, total, score, onRestart }: Props) {
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const medal = pct >= 90 ? '🥇' : pct >= 70 ? '🥈' : pct >= 50 ? '🥉' : '💪';
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-4">{medal}</div>
        <h2 className="text-2xl font-bold text-green-700 mb-2">מצוין!</h2>
        <p className="text-gray-600 mb-4">ענית נכון על {correctCount} מתוך {total} שאלות</p>
        <div className="text-5xl font-bold text-green-600 mb-6">{score} נקודות</div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-3 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all">שחק שוב</button>
        </div>
      </div>
    </div>
  );
}
