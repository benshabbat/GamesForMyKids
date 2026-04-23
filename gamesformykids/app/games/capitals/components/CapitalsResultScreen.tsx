'use client';

interface Props {
  correctCount: number;
  total: number;
  score: number;
  onRestart: () => void;
}

export default function CapitalsResultScreen({ correctCount, total, score, onRestart }: Props) {
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const emoji = pct >= 90 ? '🌍' : pct >= 70 ? '🗺️' : pct >= 50 ? '✈️' : '📚';
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold text-red-700 mb-2">סייר מצוין!</h2>
        <p className="text-gray-600 mb-4">ידעת {correctCount} מתוך {total} בירות</p>
        <div className="text-5xl font-bold text-red-600 mb-6">{score} נקודות</div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-3 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all">שחק שוב</button>
        </div>
      </div>
    </div>
  );
}
