'use client';
import type { TransportType } from '../data/transport';

interface Props {
  score: number;
  total: number;
  transportType: TransportType;
  onRestart: (type: TransportType) => void;
}

export default function TransportResultScreen({ score, total, transportType, onRestart }: Props) {
  const pct = Math.round((score / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="text-8xl mb-4">🏆</div>
      <h2 className="text-3xl font-bold text-blue-700 mb-4">כל הכבוד!</h2>
      <p className="text-xl text-gray-700 mb-2">ענית נכון על <span className="font-bold text-blue-600">{score}</span> מתוך {total}</p>
      <p className="text-lg text-gray-500 mb-8">{pct}% הצלחה</p>
      <div className="flex gap-4">
        <button onClick={() => onRestart(transportType)} className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold shadow active:scale-95">שחק שוב</button>
      </div>
    </div>
  );
}
