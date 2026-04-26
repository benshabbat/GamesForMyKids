'use client';
import type { SequenceLevel } from '@/lib/quiz/data/sequences';

interface Props {
  levels: SequenceLevel[];
  onStart: (level: SequenceLevel) => void;
}

export default function SequencesMenuScreen({ levels, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-100 p-6" dir="rtl">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🔢</div>
          <h1 className="text-3xl font-bold text-cyan-800 mb-2">סדרות מספרים</h1>
          <p className="text-cyan-600">מה המספר הבא בסדרה?</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {levels.map(lv => (
            <button key={lv.id} onClick={() => onStart(lv)}
              className="p-5 rounded-2xl text-white font-bold shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-br from-cyan-500 to-sky-600 text-right">
              <div className="text-2xl font-black mb-1">{lv.emoji} {lv.label}</div>
              <div className="text-sm opacity-80">{lv.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
