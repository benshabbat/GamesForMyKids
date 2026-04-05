'use client';

interface Props {
  best: number;
  onStart: () => void;
}

export default function SimonMenuScreen({ best, onStart }: Props) {
  return (
    <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-xs w-full">
      <div className="text-6xl mb-4">🔴</div>
      <h1 className="text-3xl font-black text-gray-700 mb-2">שיימון אומר</h1>
      <p className="text-gray-500 text-sm mb-2">צפה בסדר הצבעים וחזור עליהם בדיוק!</p>
      <p className="text-gray-400 text-xs mb-5">כל סיבוב — עוד צבע אחד</p>
      {best > 0 && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best} צבעים</p>}
      <button
        onClick={onStart}
        className="w-full py-4 rounded-2xl bg-gray-800 text-white font-black text-xl hover:bg-gray-700 active:scale-95 transition-all"
      >
        🔴 התחל!
      </button>
    </div>
  );
}
