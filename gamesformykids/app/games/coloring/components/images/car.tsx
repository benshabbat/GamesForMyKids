import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function CarImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="52" cy="150" r="24"
        fill={f('car-wheel-left')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('car-wheel-left')} />
      <circle cx="148" cy="150" r="24"
        fill={f('car-wheel-right')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('car-wheel-right')} />
      <rect x="10" y="98" width="180" height="58" rx="10"
        fill={f('car-body')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('car-body')} />
      <rect x="40" y="62" width="120" height="44" rx="8"
        fill={f('car-cabin')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('car-cabin')} />
      <rect x="49" y="69" width="46" height="30" rx="4"
        fill={f('car-window-left')} stroke="#222" strokeWidth={1.5}
        className={REGION_CLASS} onClick={() => onFill('car-window-left')} />
      <rect x="105" y="69" width="46" height="30" rx="4"
        fill={f('car-window-right')} stroke="#222" strokeWidth={1.5}
        className={REGION_CLASS} onClick={() => onFill('car-window-right')} />
      <circle cx="52" cy="150" r="10" fill="#ccc" stroke="#888" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
      <circle cx="148" cy="150" r="10" fill="#ccc" stroke="#888" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
      <rect x="174" y="112" width="14" height="20" rx="3" fill="#FFDC00" stroke="#aaa" strokeWidth={1} style={{ pointerEvents: 'none' }} />
      <rect x="12" y="112" width="14" height="20" rx="3" fill="#FF4136" stroke="#aaa" strokeWidth={1} style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const carRegions = ['car-body', 'car-cabin', 'car-window-left', 'car-window-right', 'car-wheel-left', 'car-wheel-right'];
export const carRegionNames: Record<string, string> = {
  'car-body': 'מרכב', 'car-cabin': 'תא נהג', 'car-window-left': 'חלון שמאל', 'car-window-right': 'חלון ימין',
  'car-wheel-left': 'גלגל שמאל', 'car-wheel-right': 'גלגל ימין',
};
