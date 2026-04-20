'use client';

import LetterGuideOverlay from './LetterGuideOverlay';
import { useWritingCanvasContext } from './WritingCanvasContext';

const CANVAS_STYLE = {
  maxWidth: '100%',
  height: 'auto',
  touchAction: 'none',
  userSelect: 'none',
} as const;

export default function CanvasDrawArea() {
  const {
    canvasRef,
    guideLetter,
    drawingState,
    stopDrawing,
    onMouseDown,
    onMouseMove,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = useWritingCanvasContext();

  const { showLetterGuide, canvasWidth: width, canvasHeight: height } = drawingState;

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-2">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border-2 border-dashed border-green-300 rounded-lg cursor-crosshair bg-white shadow-inner"
        style={CANVAS_STYLE}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {guideLetter && showLetterGuide && (
        <LetterGuideOverlay />
      )}
    </div>
  );
}
