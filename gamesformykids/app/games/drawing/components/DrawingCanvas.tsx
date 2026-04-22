"use client";

import styles from '../drawing.module.css';
import { useDrawingCanvas } from '../hooks/useDrawingCanvas';
import { useDrawingGame } from '../hooks/useDrawingGame';
import { useDrawingStore } from '../store/drawingStore';
import DrawingStatusBadge from './DrawingStatusBadge';

export default function DrawingCanvas() {
  const { canvasRef, startDrawing, stopDrawing, draw } = useDrawingCanvas();
  const { isMobileDevice } = useDrawingGame();
  const { isErasing } = useDrawingStore();

  return (
    <div className="flex-1">
      <div className={`bg-white rounded-2xl shadow-2xl p-6 touch-none ${styles.canvasContainer}`}>
        <canvas
          ref={canvasRef}
          width={isMobileDevice ? 600 : 800}
          height={isMobileDevice ? 400 : 600}
          className={`border-4 rounded-xl w-full max-w-full block touch-none transition-all duration-200 cursor-crosshair ${
            isErasing ? 'border-orange-200' : 'border-blue-200'
          }`}
          style={{
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
            WebkitTouchCallout: 'none',
            WebkitTapHighlightColor: 'transparent',
            backgroundColor: '#fefefe',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
          }}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
        />
        <DrawingStatusBadge />
      </div>
    </div>
  );
}
