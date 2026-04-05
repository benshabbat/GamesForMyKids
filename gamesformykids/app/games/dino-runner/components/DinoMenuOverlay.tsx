'use client';

interface Props {
  best: number;
  onStart: () => void;
}

export default function DinoMenuOverlay({ best, onStart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/35">
      <div className="bg-white rounded-3xl p-6 text-center shadow-2xl w-64">
        <div className="text-5xl mb-2">🦖</div>
        <h1 className="text-2xl font-black text-amber-700 mb-1">דינוזאור קופץ</h1>
        <p className="text-gray-500 text-sm mb-4">הקש כדי לקפוץ מעל המכשולים!</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {best}</p>}
        <button
          onClick={onStart}
          className="w-full py-3 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🚀 התחל!
        </button>
      </div>
    </div>
  );
}
