import { type PointState } from '../types';
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
  // Alternating deep crimson / warm parchment — classic backgammon palette
  const fillColor = idx % 2 === 0 ? '#7f1d1d' : '#e8d0a0';

  return (
    <button
      onClick={onClick}
      tabIndex={0}
      aria-label={`point ${idx}`}
      className={[
        'relative flex flex-col items-center w-10 cursor-pointer select-none outline-none',
        'transition-all duration-150 overflow-hidden',
        isTop ? 'justify-start pt-0.5' : 'justify-end pb-0.5',
      ].join(' ')}
      style={{ height: '7.5rem' }}
    >
      {/* SVG triangle — crisp, no aliasing artifacts */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 40 120"
      >
        {isTop
          ? <polygon points="1,0 39,0 20,113" fill={fillColor} opacity="0.9" />
          : <polygon points="1,120 39,120 20,7" fill={fillColor} opacity="0.9" />}
      </svg>

      {/* Highlight overlays */}
      {isTarget && (
        <div className="absolute inset-0 bg-emerald-400/20 ring-[2px] ring-inset ring-emerald-400/70 animate-pulse pointer-events-none" />
      )}
      {isSelected && (
        <div className="absolute inset-0 bg-amber-400/20 ring-[2px] ring-inset ring-amber-400/75 pointer-events-none" />
      )}

      {/* Point number */}
      <span className={[
        'absolute text-[8px] text-white/25 font-mono z-10 leading-none select-none',
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
