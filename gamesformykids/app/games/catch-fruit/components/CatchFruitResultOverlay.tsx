'use client';

interface Props {
  score: number;
  best: number;
  lives: number;
  onRestart: () => void;
}

export default function CatchFruitResultOverlay({ score, best, lives, onRestart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/50">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
        <div className="text-5xl mb-2">{lives === 0 ? '💔' : '🎉'}</div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">{lives === 0 ? 'נגמרו החיים!' : 'הזמן נגמר!'}</h2>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-purple-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-purple-600">{score}</p>
            <p className="text-xs text-purple-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-500 to-indigo-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🔄 שוב!
        </button>
      </div>
    </div>
  );
}
