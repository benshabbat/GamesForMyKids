'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GameError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100" dir="rtl">
      <div className="text-center p-8 bg-white/80 rounded-3xl shadow-xl max-w-md mx-4 space-y-4">
        <div className="text-7xl">🎮</div>
        <h1 className="text-2xl font-bold text-purple-700">המשחק נתקע!</h1>
        <p className="text-gray-600">קרתה שגיאה. בואו ננסה שוב!</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-purple-500 text-white font-bold rounded-2xl hover:bg-purple-600 transition-colors"
          >
            נסה שוב
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
          >
            בחר משחק אחר
          </Link>
        </div>
      </div>
    </div>
  );
}
