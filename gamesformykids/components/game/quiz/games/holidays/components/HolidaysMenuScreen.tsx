'use client';

interface Holiday {
  id: string;
  name: string;
  emoji: string;
  color: string;
  when: string;
}

interface Props {
  holidays: Holiday[];
  score: number;
  maxScore: number;
  onStart: (index: number) => void;
}

export default function HolidaysMenuScreen({ holidays, score, maxScore, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🕍</div>
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">חגי ישראל</h1>
          <p className="text-indigo-600">למד על החגים ומשמעותם</p>
          {score > 0 && <p className="mt-2 text-sm text-indigo-500">⭐ {score} / {maxScore} נקודות</p>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {holidays.map((h, i) => (
            <button key={h.id} onClick={() => onStart(i)}
              className={`p-4 rounded-2xl text-center shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 bg-gradient-to-br ${h.color} text-white`}>
              <div className="text-4xl mb-2">{h.emoji}</div>
              <div className="font-bold text-sm">{h.name}</div>
              <div className="text-xs opacity-80 mt-0.5">{h.when}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
