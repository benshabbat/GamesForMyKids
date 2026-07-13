'use client';

import { useEffect, useRef, useState } from 'react';
import { ColoringHeader } from './ColoringHeader';
import { ColoringImageSelector } from './ColoringImageSelector';
import { ColoringCanvas } from './ColoringCanvas';
import { ColoringPalette } from './ColoringPalette';
import { ColoringActions } from './ColoringActions';

export default function ColoringGame() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      areaRef.current?.requestFullscreen();
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 p-4"
    >
      <div className="max-w-lg mx-auto">
        <ColoringHeader />
        <ColoringImageSelector />
        <div
          ref={areaRef}
          className={`relative ${
            isFullscreen
              ? 'bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 p-6 overflow-auto flex flex-col items-center justify-center gap-4'
              : ''
          }`}
        >
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'צא ממסך מלא' : 'מסך מלא'}
            className="absolute top-2 left-2 z-20 w-9 h-9 rounded-full text-lg border-2 border-purple-300 bg-white text-purple-700 hover:bg-purple-50 active:scale-95 transition shadow-md"
          >
            {isFullscreen ? '⤦' : '⛶'}
          </button>
          <div className={isFullscreen ? 'w-full max-w-lg' : ''}>
            <ColoringCanvas isFullscreen={isFullscreen} />
            <ColoringPalette />
            <ColoringActions />
          </div>
        </div>
      </div>
    </div>
  );
}
