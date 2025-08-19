"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../drawing.module.css';

// Hook לניהול משחק הציור
function useDrawingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [eraserSize, setEraserSize] = useState(10);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#8B4513', '#800080', '#FFC0CB', '#A52A2A'
  ];

  // זיהוי מכשיר נייד
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getEventPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
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
        // For touchend events, use changedTouches
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
    
    // Calculate scaled position based on canvas display size vs actual size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    
    // Start the path at the current position
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { x, y } = getEventPosition(e);
    
    if (isErasing) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = currentColor;
    }
    
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = (e?: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (e) e.preventDefault();
    setIsDrawing(false);
    
    // End the current path
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath(); // Start a new path for the next drawing
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getEventPosition(e);

    if (isErasing) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = currentColor;
    }

    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, []);

  const toggleEraser = useCallback(() => {
    setIsErasing(!isErasing);
  }, [isErasing]);

  const selectDrawMode = useCallback(() => {
    setIsErasing(false);
  }, []);

  const startGame = () => {
    setIsGameStarted(true);
  };

  // Prevent scrolling on mobile when touching the canvas area
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (e.target && (e.target as HTMLElement).closest('canvas')) {
        e.preventDefault();
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isGameStarted) return;
      
      switch(e.key.toLowerCase()) {
        case 'e':
          toggleEraser();
          break;
        case 'd':
          selectDrawMode();
          break;
        case 'c':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            clearCanvas();
          }
          break;
        case '+':
        case '=':
          if (isErasing) {
            setEraserSize(prev => Math.min(prev + 2, 40));
          } else {
            setBrushSize(prev => Math.min(prev + 1, 20));
          }
          break;
        case '-':
        case '_':
          if (isErasing) {
            setEraserSize(prev => Math.max(prev - 2, 5));
          } else {
            setBrushSize(prev => Math.max(prev - 1, 1));
          }
          break;
      }
    };

    document.addEventListener('touchstart', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('touchstart', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGameStarted, isErasing, toggleEraser, selectDrawMode, clearCanvas, setBrushSize, setEraserSize]);

  return {
    canvasRef,
    isDrawing,
    currentColor,
    brushSize,
    colors,
    isGameStarted,
    isErasing,
    eraserSize,
    isMobileDevice,
    setCurrentColor,
    setBrushSize,
    setEraserSize,
    startDrawing,
    stopDrawing,
    draw,
    clearCanvas,
    toggleEraser,
    selectDrawMode,
    startGame
  };
}

// קומפוננט מסך הפתיחה
function DrawingStartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center ${styles.drawingContainer}`}>
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4 text-center">
        <div className="text-8xl mb-6 animate-bounce">🎨</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          משחק ציורים
        </h1>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          בואו ניצור יצירות אמנות יפות!<br />
          בחרו צבעים, ציירו ומחקו כל מה שבא לכם
        </p>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span>🖌️</span>
              <span>ציור עם מברשות בגדלים שונים</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>🧹</span>
              <span>מחיקה מדויקת בגדלים שונים</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>🎨</span>
              <span>12 צבעים יפים לבחירה</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>💾</span>
              <span>שמירת הציור למחשב</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold py-4 px-8 rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-200 w-full"
        >
          🎨 בואו נתחיל לצייר!
        </button>
      </div>
    </div>
  );
}

// קומפוננט פלטת הצבעים
function ColorPalette({ 
  colors, 
  currentColor, 
  onColorChange 
}: { 
  colors: string[];
  currentColor: string;
  onColorChange: (color: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="text-lg font-bold text-gray-700 mb-4 text-center">🎨 צבעים</div>
      <div className="grid grid-cols-4 gap-3">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`w-12 h-12 rounded-full border-4 hover:scale-110 transition-all duration-200 shadow-md ${
              currentColor === color ? 'border-gray-800 ring-2 ring-blue-300' : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color }}
            title={`צבע ${color}`}
          />
        ))}
      </div>
    </div>
  );
}

