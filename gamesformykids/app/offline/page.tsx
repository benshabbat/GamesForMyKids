'use client';

export default function OfflinePage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-sm w-full">
        <div className="text-6xl mb-4">📵</div>
        <h1 className="text-2xl font-black text-gray-800 mb-3">אין חיבור לאינטרנט</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          נראה שאתה לא מחובר לרשת.<br />
          המשחקים שביקרת בהם עדיין זמינים!<br />
          בדוק את החיבור ונסה שוב.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg hover:opacity-90 active:scale-95 transition-all"
        >
          🔄 נסה שוב
        </button>
      </div>
    </div>
  );
}
