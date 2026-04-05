'use client';

interface Props {
  onStart: () => void;
}

export default function InstrumentsMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">🎵</div>
        <h1 className="text-3xl font-bold text-amber-700 mb-2">כלי נגינה</h1>
        <p className="text-gray-500 mb-6">זהה את כלי הנגינה לפי התיאור שלו!</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[['🎸 מיתרים', 'bg-amber-50'], ['🎺 נשיפה', 'bg-blue-50'], ['🥁 הקשה', 'bg-red-50'], ['🎹 מקלדת', 'bg-purple-50']].map(([label, bg]) => (
            <div key={label} className={`${bg} rounded-xl p-3 text-center font-semibold text-sm`}>{label}</div>
          ))}
        </div>
        <button onClick={onStart} className="w-full py-4 rounded-2xl bg-amber-500 text-white text-xl font-bold hover:bg-amber-600 transition-all shadow-lg">
          התחל לשחק! 🎵
        </button>
      </div>
    </div>
  );
}
