'use client';

interface Props {
  score: number;
  maxScore: number;
  onRestart: () => void;
}

export default function HolidaysCompleteScreen({ score, maxScore, onRestart }: Props) {
  const pct = Math.round((score / maxScore) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-7xl mb-4 animate-bounce">🏆</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">כל הכבוד!</h1>
        <p className="text-gray-500 mb-4">עברת על כל חגי ישראל!</p>
        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-bold text-indigo-700">{score} / {maxScore}</p>
          <div className="mt-2 h-3 bg-indigo-100 rounded-full">
            <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-indigo-500 text-sm mt-1">{pct}%</p>
        </div>
        <button onClick={onRestart} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-indigo-500 to-purple-500 hover:opacity-90 active:scale-95 transition-all">🔄 שחק שוב</button>
      </div>
    </div>
  );
}
