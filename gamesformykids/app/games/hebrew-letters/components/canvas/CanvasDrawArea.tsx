'use client';

import React from 'react';
import LetterGuideOverlay from './LetterGuideOverlay';

interface CanvasDrawAreaProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
  guideLetter?: string;
  showLetterGuide: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
  onTouchStart: (e: React.TouchEvent<HTMLCanvasElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLCanvasElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLCanvasElement>) => void;
}

export default function CanvasDrawArea({
  canvasRef,
  width,
  height,
  guideLetter,
  showLetterGuide,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: CanvasDrawAreaProps) {
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
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
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
