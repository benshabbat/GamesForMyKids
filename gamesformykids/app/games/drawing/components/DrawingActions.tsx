"use client";

import styles from '../drawing.module.css';
import { useDrawingStore } from '../store/drawingStore';

export default function DrawingActions() {
  const { clearCanvas, saveDrawing } = useDrawingStore();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
      <button
        onClick={clearCanvas}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 font-bold shadow-lg shadow-red-200"
      >
        🗑️ נקה הכל
      </button>

      <button
        onClick={saveDrawing}
        className={`bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 font-bold shadow-lg shadow-green-200 ${styles.saveButton}`}
      >
        💾 שמור ציור
      </button>
    </div>
  );
}
