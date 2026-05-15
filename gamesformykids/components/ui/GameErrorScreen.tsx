'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface Props {
  error?: Error & { digest?: string };
  reset: () => void;
  emoji?: string;
  title?: string;
  description?: string;
  gradientClass?: string;
  cardClass?: string;
  homeHref?: string;
  resetLabel?: string;
}

export default function GameErrorScreen({
  error,
  reset,
  emoji = '😕',
  title = 'אופס! משהו השתבש',
  description = 'נסה שוב או חזור לדף הבית',
  gradientClass = 'from-red-50 via-orange-50 to-yellow-50',
  cardClass = 'bg-white/80 rounded-3xl shadow-xl max-w-md mx-4',
  homeHref,
  resetLabel = 'נסה שוב',
}: Props) {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${gradientClass}`} dir="rtl">
      <div className={`text-center p-8 ${cardClass} space-y-4`}>
        <div className="text-7xl">{emoji}</div>
        <h1 className="text-2xl font-bold text-red-700">{title}</h1>
        {description && <p className="text-gray-600">{description}</p>}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-purple-500 text-white font-bold rounded-2xl hover:bg-purple-600 transition-colors"
          >
            {resetLabel}
          </button>
          {homeHref && (
            <Link
              href={homeHref}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
            >
              דף הבית
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
