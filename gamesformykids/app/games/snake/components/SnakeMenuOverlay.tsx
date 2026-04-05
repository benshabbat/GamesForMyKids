'use client';

interface Props {
  best: number;
  onStart: () => void;
}

export default function SnakeMenuOverlay({ best, onStart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-64">
        <div className="text-6xl mb-2">🐍</div>
        <h1 className="text-3xl font-black text-green-700 mb-1">נחש</h1>
        <p className="text-gray-500 text-sm mb-5">אסוף פירות וגדל!<br />הימנע מהקירות ומעצמך</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {best}</p>}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-l from-green-500 to-emerald-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🚀 התחל!
        </button>
      </div>
    </div>
  );
}
