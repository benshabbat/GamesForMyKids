'use client';

import { useEffect, useRef } from 'react';
import { useColoringStore } from '../store/coloringStore';
import { floodFill, hexToRgba } from '../lib/floodFill';
import type { FloodFillImageMeta } from '../types';

/** Max undo steps kept in memory per mounted scene (dataURL snapshots). */
const MAX_HISTORY = 15;

interface FloodFillCanvasProps {
  /** Any string key (a static ImageId, or a custom/generated picture's own id). */
  imageId: string;
  meta: FloodFillImageMeta;
}

export function FloodFillCanvas({ imageId, meta }: FloodFillCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<string[]>([]);
  const selectedColor = useColoringStore((s) => s.selectedColor);
  const registerFloodFillClear = useColoringStore((s) => s.registerFloodFillClear);
  const registerFloodFillUndo = useColoringStore((s) => s.registerFloodFillUndo);
  const setFloodFillCanUndo = useColoringStore((s) => s.setFloodFillCanUndo);
  const saveFloodFillSnapshot = useColoringStore((s) => s.saveFloodFillSnapshot);

  const pushHistory = (dataUrl: string) => {
    historyRef.current.push(dataUrl);
    if (historyRef.current.length > MAX_HISTORY) historyRef.current.shift();
    setFloodFillCanUndo(true);
  };

  // Load the pristine source (or a saved snapshot) once on mount.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const drawSrc = (src: string) => {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, meta.width, meta.height);
      img.src = src;
    };

    historyRef.current = [];
    setFloodFillCanUndo(false);

    const snapshot = useColoringStore.getState().floodFillSnapshots[imageId];
    drawSrc(snapshot ?? meta.src);

    registerFloodFillClear(() => {
      if (canvasRef.current) pushHistory(canvasRef.current.toDataURL('image/png'));
      drawSrc(meta.src);
    });

    registerFloodFillUndo(() => {
      const previous = historyRef.current.pop();
      if (!previous) return;
      setFloodFillCanUndo(historyRef.current.length > 0);
      drawSrc(previous);
      saveFloodFillSnapshot(imageId, previous);
    });

    return () => {
      registerFloodFillClear(() => {});
      registerFloodFillUndo(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const changed = floodFill(imageData, x, y, hexToRgba(selectedColor));
    if (!changed) return;

    pushHistory(canvas.toDataURL('image/png'));

    ctx.putImageData(imageData, 0, 0);
    saveFloodFillSnapshot(imageId, canvas.toDataURL('image/png'));
  };

  return (
    <canvas
      ref={canvasRef}
      width={meta.width}
      height={meta.height}
      onClick={handleClick}
      className="w-full h-full cursor-pointer"
    />
  );
}
