'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AnalyticsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50" dir="rtl">
      <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md mx-4 space-y-4">
        <div className="text-7xl">📊</div>
        <h1 className="text-2xl font-bold text-gray-700">לא ניתן לטעון את הנתונים</h1>
        <p className="text-gray-500">אירעה שגיאה בטעינת האנליטיקס</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-700 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors"
        >
          נסה שוב
        </button>
      </div>
    </div>
  );
}
