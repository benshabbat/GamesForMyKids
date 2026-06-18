'use client';

import { FACTS } from '@/lib/constants/facts';
import { speakHebrew } from '@/lib/utils/speech/speaker';

function getTodayFact() {
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  return FACTS[dayIndex % FACTS.length] ?? FACTS[0]!;
}

export default function FactOfTheDay() {
  const fact = getTodayFact();

  function handleTTS() {
    speakHebrew(fact.he);
  }

  function shareWhatsApp() {
    const text = `💡 ידעת? ${fact.emoji}\n${fact.he}\nעוד עובדות מדהימות: https://gamesformykids.co.il`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div dir="rtl" className="mx-4 mt-3 rounded-2xl bg-linear-to-l from-sky-400 to-indigo-500 text-white shadow-lg overflow-hidden">
      <div className="px-4 py-3">
        <p className="text-xs opacity-80 font-bold mb-2">💡 ידעת?</p>
        <div className="flex items-start gap-3">
          <span className="text-4xl shrink-0 leading-none mt-0.5">{fact.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-snug">{fact.he}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleTTS}
                aria-label="האזן לעובדה"
                className="bg-white/20 hover:bg-white/30 active:scale-95 transition-[transform,background-color] text-white text-xs font-bold px-3 py-1.5 rounded-xl"
              >
                🔊 האזן
              </button>
              <button
                onClick={shareWhatsApp}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 active:scale-95 transition-[transform,background-color] text-white text-xs font-bold px-3 py-1.5 rounded-xl"
              >
                <span>📲</span>
                <span>שתף</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
