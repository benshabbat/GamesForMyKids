import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function DogImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M148,150 Q176,142 172,112 Q164,132 144,144 Z"
        fill={f('dog-tail')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('dog-tail')} />
      <path d="M64,58 Q38,90 54,132 Q76,112 76,68 Z"
        fill={f('dog-ear-left')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('dog-ear-left')} />
      <path d="M136,58 Q162,90 146,132 Q124,112 124,68 Z"
        fill={f('dog-ear-right')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('dog-ear-right')} />
      <ellipse cx="100" cy="158" rx="48" ry="38"
        fill={f('dog-body')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('dog-body')} />
      <circle cx="100" cy="88" r="42"
        fill={f('dog-head')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('dog-head')} />
      <ellipse cx="100" cy="112" rx="7" ry="5"
        fill={f('dog-nose', '#3a2a1a')} stroke="#222" strokeWidth={1.5}
        className={REGION_CLASS} onClick={() => onFill('dog-nose')} />
      <circle cx="84" cy="80" r="7" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="116" cy="80" r="7" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="86" cy="78" r="2.5" fill="white" style={{ pointerEvents: 'none' }} />
      <circle cx="118" cy="78" r="2.5" fill="white" style={{ pointerEvents: 'none' }} />
      <path d="M100,117 Q100,124 92,127" fill="none" stroke="#555" strokeWidth="2"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <path d="M100,117 Q100,124 108,127" fill="none" stroke="#555" strokeWidth="2"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const dogRegions = ['dog-ear-left', 'dog-ear-right', 'dog-head', 'dog-body', 'dog-nose', 'dog-tail'];
export const dogRegionNames: Record<string, string> = {
  'dog-ear-left': 'אוזן שמאל', 'dog-ear-right': 'אוזן ימין', 'dog-head': 'ראש',
  'dog-body': 'גוף', 'dog-nose': 'אף', 'dog-tail': 'זנב',
};
