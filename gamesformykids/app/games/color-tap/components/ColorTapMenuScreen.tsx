'use client';

interface Props {
  best: number;
  onStart: () => void;
}

export default function ColorTapMenuScreen({ best, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">🎨</div>
        <h1 className="text-3xl font-black text-gray-700 mb-2">צבע נכון</h1>
        <p className="text-gray-500 mb-2 text-sm">בחר את הצבע הנכון לפני שהזמן נגמר!</p>
        <p className="text-gray-400 mb-6 text-xs">3 חיים · 5 שניות לכל שאלה</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best}</p>}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🎨 התחל!
        </button>
      </div>
    </div>
  );
}
