'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Eraser, RotateCcw, Download, Palette, Eye, EyeOff } from 'lucide-react';
import LetterGuideOverlay from './LetterGuideOverlay';

interface WritingCanvasProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
  guideLetter?: string;
  showGuide?: boolean;
}

export default function WritingCanvas({
  width = 800,
  height = 400,
  strokeWidth = 8,
  strokeColor = '#2E7D32',
  backgroundColor = '#ffffff',
  guideLetter,
  showGuide = true
}: WritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(strokeWidth);
  const [currentStrokeColor, setCurrentStrokeColor] = useState(strokeColor);
  const [paths, setPaths] = useState<ImageData[]>([]);
  const [showLetterGuide, setShowLetterGuide] = useState(showGuide);

  const colors = [
    '#2E7D32', // ירוק
    '#1976D2', // כחול
    '#D32F2F', // אדום
    '#7B1FA2', // סגול
    '#F57C00', // כתום
    '#795548', // חום
    '#424242', // אפור
    '#000000'  // שחור
  ];

  const strokeWidths = [4, 8, 12, 16, 20];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // הגדרת ה-canvas
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = currentStrokeColor;
    ctx.lineWidth = currentStrokeWidth;

    // רקע לבן
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    setContext(ctx);
  }, [width, height, backgroundColor, currentStrokeColor, currentStrokeWidth]);

  const saveState = useCallback(() => {
    if (!context) return;
    const imageData = context.getImageData(0, 0, width, height);
    setPaths(prev => [...prev, imageData]);
  }, [context, width, height]);

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
    
    const touch = e.touches[0];
    if (!touch) return { x: 0, y: 0 };

    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY
    };
  }, []);

  const startDrawing = useCallback((x: number, y: number) => {
    if (!context) return;
    
    saveState();
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(x, y);
  }, [context, saveState]);

  const draw = useCallback((x: number, y: number) => {
    if (!isDrawing || !context) return;

    context.lineTo(x, y);
    context.stroke();
  }, [isDrawing, context]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing || !context) return;
    
    setIsDrawing(false);
    context.closePath();
  }, [isDrawing, context]);

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
    if (!context) return;
    
    setPaths([]);
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);
  };

  const undoLastStroke = () => {
    if (!context || paths.length === 0) return;
    
    const lastState = paths[paths.length - 1];
    if (!lastState) return;
    
    context.putImageData(lastState, 0, 0);
    setPaths(prev => prev.slice(0, -1));
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
    setCurrentStrokeColor(color);
    if (context) {
      context.strokeStyle = color;
    }
  };

  const changeStrokeWidth = (width: number) => {
    setCurrentStrokeWidth(width);
    if (context) {
      context.lineWidth = width;
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-green-500 p-4 shadow-lg">
      {/* כלי עבודה */}
      <div className="mb-4 space-y-4">
        {/* כפתורי פעולות */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            onClick={undoLastStroke}
            disabled={paths.length === 0}
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
            הורד תמונה
          </Button>
          
          {guideLetter && (
            <Button
              onClick={() => setShowLetterGuide(!showLetterGuide)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {showLetterGuide ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showLetterGuide ? 'הסתר מדריך' : 'הצג מדריך'}
            </Button>
          )}
        </div>

        {/* בחירת צבעים */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <Palette className="w-5 h-5 text-gray-600" />
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => changeStrokeColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                currentStrokeColor === color 
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
          {strokeWidths.map((width) => (
            <button
              key={width}
              onClick={() => changeStrokeWidth(width)}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                currentStrokeWidth === width
                  ? 'border-green-500 bg-green-100'
                  : 'border-gray-300 hover:border-green-300'
              }`}
            >
              <div
                className="rounded-full bg-gray-600"
                style={{
                  width: `${Math.min(width / 2, 20)}px`,
                  height: `${Math.min(width / 2, 20)}px`
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
          className="border-2 border-dashed border-green-300 rounded-lg cursor-crosshair touch-none"
          style={{
            maxWidth: '100%',
            height: 'auto',
            aspectRatio: `${width}/${height}`
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        
        {/* מדריך האות */}
        {guideLetter && (
          <LetterGuideOverlay
            letter={guideLetter}
            width={width}
            height={height}
            show={showLetterGuide}
            opacity={0.2}
          />
        )}
        
        {/* הוראות */}
        <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded-lg p-2 text-xs text-gray-600">
          🖱️ לחץ וגרור כדי לכתוב
        </div>
      </div>
    </div>
  );
}
