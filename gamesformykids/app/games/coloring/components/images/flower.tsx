import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

export function FlowerImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="96" y="120" width="8" height="62"
        fill={f('flower-stem')} stroke="#222" strokeWidth={2}
        className={REGION_CLASS} onClick={() => onFill('flower-stem')} />
      <ellipse cx="78" cy="155" rx="22" ry="10"
        fill={f('flower-stem')} stroke="#222" strokeWidth={2}
        transform="rotate(-35, 78, 155)"
        className={REGION_CLASS} onClick={() => onFill('flower-stem')} />
      {PETAL_ANGLES.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + 30 * Math.sin(rad);
        const cy = 90 - 30 * Math.cos(rad);
        const id = `flower-petal-${angle}`;
        return (
          <ellipse key={angle} cx={cx} cy={cy} rx="14" ry="20"
            fill={f(id)} stroke="#222" strokeWidth={2}
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            className={REGION_CLASS} onClick={() => onFill(id)} />
        );
      })}
      <circle cx="100" cy="90" r="22"
        fill={f('flower-center')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('flower-center')} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i * 60 * Math.PI) / 180;
        return (
          <circle key={i} cx={100 + 10 * Math.sin(a)} cy={90 - 10 * Math.cos(a)} r="2.5"
            fill="#8B4513" style={{ pointerEvents: 'none' }} />
        );
      })}
    </svg>
  );
}

export const flowerRegions = [
  'flower-stem',
  'flower-petal-0', 'flower-petal-60', 'flower-petal-120',
  'flower-petal-180', 'flower-petal-240', 'flower-petal-300',
  'flower-center',
];
export const flowerRegionNames: Record<string, string> = {
  'flower-stem': 'גבעול',
  'flower-petal-0': 'עלה 1', 'flower-petal-60': 'עלה 2', 'flower-petal-120': 'עלה 3',
  'flower-petal-180': 'עלה 4', 'flower-petal-240': 'עלה 5', 'flower-petal-300': 'עלה 6',
  'flower-center': 'מרכז',
};
