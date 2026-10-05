'use client';
/**
 * ===============================================
 * Drawing Canvas Hook - Hook לניהול הקנבס
 * ===============================================
 * 
 * פיצול מהקובץ הגדול DrawingGameClient.tsx
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { useDrawingStore } from '../store/drawingStore';
import { clientToCanvasPoint } from './canvasPoint';

export interface DrawingState {
  isDrawing: boolean;
  currentColor: string;
  brushSize: number;
  isErasing: boolean;
  eraserSize: number;
  isGameStarted: boolean;
}

export const useDrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef   = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Logical drawing size (the width/height attributes React renders) and the bitmap size we last
  // produced from it by applying the DPR. Whenever React changes the attributes (e.g. the touch
  // layout switches 800x600 -> 600x400 after mount) the bitmap is reset, so the DPR scaling is
  // re-applied; the CSS size is left to the stylesheet so the aspect ratio never gets distorted.
  const logicalSizeRef = useRef({ width: 0, height: 0 });
  const bitmapSizeRef  = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;
    if (canvas.width === bitmapSizeRef.current.width && canvas.height === bitmapSizeRef.current.height) return;
    const dpr = window.devicePixelRatio || 1;
    const logicalW = canvas.width;
    const logicalH = canvas.height;
    logicalSizeRef.current = { width: logicalW, height: logicalH };
    canvas.width  = Math.round(logicalW * dpr);
    canvas.height = Math.round(logicalH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bitmapSizeRef.current = { width: canvas.width, height: canvas.height };
  });

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#8B4513', '#800080', '#FFC0CB', '#A52A2A'
  ];

  // פונקציה לקבלת מיקום האירוע (עכבר או מגע)
  const getEventPosition = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!canvasRef.current) return { x: 0, y: 0 };

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;

    if ('touches' in e) {
      // Touch event
      if (e.touches.length > 0) {
        clientX = e.touches[0]!.clientX;
        clientY = e.touches[0]!.clientY;
      } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0]!.clientX;
        clientY = e.changedTouches[0]!.clientY;
      } else {
        return { x: 0, y: 0 };
      }
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const logical = logicalSizeRef.current.width > 0
      ? logicalSizeRef.current
      : { width: canvas.width, height: canvas.height };

    return clientToCanvasPoint(
      { x: clientX, y: clientY },
      rect,
      { x: canvas.clientLeft, y: canvas.clientTop },
      logical,
    );
  };

  // מחיל על ה-ctx את מצב המכחול/מחק הנוכחי מהסטור
  const applyBrushSettings = (ctx: CanvasRenderingContext2D) => {
    const { isErasing, eraserSize, brushSize, currentColor } = useDrawingStore.getState();
    if (isErasing) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
    }
  };

  // התחלת ציור — קורא state עדכני מהסטור ישירות למניעת stale closure
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    setIsDrawing(true);

    const { x, y } = getEventPosition(e);
    ctxRef.current ??= canvasRef.current?.getContext('2d') ?? null;
    const ctx = ctxRef.current;
    if (!ctx) return;

    applyBrushSettings(ctx);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // ציור
  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    e.preventDefault();

    const { x, y } = getEventPosition(e);
    const ctx = ctxRef.current;
    if (!ctx) return;

    applyBrushSettings(ctx);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // סיום ציור
  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current?.beginPath();
  };

  // ניקוי הקנבס
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  }, []);

  // רישום clearCanvas לסטור כדי שרכיבים אחרים יוכלו לגשת אליו
  const registerClearCanvas = useDrawingStore((s) => s.registerClearCanvas);
  useEffect(() => {
    registerClearCanvas(clearCanvas);
  }, [clearCanvas, registerClearCanvas]);

  // שמירת התמונה כקובץ PNG
  const saveDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `ציור-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  // רישום saveDrawing לסטור
  const registerSaveDrawing = useDrawingStore((s) => s.registerSaveDrawing);
  useEffect(() => {
    registerSaveDrawing(saveDrawing);
  }, [saveDrawing, registerSaveDrawing]);

  return {
    canvasRef,
    isDrawing,
    colors,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    saveDrawing,
    getEventPosition,
  };
};
