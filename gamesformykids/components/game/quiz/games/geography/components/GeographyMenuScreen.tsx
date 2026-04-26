'use client';

import { type QuestionMode, MODES } from '../data/countries';

interface Props {
  onStart: (mode: QuestionMode) => void;
}

export default function GeographyMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🌍</div>
          <h1 className="text-3xl font-bold text-teal-800 mb-2">גאוגרפיה</h1>
          <p className="text-teal-600">בחר סוג שאלות</p>
        </div>
        <div className="flex flex-col gap-4">
          {MODES.map(m => (
            <button key={m.mode} onClick={() => onStart(m.mode)}
              className="p-5 rounded-2xl text-white shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-l from-teal-500 to-cyan-600 text-right flex items-center gap-4">
              <span className="text-4xl">{m.emoji}</span>
              <div>
                <div className="text-xl font-bold">{m.label}</div>
                <div className="text-sm opacity-80">{m.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
