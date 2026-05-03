'use client';

import React from 'react';

interface CanvasMenuOverlayProps {
  emoji: string;
  title: string;
  description: React.ReactNode;
  onStart: () => void;
  best?: number;
  bestSuffix?: string;
  startLabel?: string;
  backdropClass?: string;
  cardWidth?: string;
  titleColor?: string;
  titleSize?: string;
  emojiSize?: string;
  buttonClass?: string;
}

export function CanvasMenuOverlay({
  emoji,
  title,
  description,
  onStart,
  best,
  bestSuffix = "",
  startLabel = "🚀 התחל!",
  backdropClass = "rounded-3xl bg-black/60",
  cardWidth = "w-72",
  titleColor = "text-gray-700",
  titleSize = "text-2xl",
  emojiSize = "text-5xl",
  buttonClass = "bg-gradient-to-l from-gray-600 to-gray-800 shadow-lg hover:opacity-90",
}: CanvasMenuOverlayProps) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${backdropClass}`}>
      <div className={`bg-white rounded-3xl p-7 text-center shadow-2xl ${cardWidth}`}>
        <div className={`${emojiSize} mb-2`}>{emoji}</div>
        <h1 className={`${titleSize} font-black ${titleColor} mb-1`}>{title}</h1>
        <p className="text-gray-500 text-sm mb-5">{description}</p>
        {best !== undefined && best > 0 && (
          <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {best}{bestSuffix}</p>
        )}
        <button
          onClick={onStart}
          className={`w-full py-4 rounded-2xl text-white font-black text-xl active:scale-95 transition-all ${buttonClass}`}
        >
          {startLabel}
        </button>
      </div>
    </div>
  );
}
