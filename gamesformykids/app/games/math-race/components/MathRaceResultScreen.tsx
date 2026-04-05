'use client';

interface Props {
  score: number;
  best: number;
  correct: number;
  total: number;
  accuracy: number;
  onRestart: () => void;
}

export default function MathRaceResultScreen({ score, best, correct, total, accuracy, onRestart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">🏁</div>
        <h2 className="text-2xl font-black text-gray-700 mb-4">הסיום!</h2>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div className="bg-blue-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-blue-600">{score}</p>
            <p className="text-xs text-blue-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-green-600">{correct}/{total}</p>
            <p className="text-xs text-green-400">נכון/סה&quot;כ</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-purple-600">{accuracy}%</p>
            <p className="text-xs text-purple-400">דיוק</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🔄 שוב!
        </button>
      </div>
    </div>
  );
}
