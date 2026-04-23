'use client';

interface Props {
  correctCount: number;
  total: number;
  score: number;
  onRestart: () => void;
}

export default function Shapes3dResultScreen({ correctCount, total, score, onRestart }: Props) {
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '📐' : pct >= 50 ? '🔷' : '💪';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">מתמטיקאי מצוין!</h2>
        <p className="text-gray-600 mb-4">ידעת {correctCount} מתוך {total} תשובות</p>
        <div className="text-5xl font-bold text-indigo-600 mb-6">{score} נקודות</div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all">שחק שוב</button>
        </div>
      </div>
    </div>
  );
}
