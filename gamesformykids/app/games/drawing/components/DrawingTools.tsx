"use client";

import styles from '../drawing.module.css';
import { useDrawingStore } from '../store/drawingStore';
import { useDrawingGame } from '../hooks/useDrawingGame';

export default function DrawingTools() {
  const { brushSize, eraserSize, isErasing, setBrushSize, setEraserSize, toggleEraser, selectDrawMode, clearCanvas } = useDrawingStore();
  const { isMobileDevice } = useDrawingGame();
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="text-lg font-bold text-gray-700 mb-4 text-center">🛠️ כלים</div>
      
      {/* מצב ציור/מחיקה */}
      <div className="space-y-3 mb-6">
        <div className="text-sm font-medium text-gray-600 text-center">מצב:</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={selectDrawMode}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-md ${styles.toolButton} ${
              !isErasing 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🖌️ ציור
          </button>
          <button
            onClick={toggleEraser}
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
              onChange={(e) => setBrushSize(Number(e.target.value))}
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
              onChange={(e) => setEraserSize(Number(e.target.value))}
              className={`w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer ${styles.sliderThumb}`}
            />
          </div>
        </div>
      )}
      
      <button
        onClick={clearCanvas}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg shadow-red-200"
      >
        🗑️ נקה הכל
      </button>
    </div>
  );
}
