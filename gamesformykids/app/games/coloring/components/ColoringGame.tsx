'use client';

import { ColoringHeader } from './ColoringHeader';
import { ColoringImageSelector } from './ColoringImageSelector';
import { ColoringCanvas } from './ColoringCanvas';
import { ColoringPalette } from './ColoringPalette';
import { ColoringActions } from './ColoringActions';

export default function ColoringGame() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 p-4"
      dir="rtl"
    >
      <div className="max-w-lg mx-auto">
        <ColoringHeader />
        <ColoringImageSelector />
        <ColoringCanvas />
        <ColoringPalette />
        <ColoringActions />
      </div>
    </div>
  );
}
