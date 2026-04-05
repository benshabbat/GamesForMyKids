'use client';

interface Props {
  score: number;
  lives: number;
  onRestart: () => void;
}

export default function WordScrambleResultScreen({ score, lives, onRestart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">{score >= 100 ? '🏆' : score >= 60 ? '🎉' : '😊'}</div>
        <h2 className="text-2xl font-black text-gray-700 mb-4">
          {score >= 100 ? 'מדהים!' : score >= 60 ? 'כל הכבוד!' : 'ניסיון טוב!'}
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-green-600">{score}</p>
            <p className="text-xs text-green-400">ניקוד</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-red-500">{3 - lives}</p>
            <p className="text-xs text-red-400">טעויות</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🔄 שחק שוב
        </button>
      </div>
    </div>
  );
}
