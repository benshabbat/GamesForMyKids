'use client';
import Image from 'next/image';
import type { MouseEvent } from 'react';
import type { DotPoint } from '../../types';
import { DISPLAY_WIDTH, VIEW_SIZE } from '../editorConstants';

interface Props {
  imageDataUrl: string;
  points: DotPoint[];
  closed: boolean;
  onImageClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function PointCanvas({ imageDataUrl, points, closed, onImageClick }: Props) {
  return (
    <div
      onClick={onImageClick}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-crosshair"
      style={{ width: DISPLAY_WIDTH, height: DISPLAY_WIDTH }}
    >
      {/* Square, matching the real game board's aspect-square — object-contain
          letterboxes non-square source images exactly as they'll appear in-game,
          so the SVG overlay's 0-300 square viewBox lines up pixel-for-pixel. */}
      <Image src={imageDataUrl} alt="תמונת מקור" fill unoptimized className="object-contain pointer-events-none" />
      <svg viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`} className="absolute inset-0 w-full h-full pointer-events-none">
        {points.slice(1).map((p, i) => (
          <line
            key={i}
            x1={points[i]!.x} y1={points[i]!.y}
            x2={p.x} y2={p.y}
            stroke="#7c3aed" strokeWidth={3} strokeLinecap="round"
          />
        ))}
        {closed && points.length > 2 && (
          <line
            x1={points[points.length - 1]!.x} y1={points[points.length - 1]!.y}
            x2={points[0]!.x} y2={points[0]!.y}
            stroke="#7c3aed" strokeWidth={2} strokeDasharray="6 4"
          />
        )}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={8} fill="#fff" stroke="#7c3aed" strokeWidth={2} />
            <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight="bold" fill="#4c1d95">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
