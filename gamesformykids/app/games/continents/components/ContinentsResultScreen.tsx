'use client';

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
  onMenu: () => void;
}

export default function ContinentsResultScreen({ score, total, onRestart, onMenu }: Props) {
  const pct = Math.round((score / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="text-8xl mb-4">{pct >= 80 ? '🌟' : '🗺️'}</div>
      <h2 className="text-3xl font-bold text-teal-700 mb-4">המסע הסתיים!</h2>
      <p className="text-xl text-gray-700 mb-2">ענית נכון על <span className="font-bold text-teal-600">{score}</span> מתוך {total}</p>
      <p className="text-lg text-gray-500 mb-8">{pct}% הצלחה</p>
      <div className="flex gap-4">
        <button onClick={onRestart} className="px-6 py-3 bg-teal-500 text-white rounded-xl font-bold shadow active:scale-95">שחק שוב</button>
        <button onClick={onMenu} className="px-6 py-3 bg-gray-400 text-white rounded-xl font-bold shadow active:scale-95">תפריט</button>
      </div>
    </div>
  );
}
