'use client';

import Link from 'next/link';
import { useColoringStore } from '../store/coloringStore';

export function ColoringActions() {
  const clearImage = useColoringStore((s) => s.clearImage);

  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={clearImage}
        className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-full font-bold transition-colors shadow-md"
      >
        🗑️ נקה
      </button>
      <Link
        href="/"
        className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full font-bold transition-colors shadow-md"
      >
        🏠 בית
      </Link>
    </div>
  );
}
