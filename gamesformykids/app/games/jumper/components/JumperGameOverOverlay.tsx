'use client';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function JumperGameOverOverlay({ score, best, onRestart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-64">
        <div className="text-5xl mb-2">😵</div>
        <h2 className="text-2xl font-black text-gray-700 mb-3">נפלת!</h2>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-indigo-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-indigo-600">{score}m</p>
            <p className="text-xs text-indigo-400">גובה</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-yellow-500">{best}m</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-xl hover:bg-indigo-500 active:scale-95 transition-all"
        >
          🔄 שוב!
        </button>
      </div>
    </div>
  );
}
