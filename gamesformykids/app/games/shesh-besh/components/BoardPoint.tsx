import { type PointState } from '../types';
import { PieceStack } from './PieceStack';

interface BoardPointProps {
  idx: number;
  pt: PointState;
  isTop: boolean;
  isSelected: boolean;
  isTarget: boolean;
  onClick: () => void;
  registerRef?: (el: HTMLButtonElement | null) => void;
}

export function BoardPoint({ idx, pt, isTop, isSelected, isTarget, onClick, registerRef }: BoardPointProps) {
  // Alternating deep crimson / warm parchment — classic backgammon palette
  const fillColor = idx % 2 === 0 ? '#7f1d1d' : '#e8d0a0';

  return (
    <button
      ref={registerRef}
      onClick={onClick}
      tabIndex={0}
      aria-label={`point ${idx}`}
      className={[
        'relative flex flex-col items-center flex-1 min-w-0 h-full cursor-pointer select-none outline-none',
        'transition duration-150 overflow-hidden',
        isTop ? 'justify-start pt-[2%]' : 'justify-end pb-[2%]',
      ].join(' ')}
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

      {/* Highlight overlays — thick, high-contrast rings so kids can spot tappable spots at a glance */}
      {isTarget && (
        <div className="absolute inset-0 bg-emerald-400/25 ring-[3px] ring-inset ring-emerald-400/90 animate-pulse pointer-events-none" />
      )}
      {isSelected && (
        <div className="absolute inset-0 bg-amber-400/25 ring-[3px] ring-inset ring-amber-400/90 pointer-events-none" />
      )}

      {/* Point number */}
      <span className={[
        'absolute text-[clamp(7px,1.6vw,11px)] text-white/25 font-mono z-10 leading-none select-none',
        isTop ? 'bottom-[2px]' : 'top-[2px]',
      ].join(' ')}>{idx}</span>

      {/* Pieces */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {pt.player   > 0 && <PieceStack count={pt.player}   isPlayer isTop={isTop} />}
        {pt.computer > 0 && <PieceStack count={pt.computer} isPlayer={false} isTop={isTop} />}
      </div>
    </button>
  );
}