// קומפוננט כלי הציור
function DrawingTools({ 
  brushSize, 
  eraserSize,
  isErasing,
  onBrushSizeChange,
  onEraserSizeChange,
  onToggleEraser,
  onSelectDrawMode,
  onClear,
  isMobileDevice
}: { 
  brushSize: number;
  eraserSize: number;
  isErasing: boolean;
  onBrushSizeChange: (size: number) => void;
  onEraserSizeChange: (size: number) => void;
  onToggleEraser: () => void;
  onSelectDrawMode: () => void;
  onClear: () => void;
  isMobileDevice: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="text-lg font-bold text-gray-700 mb-4 text-center">🛠️ כלים</div>
      
      {/* מצב ציור/מחיקה */}
      <div className="space-y-3 mb-6">
        <div className="text-sm font-medium text-gray-600 text-center">מצב:</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onSelectDrawMode}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-md ${styles.toolButton} ${
              !isErasing 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🖌️ ציור
          </button>
          <button
            onClick={onToggleEraser}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-md ${styles.toolButton} ${
              isErasing 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🧹 מחיקה
          </button>
        </div>
      </div>
      
      {/* גודל מברשת */}
      {!isErasing && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-3 text-center">
            גודל מברשת: <span className="font-bold text-blue-600">{brushSize}px</span>
          </label>
          <div className="px-2">
            <input
              type="range"
              min="1"
              max={isMobileDevice ? "15" : "20"}
              value={brushSize}
              onChange={(e) => onBrushSizeChange(Number(e.target.value))}
              className={`w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer ${styles.sliderThumb}`}
            />
          </div>
        </div>
      )}
      
      {/* גודל מחק */}
      {isErasing && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-3 text-center">
            גודל מחק: <span className="font-bold text-orange-600">{eraserSize}px</span>
          </label>
          <div className="px-2">
            <input
              type="range"
              min="5"
              max={isMobileDevice ? "30" : "40"}
              value={eraserSize}
              onChange={(e) => onEraserSizeChange(Number(e.target.value))}
              className={`w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer ${styles.sliderThumb}`}
            />
          </div>
        </div>
      )}
      
      <button
        onClick={onClear}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg shadow-red-200"
      >
        🗑️ נקה הכל
      </button>
    </div>
  );
}

// הקומפוננט הראשי - Client Component
export default function DrawingGameClient() {
  const {
    canvasRef,
    currentColor,
    brushSize,
    eraserSize,
    colors,
    isGameStarted,
    isErasing,
    isMobileDevice,
    setCurrentColor,
    setBrushSize,
    setEraserSize,
    startDrawing,
    stopDrawing,
    draw,
    clearCanvas,
    toggleEraser,
    selectDrawMode,
    startGame
  } = useDrawingGame();

  if (!isGameStarted) {
    return <DrawingStartScreen onStart={startGame} />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4 ${styles.drawingContainer}`}>
      <div className="max-w-7xl mx-auto">
        {/* כותרת */}
        <div className="text-center mb-6">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🎨</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">משחק ציורים</h1>
            <p className="text-gray-600 mb-4">ציירו את מה שבא לכם!</p>
            <p className="text-sm text-gray-500">
              {isMobileDevice 
                ? '💡 געו במסך וגררו כדי לצייר או למחוק'
                : '💡 לחצו וגררו עם העכבר כדי לצייר או למחוק'
              }
            </p>
            {!isMobileDevice && (
              <details className="mt-3">
                <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                  ⌨️ קיצורי מקלדת
                </summary>
                <div className="text-xs text-gray-500 mt-2 space-y-1 bg-gray-50 p-3 rounded-lg">
                  <div>E - מחק | D - ציור | Ctrl+C - נקה הכל</div>
                  <div>+ להגדיל מברשת | - להקטין מברשת</div>
                </div>
              </details>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* כלים */}
          <div className="lg:w-64 space-y-4">
            <ColorPalette
              colors={colors}
              currentColor={currentColor}
              onColorChange={setCurrentColor}
            />
            
            <DrawingTools
              brushSize={brushSize}
              eraserSize={eraserSize}
              isErasing={isErasing}
              onBrushSizeChange={setBrushSize}
              onEraserSizeChange={setEraserSize}
              onToggleEraser={toggleEraser}
              onSelectDrawMode={selectDrawMode}
              onClear={clearCanvas}
              isMobileDevice={isMobileDevice}
            />
          </div>

          {/* אזור הציור */}
          <div className="flex-1">
            <div className={`bg-white rounded-2xl shadow-2xl p-6 touch-none ${styles.canvasContainer}`}>
              <canvas
                ref={canvasRef}
                width={isMobileDevice ? 600 : 800}
                height={isMobileDevice ? 400 : 600}
                className={`border-4 border-gray-200 rounded-xl w-full max-w-full block touch-none transition-all duration-200 ${
                  isErasing ? 'cursor-crosshair border-orange-200' : 'cursor-crosshair border-blue-200'
                }`}
                style={{ 
                  touchAction: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  msUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  backgroundColor: '#fefefe',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
              />
              
              {/* מחוון מצב נוכחי */}
              <div className="mt-4 text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shadow-md ${
                  isErasing 
                    ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300' 
                    : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
                }`}>
                  {isErasing ? '🧹 מצב מחיקה' : '🖌️ מצב ציור'}
                  <span className="mr-2 font-bold">
                    {isErasing ? ` ${eraserSize}px` : ` ${brushSize}px`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* כפתורי ניווט ופעולות */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button
            onClick={clearCanvas}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 font-bold shadow-lg shadow-red-200"
          >
            🗑️ נקה הכל
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-2xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🏠 חזרה לתפריט הראשי
          </button>
          
          {/* כפתור שמירה לגלריה */}
          <button
            onClick={() => {
              if (canvasRef.current) {
                const link = document.createElement('a');
                link.download = `ציור-${new Date().getTime()}.png`;
                link.href = canvasRef.current.toDataURL();
                link.click();
              }
            }}
            className={`bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 font-bold shadow-lg shadow-green-200 ${styles.saveButton}`}
          >
            💾 שמור ציור
          </button>
        </div>
      </div>
    </div>
  );
}
