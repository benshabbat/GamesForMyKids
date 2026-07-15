import Link from 'next/link';
import { DRAG_LEVELS } from '../dragSortData';

export function DragSortMenuScreen({ onStart }: { onStart: (i: number) => void }) {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-3">🗂️</div>
        <h1 className="text-3xl font-black text-purple-800 mb-1">מיון גרירה</h1>
        <p className="text-gray-500 text-sm mb-6">גרור כל פריט לקטגוריה הנכונה!</p>
        <div className="flex flex-col gap-3">
          {DRAG_LEVELS.map((level, i) => (
            <button
              key={level.id}
              onClick={() => onStart(i)}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95"
            >
              {i + 1}. {level.title}
            </button>
          ))}
        </div>
        <Link href="/" className="mt-5 inline-block text-sm text-gray-400 hover:text-gray-600">
          ← חזרה לבית
        </Link>
      </div>
    </div>
  );
}
