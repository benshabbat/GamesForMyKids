'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type { HebrewLetterPath } from '@/lib/constants/gameData/hebrewLetterPaths';
import { advanceWaypoints, isAttemptComplete, toCanvasPx } from './letterTraceLogic';

interface UseLetterCanvasParams {
  letter: HebrewLetterPath;
  difficulty: 'guided' | 'free';
  onComplete: (accuracy: number) => void;
}

export const WAYPOINT_RADIUS = 12; // px — how close the user must be to "capture" a waypoint
export const SUCCESS_THRESHOLD = 0.60; // 60% of waypoints captured = success
export const CANVAS_SIZE = 280; // logical px

function flattenStrokes(strokes: Array<Array<[number, number]>>): Array<[number, number]> {
  return strokes.flatMap((s) => s);
}

export function useLetterCanvas({ letter, difficulty, onComplete }: UseLetterCanvasParams) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const drawnPoints = useRef<Array<[number, number]>>([]); // the stroke being drawn
  const finishedStrokes = useRef<Array<Array<[number, number]>>>([]); // strokes already lifted
  const capturedCount = useRef(0);
  const totalWaypoints = useRef(0);
  const [done, setDone] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  // Flatten all waypoints into a single ordered list for capture tracking
  const allWaypoints = flattenStrokes(letter.strokes);
  const nextWaypointIdx = useRef(0);

  function resetState() {
    isDrawing.current = false;
    drawnPoints.current = [];
    finishedStrokes.current = [];
    capturedCount.current = 0;
    nextWaypointIdx.current = 0;
    totalWaypoints.current = allWaypoints.length;
    setDone(false);
    setHasDrawn(false);
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

    // Draw user path (every finished stroke plus the one in progress)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const points of [...finishedStrokes.current, drawnPoints.current]) {
      if (points.length < 2) continue;
      ctx.beginPath();
      const [fx, fy] = points[0]!;
      ctx.moveTo(fx, fy);
      for (let i = 1; i < points.length; i++) {
        const [x, y] = points[i]!;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
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
    const next = advanceWaypoints(allWaypoints, nextWaypointIdx.current, pos, size, WAYPOINT_RADIUS * 1.5);
    capturedCount.current += next - nextWaypointIdx.current;
    nextWaypointIdx.current = next;
  }

  function finalizeAttempt() {
    const acc = capturedCount.current / Math.max(totalWaypoints.current, 1);
    setAccuracy(acc);
    setDone(true);
    onComplete(acc);
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

  // Lifting the finger ends a stroke; the attempt only ends once every waypoint is covered or the
  // child has drawn as many strokes as the letter has (or presses "done" — see finish()).
  const handlePointerUp = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (drawnPoints.current.length < 5) { // too short — ignore accidental taps
      drawnPoints.current = [];
      drawUserPath();
      return;
    }
    finishedStrokes.current.push(drawnPoints.current);
    drawnPoints.current = [];
    setHasDrawn(true);
    if (isAttemptComplete(finishedStrokes.current.length, letter.strokes.length, capturedCount.current, totalWaypoints.current)) {
      finalizeAttempt();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete, letter, difficulty]);

  // Ends the attempt early with whatever has been traced so far
  function finish() {
    if (done || !hasDrawn) return;
    finalizeAttempt();
  }

  // Wipes the canvas and starts the letter over
  function retry() {
    resetState();
    drawBackground();
  }

  return {
    canvasRef,
    done,
    hasDrawn,
    accuracy,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    finish,
    retry,
  };
}
