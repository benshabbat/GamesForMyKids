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
          className={
            isFullscreen
              ? 'fixed inset-0 z-40 bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 flex flex-col p-2'
              : 'relative'
          }
        >
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'צא ממסך מלא' : 'מסך מלא'}
            className="absolute top-2 left-2 z-50 w-9 h-9 rounded-full text-lg border-2 border-purple-300 bg-white text-purple-700 hover:bg-purple-50 active:scale-95 transition shadow-md"
          >
            {isFullscreen ? '⤦' : '⛶'}
          </button>

          <div className={isFullscreen ? 'flex-1 min-h-0' : ''}>
            <ColoringCanvas isFullscreen={isFullscreen} />
          </div>

          <div className={isFullscreen ? 'shrink-0' : ''}>
            <ColoringPalette />
            <ColoringActions />
          </div>
        </div>
      </div>
    </div>
  );
}
