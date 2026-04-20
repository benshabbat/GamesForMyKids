'use client';

import LetterGuideOverlay from './LetterGuideOverlay';
import { useWritingCanvasContext } from './WritingCanvasContext';

interface CanvasDrawAreaProps {
  width: number;
  height: number;
  guideLetter?: string;
}

export default function CanvasDrawArea({ width, height, guideLetter }: CanvasDrawAreaProps) {
  const {
    canvasRef,
    drawingState,
    getMousePos,
    getTouchPos,
    startDrawing,
    draw,
    stopDrawing,
  } = useWritingCanvasContext();

  const showLetterGuide = drawingState.showLetterGuide;

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    startDrawing(x, y);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    draw(x, y);
  };
  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { x, y } = getTouchPos(e);
    startDrawing(x, y);
  };
  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { x, y } = getTouchPos(e);
    draw(x, y);
  };
  const onTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-2">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border-2 border-dashed border-green-300 rounded-lg cursor-crosshair bg-white shadow-inner"
        style={{ maxWidth: '100%', height: 'auto', touchAction: 'none', userSelect: 'none' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {guideLetter && showLetterGuide && (
        <LetterGuideOverlay
          letter={guideLetter}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}
