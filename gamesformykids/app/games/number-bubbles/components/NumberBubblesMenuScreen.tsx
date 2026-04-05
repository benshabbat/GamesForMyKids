'use client';

interface Best {
  level: number;
  time: number;
}

interface Props {
  best: Best | null;
  onStart: () => void;
}

export default function NumberBubblesMenuScreen({ best, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">🔢</div>
        <h1 className="text-3xl font-black text-gray-700 mb-2">בועות מספרים</h1>
        <p className="text-gray-500 text-sm mb-2">פוצץ את הבועות לפי הסדר: 1, 2, 3...</p>
        <p className="text-gray-400 text-xs mb-6">כל רמה יש יותר מספרים!</p>
        {best && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: רמה {best.level} ב-{best.time}s</p>}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🔢 התחל!
        </button>
      </div>
    </div>
  );
}
