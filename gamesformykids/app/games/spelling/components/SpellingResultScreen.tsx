'use client';

interface Props {
  correctCount: number;
  total: number;
  onRestart: () => void;
}

export default function SpellingResultScreen({ correctCount, total, onRestart }: Props) {
  const pct = Math.round((correctCount / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">{pct >= 80 ? '🏆' : pct >= 50 ? '📝' : '💪'}</div>
        <h1 className="text-2xl font-bold mb-4">כתיב עברי — סיום!</h1>
        <div className="bg-rose-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-rose-700">{correctCount} / {total}</p>
          <div className="mt-2 h-3 bg-rose-100 rounded-full">
            <div className="h-full bg-rose-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-rose-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-rose-500 to-pink-500 hover:opacity-90 active:scale-95 transition-all"
          >
            🔄 שוב
          </button>
        </div>
      </div>
    </div>
  );
}
