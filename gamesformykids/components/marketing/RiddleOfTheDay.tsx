'use client';

import { useState, useCallback } from 'react';
import { RIDDLES } from '@/lib/quiz/data/riddles';
import { speakHebrew } from '@/lib/utils/speech/speaker';

function getTodayRiddle() {
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  return RIDDLES[dayIndex % RIDDLES.length] ?? RIDDLES[0]!;
}

export default function RiddleOfTheDay() {
  const riddle = getTodayRiddle();
  const [revealed, setRevealed] = useState(false);

  const reveal = useCallback(() => {
    setRevealed(true);
    speakHebrew(riddle.answer);
  }, [riddle.answer]);

  function shareWhatsApp() {
    const text = `🤔 חידה של היום!\n${riddle.riddle}\n👉 התשובה: ${riddle.answer}\nעוד חידות: https://gamesformykids.co.il/games/riddles`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div dir="rtl" className="mx-4 mt-3 rounded-2xl bg-linear-to-l from-violet-500 to-purple-600 text-white shadow-lg overflow-hidden">
      <div className="px-4 py-3">
        <p className="text-xs opacity-80 font-bold mb-2">🤔 חידה של היום</p>
        <div className="flex items-start gap-3">
          <span className="text-4xl shrink-0 leading-none mt-0.5">{riddle.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-snug">{riddle.riddle}</p>

            {revealed ? (
              <div className="mt-2 animate-fade-in-up">
                <p className="text-sm font-semibold bg-white/20 rounded-xl px-3 py-2 leading-snug">
                  ✅ {riddle.answer}
                </p>
                <button
                  onClick={shareWhatsApp}
                  className="mt-2 flex items-center gap-1.5 bg-green-500 hover:bg-green-600 active:scale-95 transition-transform text-white text-xs font-bold px-3 py-1.5 rounded-xl"
                >
                  <span>📲</span>
                  <span>שתף בוואצאפ</span>
                </button>
              </div>
            ) : (
              <button
                onClick={reveal}
                className="mt-2 shrink-0 bg-white text-purple-600 font-bold text-sm px-4 py-1.5 rounded-xl hover:bg-purple-50 active:scale-95 transition-transform"
              >
                גלה תשובה 👇
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
