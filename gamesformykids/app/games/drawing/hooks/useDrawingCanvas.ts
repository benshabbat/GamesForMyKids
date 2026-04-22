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
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#8B4513', '#800080', '#FFC0CB', '#A52A2A'
  ];

  // פונקציה לקבלת מיקום האירוע (עכבר או מגע)
  const getEventPosition = useCallback((
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    
    if ('touches' in e) {
      // Touch event
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else {
        return { x: 0, y: 0 };
      }
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    return { x, y };
  }, []);

  // התחלת ציור — קורא state עדכני מהסטור ישירות למניעת stale closure
  const startDrawing = useCallback((
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    setIsDrawing(true);
    
    const { x, y } = getEventPosition(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
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
  }, [getEventPosition]);

  // ציור
  const draw = useCallback((
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const { x, y } = getEventPosition(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
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
  }, [isDrawing, getEventPosition]);

  // סיום ציור
  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  }, []);

  // ניקוי הקנבס
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
