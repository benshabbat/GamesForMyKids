'use client';
/**
 * ===============================================
 * Drawing Canvas Hook - Hook לניהול הקנבס
 * ===============================================
 * 
 * פיצול מהקובץ הגדול DrawingGameClient.tsx
 */

import { useState, useRef, useEffect } from 'react';
import { useDrawingStore } from '../store/drawingStore';

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

  // Apply DPR scaling on mount so strokes are crisp on retina/hi-DPI screens
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    if (dpr === 1) { ctxRef.current = ctx; return; }
    const logicalW = canvas.width;
    const logicalH = canvas.height;
    canvas.width  = logicalW * dpr;
    canvas.height = logicalH * dpr;
    canvas.style.width  = `${logicalW}px`;
    canvas.style.height = `${logicalH}px`;
    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;
  }, []);

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

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    return { x, y };
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

    const { isErasing, eraserSize, brushSize, currentColor } = useDrawingStore.getState();
    if (isErasing) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
    }
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

    const { isErasing, eraserSize, currentColor, brushSize } = useDrawingStore.getState();
    if (isErasing) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
    }

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
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }
  };

  // רישום clearCanvas לסטור כדי שרכיבים אחרים יוכלו לגשת אליו
  const registerClearCanvas = useDrawingStore((s) => s.registerClearCanvas);
  useEffect(() => {
    registerClearCanvas(clearCanvas);
  }, [clearCanvas, registerClearCanvas]);

  // שמירת התמונה כקובץ PNG
  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `ציור-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

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
