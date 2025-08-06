'use client';

import { useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Eraser, RotateCcw, Download, Palette, Eye, EyeOff } from 'lucide-react';
import { useHebrewLetters } from '@/contexts';
import LetterGuideOverlay from './LetterGuideOverlay';

interface WritingCanvasProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  guideLetter?: string;
}

export default function WritingCanvas({
  width = 800,
  height = 400,
  backgroundColor = '#ffffff',
  guideLetter,
}: WritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  
  const {
    drawingState,
    updateDrawingState,
    clearCanvas: clearCanvasState,
    saveCanvasState,
    undoLastAction,
    strokeColors,
    strokeWidths
  } = useHebrewLetters();

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = drawingState.currentStrokeColor;
    ctx.lineWidth = drawingState.currentStrokeWidth;

    // Set background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    contextRef.current = ctx;
  }, [width, height, backgroundColor, drawingState.currentStrokeColor, drawingState.currentStrokeWidth]);

  // Update canvas properties when drawing state changes
  useEffect(() => {
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.strokeStyle = drawingState.currentStrokeColor;
    ctx.lineWidth = drawingState.currentStrokeWidth;
  }, [drawingState.currentStrokeColor, drawingState.currentStrokeWidth]);

  const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, []);

  const getTouchPos = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY
    };
  }, []);

  const startDrawing = useCallback((x: number, y: number) => {
    const ctx = contextRef.current;
    if (!ctx) return;

    // Save current state before starting new stroke
    const imageData = ctx.getImageData(0, 0, width, height);
    saveCanvasState(imageData);

    updateDrawingState({ isDrawing: true });
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [width, height, saveCanvasState, updateDrawingState]);

  const draw = useCallback((x: number, y: number) => {
    if (!drawingState.isDrawing) return;
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  }, [drawingState.isDrawing]);

  const stopDrawing = useCallback(() => {
    if (!drawingState.isDrawing) return;
    const ctx = contextRef.current;
    if (!ctx) return;
    
    updateDrawingState({ isDrawing: false });
    ctx.closePath();
  }, [drawingState.isDrawing, updateDrawingState]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    startDrawing(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    draw(x, y);
  };

  const handleMouseUp = () => {
    stopDrawing();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { x, y } = getTouchPos(e);
    startDrawing(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { x, y } = getTouchPos(e);
    draw(x, y);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };

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

  const changeStrokeColor = (color: string) => {
    updateDrawingState({ currentStrokeColor: color });
  };

  const changeStrokeWidth = (strokeWidth: number) => {
    updateDrawingState({ currentStrokeWidth: strokeWidth });
  };

  const toggleGuide = () => {
    updateDrawingState({ showLetterGuide: !drawingState.showLetterGuide });
  };

  return (
    <div className="bg-white rounded-xl border-2 border-green-500 p-4 shadow-lg">
      {/* כלי עבודה */}
      <div className="mb-4 space-y-4">
        {/* כפתורי פעולות */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            onClick={undoLastStroke}
            disabled={drawingState.paths.length === 0}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            בטל צעד אחרון
          </Button>

          <Button
            onClick={clearCanvas}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Eraser className="w-4 h-4" />
            נקה הכל
          </Button>

          <Button
            onClick={downloadCanvas}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            שמור
          </Button>

          {guideLetter && (
            <Button
              onClick={toggleGuide}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {drawingState.showLetterGuide ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {drawingState.showLetterGuide ? 'הסתר מדריך' : 'הצג מדריך'}
            </Button>
          )}
        </div>

        {/* בחירת צבעים */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <Palette className="w-4 h-4 text-gray-600" />
          {strokeColors.map((color) => (
            <button
              key={color}
              onClick={() => changeStrokeColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                drawingState.currentStrokeColor === color 
                  ? 'border-gray-800 scale-110' 
                  : 'border-gray-300 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              title={`צבע ${color}`}
            />
          ))}
        </div>

        {/* בחירת עובי קו */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <span className="text-sm text-gray-600">עובי קו:</span>
          {strokeWidths.map((strokeWidth) => (
            <button
              key={strokeWidth}
              onClick={() => changeStrokeWidth(strokeWidth)}
              className={`flex items-center justify-center w-12 h-8 rounded border-2 transition-all ${
                drawingState.currentStrokeWidth === strokeWidth 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div
                className="rounded-full bg-gray-600"
                style={{
                  width: `${Math.min(strokeWidth / 2, 8)}px`,
                  height: `${Math.min(strokeWidth / 2, 8)}px`
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* אזור הכתיבה */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border-2 border-dashed border-green-300 rounded-lg cursor-crosshair"
          style={{ maxWidth: '100%', height: 'auto' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        
        {/* מדריך האות */}
        {guideLetter && drawingState.showLetterGuide && (
          <LetterGuideOverlay
            letter={guideLetter}
            width={width}
            height={height}
          />
        )}
      </div>

      {/* הוראות שימוש */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>השתמש בעכבר או במגע כדי לכתוב על המסך</p>
        <p>כתוב מימין לשמאל כמו בעברית</p>
      </div>
    </div>
  );
}
