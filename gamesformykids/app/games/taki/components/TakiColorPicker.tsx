'use client';

import type { CardColor } from '../takiGameStore';


const COLORS: { color: CardColor; label: string; cls: string }[] = [
  { color: 'red',    label: '🔴 אדום',  cls: 'bg-red-500 hover:bg-red-400' },
  { color: 'green',  label: '🟢 ירוק',  cls: 'bg-green-500 hover:bg-green-400' },
  { color: 'blue',   label: '🔵 כחול',  cls: 'bg-blue-500 hover:bg-blue-400' },
  { color: 'yellow', label: '🟡 צהוב',  cls: 'bg-yellow-400 hover:bg-yellow-300 text-gray-900' },
];

import { useTakiStore } from '../takiGameStore';

export default function TakiColorPicker() {
  const onPick = useTakiStore(s => s.chooseColor);
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" dir="rtl">
      <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl text-center max-w-xs w-full mx-4">
        <p className="text-white text-lg font-bold mb-4">🌈 בחר צבע</p>
        <div className="grid grid-cols-2 gap-3">
          {COLORS.map(({ color, label, cls }) => (
            <button
              key={color}
              onClick={() => onPick(color)}
              className={`${cls} text-white font-bold py-3 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
