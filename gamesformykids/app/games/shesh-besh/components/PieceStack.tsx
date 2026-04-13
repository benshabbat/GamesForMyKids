const MAX_VISIBLE = 5;

interface PieceStackProps {
  count: number;
  isPlayer: boolean;
  isTop: boolean;
}

export function PieceStack({ count, isPlayer, isTop }: PieceStackProps) {
  if (count === 0) return null;
  const visible = Math.min(count, MAX_VISIBLE);

  // Flat backgammon disc shape (wider than tall)
  const disc = isPlayer
    ? 'bg-gradient-to-br from-rose-300 via-rose-500 to-rose-800 border-rose-200/60'
    : 'bg-gradient-to-br from-white via-slate-100 to-slate-400 border-white/70';
  const shine = isPlayer
    ? 'bg-gradient-to-b from-white/25 to-transparent'
    : 'bg-gradient-to-b from-white/60 to-transparent';
  const textColor = isPlayer ? 'text-white drop-shadow-sm' : 'text-slate-700';

  return (
    <div className={['flex items-center gap-[2px]', isTop ? 'flex-col' : 'flex-col-reverse'].join(' ')}>
      {Array.from({ length: visible }).map((_, i) => {
        const isTopPiece = isTop ? i === 0 : i === visible - 1;
        return (
          <div
            key={i}
            className={[
              'w-7 h-[17px] rounded-full border-2 flex items-center justify-center',
              'relative overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.75)]',
              disc,
            ].join(' ')}
          >
            {/* Specular highlight */}
            <div className={['absolute inset-0 rounded-full', shine].join(' ')} />
            {count > 1 && isTopPiece && (
              <span className={['relative z-10 text-[9px] font-black leading-none', textColor].join(' ')}>
                {count}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
