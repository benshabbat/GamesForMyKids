'use client';

import Link from 'next/link';

export function DashboardHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-purple-800 mb-2">📊 לוח הורים</h1>
      <p className="text-gray-600">מעקב אחר ההתקדמות של ילדך</p>
      <Link
        href="/"
        className="inline-block mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors"
      >
        ← חזרה לעמוד הראשי
      </Link>
    </div>
  );
}
