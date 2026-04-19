'use client';

interface ImageProps {
  fills: Record<string, string>;
  onFill: (id: string) => void;
}

const cc = 'cursor-pointer transition-colors duration-100 hover:opacity-75 active:opacity-50';

// ── CAT ──────────────────────────────────────────────────────────────────────

export function CatImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Ears (behind head) */}
      <polygon points="58,58 46,16 82,50"
        fill={f('cat-ears')} stroke="#222" strokeWidth="2.5" strokeLinejoin="round"
        className={cc} onClick={() => onFill('cat-ears')} />
      <polygon points="142,58 154,16 118,50"
        fill={f('cat-ears')} stroke="#222" strokeWidth="2.5" strokeLinejoin="round"
        className={cc} onClick={() => onFill('cat-ears')} />
      {/* Body */}
      <ellipse cx="100" cy="158" rx="46" ry="40"
        fill={f('cat-body')} stroke="#222" strokeWidth="2.5"
        className={cc} onClick={() => onFill('cat-body')} />
      {/* Head */}
      <circle cx="100" cy="82" r="44"
        fill={f('cat-head')} stroke="#222" strokeWidth="2.5"
        className={cc} onClick={() => onFill('cat-head')} />
      {/* Nose */}
      <ellipse cx="100" cy="90" rx="6" ry="4"
        fill={f('cat-nose', '#ffb3ba')} stroke="#dd5566" strokeWidth="1.5"
        className={cc} onClick={() => onFill('cat-nose')} />
      {/* Eyes – fixed */}
      <circle cx="82" cy="72" r="8" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="118" cy="72" r="8" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="84" cy="70" r="3" fill="white" style={{ pointerEvents: 'none' }} />
      <circle cx="120" cy="70" r="3" fill="white" style={{ pointerEvents: 'none' }} />
      {/* Mouth – fixed */}
      <path d="M94,95 Q100,101 106,95" fill="none" stroke="#555" strokeWidth="2"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      {/* Whiskers – fixed */}
      <line x1="48" y1="88" x2="90" y2="91" stroke="#888" strokeWidth="1.5"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <line x1="48" y1="95" x2="90" y2="94" stroke="#888" strokeWidth="1.5"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <line x1="152" y1="88" x2="110" y2="91" stroke="#888" strokeWidth="1.5"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <line x1="152" y1="95" x2="110" y2="94" stroke="#888" strokeWidth="1.5"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}
export const catRegions = ['cat-ears', 'cat-body', 'cat-head', 'cat-nose'];

// ── HOUSE ────────────────────────────────────────────────────────────────────

export function HouseImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Chimney */}
      <rect x="128" y="34" width="18" height="38"
        fill={f('house-chimney')} stroke="#222" strokeWidth="2.5"
        className={cc} onClick={() => onFill('house-chimney')} />
      {/* Roof */}
      <polygon points="100,20 178,82 22,82"
        fill={f('house-roof')} stroke="#222" strokeWidth="2.5" strokeLinejoin="round"
        className={cc} onClick={() => onFill('house-roof')} />
      {/* Walls */}
      <rect x="35" y="82" width="130" height="95"
        fill={f('house-walls')} stroke="#222" strokeWidth="2.5"
        className={cc} onClick={() => onFill('house-walls')} />
      {/* Left window */}
      <rect x="48" y="97" width="35" height="28"
        fill={f('house-windows')} stroke="#222" strokeWidth="2.5"
        className={cc} onClick={() => onFill('house-windows')} />
      <line x1="65" y1="97" x2="65" y2="125" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      <line x1="48" y1="111" x2="83" y2="111" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      {/* Right window */}
      <rect x="117" y="97" width="35" height="28"
        fill={f('house-windows')} stroke="#222" strokeWidth="2.5"
        className={cc} onClick={() => onFill('house-windows')} />
      <line x1="134" y1="97" x2="134" y2="125" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      <line x1="117" y1="111" x2="152" y2="111" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      {/* Door */}
      <rect x="78" y="130" width="44" height="47"
        fill={f('house-door')} stroke="#222" strokeWidth="2.5"
        className={cc} onClick={() => onFill('house-door')} />
      {/* Door knob – fixed */}
      <circle cx="115" cy="155" r="3.5" fill="#888" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}
export const houseRegions = ['house-chimney', 'house-roof', 'house-walls', 'house-windows', 'house-door'];

// ── SUN ──────────────────────────────────────────────────────────────────────

