'use client';

import type { TraceDifficulty } from '../letterTraceStore';

interface Props {
  onStart: (difficulty: TraceDifficulty) => void;
}

export default function LetterTraceMenu({ onStart }: Props) {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-100 to-purple-200 p-6"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-4">✏️</div>
        <h1 className="text-3xl font-extrabold text-blue-800 mb-2">כתיבת אותיות</h1>
        <p className="text-gray-600 mb-8 text-sm">עקוב אחרי הקו ותרגל לכתוב את האותיות בעברית</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => onStart('guided')}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all shadow-md"
          >
            🌟 מודרך
            <p className="text-xs font-normal opacity-80 mt-0.5">עם קו עזר</p>
          </button>
          <button
            onClick={() => onStart('free')}
            className="bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all shadow-md"
          >
            🚀 חופשי
            <p className="text-xs font-normal opacity-80 mt-0.5">ללא קו עזר</p>
          </button>
        </div>

        <div className="mt-8 grid grid-cols-6 gap-1 text-xl opacity-50">
          {'אבגדהוזחטיכלמנסעפצקרשת'.split('').map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
