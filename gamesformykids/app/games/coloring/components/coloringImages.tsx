'use client';

import type { ImageProps } from '../types';
import { REGION_CLASS } from '../constants';

// ── CAT ──────────────────────────────────────────────────────────────────────

export function CatImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Left ear */}
      <polygon points="58,58 46,16 82,50"
        fill={f('cat-ear-left')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('cat-ear-left')} />
      {/* Right ear */}
      <polygon points="142,58 154,16 118,50"
        fill={f('cat-ear-right')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('cat-ear-right')} />
      {/* Body */}
      <ellipse cx="100" cy="158" rx="46" ry="40"
        fill={f('cat-body')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('cat-body')} />
      {/* Head */}
      <circle cx="100" cy="82" r="44"
        fill={f('cat-head')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('cat-head')} />
      {/* Nose */}
      <ellipse cx="100" cy="90" rx="6" ry="4"
        fill={f('cat-nose', '#ffb3ba')} stroke="#dd5566" strokeWidth={1.5}
        className={REGION_CLASS} onClick={() => onFill('cat-nose')} />
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
export const catRegions = ['cat-ear-left', 'cat-ear-right', 'cat-body', 'cat-head', 'cat-nose'];
export const catRegionNames: Record<string, string> = {
  'cat-ear-left': 'אוזן שמאל', 'cat-ear-right': 'אוזן ימין',
  'cat-body': 'גוף', 'cat-head': 'ראש', 'cat-nose': 'אף',
};

// ── HOUSE ────────────────────────────────────────────────────────────────────

export function HouseImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Chimney */}
      <rect x="128" y="34" width="18" height="38"
        fill={f('house-chimney')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('house-chimney')} />
      {/* Roof */}
      <polygon points="100,20 178,82 22,82"
        fill={f('house-roof')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('house-roof')} />
      {/* Walls */}
      <rect x="35" y="82" width="130" height="95"
        fill={f('house-walls')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('house-walls')} />
      {/* Left window */}
      <rect x="48" y="97" width="35" height="28"
        fill={f('house-window-left')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('house-window-left')} />
      <line x1="65" y1="97" x2="65" y2="125" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      <line x1="48" y1="111" x2="83" y2="111" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      {/* Right window */}
      <rect x="117" y="97" width="35" height="28"
        fill={f('house-window-right')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('house-window-right')} />
      <line x1="134" y1="97" x2="134" y2="125" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      <line x1="117" y1="111" x2="152" y2="111" stroke="#222" strokeWidth="1.5" style={{ pointerEvents: 'none' }} />
      {/* Door */}
      <rect x="78" y="130" width="44" height="47"
        fill={f('house-door')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('house-door')} />
      {/* Door knob – fixed */}
      <circle cx="115" cy="155" r="3.5" fill="#888" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}
export const houseRegions = ['house-chimney', 'house-roof', 'house-walls', 'house-window-left', 'house-window-right', 'house-door'];
export const houseRegionNames: Record<string, string> = {
  'house-chimney': 'ארובה', 'house-roof': 'גג', 'house-walls': 'קירות',
  'house-window-left': 'חלון שמאל', 'house-window-right': 'חלון ימין', 'house-door': 'דלת',
};

// ── SUN ──────────────────────────────────────────────────────────────────────

export const SUN_RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;
export const SUN_RAY_IDS = SUN_RAY_ANGLES.map((a) => `sun-ray-${a}`);

export function SunImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Individual rays */}
      {SUN_RAY_ANGLES.map((angle) => {
        const id = `sun-ray-${angle}`;
        return (
          <rect key={angle} x="93" y="16" width="14" height="40"
            fill={f(id)} stroke="#222" strokeWidth={1.5} rx="4"
            transform={`rotate(${angle}, 100, 100)`}
            className={REGION_CLASS} onClick={() => onFill(id)} />
        );
      })}
      {/* Sun body */}
      <circle cx="100" cy="100" r="38"
        fill={f('sun-body')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('sun-body')} />
      {/* Face – fixed */}
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

