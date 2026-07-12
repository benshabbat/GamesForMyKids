'use client';

import { useVocabularyOfTheDay } from '@/hooks/shared/marketing/useVocabularyOfTheDay';

export default function VocabularyOfTheDay() {
  const { word, visible, dismiss } = useVocabularyOfTheDay();

  if (!word || !visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={dismiss}
      className="fixed top-20 inset-x-4 z-50 mx-auto max-w-sm cursor-pointer"
    >
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 dark:border-purple-700 px-6 py-4 text-center animate-fade-in-up">
        <p className="text-xs text-purple-500 dark:text-purple-400 font-medium mb-1">המילה של היום</p>
        <p className="text-5xl mb-2">{word.emoji}</p>
        <p className="text-2xl font-bold text-purple-800 dark:text-purple-300">{word.hebrew}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">לחץ לסגירה</p>
      </div>
    </div>
  );
}
