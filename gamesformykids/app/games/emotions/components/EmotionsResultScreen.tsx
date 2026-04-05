'use client';

interface Props {
  correctCount: number;
  total: number;
  score: number;
  onRestart: () => void;
  onMenu: () => void;
}

export default function EmotionsResultScreen({ correctCount, total, score, onRestart, onMenu }: Props) {
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const emoji = pct >= 90 ? '🥰' : pct >= 70 ? '😊' : pct >= 50 ? '😌' : '🤩';
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold text-orange-700 mb-2">אמפט מעולה!</h2>
        <p className="text-gray-600 mb-4">זיהית {correctCount} מתוך {total} רגשות</p>
        <div className="text-5xl font-bold text-orange-600 mb-6">{score} נקודות</div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-3 rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all">שחק שוב</button>
          <button onClick={onMenu} className="flex-1 py-3 rounded-2xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-all">תפריט</button>
        </div>
      </div>
    </div>
  );
}
