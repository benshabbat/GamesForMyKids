'use client';
interface Props { score: number; total: number; onRestart: () => void; }

export default function WordClickerResult({ score, total, onRestart }: Props) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const stars = pct >= 90 ? '⭐⭐⭐' : pct >= 60 ? '⭐⭐' : '⭐';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-fuchsia-100 p-6" dir="rtl">
      <div className="text-7xl mb-4">{pct >= 80 ? '🎉' : '💪'}</div>
      <h2 className="text-3xl font-black text-pink-800 mb-2">כל הכבוד!</h2>
      <p className="text-6xl mb-2">{stars}</p>
      <p className="text-pink-700 text-xl font-bold mb-6">{score} מתוך {total} מילים נכונות</p>
      <button
        onClick={onRestart}
        className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-xl px-10 py-4 rounded-2xl shadow-lg transition-all"
      >
        שחק שוב! 🔄
      </button>
    </div>
  );
}