// ── BUTTERFLY ────────────────────────────────────────────────────────────────

export function ButterflyImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Upper wings */}
      <path d="M100,88 Q62,42 22,52 Q10,82 26,102 Q52,118 100,96 Z"
        fill={f('butterfly-wing-top-left')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('butterfly-wing-top-left')} />
      <path d="M100,88 Q138,42 178,52 Q190,82 174,102 Q148,118 100,96 Z"
        fill={f('butterfly-wing-top-right')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('butterfly-wing-top-right')} />
      {/* Lower wings */}
      <path d="M100,112 Q66,120 42,147 Q36,168 56,173 Q82,175 100,152 Z"
        fill={f('butterfly-wing-bottom-left')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('butterfly-wing-bottom-left')} />
      <path d="M100,112 Q134,120 158,147 Q164,168 144,173 Q118,175 100,152 Z"
        fill={f('butterfly-wing-bottom-right')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('butterfly-wing-bottom-right')} />
      {/* Body */}
      <ellipse cx="100" cy="100" rx="8" ry="38"
        fill={f('butterfly-body')} stroke="#222" strokeWidth={2}
        className={REGION_CLASS} onClick={() => onFill('butterfly-body')} />
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
export const butterflyRegions = ['butterfly-wing-top-left', 'butterfly-wing-top-right', 'butterfly-wing-bottom-left', 'butterfly-wing-bottom-right', 'butterfly-body'];
export const butterflyRegionNames: Record<string, string> = {
  'butterfly-wing-top-left': 'כנף עליונה שמאל', 'butterfly-wing-top-right': 'כנף עליונה ימין',
  'butterfly-wing-bottom-left': 'כנף תחתונה שמאל', 'butterfly-wing-bottom-right': 'כנף תחתונה ימין',
  'butterfly-body': 'גוף',
};

// ── FLOWER ───────────────────────────────────────────────────────────────────

export function FlowerImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  const petalAngles = [0, 60, 120, 180, 240, 300];
  const dotAngles = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Stem */}
      <rect x="96" y="120" width="8" height="62"
        fill={f('flower-stem')} stroke="#222" strokeWidth={2}
        className={REGION_CLASS} onClick={() => onFill('flower-stem')} />
      {/* Leaf */}
      <ellipse cx="78" cy="155" rx="22" ry="10"
        fill={f('flower-stem')} stroke="#222" strokeWidth={2}
        transform="rotate(-35, 78, 155)"
        className={REGION_CLASS} onClick={() => onFill('flower-stem')} />
      {/* Petals */}
      {petalAngles.map((angle) => {
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
      {/* Center */}
      <circle cx="100" cy="90" r="22"
        fill={f('flower-center')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('flower-center')} />
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

// ── FISH ─────────────────────────────────────────────────────────────────────

export function FishImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Tail (behind body) */}
      <path d="M48,100 L14,68 L14,132 Z"
        fill={f('fish-tail')} stroke="#222" strokeWidth={2.5} strokeLinejoin="round"
        className={REGION_CLASS} onClick={() => onFill('fish-tail')} />
      {/* Body */}
      <ellipse cx="115" cy="100" rx="68" ry="44"
        fill={f('fish-body')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('fish-body')} />
      {/* Dorsal fin (on top of body) */}
      <path d="M88,62 Q108,20 132,60 Q108,56 88,62 Z"
        fill={f('fish-fin')} stroke="#222" strokeWidth={2}
        className={REGION_CLASS} onClick={() => onFill('fish-fin')} />
      {/* Eye – fixed */}
      <circle cx="160" cy="88" r="12" fill="white" stroke="#222" strokeWidth={2} style={{ pointerEvents: 'none' }} />
      <circle cx="162" cy="87" r="6" fill="#222" style={{ pointerEvents: 'none' }} />
      <circle cx="164" cy="85" r="2" fill="white" style={{ pointerEvents: 'none' }} />
      {/* Mouth – fixed */}
      <path d="M181,96 Q187,101 181,107" fill="none" stroke="#222" strokeWidth="2"
        strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      {/* Scale lines – fixed */}
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

// ── TREE ─────────────────────────────────────────────────────────────────────

export function TreeImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Trunk */}
      <rect x="84" y="132" width="32" height="58" rx="4"
        fill={f('tree-trunk')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('tree-trunk')} />
      {/* Crown left */}
      <ellipse cx="70" cy="106" rx="38" ry="34"
        fill={f('tree-crown-left')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('tree-crown-left')} />
      {/* Crown right */}
      <ellipse cx="130" cy="106" rx="38" ry="34"
        fill={f('tree-crown-right')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('tree-crown-right')} />
      {/* Crown top */}
      <ellipse cx="100" cy="70" rx="42" ry="36"
        fill={f('tree-crown-top')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('tree-crown-top')} />
      {/* Apples – fixed */}
      <circle cx="76" cy="98" r="9" fill="#FF4136" stroke="#aa0000" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
      <circle cx="122" cy="110" r="9" fill="#FF4136" stroke="#aa0000" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
      <circle cx="100" cy="64" r="8" fill="#FF4136" stroke="#aa0000" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
    </svg>
  );
}
export const treeRegions = ['tree-trunk', 'tree-crown-left', 'tree-crown-right', 'tree-crown-top'];
export const treeRegionNames: Record<string, string> = {
  'tree-trunk': 'גזע', 'tree-crown-left': 'כתר שמאל', 'tree-crown-right': 'כתר ימין', 'tree-crown-top': 'כתר עליון',
};

