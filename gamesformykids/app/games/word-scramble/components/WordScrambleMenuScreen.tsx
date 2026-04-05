'use client';

interface Props {
  onStart: () => void;
}

export default function WordScrambleMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">🔡</div>
        <h1 className="text-3xl font-black text-gray-700 mb-2">מילים מבולבלות</h1>
        <p className="text-gray-500 text-sm mb-6">לחצו על האותיות בסדר הנכון כדי לכתוב את המילה!</p>
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🔡 התחל!
        </button>
      </div>
    </div>
  );
}
