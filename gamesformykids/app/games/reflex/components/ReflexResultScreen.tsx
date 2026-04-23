'use client';

interface Props {
  score: number;
  missed: number;
  onRestart: () => void;
}

export default function ReflexResultScreen({ score, missed, onRestart }: Props) {
  const accuracy = score + missed > 0 ? Math.round((score / (score + missed)) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">⚡</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-5">הסתיים!</h1>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-yellow-50 rounded-2xl p-4">
            <p className="text-3xl font-black text-yellow-600">{score}</p>
            <p className="text-xs text-yellow-500">לחיצות</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-4">
            <p className="text-3xl font-black text-red-500">{missed}</p>
            <p className="text-xs text-red-400">פספוסים</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4">
            <p className="text-3xl font-black text-blue-600">{accuracy}%</p>
            <p className="text-xs text-blue-400">דיוק</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onRestart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-rose-500 to-red-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
        </div>
      </div>
    </div>
  );
}
