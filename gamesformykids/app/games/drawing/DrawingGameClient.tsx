"use client";

import { useState, useRef, useEffect } from 'react';

// Hook לניהול משחק הציור
function useDrawingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#8B4513', '#800080', '#FFC0CB', '#A52A2A'
  ];

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
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
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

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

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

    document.addEventListener('touchstart', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isGameStarted]);

  return {
    canvasRef,
    isDrawing,
    currentColor,
    brushSize,
    colors,
    isGameStarted,
    setCurrentColor,
    setBrushSize,
    startDrawing,
    stopDrawing,
    draw,
    clearCanvas,
    startGame
  };
}

// קומפוננט מסך הפתיחה
function DrawingStartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="text-6xl mb-6">🎨</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          משחק ציורים
        </h1>
        <p className="text-gray-600 mb-8">
          בואו ניצור יצירות אמנות יפות!
          בחרו צבעים וציירו כל מה שבא לכם
        </p>
        
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold py-4 px-8 rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
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
    <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-md">
      <div className="w-full text-lg font-bold text-gray-700 mb-2">צבעים:</div>
      {colors.map(color => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          className={`w-10 h-10 rounded-full border-4 hover:scale-110 transition-transform ${
            currentColor === color ? 'border-gray-800' : 'border-gray-300'
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

// קומפוננט כלי הציור
function DrawingTools({ 
  brushSize, 
  onBrushSizeChange, 
  onClear 
}: { 
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <div className="text-lg font-bold text-gray-700">כלים:</div>
      
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          גודל מברשת: {brushSize}px
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => onBrushSizeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      
      <button
        onClick={onClear}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
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
    colors,
    isGameStarted,
    setCurrentColor,
    setBrushSize,
    startDrawing,
    stopDrawing,
    draw,
    clearCanvas,
    startGame
  } = useDrawingGame();

  if (!isGameStarted) {
    return <DrawingStartScreen onStart={startGame} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* כותרת */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎨 משחק ציורים</h1>
          <p className="text-gray-600">ציירו את מה שבא לכם!</p>
        <p className="text-sm text-gray-500 mt-2">
          💡 על מכשירים ניידים: געו במסך וגררו כדי לצייר
        </p>
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
              onBrushSizeChange={setBrushSize}
              onClear={clearCanvas}
            />
          </div>

          {/* אזור הציור */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-4 touch-none">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border-2 border-gray-300 rounded-lg cursor-crosshair w-full max-w-full block touch-none"
                style={{ 
                  touchAction: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  msUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
              />
            </div>
          </div>
        </div>

        {/* כפתור חזרה */}
        <div className="text-center mt-6">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            🏠 חזרה לתפריט הראשי
          </button>
        </div>
      </div>
    </div>
  );
}
