'use client';

interface Props {
  correctCount: number;
  total: number;
  score: number;
  onRestart: () => void;
}

export default function NatureResultScreen({ correctCount, total, score, onRestart }: Props) {
  const pct = (correctCount / total) * 100;
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌿' : pct >= 50 ? '🌱' : '💪';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-7xl mb-4">{emoji}</div>
        <h2 className="text-3xl font-bold text-green-700 mb-2">חוקר טבע מצוין!</h2>
        <p className="text-gray-500 mb-6">סיימת את המשחק</p>
        <div className="bg-green-50 rounded-2xl p-5 mb-6">
          <p className="text-5xl font-bold text-green-600">{score}</p>
          <p className="text-gray-500 text-sm">נקודות</p>
          <p className="text-gray-600 mt-2">{correctCount} / {total} תשובות נכונות</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-3 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all">
            שחק שוב
          </button>
        </div>
      </div>
    </div>
  );
}
