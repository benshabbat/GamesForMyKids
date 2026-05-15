'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useDrawingGame } from '../hooks/useDrawingGame';

export default function DrawingStartScreen() {
  const { startGame } = useDrawingGame();

  return (
    <GameMenuCard
      emoji="🎨"
      title="משחק ציורים"
      description="בואו ניצור יצירות אמנות יפות! בחרו צבעים, ציירו ומחקו כל מה שבא לכם"
      gradientClass="from-purple-400 via-pink-400 to-orange-400"
      buttonClass="from-blue-500 to-purple-600"
      startLabel="🎨 בואו נתחיל לצייר!"
      animateEmoji
      onStart={() => startGame()}
    >
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span>🖌️</span>
            <span>ציור עם מברשות בגדלים שונים</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>🧹</span>
            <span>מחיקה מדויקת בגדלים שונים</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>🎨</span>
            <span>12 צבעים יפים לבחירה</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>💾</span>
            <span>שמירת הציור למחשב</span>
          </div>
        </div>
      </div>
    </GameMenuCard>
  );
}
