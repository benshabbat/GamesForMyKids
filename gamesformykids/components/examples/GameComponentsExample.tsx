/**
 * Game Card Example
 * דוגמה לקומפוננט שמשתמש בקונטקסט ללא props drilling
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { useGameActions, useGameInfo } from '@/hooks/shared/useGameContext';

interface GameCardExampleProps {
  itemId: string;
  itemName: string;
  isCorrect: boolean;
  imageUrl?: string;
}

/**
 * קומפוננט קלף משחק שמשתמש בקונטקסט
 * אין צורך להעביר props של functions!
 */
export function GameCardExample({ 
  itemId, 
  itemName, 
  isCorrect, 
  imageUrl 
}: GameCardExampleProps) {
  // 🎮 שימוש בקונטקסט - ללא props drilling!
  const { onCorrect, onWrong } = useGameActions();
  const { gameType } = useGameInfo();

  const handleClick = () => {
    if (isCorrect) {
      onCorrect({ item_id: itemId, item_name: itemName });
    } else {
      onWrong({ item_id: itemId, item_name: itemName });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-xl shadow-lg transition-all duration-200
        hover:scale-105 hover:shadow-xl active:scale-95
        ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'}
      `}
    >
      {/* תמונה */}
      {imageUrl && (
        <div className="aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={itemName}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* תוכן */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{itemName}</h3>
        <p className="text-sm text-gray-500">משחק: {gameType}</p>
      </div>
      
      {/* אפקט הובר */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity" />
    </button>
  );
}

/**
 * Game Score Widget
 * ווידג'ט ציון שמשתמש בקונטקסט
 */
export function GameScoreWidget() {
  const { score, level, title } = useGameInfo();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-purple-100 text-sm">רמה {level}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{score}</div>
          <p className="text-purple-100 text-xs">נקודות</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Game Controls
 * פקדי משחק שמשתמשים בקונטקסט
 */
export function GameControlsWidget() {
  const { start, pause } = useGameActions();
  const { gameType } = useGameInfo();

  return (
    <div className="flex gap-2">
      <button
        onClick={start}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
      >
        ▶️ התחל
      </button>
      <button
        onClick={pause}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        ⏸️ השהה
      </button>
      <div className="flex items-center px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
        {gameType}
      </div>
    </div>
  );
}

/**
 * Game Grid Example
 * רשת משחק שיוצרת קלפים אוטומטית
 */
interface GameGridExampleProps {
  items: Array<{
    id: string;
    name: string;
    imageUrl?: string;
  }>;
  correctId: string;
}

export function GameGridExample({ items, correctId }: GameGridExampleProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <GameCardExample
          key={item.id}
          itemId={item.id}
          itemName={item.name}
          isCorrect={item.id === correctId}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
}
