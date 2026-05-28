'use client';

import { useCallback } from 'react';
import type { PhonicsQuestion } from '@/lib/quiz/data/phonics';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

interface Props {
  current: PhonicsQuestion;
  choices: string[];
  onSelect: (choice: string) => void;
}

export default function PhonicsQuestion({ current, choices, onSelect }: Props) {
  const speak = useCallback(() => {
    speakHebrew(current.sound).catch(() => {});
  }, [current.sound]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-purple-200 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-3">{current.emoji}</div>

        <button
          onClick={speak}
          className="w-full py-5 mb-6 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg hover:opacity-90 active:scale-95 transition-all text-2xl font-black"
          aria-label="לחץ לשמוע את הצליל"
        >
          🔊 שמע את הצליל
        </button>

        <p className="text-gray-600 text-lg font-medium mb-5">איזו אות מוציאה את הצליל הזה?</p>

        <div className="grid grid-cols-2 gap-4">
          {choices.map((letter) => (
            <button
              key={letter}
              onClick={() => onSelect(letter)}
              className="py-6 rounded-2xl bg-violet-50 border-2 border-violet-200 text-violet-800 font-black text-6xl hover:bg-violet-100 hover:border-violet-400 active:scale-95 transition-all"
              style={{ fontFamily: 'serif' }}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
