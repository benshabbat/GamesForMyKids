import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function BoatImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M35,168 Q55,178 75,168 Q95,178 115,168 Q135,178 155,168"
        fill="none" stroke="#7FDBFF" strokeWidth="3" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <line x1="100" y1="120" x2="100" y2="28" stroke="#6b4423" strokeWidth={4} style={{ pointerEvents: 'none' }} />
      <polygon points="97,55 97,115 55,115"
        fill={f('boat-sail-small')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('boat-sail-small')} />
      <polygon points="103,35 103,115 155,115"
        fill={f('boat-sail-main')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('boat-sail-main')} />
      <polygon points="100,30 100,42 118,36"
        fill={f('boat-flag')} stroke="#222" strokeWidth={2} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('boat-flag')} />
      <path d="M30,150 Q100,182 170,150 L155,120 L45,120 Z"
        fill={f('boat-hull')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('boat-hull')} />
    </svg>
  );
}

export const boatRegions = ['boat-hull', 'boat-sail-main', 'boat-sail-small', 'boat-flag'];
export const boatRegionNames: Record<string, string> = {
  'boat-hull': 'גוף הסירה', 'boat-sail-main': 'מפרש גדול', 'boat-sail-small': 'מפרש קטן', 'boat-flag': 'דגל',
};
