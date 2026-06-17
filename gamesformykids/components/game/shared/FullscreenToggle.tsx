'use client';

import { useState, useEffect } from 'react';

export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported('requestFullscreen' in document.documentElement);
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggle = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // browser denied or not supported — ignore
    }
  };

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isFullscreen ? 'יציאה ממסך מלא' : 'מסך מלא'}
      title={isFullscreen ? 'יציאה ממסך מלא' : 'מסך מלא'}
      className="px-2.5 py-2 rounded-lg shadow-lg text-sm font-bold bg-white/80 text-gray-600 hover:bg-white hover:scale-105 transition-[transform,background-color] duration-200"
    >
      {isFullscreen ? '⊠' : '⛶'}
    </button>
  );
}
