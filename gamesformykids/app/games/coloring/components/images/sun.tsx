import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export const SUN_RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;
export const SUN_RAY_IDS = SUN_RAY_ANGLES.map((a) => `sun-ray-${a}`);

export function SunImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {SUN_RAY_ANGLES.map((angle) => {
        const id = `sun-ray-${angle}`;
        return (
          <rect key={angle} x="93" y="16" width="14" height="40"
            fill={f(id)} stroke="#222" strokeWidth={1.5} rx="4"
            transform={`rotate(${angle}, 100, 100)`}
            className={REGION_CLASS} onClick={() => onFill(id)} />
        );
      })}
      <circle cx="100" cy="100" r="38"
        fill={f('sun-body')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('sun-body')} />
      <circle cx="88" cy="94" r="5" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="112" cy="94" r="5" fill="#222" style={{ pointerEvents: 'none' }} />
      <path d="M86,108 Q100,118 114,108" fill="none" stroke="#222" strokeWidth="2.5"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const sunRegions = [...SUN_RAY_IDS, 'sun-body'];
export const sunRegionNames: Record<string, string> = {
  'sun-ray-0': 'קרן 1', 'sun-ray-45': 'קרן 2', 'sun-ray-90': 'קרן 3', 'sun-ray-135': 'קרן 4',
  'sun-ray-180': 'קרן 5', 'sun-ray-225': 'קרן 6', 'sun-ray-270': 'קרן 7', 'sun-ray-315': 'קרן 8',
  'sun-body': 'שמש',
};
