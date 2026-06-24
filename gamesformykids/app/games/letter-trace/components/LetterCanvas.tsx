'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type { HebrewLetterPath } from '@/lib/constants/gameData/hebrewLetterPaths';

interface Props {
  letter: HebrewLetterPath;
  difficulty: 'guided' | 'free';
  onComplete: (accuracy: number) => void;
}

const WAYPOINT_RADIUS = 12; // px — how close the user must be to "capture" a waypoint
const SUCCESS_THRESHOLD = 0.60; // 60% of waypoints captured = success
const CANVAS_SIZE = 280; // logical px

function flattenStrokes(strokes: Array<Array<[number, number]>>): Array<[number, number]> {
  return strokes.flatMap((s) => s);
}

function toCanvasPx(norm: [number, number], size: number): [number, number] {
  return [norm[0] * size / 100, norm[1] * size / 100];
}

export default function LetterCanvas({ letter, difficulty, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const drawnPoints = useRef<Array<[number, number]>>([]);
  const capturedCount = useRef(0);
  const totalWaypoints = useRef(0);
  const [done, setDone] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  // Flatten all waypoints into a single ordered list for capture tracking
  const allWaypoints = flattenStrokes(letter.strokes);
  const nextWaypointIdx = useRef(0);

  function resetState() {
    drawnPoints.current = [];
    capturedCount.current = 0;
    nextWaypointIdx.current = 0;
    totalWaypoints.current = allWaypoints.length;
    setDone(false);
    setAccuracy(0);
  }

  useEffect(() => {
    resetState();
    drawBackground();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter, difficulty]);

  function drawBackground() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = canvas.width;

    ctx.clearRect(0, 0, size, size);

    if (difficulty === 'guided') {
      // Draw ghost letter path
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (const stroke of letter.strokes) {
        if (stroke.length < 2) continue;
        ctx.beginPath();
        const [sx, sy] = toCanvasPx(stroke[0]!, size);
        ctx.moveTo(sx, sy);
        for (let i = 1; i < stroke.length; i++) {
          const [x, y] = toCanvasPx(stroke[i]!, size);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    // Draw waypoints
    allWaypoints.forEach(([nx, ny], i) => {
      const [px, py] = toCanvasPx([nx, ny], size);
      const isStart = i === 0;
      ctx.beginPath();
      ctx.arc(px, py, isStart ? 14 : 8, 0, Math.PI * 2);
      ctx.fillStyle = isStart ? '#22c55e' : 'rgba(148,163,184,0.6)';
      ctx.fill();
      if (isStart) {
        // Arrow pointing down
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('▼', px, py);
      }
    });
  }

  function drawUserPath() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = canvas.width;

    // Redraw background first
    drawBackground();

    // Draw captured waypoints highlighted
    allWaypoints.slice(0, nextWaypointIdx.current).forEach(([nx, ny]) => {
      const [px, py] = toCanvasPx([nx, ny], size);
      ctx.beginPath();
      ctx.arc(px, py, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();
    });

    // Draw user path
    const points = drawnPoints.current;
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const [fx, fy] = points[0]!;
    ctx.moveTo(fx, fy);
    for (let i = 1; i < points.length; i++) {
      const [x, y] = points[i]!;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function getCanvasPos(e: React.PointerEvent<HTMLCanvasElement>): [number, number] {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return [(e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY];
  }

  function checkWaypointCapture(pos: [number, number]) {
    const size = canvasRef.current?.width ?? CANVAS_SIZE;
    while (nextWaypointIdx.current < allWaypoints.length) {
      const wp = allWaypoints[nextWaypointIdx.current]!;
      const [wpx, wpy] = toCanvasPx(wp, size);
      const dist = Math.hypot(pos[0] - wpx, pos[1] - wpy);
      if (dist <= WAYPOINT_RADIUS * 1.5) {
        capturedCount.current += 1;
        nextWaypointIdx.current += 1;
      } else {
        break;
      }
    }
  }

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (done) return;
    isDrawing.current = true;
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    const pos = getCanvasPos(e);
    drawnPoints.current = [pos];
    checkWaypointCapture(pos);
    drawUserPath();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, letter, difficulty]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || done) return;
    const pos = getCanvasPos(e);
    drawnPoints.current.push(pos);
    checkWaypointCapture(pos);
    drawUserPath();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, letter, difficulty]);

  const handlePointerUp = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (drawnPoints.current.length < 5) return; // too short — ignore accidental taps
    const acc = capturedCount.current / Math.max(totalWaypoints.current, 1);
    setAccuracy(acc);
    setDone(true);
    onComplete(acc);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="touch-none rounded-2xl shadow-lg border-2 border-gray-200 bg-white cursor-crosshair"
        style={{ maxWidth: '100%', width: CANVAS_SIZE, height: CANVAS_SIZE }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      {done && (
        <div className={`text-lg font-bold px-5 py-2 rounded-full ${
          accuracy >= SUCCESS_THRESHOLD
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-orange-100 text-orange-700 border border-orange-300'
        }`}>
          {accuracy >= SUCCESS_THRESHOLD ? '✅ יפה מאוד!' : '💪 נסה שוב!'}
          {' '}{Math.round(accuracy * 100)}%
        </div>
      )}
    </div>
  );
}
