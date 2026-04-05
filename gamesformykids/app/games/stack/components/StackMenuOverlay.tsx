'use client';

interface Props {
  best: number;
  onStart: () => void;
}

export default function StackMenuOverlay({ best, onStart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-60">
        <div className="text-5xl mb-3">🏗️</div>
        <h1 className="text-2xl font-black text-gray-700 mb-1">ערם לבנים</h1>
        <p className="text-gray-500 text-sm mb-5">לחץ / הקש בזמן הנכון<br />ועצב מגדל גבוה!</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {best}</p>}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-xl hover:bg-blue-500 active:scale-95 transition-all"
        >
          🏗️ התחל!
        </button>
      </div>
    </div>
  );
}
