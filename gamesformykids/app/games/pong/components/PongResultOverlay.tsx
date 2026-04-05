'use client';

interface Props {
  playerWon: boolean;
  playerScore: number;
  aiScore: number;
  onRestart: () => void;
}

export default function PongResultOverlay({ playerWon, playerScore, aiScore, onRestart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
        <div className="text-5xl mb-2">{playerWon ? '🏆' : '😢'}</div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">{playerWon ? 'ניצחת!' : 'המחשב ניצח!'}</h2>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-green-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-green-500">{playerScore}</p>
            <p className="text-xs text-green-400">אתה</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-red-400">{aiScore}</p>
            <p className="text-xs text-red-400">מחשב</p>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl bg-gradient-to-l from-slate-600 to-slate-800 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🔄 שוב!
        </button>
      </div>
    </div>
  );
}
