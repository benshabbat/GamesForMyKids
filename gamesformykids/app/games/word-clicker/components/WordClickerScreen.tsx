'use client';
import { useEffect } from 'react';
import { useWordClickerStore, type FloatingLetter } from '../wordClickerStore';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export default function WordClickerScreen() {
  const { words, wordIndex, currentLetterIndex, score, total, floatingLetters, feedback, tapLetter } =
    useWordClickerStore();
  const word = words[wordIndex] ?? '';

  useEffect(() => {
    if (feedback === 'correct' && currentLetterIndex === 0 && word) {
      void speakHebrew(word);
    }
  }, [wordIndex, feedback, word, currentLetterIndex]);

  const progress = word.length > 0 ? (currentLetterIndex / word.length) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100 p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Score */}
        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-pink-700 font-bold text-sm">{total + 1}/{words.length}</span>
          <span className="text-pink-800 font-black text-lg">⭐ {score}</span>
        </div>

        {/* Target word */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4 text-center">
          <p className="text-xs text-gray-400 mb-1">בנה את המילה:</p>
          <p className="text-5xl font-black text-pink-700" dir="rtl">{word}</p>

          {/* Progress bar */}
          <div className="mt-3 h-3 bg-pink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-pink-500 rounded-full transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Built letters so far */}
          <div className="flex justify-center gap-1 mt-2 flex-row-reverse">
            {word.split('').map((letter, i) => (
              <span
                key={i}
                className={`text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-lg transition-[background-color,color,border-color] ${
                  i < currentLetterIndex
                    ? 'bg-pink-500 text-white'
                    : i === currentLetterIndex
                    ? 'bg-pink-200 text-pink-400 border-2 border-pink-400'
                    : 'bg-gray-100 text-gray-300'
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Feedback banner */}
        {feedback && (
          <div className={`text-center font-black text-xl mb-3 py-2 rounded-xl ${
            feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700'
          }`}>
            {feedback === 'correct' ? '✅ נכון!' : '💙 נסה שוב!'}
          </div>
        )}

        {/* Floating letter tiles */}
        <div className="grid grid-cols-3 gap-3 mt-2">
          {floatingLetters.map((fl: FloatingLetter) => (
            <button
              key={fl.id}
              onClick={() => tapLetter(fl.id)}
              className={`
                h-16 rounded-2xl text-3xl font-black shadow-md transition-all active:scale-90
                ${fl.shaking ? 'animate-bounce bg-red-200 text-red-600' : ''}
                ${!fl.shaking ? 'bg-white text-pink-700 hover:bg-pink-50 hover:shadow-lg' : ''}
              `}
            >
              {fl.letter}
            </button>
          ))}
        </div>

        <p className="text-center text-pink-400 text-xs mt-4">לחץ על האות הבאה במילה</p>
      </div>
    </div>
  );
}
