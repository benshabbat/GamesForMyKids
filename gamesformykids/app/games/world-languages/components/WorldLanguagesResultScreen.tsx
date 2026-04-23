'use client';

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function WorldLanguagesResultScreen({ score, total, onRestart }: Props) {
  const correct = Math.round(score / 10);
  const pct = Math.round((correct / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">{pct >= 80 ? '🏆' : pct >= 50 ? '🌐' : '💪'}</div>
        <h1 className="text-2xl font-bold mb-4">שפות העולם — סיום!</h1>
        <div className="bg-emerald-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-emerald-700">{correct} / {total}</p>
          <div className="mt-2 h-3 bg-emerald-100 rounded-full">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-emerald-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-emerald-500 to-green-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
        </div>
      </div>
    </div>
  );
}
