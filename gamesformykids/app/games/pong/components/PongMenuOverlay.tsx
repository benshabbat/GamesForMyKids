'use client';

interface Props {
  winScore: number;
  onStart: () => void;
}

export default function PongMenuOverlay({ winScore, onStart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
        <div className="text-5xl mb-2">🏓</div>
        <h1 className="text-3xl font-black text-slate-700 mb-1">פונג</h1>
        <p className="text-gray-500 text-sm mb-5">
          הזז את המחבט הירוק<br />
          הגע ל-{winScore} נקודות לפני המחשב!
        </p>
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-l from-slate-600 to-slate-800 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🚀 התחל!
        </button>
      </div>
    </div>
  );
}
