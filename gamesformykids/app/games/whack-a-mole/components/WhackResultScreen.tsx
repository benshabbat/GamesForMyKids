'use client';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
  onGoMenu: () => void;
}

export default function WhackResultScreen({ score, best, onRestart, onGoMenu }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-3">🔨</div>
        <h2 className="text-3xl font-black text-gray-800 mb-5">הזמן נגמר!</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-amber-50 rounded-2xl p-4">
            <p className="text-4xl font-black text-amber-600">{score}</p>
            <p className="text-xs text-amber-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-4">
            <p className="text-4xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            🔄 שוב
          </button>
          <button
            onClick={onGoMenu}
            className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
          >
            🏠 תפריט
          </button>
        </div>
      </div>
    </div>
  );
}
