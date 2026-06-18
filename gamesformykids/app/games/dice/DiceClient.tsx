'use client';

import { useState, useCallback } from 'react';
import { speakHebrew } from '@/lib/utils/speech/speaker';

type DiceType = 'numbers' | 'letters' | 'colors' | 'animals';

const DICE_TYPES: Record<DiceType, { faces: string[]; label: string; emoji: string; tts: string[] }> = {
  numbers: {
    faces: ['1', '2', '3', '4', '5', '6'],
    label: 'מספרים',
    emoji: '🔢',
    tts: ['אחד', 'שניים', 'שלוש', 'ארבע', 'חמש', 'שש'],
  },
  letters: {
    faces: ['א', 'ב', 'ג', 'ד', 'ה', 'ו'],
    label: 'אותיות',
    emoji: '🔤',
    tts: ['אָלֶף', 'בֵּית', 'גִּימֶל', 'דָּלֶת', 'הֵא', 'וָאו'],
  },
  colors: {
    faces: ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣'],
    label: 'צבעים',
    emoji: '🎨',
    tts: ['אדום', 'כתום', 'צהוב', 'ירוק', 'כחול', 'סגול'],
  },
  animals: {
    faces: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'],
    label: 'חיות',
    emoji: '🐾',
    tts: ['כלב', 'חתול', 'עכבר', 'אוגר', 'ארנב', 'שועל'],
  },
};

const DICE_KEYS: DiceType[] = ['numbers', 'letters', 'colors', 'animals'];

function getRandom(n: number) {
  return Math.floor(Math.random() * n);
}

export default function DiceClient() {
  const [activeType, setActiveType] = useState<DiceType>('numbers');
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);

    setTimeout(() => {
      const dice = DICE_TYPES[activeType];
      const newResults = Array.from({ length: count }, () => getRandom(dice.faces.length));
      setResults(newResults);
      setRolling(false);

      const ttsText = newResults
        .map((i) => `קיבלת: ${dice.tts[i]}`)
        .join('. ');
      speakHebrew(ttsText);
    }, 600);
  }, [rolling, activeType, count]);

  const dice = DICE_TYPES[activeType];
  const sum = activeType === 'numbers'
    ? results.reduce((acc, i) => acc + (i + 1), 0)
    : null;

  return (
    <div
      className="min-h-screen flex flex-col items-center py-8 px-4 gap-6"
      style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
      dir="rtl"
    >
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">🎲 קוביה דיגיטלית</h1>
        <p className="text-pink-100 mt-1 text-sm">בחר סוג קוביה וזרוק!</p>
      </div>

      {/* Dice type tabs */}
      <div className="flex gap-2 flex-wrap justify-center">
        {DICE_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => { setActiveType(key); setResults([]); }}
            className={`px-4 py-2 rounded-2xl font-bold text-sm transition-[transform,background-color] active:scale-95 ${
              activeType === key
                ? 'bg-white text-pink-600 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {DICE_TYPES[key].emoji} {DICE_TYPES[key].label}
          </button>
        ))}
      </div>

      {/* Number of dice selector */}
      <div className="flex items-center gap-4 bg-white/20 rounded-2xl px-6 py-3">
        <span className="text-white font-bold">מספר קוביות:</span>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => { setCount(n); setResults([]); }}
            className={`w-10 h-10 rounded-xl font-black text-lg transition-[transform,background-color] active:scale-95 ${
              count === n ? 'bg-white text-pink-600 shadow-md' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Dice faces */}
      <div className="flex gap-4 flex-wrap justify-center min-h-28 items-center">
        {results.length === 0 ? (
          <div className="text-white/60 text-6xl">🎲</div>
        ) : (
          results.map((idx, pos) => (
            <div
              key={pos}
              className={`w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-5xl font-black text-gray-800 transition-transform duration-500 ${
                rolling ? 'motion-safe:animate-spin' : 'motion-safe:animate-bounce'
              }`}
              style={{ animationDuration: rolling ? '0.2s' : '0.6s', animationIterationCount: rolling ? 'infinite' : '1' }}
            >
              {dice.faces[idx]}
            </div>
          ))
        )}
      </div>

      {/* Sum for number dice */}
      {sum !== null && results.length > 1 && (
        <div className="bg-white/20 rounded-2xl px-6 py-3 text-white text-center">
          <span className="font-bold">סה״כ: </span>
          <span className="text-2xl font-black">{sum}</span>
        </div>
      )}

      {/* Roll button */}
      <button
        onClick={roll}
        disabled={rolling}
        className="mt-2 px-10 py-5 rounded-3xl bg-white text-pink-600 font-black text-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
      >
        {rolling ? '🎲 ...' : '🎲 זרוק!'}
      </button>

      <p className="text-white/60 text-xs text-center">לחץ על הכפתור או הקש כדי לזרוק</p>
    </div>
  );
}
