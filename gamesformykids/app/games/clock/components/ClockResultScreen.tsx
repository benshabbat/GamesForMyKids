'use client';
import ClockFace from './ClockFace';

interface Props {
  correct: number;
  total: number;
  onRestart: () => void;
  onMenu: () => void;
}

export default function ClockResultScreen({ correct, total, onRestart, onMenu }: Props) {
  const pct = Math.round((correct / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-3"><ClockFace hour={12} minute={0} size={100} /></div>
        <h1 className="text-2xl font-bold mb-4">{pct >= 80 ? '🏆 כל הכבוד!' : '💪 תמשיך להתאמן!'}</h1>
        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-indigo-700">{correct} / {total}</p>
          <div className="mt-2 h-3 bg-indigo-100 rounded-full">
            <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-indigo-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-violet-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={onMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">🏠 תפריט</button>
        </div>
      </div>
    </div>
  );
}
