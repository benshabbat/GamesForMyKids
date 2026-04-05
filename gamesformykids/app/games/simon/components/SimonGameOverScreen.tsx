'use client';

interface Props {
  roundScore: number;
  best: number;
  onRestart: () => void;
}

export default function SimonGameOverScreen({ roundScore, best, onRestart }: Props) {
  return (
    <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-xs w-full">
      <div className="text-6xl mb-3">😵</div>
      <h2 className="text-2xl font-black text-gray-700 mb-2">טעית!</h2>
      <p className="text-gray-500 text-sm mb-4">הגעת לרצף של {roundScore} צבעים</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-gray-700">{roundScore}</p>
          <p className="text-xs text-gray-400">סיבובים</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-yellow-500">{best}</p>
          <p className="text-xs text-yellow-400">שיא</p>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="w-full py-4 rounded-2xl bg-gray-800 text-white font-black text-xl hover:bg-gray-700 active:scale-95 transition-all"
      >
        🔄 שוב!
      </button>
    </div>
  );
}
