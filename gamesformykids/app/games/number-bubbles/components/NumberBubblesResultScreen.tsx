'use client';

interface Props {
  level: number;
  elapsed: number;
  onNextLevel: (level: number) => void;
  onRestart: () => void;
}

export default function NumberBubblesResultScreen({ level, elapsed, onNextLevel, onRestart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-3">🎉</div>
        <h2 className="text-2xl font-black text-gray-700 mb-1">כל הכבוד!</h2>
        <p className="text-gray-500 mb-4">סיימת רמה {level} ב-{elapsed} שניות</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-sky-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-sky-600">{level}</p>
            <p className="text-xs text-sky-400">רמה</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-3">
            <p className="text-3xl font-black text-green-600">{elapsed}s</p>
            <p className="text-xs text-green-400">זמן</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNextLevel(level)}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-lg hover:opacity-90 active:scale-95 transition-all"
          >
            ➡️ רמה {level + 1}
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-4 rounded-2xl bg-gray-200 text-gray-700 font-black text-lg hover:bg-gray-300 active:scale-95 transition-all"
          >
            🔄 מחדש
          </button>
        </div>
      </div>
    </div>
  );
}
