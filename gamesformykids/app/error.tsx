'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50" dir="rtl">
      <div className="text-center p-8 bg-white/80 rounded-3xl shadow-xl max-w-md mx-4 space-y-4">
        <div className="text-7xl">😕</div>
        <h1 className="text-2xl font-bold text-red-700">אופס! משהו השתבש</h1>
        <p className="text-gray-600">נסה שוב או חזור לדף הבית</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-purple-500 text-white font-bold rounded-2xl hover:bg-purple-600 transition-colors"
          >
            נסה שוב
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
          >
            דף הבית
          </a>
        </div>
      </div>
    </div>
  );
}
