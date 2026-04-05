'use client';

interface Props {
  best: number;
  onStart: () => void;
}

export default function FlappyMenuOverlay({ best, onStart }: Props) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-black/35">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
        <div className="text-6xl mb-2">🐦</div>
        <h1 className="text-3xl font-black text-sky-600 mb-1">ציפור מעופפת</h1>
        <p className="text-gray-500 text-sm mb-5">הקש כדי לעוף!<br />עזור לציפור לעבור בין הצינורות</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {best}</p>}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-l from-sky-500 to-blue-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🚀 התחל!
        </button>
      </div>
    </div>
  );
}
