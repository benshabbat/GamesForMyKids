'use client';

interface Props {
  level: number;
  correct: number;
  totalQuestions: number;
  score: number;
  onRestart: (level: number) => void;
  onMenu: () => void;
}

export default function MultiplicationResultScreen({ level, correct, totalQuestions, score, onRestart, onMenu }: Props) {
  const pct = Math.round((correct / totalQuestions) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3">✖️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">לוח {level} — סיום!</h1>
        <div className="bg-purple-50 rounded-2xl p-5 mb-5 mt-4">
          <p className="text-4xl font-black text-purple-700">{correct} / {totalQuestions}</p>
          <p className="text-purple-500 text-sm">תשובות נכונות</p>
          <p className="text-xl font-bold text-purple-600 mt-2">🏆 {score} נקודות</p>
          <div className="mt-2 h-3 bg-purple-100 rounded-full">
            <div className="h-full bg-purple-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onRestart(level)} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-purple-500 to-violet-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={onMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">📋 לוחות</button>
        </div>
      </div>
    </div>
  );
}
