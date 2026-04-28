import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function FishImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M48,100 L14,68 L14,132 Z"
        fill={f('fish-tail')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('fish-tail')} />
      <ellipse cx="115" cy="100" rx="68" ry="44"
        fill={f('fish-body')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('fish-body')} />
      <path d="M88,62 Q108,20 132,60 Q108,56 88,62 Z"
        fill={f('fish-fin')} stroke="#222" strokeWidth={2}
        className={REGION_CLASS} onClick={() => onFill('fish-fin')} />
      <circle cx="160" cy="88" r="12" fill="white" stroke="#222" strokeWidth={2} style={{ pointerEvents: 'none' }} />
      <circle cx="162" cy="87" r="6" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="164" cy="85" r="2" fill="white" style={{ pointerEvents: 'none' }} />
      <path d="M181,96 Q187,101 181,107" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <path d="M90,72 Q102,88 90,104" fill="none" stroke="#88888855" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      <path d="M112,67 Q124,84 112,101" fill="none" stroke="#88888855" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      <path d="M132,68 Q144,84 132,100" fill="none" stroke="#88888855" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const fishRegions = ['fish-body', 'fish-tail', 'fish-fin'];
export const fishRegionNames: Record<string, string> = {
  'fish-body': 'גוף', 'fish-tail': 'זנב', 'fish-fin': 'סנפיר',
};
