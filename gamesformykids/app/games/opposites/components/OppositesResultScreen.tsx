'use client';

interface Props {
  correctCount: number;
  total: number;
  onRestart: () => void;
}

export default function OppositesResultScreen({ correctCount, total, onRestart }: Props) {
  const pct = Math.round((correctCount / total) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '🙃' : '💪';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">{emoji}</div>
        <h1 className="text-2xl font-bold mb-4">ניגודים — סיום!</h1>
        <div className="bg-orange-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-orange-700">{correctCount} / {total}</p>
          <div className="mt-2 h-3 bg-orange-100 rounded-full">
            <div className="h-full bg-orange-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-orange-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-orange-500 to-red-500 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
        </div>
      </div>
    </div>
  );
}
