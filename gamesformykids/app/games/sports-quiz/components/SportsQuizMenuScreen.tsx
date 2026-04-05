'use client';

interface Props {
  onStart: () => void;
}

const SPORT_BADGES = ['⚽ כדורגל', '🏀 כדורסל', '🏊 שחייה', '🎾 טניס', '🏅 אולימפיאדה', '🤸 גימנסטיקה'] as const;

export default function SportsQuizMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">🏆</div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">חידון ספורט</h1>
        <p className="text-gray-500 mb-6">ענה על 10 שאלות על עולם הספורט!</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {SPORT_BADGES.map(s => (
            <div key={s} className="bg-green-50 rounded-xl px-2 py-2 text-xs font-semibold text-green-700 text-center">{s}</div>
          ))}
        </div>
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-green-600 text-white text-xl font-bold hover:bg-green-700 transition-all shadow-lg"
        >
          התחל לשחק! 🏆
        </button>
      </div>
    </div>
  );
}
