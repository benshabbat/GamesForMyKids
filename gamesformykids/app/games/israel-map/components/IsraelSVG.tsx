'use client';
import { useRef, useCallback } from 'react';
import type { Location } from '../data/locations';

// Simplified Israel outline in SVG viewBox "0 0 200 385"
// North (Dan) at y≈5, South (Eilat) at y≈375, West (coast) at x≈22, East at x≈165
const ISRAEL_PATH = `
  M 30,20
  C 40,15 65,5 100,5
  L 145,8
  L 160,22
  L 165,42
  L 162,60
  C 168,68 170,75 165,80
  L 167,95
  L 164,115
  L 168,140
  L 162,175
  L 152,205
  L 140,240
  L 128,278
  L 115,315
  L 104,348
  L 100,370
  L 96,355
  L 84,310
  L 70,270
  L 55,235
  L 38,212
  L 28,200
  L 22,188
  L 22,175
  L 24,145
  L 28,120
  L 32,92
  L 36,65
  L 32,42
  L 30,20
  Z
`;

interface Props {
  current: Location | null;
  foundIds: string[];
  allLocations: Location[];
  onTap: (svgX: number, svgY: number) => void;
  lastResult: 'correct' | 'wrong' | null;
}

const FOUND_COLORS = [
  '#22c55e', '#3b82f6', '#f59e0b', '#ec4899',
  '#8b5cf6', '#06b6d4', '#f97316', '#84cc16',
];

export default function IsraelSVG({ current, foundIds, allLocations, onTap, lastResult }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 200 / rect.width;
    const scaleY = 385 / rect.height;
    const svgX = (e.clientX - rect.left) * scaleX;
    const svgY = (e.clientY - rect.top) * scaleY;
    onTap(svgX, svgY);
  }, [onTap]);

  const handleTouch = useCallback((e: React.TouchEvent<SVGSVGElement>) => {
    if (!svgRef.current || !e.touches[0]) return;
    e.preventDefault();
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 200 / rect.width;
    const scaleY = 385 / rect.height;
    const svgX = (e.touches[0].clientX - rect.left) * scaleX;
    const svgY = (e.touches[0].clientY - rect.top) * scaleY;
    onTap(svgX, svgY);
  }, [onTap]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 385"
      className="w-full max-h-[60vh] cursor-pointer select-none"
      onClick={handleClick}
      onTouchEnd={handleTouch}
      style={{ touchAction: 'none' }}
    >
      {/* Sea background */}
      <rect width="200" height="385" fill="#bfdbfe" />
      {/* Land */}
      <path d={ISRAEL_PATH} fill="#fef9c3" stroke="#92400e" strokeWidth="1.5" />

      {/* Found location markers */}
      {foundIds.map((id, i) => {
        const loc = allLocations.find((l) => l.id === id);
        if (!loc) return null;
        return (
          <circle
            key={id}
            cx={loc.x}
            cy={loc.y}
            r={8}
            fill={FOUND_COLORS[i % FOUND_COLORS.length] ?? '#22c55e'}
            stroke="white"
            strokeWidth="1.5"
            opacity="0.8"
          />
        );
      })}

      {/* Current target marker */}
      {current && (
        <g>
          <circle
            cx={current.x}
            cy={current.y}
            r={current.radius}
            fill={lastResult === 'correct' ? '#bbf7d0' : lastResult === 'wrong' ? '#fecaca' : 'none'}
            stroke={lastResult === 'correct' ? '#16a34a' : lastResult === 'wrong' ? '#dc2626' : 'none'}
            strokeWidth="1.5"
            opacity="0.5"
          />
          <circle
            cx={current.x}
            cy={current.y}
            r={5}
            fill={lastResult === 'wrong' ? '#fca5a5' : '#fde68a'}
            stroke={lastResult === 'wrong' ? '#dc2626' : '#d97706'}
            strokeWidth="1.5"
            className="animate-pulse"
          />
        </g>
      )}
    </svg>
  );
}
