'use client';

import { COLOR_BG, COLOR_BORDER, COLOR_TEXT, getColorName, getValueLabel, getValueEmoji } from '../useTakiGame';
import type { TakiCard } from '../useTakiGame';

interface TakiCardViewProps {
  card: TakiCard;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
  canPlay?: boolean;
}

export default function TakiCardView({ card, onClick, disabled, small, canPlay = false }: TakiCardViewProps) {
  const bg      = COLOR_BG[card.color];
  const border  = COLOR_BORDER[card.color];
  const text    = COLOR_TEXT[card.color];
  const isWild  = card.color === 'wild';
  const label   = getValueLabel(card.value);
  const emoji   = getValueEmoji(card.value);
  const isNum   = typeof card.value === 'number';
  const size    = small
    ? 'w-10 h-14 text-xs rounded-lg'
    : 'w-16 h-24 text-sm rounded-xl';

  return (
    <div className="relative">
      <button
        onClick={onClick}
        disabled={disabled}
        className={[
          size,
          isWild ? 'bg-gradient-to-br from-purple-500 to-pink-500' : bg,
          border,
          text,
          'border-2 flex flex-col items-center justify-center font-bold shadow-md',
          'transition-transform duration-100',
          disabled ? 'opacity-60 cursor-default' : 'hover:scale-110 hover:-translate-y-1 cursor-pointer active:scale-95',
        ].join(' ')}
        aria-label={`${getColorName(card.color)} ${label}`}
      >
        {isNum ? (
          <span className={small ? 'text-lg leading-none' : 'text-3xl leading-none'}>{label}</span>
        ) : (
          <>
            <span className={small ? 'text-base leading-none' : 'text-xl leading-none'}>{emoji}</span>
            <span className={small ? 'text-[9px] mt-0.5 leading-tight' : 'text-[10px] mt-1 leading-tight text-center px-0.5'}>
              {label}
            </span>
          </>
        )}
      </button>
      {canPlay && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
      )}
    </div>
  );
}

export function FaceDownCard({ small }: { small?: boolean }) {
  const size = small ? 'w-10 h-14 rounded-lg' : 'w-16 h-24 rounded-xl';
  return (
    <div className={`${size} bg-gradient-to-br from-indigo-800 to-indigo-950 border-2 border-indigo-600 shadow-md flex items-center justify-center`}>
      <span className="text-indigo-400 text-xl select-none">🂠</span>
    </div>
  );
}