// ── CAR ──────────────────────────────────────────────────────────────────────

export function CarImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Wheels (behind body) */}
      <circle cx="52" cy="150" r="24"
        fill={f('car-wheel-left')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('car-wheel-left')} />
      <circle cx="148" cy="150" r="24"
        fill={f('car-wheel-right')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('car-wheel-right')} />
      {/* Main body */}
      <rect x="10" y="98" width="180" height="58" rx="10"
        fill={f('car-body')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('car-body')} />
      {/* Cabin */}
      <rect x="40" y="62" width="120" height="44" rx="8"
        fill={f('car-cabin')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('car-cabin')} />
      {/* Window left */}
      <rect x="49" y="69" width="46" height="30" rx="4"
        fill={f('car-window-left')} stroke="#222" strokeWidth={1.5}
        className={REGION_CLASS} onClick={() => onFill('car-window-left')} />
      {/* Window right */}
      <rect x="105" y="69" width="46" height="30" rx="4"
        fill={f('car-window-right')} stroke="#222" strokeWidth={1.5}
        className={REGION_CLASS} onClick={() => onFill('car-window-right')} />
      {/* Wheel hubs – fixed */}
      <circle cx="52" cy="150" r="10" fill="#ccc" stroke="#888" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
      <circle cx="148" cy="150" r="10" fill="#ccc" stroke="#888" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
      {/* Headlight – fixed */}
      <rect x="174" y="112" width="14" height="20" rx="3" fill="#FFDC00" stroke="#aaa" strokeWidth={1} style={{ pointerEvents: 'none' }} />
      {/* Taillight – fixed */}
      <rect x="12" y="112" width="14" height="20" rx="3" fill="#FF4136" stroke="#aaa" strokeWidth={1} style={{ pointerEvents: 'none' }} />
    </svg>
  );
}
export const carRegions = ['car-body', 'car-cabin', 'car-window-left', 'car-window-right', 'car-wheel-left', 'car-wheel-right'];
export const carRegionNames: Record<string, string> = {
  'car-body': 'מרכב', 'car-cabin': 'תא נהג', 'car-window-left': 'חלון שמאל', 'car-window-right': 'חלון ימין',
  'car-wheel-left': 'גלגל שמאל', 'car-wheel-right': 'גלגל ימין',
};
