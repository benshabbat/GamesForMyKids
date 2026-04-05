'use client';

interface Props {
  best: number;
  gameTime: number;
  onStart: () => void;
}

export default function MathRaceMenuScreen({ best, gameTime, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">🏎️</div>
        <h1 className="text-3xl font-black text-gray-700 mb-2">מרוץ מתמטיקה</h1>
        <p className="text-gray-500 text-sm mb-2">פתור כמה שיותר תרגילים ב-{gameTime} שניות!</p>
        <p className="text-gray-400 text-xs mb-6">רצף 3+ = 20 נקודות · הקושי עולה עם הניקוד</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best}</p>}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🏎️ התחל!
        </button>
      </div>
    </div>
  );
}
