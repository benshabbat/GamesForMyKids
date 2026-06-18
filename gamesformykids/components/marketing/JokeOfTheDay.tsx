'use client';

import { useState, useCallback } from 'react';
import { JOKES } from '@/lib/constants/jokes';
import { speakHebrew } from '@/lib/utils/speech/speaker';

function getTodayJoke() {
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  return JOKES[dayIndex % JOKES.length] ?? JOKES[0]!;
}

export default function JokeOfTheDay() {
  const joke = getTodayJoke();
  const [revealed, setRevealed] = useState(false);

  const reveal = useCallback(() => {
    setRevealed(true);
    speakHebrew(joke.punchline);
  }, [joke.punchline]);

  function shareWhatsApp() {
    const text = `😂 בדיחה של היום!\n${joke.setup}\n👉 ${joke.punchline}\nעוד בדיחות: https://gamesformykids.co.il`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div dir="rtl" className="mx-4 mt-3 rounded-2xl bg-linear-to-l from-yellow-400 to-amber-500 text-white shadow-lg overflow-hidden">
      <div className="px-4 py-3">
        <p className="text-xs opacity-80 font-bold mb-2">😂 בדיחה של היום</p>
        <div className="flex items-start gap-3">
          <span className="text-4xl shrink-0 leading-none mt-0.5">{joke.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-snug">{joke.setup}</p>

            {revealed ? (
              <div className="mt-2 animate-fade-in-up">
                <p className="text-sm font-semibold bg-white/20 rounded-xl px-3 py-2 leading-snug">
                  {joke.punchline}
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
                className="mt-2 shrink-0 bg-white text-amber-600 font-bold text-sm px-4 py-1.5 rounded-xl hover:bg-amber-50 active:scale-95 transition-transform"
              >
                לחץ לתשובה 👇
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
