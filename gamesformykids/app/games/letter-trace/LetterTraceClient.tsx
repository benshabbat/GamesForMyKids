'use client';

import { useCallback, useRef } from 'react';
import { useLetterTraceStore } from './letterTraceStore';
import LetterTraceMenu from './components/LetterTraceMenu';
import LetterCanvas from './components/LetterCanvas';
import { speakHebrew } from '@/lib/utils/speech/speaker';

const SUCCESS_THRESHOLD = 0.60;

export default function LetterTraceClient() {
  const { phase, difficulty, letters, currentIndex, score, total, startGame, nextLetter, restart } =
    useLetterTraceStore();
  const resultRef = useRef<number | null>(null);
  const current = letters[currentIndex];

  const handleComplete = useCallback(
    (accuracy: number) => {
      resultRef.current = accuracy;
    },
    [],
  );

  function handleNext() {
    const acc = resultRef.current ?? 0;
    const success = acc >= SUCCESS_THRESHOLD;
    if (current) {
      speakHebrew(current.sound);
    }
    nextLetter(success);
    resultRef.current = null;
  }

  if (phase === 'menu') {
    return <LetterTraceMenu onStart={startGame} />;
  }

  if (phase === 'result') {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-green-100 to-teal-200 p-6"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-extrabold text-green-800 mb-2">כל הכבוד!</h2>
          <p className="text-gray-600 mb-2">סיימת את כל 22 האותיות!</p>
          <div className="text-5xl font-black text-green-600 mb-6">{pct}%</div>
          <div className="text-gray-500 text-sm mb-6">
            {score} מתוך {total} אותיות הצלחת
          </div>
          <button
            onClick={restart}
            className="bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all w-full"
          >
            🔄 שחק שוב
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-purple-100 p-4"
    >
      {/* Progress bar */}
      <div className="w-full max-w-sm mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>אות {currentIndex + 1} מתוך {letters.length}</span>
          <span>✅ {score} הצלחות</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(currentIndex / letters.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-sm w-full text-center">
        {/* Letter header */}
        <div className={`text-8xl font-black bg-linear-to-br ${current.color} bg-clip-text text-transparent mb-1`}>
          {current.char}
        </div>
        <div className="text-base font-semibold text-gray-600 mb-4">{current.name}</div>

        {/* Canvas */}
        <LetterCanvas
          key={`${current.char}-${currentIndex}`}
          letter={current}
          difficulty={difficulty}
          onComplete={handleComplete}
        />

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={handleNext}
            className="flex-1 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-3 rounded-2xl transition-all"
          >
            הבאה ←
          </button>
          <button
            onClick={restart}
            className="px-4 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-600 font-bold py-3 rounded-2xl transition-all"
          >
            🏠
          </button>
        </div>
      </div>
    </div>
  );
}
