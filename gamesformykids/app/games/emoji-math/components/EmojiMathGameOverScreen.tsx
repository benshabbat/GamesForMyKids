'use client';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function EmojiMathGameOverScreen({ score, best, onRestart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">🤓</div>
        <h2 className="text-2xl font-black text-gray-700 mb-4">כל הכבוד על המאמץ!</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-orange-600">{score}</p>
            <p className="text-xs text-orange-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🔄 שוב!
        </button>
      </div>
    </div>
  );
}