export function SunImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Rays */}
      {rays.map((angle) => (
        <rect key={angle} x="93" y="16" width="14" height="40"
          fill={f('sun-rays')} stroke="#222" strokeWidth="1.5" rx="4"
          transform={`rotate(${angle}, 100, 100)`}
          className={cc} onClick={() => onFill('sun-rays')} />
      ))}
      {/* Sun body */}
      <circle cx="100" cy="100" r="38"
        fill={f('sun-body')} stroke="#222" strokeWidth="2.5"
        className={cc} onClick={() => onFill('sun-body')} />
      {/* Face – fixed */}
      <circle cx="88" cy="94" r="5" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="112" cy="94" r="5" fill="#222" style={{ pointerEvents: 'none' }} />
      <path d="M86,108 Q100,118 114,108" fill="none" stroke="#222" strokeWidth="2.5"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}
export const sunRegions = ['sun-rays', 'sun-body'];

// ── BUTTERFLY ────────────────────────────────────────────────────────────────

export function ButterflyImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Upper wings */}
      <path d="M100,88 Q62,42 22,52 Q10,82 26,102 Q52,118 100,96 Z"
        fill={f('butterfly-top')} stroke="#222" strokeWidth="2.5" strokeLinejoin="round"
        className={cc} onClick={() => onFill('butterfly-top')} />
      <path d="M100,88 Q138,42 178,52 Q190,82 174,102 Q148,118 100,96 Z"
        fill={f('butterfly-top')} stroke="#222" strokeWidth="2.5" strokeLinejoin="round"
        className={cc} onClick={() => onFill('butterfly-top')} />
      {/* Lower wings */}
      <path d="M100,112 Q66,120 42,147 Q36,168 56,173 Q82,175 100,152 Z"
        fill={f('butterfly-bottom')} stroke="#222" strokeWidth="2.5" strokeLinejoin="round"
        className={cc} onClick={() => onFill('butterfly-bottom')} />
      <path d="M100,112 Q134,120 158,147 Q164,168 144,173 Q118,175 100,152 Z"
        fill={f('butterfly-bottom')} stroke="#222" strokeWidth="2.5" strokeLinejoin="round"
        className={cc} onClick={() => onFill('butterfly-bottom')} />
      {/* Body */}
      <ellipse cx="100" cy="100" rx="8" ry="38"
        fill={f('butterfly-body')} stroke="#222" strokeWidth="2"
        className={cc} onClick={() => onFill('butterfly-body')} />
      {/* Antennae – fixed */}
      <line x1="100" y1="62" x2="78" y2="30" stroke="#222" strokeWidth="2"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <circle cx="78" cy="30" r="4" fill="#222" style={{ pointerEvents: 'none' }} />
      <line x1="100" y1="62" x2="122" y2="30" stroke="#222" strokeWidth="2"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <circle cx="122" cy="30" r="4" fill="#222" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}
export const butterflyRegions = ['butterfly-top', 'butterfly-bottom', 'butterfly-body'];

// ── FLOWER ───────────────────────────────────────────────────────────────────

export function FlowerImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  const petalAngles = [0, 60, 120, 180, 240, 300];
  const dotAngles = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Stem */}
      <rect x="96" y="120" width="8" height="62"
        fill={f('flower-stem')} stroke="#222" strokeWidth="2"
        className={cc} onClick={() => onFill('flower-stem')} />
      {/* Leaf */}
      <ellipse cx="78" cy="155" rx="22" ry="10"
        fill={f('flower-stem')} stroke="#222" strokeWidth="2"
        transform="rotate(-35, 78, 155)"
        className={cc} onClick={() => onFill('flower-stem')} />
      {/* Petals */}
      {petalAngles.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + 30 * Math.sin(rad);
        const cy = 90 - 30 * Math.cos(rad);
        return (
          <ellipse key={angle} cx={cx} cy={cy} rx="14" ry="20"
            fill={f('flower-petals')} stroke="#222" strokeWidth="2"
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            className={cc} onClick={() => onFill('flower-petals')} />
        );
      })}
      {/* Center */}
      <circle cx="100" cy="90" r="22"
        fill={f('flower-center')} stroke="#222" strokeWidth="2.5"
        className={cc} onClick={() => onFill('flower-center')} />
      {/* Center dots – fixed */}
      {dotAngles.map((i) => {
        const a = (i * 60 * Math.PI) / 180;
        return (
          <circle key={i} cx={100 + 10 * Math.sin(a)} cy={90 - 10 * Math.cos(a)} r="2.5"
            fill="#8B4513" style={{ pointerEvents: 'none' }} />
        );
      })}
    </svg>
  );
}
export const flowerRegions = ['flower-stem', 'flower-petals', 'flower-center'];
