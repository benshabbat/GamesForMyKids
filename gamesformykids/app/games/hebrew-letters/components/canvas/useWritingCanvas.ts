'use client';

import { useRef, useEffect, useCallback } from 'react';
import {
  useHebrewLettersStore,
  getCanvasPosition,
} from '../../store/hebrewLettersStore';
import { STROKE_COLORS, STROKE_WIDTHS } from '../../constants/hebrewLettersConstants';

interface UseWritingCanvasParams {
  width: number;
  height: number;
  backgroundColor: string;
}

export function useWritingCanvas({ width, height, backgroundColor }: UseWritingCanvasParams) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const drawingState = useHebrewLettersStore((s) => s.drawingState);
  const {
    updateDrawingState,
    clearCanvas: clearCanvasState,
    saveCanvasState,
    undoLastAction,
    initializeCanvas,
    startDrawing: startDrawingStore,
    continueDrawing,
    stopDrawing: stopDrawingStore,
    resetCanvas,
  } = useHebrewLettersStore();

  // אתחול לוגי כשה-hook נוצר
  useEffect(() => {
    initializeCanvas(width, height, backgroundColor);
  }, [initializeCanvas, width, height, backgroundColor]);

  // אתחול DOM של הקנבס
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = drawingState.currentStrokeColor;
    ctx.lineWidth = drawingState.currentStrokeWidth;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    contextRef.current = ctx;
  }, [width, height, backgroundColor, drawingState.currentStrokeColor, drawingState.currentStrokeWidth]);

  // עדכון צבע/עובי על שינוי state
  useEffect(() => {
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.strokeStyle = drawingState.currentStrokeColor;
    ctx.lineWidth = drawingState.currentStrokeWidth;
  }, [drawingState.currentStrokeColor, drawingState.currentStrokeWidth]);

  const getMousePos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      return getCanvasPosition(e.nativeEvent, canvas);
    },
    []
  );

  const getTouchPos = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas || e.touches.length === 0) return { x: 0, y: 0 };
      return getCanvasPosition(e.nativeEvent, canvas);
    },
    []
  );

  const startDrawing = useCallback(
    (x: number, y: number) => {
      const ctx = contextRef.current;
      if (!ctx) return;
      const imageData = ctx.getImageData(0, 0, width, height);
      saveCanvasState(imageData);
      startDrawingStore(x, y);
      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    [width, height, saveCanvasState, startDrawingStore]
  );

  const draw = useCallback(
    (x: number, y: number) => {
      if (!drawingState.isDrawing) return;
      const ctx = contextRef.current;
      if (!ctx) return;
      continueDrawing(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [drawingState.isDrawing, continueDrawing]
  );

  const stopDrawing = useCallback(() => {
    if (!drawingState.isDrawing) return;
    const ctx = contextRef.current;
    if (!ctx) return;
    stopDrawingStore();
    ctx.closePath();
  }, [drawingState.isDrawing, stopDrawingStore]);

  const clearCanvas = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    clearCanvasState();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  };

  const undoLastStroke = () => {
    const ctx = contextRef.current;
    if (!ctx || drawingState.paths.length === 0) return;
    const lastState = drawingState.paths[drawingState.paths.length - 1];
    ctx.putImageData(lastState, 0, 0);
    undoLastAction();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-hebrew-letter.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const changeStrokeColor = (color: string) => updateDrawingState({ currentStrokeColor: color });
  const changeStrokeWidth = (strokeWidth: number) => updateDrawingState({ currentStrokeWidth: strokeWidth });
  const toggleGuide = () => updateDrawingState({ showLetterGuide: !drawingState.showLetterGuide });

  return {
    canvasRef,
    drawingState,
    strokeColors: STROKE_COLORS,
    strokeWidths: STROKE_WIDTHS,
    resetCanvas,
    getMousePos,
    getTouchPos,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    undoLastStroke,
    downloadCanvas,
    changeStrokeColor,
    changeStrokeWidth,
    toggleGuide,
  };
}
