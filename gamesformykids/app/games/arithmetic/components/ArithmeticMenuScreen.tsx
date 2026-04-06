'use client';
import { ArithmeticLevel } from '../data/questions';

interface Props {
  levels: ArithmeticLevel[];
  onStart: (level: ArithmeticLevel) => void;
}

const LEVEL_EMOJIS = ['➕', '➕➖', '➕', '➖', '✖️', '🔣'];

export default function ArithmeticMenuScreen({ levels, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">➕</div>
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">חשבון מהיר</h1>
          <p className="text-indigo-600">בחר רמה ותתחיל!</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {levels.map(lv => (
            <button key={lv.id} onClick={() => onStart(lv)}
              className="p-5 rounded-2xl text-white font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-br from-indigo-500 to-blue-600 text-right">
              <div className="text-2xl mb-1">{LEVEL_EMOJIS[lv.id - 1]}</div>
              <div>{lv.label}</div>
              <div className="text-xs opacity-70 mt-1 font-normal">עד {lv.maxNum}{lv.operations.includes('×') ? ' × ' + lv.maxNum : ''}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
