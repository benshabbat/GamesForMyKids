'use client';

interface Level {
  id: number;
  label: string;
}

interface Props {
  level: Level;
  score: number;
  total: number;
  onRestart: () => void;
  onMenu: () => void;
}

export default function SequencesResultScreen({ level, score, total, onRestart, onMenu }: Props) {
  const correct = Math.round(score / 10);
  const pct = Math.round((correct / total) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '🔢' : '💪';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">{emoji}</div>
        <h1 className="text-2xl font-bold mb-4">{level.label} — סיום!</h1>
        <div className="bg-cyan-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-cyan-700">{correct} / {total}</p>
          <div className="mt-2 h-3 bg-cyan-100 rounded-full">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-cyan-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-cyan-500 to-sky-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={onMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">📋 רמות</button>
        </div>
      </div>
    </div>
  );
}
