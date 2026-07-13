'use client';
import type { DotToDotPicture } from '../types';

interface Props {
  picture: DotToDotPicture;
  connected: number;
  onDotClick: (index: number) => void;
}

export default function DotToDotBoard({ picture, connected, onDotClick }: Props) {
  const { points, closed } = picture;
  const isComplete = connected === points.length;

  const segments: [number, number][] = [];
  for (let i = 0; i < connected - 1; i++) segments.push([i, i + 1]);
  if (isComplete && closed) segments.push([points.length - 1, 0]);

  const centroidX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const centroidY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

  return (
    <svg
      viewBox={picture.viewBox}
      className="w-full max-w-sm aspect-square bg-white rounded-3xl shadow-lg select-none"
      role="img"
      aria-label={picture.title}
    >
      {segments.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={points[a]!.x} y1={points[a]!.y}
          x2={points[b]!.x} y2={points[b]!.y}
          stroke="#7c3aed" strokeWidth={3} strokeLinecap="round"
        />
      ))}

      {isComplete && (
        <text
          x={centroidX}
          y={centroidY}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={48}
        >
          {picture.emoji}
        </text>
      )}

      {points.map((p, i) => {
        const isDone = i < connected;
        const isNext = i === connected;
        return (
          <g key={i} onClick={() => onDotClick(i)} className="cursor-pointer">
            <circle
              cx={p.x} cy={p.y}
              r={isNext ? 14 : 10}
              fill={isDone ? '#a78bfa' : '#fff'}
              stroke="#7c3aed"
              strokeWidth={2}
              className={isNext ? 'animate-pulse' : undefined}
            />
            {!isDone && (
              <text
                x={p.x} y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
                fill="#4c1d95"
              >
                {i + 1}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
