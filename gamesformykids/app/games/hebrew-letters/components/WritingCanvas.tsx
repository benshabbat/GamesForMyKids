'use client';

import { Button } from '@/components/ui/button';
import { Eraser, RotateCcw, Download, Palette, Eye, EyeOff } from 'lucide-react';
import LetterGuideOverlay from './LetterGuideOverlay';
import { useWritingCanvas } from './useWritingCanvas';

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
  const {
    canvasRef,
    drawingState,
    strokeColors,
    strokeWidths,
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
  } = useWritingCanvas({ width, height, backgroundColor });

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    startDrawing(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    draw(x, y);
  };

  const handleMouseUp = () => stopDrawing();

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
            className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            בטל צעד אחרון
          </Button>

          <Button
            onClick={clearCanvas}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-red-50 transition-colors"
          >
            <Eraser className="w-4 h-4" />
            נקה הכל
          </Button>

          <Button
            onClick={() => {
              resetCanvas();
              clearCanvas();
            }}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-red-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            איפוס מלא
          </Button>

          <Button
            onClick={downloadCanvas}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-green-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            שמור יצירה
          </Button>

          {guideLetter && (
            <Button
              onClick={toggleGuide}
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 transition-all ${
                drawingState.showLetterGuide 
                  ? 'bg-green-100 border-green-400 text-green-700' 
                  : 'hover:bg-gray-50'
              }`}
            >
              {drawingState.showLetterGuide ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {drawingState.showLetterGuide ? 'הסתר מדריך' : 'הצג מדריך'}
            </Button>
          )}
        </div>

        {/* בחירת צבעים */}
        <div className="flex flex-wrap gap-2 justify-center items-center bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">בחר צבע:</span>
          </div>
          {strokeColors.map((color) => (
            <button
              key={color}
              onClick={() => changeStrokeColor(color)}
              className={`w-10 h-10 rounded-full border-3 transition-all duration-200 relative ${
                drawingState.currentStrokeColor === color 
                  ? 'border-gray-800 scale-110 shadow-lg' 
                  : 'border-gray-300 hover:scale-105 hover:border-gray-400'
              }`}
              style={{ backgroundColor: color }}
              title={`צבע ${color}`}
            >
              {drawingState.currentStrokeColor === color && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </button>
          ))}
        </div>

        {/* בחירת עובי קו */}
        <div className="flex flex-wrap gap-2 justify-center items-center bg-gray-50 p-3 rounded-lg">
          <span className="text-sm font-medium text-gray-700">עובי המכחול:</span>
          {strokeWidths.map((strokeWidth) => (
            <button
              key={strokeWidth}
              onClick={() => changeStrokeWidth(strokeWidth)}
              className={`flex items-center justify-center w-14 h-10 rounded-lg border-2 transition-all duration-200 ${
                drawingState.currentStrokeWidth === strokeWidth 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
              title={`עובי ${strokeWidth} פיקסלים`}
            >
              <div
                className="rounded-full bg-gray-600"
                style={{
                  width: `${Math.min(strokeWidth / 2, 10)}px`,
                  height: `${Math.min(strokeWidth / 2, 10)}px`
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* אזור הכתיבה */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-2">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border-2 border-dashed border-green-300 rounded-lg cursor-crosshair bg-white shadow-inner"
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

      {/* הוראות שימוש משופרות */}
      <div className="mt-4 text-center space-y-2">
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-3 rounded-lg">
          <p className="text-sm text-yellow-800 font-medium">
            💡 <strong>טיפ:</strong> השתמש בעכבר או במגע כדי לכתוב על המסך
          </p>
          <p className="text-sm text-orange-700">
            ✍️ זכור לכתוב מימין לשמאל כמו בעברית
          </p>
        </div>
      </div>
    </div>
  );
}
