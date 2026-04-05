'use client';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function DinoGameOverOverlay({ score, best, onRestart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/40">
      <div className="bg-white rounded-3xl p-6 text-center shadow-2xl w-64">
        <div className="text-5xl mb-2">😵</div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">אוי!</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-amber-50 rounded-2xl p-3">
            <p className="text-2xl font-black text-amber-600">{score}</p>
            <p className="text-xs text-amber-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-2xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-3 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🔄 שוב!
        </button>
      </div>
    </div>
  );
}
