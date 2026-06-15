'use client';

import { useEffect, useRef } from 'react';
import { speak } from '@/lib/utils/speech/enhancedSpeechUtils';

interface Props {
  chain: string[];
  currentWord: string;
  lastLetter: string;
  choices: string[];
  score: number;
  onSelect: (choice: string) => void;
}

export default function WordChainQuestion({ chain, currentWord, lastLetter, choices, score, onSelect }: Props) {
  const chainEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    speak(currentWord);
    chainEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
  }, [currentWord]);

  const wordWithHighlight = (word: string) => {
    if (word !== currentWord) return <span>{word}</span>;
    const body = word.slice(0, -1);
    const last = word.slice(-1);
    return (
      <span>
        {body}
        <span className="text-amber-400 font-black underline">{last}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-violet-200 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-8 max-w-md w-full">

        {/* Score */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-indigo-500">שרשרת: {score}/10</span>
          <span className="text-2xl">🔗</span>
        </div>

        {/* Chain display — horizontal scroll, RTL */}
        <div className="overflow-x-auto mb-5">
          <div className="flex items-center gap-1 min-w-max flex-row-reverse">
            {chain.map((word, i) => (
              <span key={`${word}-${i}`} className="flex items-center gap-1">
                <span className={`text-sm sm:text-base font-bold px-2 py-1 rounded-xl whitespace-nowrap ${
                  word === currentWord
                    ? 'bg-indigo-100 text-indigo-800 ring-2 ring-indigo-400'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {wordWithHighlight(word)}
                </span>
                {i < chain.length - 1 && <span className="text-gray-400 text-xs">←</span>}
              </span>
            ))}
            <div ref={chainEndRef} />
          </div>
        </div>

        {/* Prompt */}
        <div className="text-center mb-4">
          <p className="text-gray-600 text-base font-medium">
            המילה מסתיימת ב-
            <span className="text-amber-500 font-black text-xl mx-1">{lastLetter}</span>
            — בחר מילה שמתחילה ב-
            <span className="text-indigo-600 font-black text-xl mx-1">{lastLetter}</span>
          </p>
          <button
            onClick={() => speak(currentWord)}
            className="mt-2 text-xs text-indigo-400 underline"
            aria-label="שמע שוב"
          >
            🔊 שמע שוב
          </button>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-2 gap-3">
          {choices.map((word) => (
            <button
              key={word}
              onClick={() => onSelect(word)}
              className="py-4 px-3 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-800 font-bold text-lg hover:bg-indigo-100 hover:border-indigo-400 active:scale-95 transition-[transform,background-color,border-color] text-center"
              aria-label={word}
            >
              <span className="text-amber-500 font-black">{word[0]}</span>
              {word.slice(1)}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
