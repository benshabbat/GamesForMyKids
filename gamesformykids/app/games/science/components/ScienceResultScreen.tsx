'use client';

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function ScienceResultScreen({ score, total, onRestart }: Props) {
  const pct = Math.round((score / total) * 100);
  const medal = pct >= 90 ? '🥇' : pct >= 70 ? '🥈' : pct >= 50 ? '🥉' : '🔬';

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-7xl mb-3 animate-bounce">{medal}</div>
        <h1 className="text-2xl font-bold mb-4">מדען צעיר!</h1>
        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-indigo-700">{score} / {total}</p>
          <div className="mt-2 h-3 bg-indigo-100 rounded-full">
            <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-indigo-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-cyan-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
        </div>
      </div>
    </div>
  );
}
