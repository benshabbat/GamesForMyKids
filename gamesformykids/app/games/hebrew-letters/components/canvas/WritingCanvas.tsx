'use client';

import { useWritingCanvas } from './useWritingCanvas';
import CanvasToolbar from './CanvasToolbar';
import CanvasColorPicker from './CanvasColorPicker';
import CanvasStrokeWidthPicker from './CanvasStrokeWidthPicker';
import CanvasDrawArea from './CanvasDrawArea';

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

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    startDrawing(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    draw(x, y);
  };

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
      <div className="mb-4 space-y-4">
        <CanvasToolbar
          pathsLength={drawingState.paths.length}
          showLetterGuide={drawingState.showLetterGuide}
          guideLetter={guideLetter}
          onUndo={undoLastStroke}
          onClear={clearCanvas}
          onReset={() => { resetCanvas(); clearCanvas(); }}
          onDownload={downloadCanvas}
          onToggleGuide={toggleGuide}
        />

        <CanvasColorPicker
          colors={strokeColors}
          currentColor={drawingState.currentStrokeColor}
          onChange={changeStrokeColor}
        />

        <CanvasStrokeWidthPicker
          widths={strokeWidths}
          currentWidth={drawingState.currentStrokeWidth}
          onChange={changeStrokeWidth}
        />
      </div>

      <CanvasDrawArea
        canvasRef={canvasRef}
        width={width}
        height={height}
        guideLetter={guideLetter}
        showLetterGuide={drawingState.showLetterGuide}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

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
