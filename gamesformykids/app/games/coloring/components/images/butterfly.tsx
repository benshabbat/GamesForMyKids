import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function ButterflyImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M100,88 Q62,42 22,52 Q10,82 26,102 Q52,118 100,96 Z"
        fill={f('butterfly-wing-top-left')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('butterfly-wing-top-left')} />
      <path d="M100,88 Q138,42 178,52 Q190,82 174,102 Q148,118 100,96 Z"
        fill={f('butterfly-wing-top-right')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('butterfly-wing-top-right')} />
      <path d="M100,112 Q66,120 42,147 Q36,168 56,173 Q82,175 100,152 Z"
        fill={f('butterfly-wing-bottom-left')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('butterfly-wing-bottom-left')} />
      <path d="M100,112 Q134,120 158,147 Q164,168 144,173 Q118,175 100,152 Z"
        fill={f('butterfly-wing-bottom-right')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('butterfly-wing-bottom-right')} />
      <ellipse cx="100" cy="100" rx="8" ry="38"
        fill={f('butterfly-body')} stroke="#222" strokeWidth={2}
        className={REGION_CLASS} onClick={() => onFill('butterfly-body')} />
      <line x1="100" y1="62" x2="78" y2="30" stroke="#222" strokeWidth="2" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <circle cx="78" cy="30" r="4" fill="#222" style={{ pointerEvents: 'none' }} />
      <line x1="100" y1="62" x2="122" y2="30" stroke="#222" strokeWidth="2" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <circle cx="122" cy="30" r="4" fill="#222" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const butterflyRegions = ['butterfly-wing-top-left', 'butterfly-wing-top-right', 'butterfly-wing-bottom-left', 'butterfly-wing-bottom-right', 'butterfly-body'];
export const butterflyRegionNames: Record<string, string> = {
  'butterfly-wing-top-left': 'כנף עליונה שמאל', 'butterfly-wing-top-right': 'כנף עליונה ימין',
  'butterfly-wing-bottom-left': 'כנף תחתונה שמאל', 'butterfly-wing-bottom-right': 'כנף תחתונה ימין',
  'butterfly-body': 'גוף',
};
