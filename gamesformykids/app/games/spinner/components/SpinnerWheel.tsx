'use client';
import { useEffect, useRef } from 'react';
import { WHEEL_COLORS } from '../useSpinner';

interface Props {
  segments: string[];
  rotation: number;
  size?: number;
}

export default function SpinnerWheel({ segments, rotation, size = 320 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const n = segments.length;
    if (n === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 12;

    ctx.clearRect(0, 0, w, h);

    const segAngle = (2 * Math.PI) / n;
    // rotation=0: segment 0 starts at top (12 o'clock)
    // We rotate CCW by PI/2 so that 0° = top in canvas coords
    const baseAngle = (rotation * Math.PI) / 180 - Math.PI / 2;

    // Outer border
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#2d3748';
    ctx.fill();

    for (let i = 0; i < n; i++) {
      const a1 = baseAngle + i * segAngle;
      const a2 = baseAngle + (i + 1) * segAngle;
      const color = WHEEL_COLORS[i % WHEEL_COLORS.length] ?? '#cccccc';

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, a1, a2);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Text — positioned at 72% of radius
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(a1 + segAngle / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const fontSize = n > 18 ? 10 : n > 12 ? 12 : n > 8 ? 14 : 18;
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.fillStyle = '#1a202c';
      ctx.shadowColor = 'rgba(255,255,255,0.6)';
      ctx.shadowBlur = 3;
      ctx.fillText(segments[i] ?? '', radius * 0.65, 0);
      ctx.restore();
    }

    // Center cap
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
    grad.addColorStop(0, '#f7fafc');
    grad.addColorStop(1, '#e2e8f0');
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, 2 * Math.PI);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = '#a0aec0';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#4a5568';
    ctx.fill();
  }, [segments, rotation, size]);

  return (
    <div className="relative inline-block select-none">
      <canvas ref={canvasRef} width={size} height={size} className="rounded-full" />
      {/* Downward pointer fixed at top */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ top: '-6px', zIndex: 10 }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderTop: '32px solid #e53e3e',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
          }}
        />
      </div>
    </div>
  );
}
