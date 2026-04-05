'use client';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function FroggerGameOverOverlay({ score, best, onRestart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/75">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
        <div className="text-5xl mb-2">💀</div>
        <h2 className="text-2xl font-black text-gray-700 mb-3">נגמרו החיים!</h2>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-green-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-green-600">{score}</p>
            <p className="text-xs text-green-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-xl hover:bg-green-600 active:scale-95 transition-all"
        >
          🔄 נסה שוב!
        </button>
      </div>
    </div>
  );
}
