const MAX_VISIBLE = 5;

interface PieceStackProps {
  count: number;
  isPlayer: boolean;
  isTop: boolean;
}

export function PieceStack({ count, isPlayer, isTop }: PieceStackProps) {
  if (count === 0) return null;
  const visible = Math.min(count, MAX_VISIBLE);
  const pieceStyle = isPlayer
    ? 'bg-gradient-to-br from-rose-400 to-rose-600 border-rose-300 text-white shadow-rose-900/60'
    : 'bg-gradient-to-br from-gray-50 to-gray-300 border-gray-400 text-gray-800 shadow-gray-900/60';

  return (
    <div className={['flex flex-col gap-[2px]', isTop ? '' : 'flex-col-reverse'].join(' ')}>
      {Array.from({ length: visible }).map((_, i) => {
        const isTopPiece = isTop ? i === 0 : i === visible - 1;
        return (
          <div
            key={i}
            className={[
              'w-6 h-6 rounded-full border-2 flex items-center justify-center',
              'text-[10px] font-extrabold shadow-md',
              pieceStyle,
            ].join(' ')}
          >
            {count > 1 && isTopPiece ? count : ''}
          </div>
        );
      })}
    </div>
  );
}
