import { type PointState } from '../sheshBeshGameStore';
import { PieceStack } from './PieceStack';

interface BoardPointProps {
  idx: number;
  pt: PointState;
  isTop: boolean;
  isSelected: boolean;
  isTarget: boolean;
  onClick: () => void;
}

export function BoardPoint({ idx, pt, isTop, isSelected, isTarget, onClick }: BoardPointProps) {
  const isPlayerHome = idx >= 1 && idx <= 6;
  const isCompHome   = idx >= 19 && idx <= 24;
  const triColor = idx % 2 === 0 ? 'border-t-red-800 border-b-red-800' : 'border-t-amber-200 border-b-amber-200';

  return (
    <button
      onClick={onClick}
      tabIndex={0}
      aria-label={`point ${idx}`}
      className={[
        'relative flex flex-col items-center w-10 cursor-pointer select-none outline-none',
        'transition-colors duration-100',
        isTop ? 'justify-start pt-1' : 'justify-end pb-1',
        isTarget   ? 'bg-emerald-400/30' : '',
        isSelected ? 'bg-yellow-300/30'  : '',
        isPlayerHome ? 'bg-blue-950/30'  : isCompHome ? 'bg-red-950/30' : '',
      ].join(' ')}
      style={{ height: '7rem' }}
    >
      {/* Triangle */}
      <div className={[
        'absolute inset-x-[3px]',
        isTop
          ? 'top-0 border-t-[5.5rem] border-l-[17px] border-r-[17px] border-b-0 border-l-transparent border-r-transparent'
          : 'bottom-0 border-b-[5.5rem] border-l-[17px] border-r-[17px] border-t-0 border-l-transparent border-r-transparent',
        triColor,
      ].join(' ')} />

      {/* Target glow ring */}
      {isTarget && (
        <div className="absolute inset-1 rounded border-2 border-emerald-400/70 pointer-events-none" />
      )}

      {/* Point number */}
      <span className={[
        'absolute text-[9px] text-white/50 font-mono z-10 leading-none',
        isTop ? 'bottom-[2px]' : 'top-[2px]',
      ].join(' ')}>{idx}</span>

      {/* Pieces */}
      <div className="relative z-10">
        {pt.player   > 0 && <PieceStack count={pt.player}   isPlayer isTop={isTop} />}
        {pt.computer > 0 && <PieceStack count={pt.computer} isPlayer={false} isTop={isTop} />}
      </div>
    </button>
  );
}
