"use client";

import { useDrawingStore } from '../store/drawingStore';

export default function DrawingStatusBadge() {
  const { isErasing, brushSize, eraserSize } = useDrawingStore();

  return (
    <div className="mt-4 text-center">
      <div
        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shadow-md ${
          isErasing
            ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300'
            : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
        }`}
      >
        {isErasing ? '🧹 מצב מחיקה' : '🖌️ מצב ציור'}
        <span className="mr-2 font-bold">
          {isErasing ? ` ${eraserSize}px` : ` ${brushSize}px`}
        </span>
      </div>
    </div>
  );
}
