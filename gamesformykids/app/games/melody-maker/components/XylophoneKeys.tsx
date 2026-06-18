'use client';
import { NOTE_COLORS, NOTE_NAMES_HE } from '../useMelodyMaker';

interface Props {
  onTap: (noteIndex: number) => void;
  flashingKey: number | null;
  highlightKey: number | null;
}

export default function XylophoneKeys({ onTap, flashingKey, highlightKey }: Props) {
  return (
    <div className="flex gap-2 justify-center items-end w-full px-2 select-none" dir="ltr">
      {NOTE_COLORS.map((color, i) => {
        const isFlashing = flashingKey === i;
        const isHighlighted = highlightKey === i;
        const heightClass = [
          'h-40', 'h-36', 'h-32', 'h-28', 'h-36', 'h-32', 'h-28', 'h-40',
        ][i] ?? 'h-32';
        return (
          <button
            key={i}
            onPointerDown={() => onTap(i)}
            className={[
              'flex-1 rounded-b-xl rounded-t-sm text-white font-bold text-xs sm:text-sm',
              'transition duration-75 touch-none',
              'shadow-md flex flex-col items-center justify-end pb-3 gap-1',
              color,
              heightClass,
              isFlashing || isHighlighted ? 'brightness-150 scale-105 ring-4 ring-white' : '',
            ].join(' ')}
            aria-label={NOTE_NAMES_HE[i]}
          >
            <span className="text-lg leading-none">{['♩','♪','♫','♬','♩','♪','♫','♬'][i]}</span>
            <span className="font-bold leading-none">{NOTE_NAMES_HE[i]}</span>
          </button>
        );
      })}
    </div>
  );
}
