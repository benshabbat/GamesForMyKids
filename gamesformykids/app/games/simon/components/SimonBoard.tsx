'use client';

import { BUTTONS } from '../useSimonGame';

interface Props {
  phase: 'showing' | 'input';
  activeColor: string | null;
  playerIdx: number;
  sequenceLength: number;
  best: number;
  onTap: (id: string) => void;
}

export default function SimonBoard({ phase, activeColor, playerIdx, sequenceLength, best, onTap }: Props) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <p className={`text-2xl font-black mb-1 ${phase === 'showing' ? 'text-yellow-300' : 'text-green-400'}`}>
          {phase === 'showing' ? '👀 זכור את הסדר...' : '👆 חזור על הסדר!'}
        </p>
        <p className="text-gray-400 text-sm">שלב {sequenceLength} · שיא: {best}</p>
        {phase === 'input' && (
          <p className="text-gray-500 text-xs mt-1">{playerIdx}/{sequenceLength}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {BUTTONS.map(btn => (
          <button
            key={btn.id}
            onClick={() => onTap(btn.id)}
            disabled={phase === 'showing'}
            className={`w-32 h-32 rounded-3xl shadow-2xl transition-all duration-100 ${
              activeColor === btn.id ? btn.active + ' scale-90' : btn.bg
            } ${phase === 'input' ? 'hover:brightness-110 active:scale-90 cursor-pointer' : 'cursor-default opacity-60'}`}
          />
        ))}
      </div>
    </div>
  );
}
