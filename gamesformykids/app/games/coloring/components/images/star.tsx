import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function StarImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <polygon points="100,20 122,74 180,74 132,109 151,163 100,130 49,163 68,109 20,74 78,74"
        fill={f('star-body')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('star-body')} />
      <polygon points="35,31 39,41 49,45 39,49 35,59 31,49 21,45 31,41"
        fill={f('star-sparkle-left')} stroke="#222" strokeWidth={2}
        className={REGION_CLASS} onClick={() => onFill('star-sparkle-left')} />
      <polygon points="165,31 169,41 179,45 169,49 165,59 161,49 151,45 161,41"
        fill={f('star-sparkle-right')} stroke="#222" strokeWidth={2}
        className={REGION_CLASS} onClick={() => onFill('star-sparkle-right')} />
      <circle cx="85" cy="90" r="6" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="115" cy="90" r="6" fill="#222" style={{ pointerEvents: 'none' }} />
      <path d="M82,105 Q100,118 118,105" fill="none" stroke="#555" strokeWidth="2.5"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const starRegions = ['star-body', 'star-sparkle-left', 'star-sparkle-right'];
export const starRegionNames: Record<string, string> = {
  'star-body': 'כוכב', 'star-sparkle-left': 'נצנוץ שמאל', 'star-sparkle-right': 'נצנוץ ימין',
};
