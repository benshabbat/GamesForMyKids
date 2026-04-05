'use client';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function ColorTapGameOverScreen({ score, best, onRestart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">😢</div>
        <h2 className="text-2xl font-black text-gray-700 mb-4">נגמרו החיים!</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-pink-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-pink-600">{score}</p>
            <p className="text-xs text-pink-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🔄 שוב!
        </button>
      </div>
    </div>
  );
}
