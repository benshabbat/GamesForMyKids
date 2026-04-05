'use client';

interface Props {
  onStart: () => void;
}

export default function RiddlesMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">🧩</div>
        <h1 className="text-3xl font-bold text-purple-700 mb-2">חידות לילדים</h1>
        <p className="text-gray-500 mb-4">פתור 10 חידות מסקרנות!</p>
        <div className="bg-purple-50 rounded-2xl p-4 mb-6 text-right">
          <p className="text-purple-800 font-semibold text-sm mb-2">דוגמה לחידה:</p>
          <p className="text-gray-700 text-sm italic">&quot;יש לי ידיים אבל לא יכול לאחוז, יש לי פנים אבל אין לי עיניים — מי אני?&quot;</p>
          <p className="text-purple-600 font-bold text-sm mt-1">התשובה: שעון ⏰</p>
        </div>
        <button onClick={onStart} className="w-full py-4 rounded-2xl bg-purple-600 text-white text-xl font-bold hover:bg-purple-700 transition-all shadow-lg">
          התחל לשחק! 🧩
        </button>
      </div>
    </div>
  );
}
