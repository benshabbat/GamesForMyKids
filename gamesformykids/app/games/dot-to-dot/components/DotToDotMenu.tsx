'use client';
import { useState } from 'react';
import { DOT_TO_DOT_THEMES, getPicturesByTheme } from '../data/pictures';
import type { DotToDotTheme } from '../types';
import DotToDotPrintButton from './DotToDotPrintButton';

interface Props {
  onSelectPicture: (id: string) => void;
}

export default function DotToDotMenu({ onSelectPicture }: Props) {
  const [theme, setTheme] = useState<DotToDotTheme>('space');
  const pictures = getPicturesByTheme(theme);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center p-6 gap-6" dir="rtl">
      <div className="text-6xl">🔢</div>
      <h1 className="text-4xl font-black text-white text-center">נקודה לנקודה</h1>
      <p className="text-lg text-indigo-200 text-center max-w-xs">
        חברו בין הנקודות לפי הסדר וגלו תמונה מפתיעה!
      </p>

      <div className="flex gap-2">
        {DOT_TO_DOT_THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              theme === t.id
                ? 'bg-yellow-400 text-yellow-900'
                : 'bg-white/10 text-indigo-200 hover:bg-white/20'
            }`}
          >
            {t.emoji} {t.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-lg">
        {pictures.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center gap-2">
            <button onClick={() => onSelectPicture(p.id)} className="flex flex-col items-center gap-2 w-full">
              <span className="text-5xl">{p.emoji}</span>
              <span className="font-bold text-purple-900">{p.title}</span>
              <span className="text-xs text-gray-500">{p.points.length} נקודות</span>
            </button>
            <DotToDotPrintButton picture={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
