"use client";

import styles from '../drawing.module.css';
import { useDrawingGame } from './useDrawingGame';
import DrawingStartScreen from './DrawingStartScreen';
import DrawingColorPalette from './DrawingColorPalette';
import DrawingTools from './DrawingTools';


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
            <DrawingColorPalette
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
