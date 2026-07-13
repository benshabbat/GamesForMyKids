import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function BalloonImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M75,133 Q70,142 78,148 L72,160 Q90,168 100,150 Z" fill="none" stroke="#88888899"
        strokeWidth="2" style={{ pointerEvents: 'none' }} />
      <path d="M130,120 Q135,132 125,140 L134,160 Q112,168 100,150 Z" fill="none" stroke="#88888899"
        strokeWidth="2" style={{ pointerEvents: 'none' }} />
      <ellipse cx="75" cy="88" rx="38" ry="48"
        fill={f('balloon-left')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('balloon-left')} />
      <ellipse cx="130" cy="72" rx="36" ry="46"
        fill={f('balloon-right')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('balloon-right')} />
      <polygon points="94,148 106,148 100,160"
        fill={f('balloon-knot')} stroke="#222" strokeWidth={2} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('balloon-knot')} />
      <ellipse cx="62" cy="65" rx="10" ry="16" fill="white" opacity={0.45} style={{ pointerEvents: 'none' }} />
      <ellipse cx="118" cy="48" rx="9" ry="14" fill="white" opacity={0.45} style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const balloonRegions = ['balloon-left', 'balloon-right', 'balloon-knot'];
export const balloonRegionNames: Record<string, string> = {
  'balloon-left': 'בלון שמאל', 'balloon-right': 'בלון ימין', 'balloon-knot': 'קשר',
};
