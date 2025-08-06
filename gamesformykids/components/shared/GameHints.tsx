/**
 * קומפוננט להצגת רמזים במשחק
 * מציג רמזים חכמים בהתבסס על טעויות השחקן
 */

"use client";

import React from 'react';

interface Hint {
  type: 'color' | 'shape' | 'sound' | 'description' | 'visual';
  text: string;
  audioText?: string;
  isRevealed: boolean;
  order: number;
}

interface GameHintsProps {
  hints: Hint[];
  hasMoreHints: boolean;
  onShowNextHint: () => void;
  className?: string;
}

export function GameHints({ hints, hasMoreHints, onShowNextHint, className = "" }: GameHintsProps) {
  if (hints.length === 0) {
    return null;
  }

  return (
    <div className={`bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-yellow-800 flex items-center">
          💡 רמזים
        </h3>
        {hasMoreHints && (
          <button
            onClick={onShowNextHint}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            רמז נוסף
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {hints.map((hint) => (
          <div
            key={`${hint.type}-${hint.text}-${hint.order}`}
            className="bg-white border border-yellow-200 rounded-md p-3 text-yellow-900"
          >
            <div className="flex items-center">
              {getHintIcon(hint.type)}
              <span className="mr-2 font-medium">{hint.text}</span>
            </div>
          </div>
        ))}
      </div>
      
      {hints.length > 0 && (
        <div className="mt-3 text-sm text-yellow-700 text-center">
          {hints.length} רמזים זמינים
          {hasMoreHints && " • לחץ לרמז נוסף"}
        </div>
      )}
    </div>
  );
}

function getHintIcon(type: string): string {
  switch (type) {
    case 'sound':
      return '🔊';
    case 'color':
      return '🎨';
    case 'shape':
      return '📐';
    case 'description':
      return '💭';
    case 'visual':
      return '👀';
    default:
      return '💡';
  }
}
