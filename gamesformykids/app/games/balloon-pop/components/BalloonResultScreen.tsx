'use client';

interface Props {
  score: number;
  best: number;
  lives: number;
  onRestart: () => void;
}

export default function BalloonResultScreen({ score, best, lives, onRestart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-3">{lives <= 0 ? '💔' : '🎉'}</div>
        <h2 className="text-3xl font-black text-gray-800 mb-5">{lives <= 0 ? 'נגמרו החיים!' : 'הזמן נגמר!'}</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-pink-50 rounded-2xl p-4">
            <p className="text-4xl font-black text-pink-500">{score}</p>
            <p className="text-xs text-pink-400">ניקוד</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-4">
            <p className="text-4xl font-black text-yellow-500">{best}</p>
            <p className="text-xs text-yellow-400">שיא</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-gradient-to-l from-pink-500 to-rose-500 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🔄 שוב!
        </button>
      </div>
    </div>
  );
}
