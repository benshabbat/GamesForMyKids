'use client';

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
  onMenu: () => void;
}

export default function GeographyResultScreen({ score, total, onRestart, onMenu }: Props) {
  const pct = Math.round((score / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">🌍</div>
        <h1 className="text-2xl font-bold mb-4">כל הכבוד!</h1>
        <div className="bg-teal-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-teal-700">{score} / {total}</p>
          <div className="mt-2 h-3 bg-teal-100 rounded-full">
            <div className="h-full bg-teal-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-teal-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-teal-500 to-cyan-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={onMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">🌍 קטגוריות</button>
        </div>
      </div>
    </div>
  );
}
