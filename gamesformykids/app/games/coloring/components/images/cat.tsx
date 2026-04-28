import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function CatImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <polygon points="58,58 46,16 82,50"
        fill={f('cat-ear-left')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('cat-ear-left')} />
      <polygon points="142,58 154,16 118,50"
        fill={f('cat-ear-right')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('cat-ear-right')} />
      <ellipse cx="100" cy="158" rx="46" ry="40"
        fill={f('cat-body')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('cat-body')} />
      <circle cx="100" cy="82" r="44"
        fill={f('cat-head')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('cat-head')} />
      <ellipse cx="100" cy="90" rx="6" ry="4"
        fill={f('cat-nose', '#ffb3ba')} stroke="#dd5566" strokeWidth={1.5}
        className={REGION_CLASS} onClick={() => onFill('cat-nose')} />
      <circle cx="82" cy="72" r="8" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="118" cy="72" r="8" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="84" cy="70" r="3" fill="white" style={{ pointerEvents: 'none' }} />
      <circle cx="120" cy="70" r="3" fill="white" style={{ pointerEvents: 'none' }} />
      <path d="M94,95 Q100,101 106,95" fill="none" stroke="#555" strokeWidth="2"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <line x1="48" y1="88" x2="90" y2="91" stroke="#888" strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <line x1="48" y1="95" x2="90" y2="94" stroke="#888" strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <line x1="152" y1="88" x2="110" y2="91" stroke="#888" strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <line x1="152" y1="95" x2="110" y2="94" stroke="#888" strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const catRegions = ['cat-ear-left', 'cat-ear-right', 'cat-body', 'cat-head', 'cat-nose'];
export const catRegionNames: Record<string, string> = {
  'cat-ear-left': 'אוזן שמאל', 'cat-ear-right': 'אוזן ימין',
  'cat-body': 'גוף', 'cat-head': 'ראש', 'cat-nose': 'אף',
};
