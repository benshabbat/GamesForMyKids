import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function HouseImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="128" y="34" width="18" height="38"
        fill={f('house-chimney')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('house-chimney')} />
      <polygon points="100,20 178,82 22,82"
        fill={f('house-roof')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('house-roof')} />
      <rect x="35" y="82" width="130" height="95"
        fill={f('house-walls')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('house-walls')} />
      <rect x="48" y="97" width="35" height="28"
        fill={f('house-window-left')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('house-window-left')} />
      <line x1="65" y1="97" x2="65" y2="125" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      <line x1="48" y1="111" x2="83" y2="111" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      <rect x="117" y="97" width="35" height="28"
        fill={f('house-window-right')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('house-window-right')} />
      <line x1="134" y1="97" x2="134" y2="125" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      <line x1="117" y1="111" x2="152" y2="111" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      <rect x="78" y="130" width="44" height="47"
        fill={f('house-door')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('house-door')} />
      <circle cx="115" cy="155" r="3.5" fill="#888" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const houseRegions = ['house-chimney', 'house-roof', 'house-walls', 'house-window-left', 'house-window-right', 'house-door'];
export const houseRegionNames: Record<string, string> = {
  'house-chimney': 'ארובה', 'house-roof': 'גג', 'house-walls': 'קירות',
  'house-window-left': 'חלון שמאל', 'house-window-right': 'חלון ימין', 'house-door': 'דלת',
};
