'use client';

interface Props {
  best: number;
  onStart: () => void;
}

export default function MeteorMenuOverlay({ best, onStart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
        <div className="text-5xl mb-2">☄️</div>
        <h1 className="text-2xl font-black text-slate-700 mb-1">התחמק ממטאורים</h1>
        <p className="text-gray-500 text-sm mb-5">
          הזז את הספינה 🚀 והימנע ממטאורים<br />
          אסוף כוכבים ⭐ לנקודות בונוס!
        </p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {best}</p>}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-l from-violet-600 to-purple-700 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🚀 התחל!
        </button>
      </div>
    </div>
  );
}
