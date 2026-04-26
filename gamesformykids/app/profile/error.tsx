'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProfileError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50" dir="rtl">
      <div className="text-center p-8 bg-white/80 rounded-3xl shadow-xl max-w-md mx-4 space-y-4">
        <div className="text-7xl">👤</div>
        <h1 className="text-2xl font-bold text-blue-700">לא ניתן לטעון את הפרופיל</h1>
        <p className="text-gray-600">בדוק את החיבור לאינטרנט ונסה שוב</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-colors"
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
