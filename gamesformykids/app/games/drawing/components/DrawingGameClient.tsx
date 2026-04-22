"use client";

import styles from '../drawing.module.css';
import { useDrawingCanvas } from '../hooks/useDrawingCanvas';
import { useDrawingStore } from '../store/drawingStore';
import DrawingStartScreen from './DrawingStartScreen';
import DrawingHeader from './DrawingHeader';
import DrawingColorPalette from './DrawingColorPalette';
import DrawingTools from './DrawingTools';
import DrawingCanvas from './DrawingCanvas';
import DrawingActions from './DrawingActions';

export default function DrawingGameClient() {
  // רישום canvas ops לסטור
  useDrawingCanvas();

  const { isGameStarted } = useDrawingStore();

  if (!isGameStarted) {
    return <DrawingStartScreen />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4 ${styles.drawingContainer}`}>
      <div className="max-w-7xl mx-auto">
        <DrawingHeader />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 space-y-4">
            <DrawingColorPalette />
            <DrawingTools />
          </div>
          <DrawingCanvas />
        </div>

        <DrawingActions />
      </div>
    </div>
  );
}
