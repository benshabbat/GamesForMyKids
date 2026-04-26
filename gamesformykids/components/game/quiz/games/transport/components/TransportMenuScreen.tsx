'use client';

import type { TransportType } from '../data/transport';
import { TYPE_STYLES } from '../data/transport';

interface Props {
  types: readonly TransportType[];
  onStart: (type: TransportType) => void;
}

export default function TransportMenuScreen({ types, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="text-8xl mb-4">🚗</div>
      <h1 className="text-4xl font-bold text-blue-700 mb-2">כלי תחבורה</h1>
      <p className="text-gray-600 mb-8 text-center">גלה כלי רכב מהיבשה, הים והאוויר!</p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {types.map(type => {
          const s = TYPE_STYLES[type];
          return (
            <button key={type} onClick={() => onStart(type)}
              className={`py-3 px-4 rounded-xl font-bold text-white shadow-md active:scale-95 transition-all bg-gradient-to-r ${s.color} ${type === 'הכל' ? 'col-span-2' : ''}`}>
              {s.icon} {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
