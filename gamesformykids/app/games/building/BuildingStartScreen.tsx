'use client';
import { useBuildingStore } from '@/app/games/building/store/buildingStore';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

export default function BuildingStartScreen() {
  const startGame = useBuildingStore((s) => s.startGame);

  return (
    <GameMenuCard
      emoji="🏗️"
      title="משחק הבנייה"
      description="בנו עולמות מדהימים עם צורות, צבעים ויצירתיות!"
      gradientClass="from-purple-600 via-pink-500 to-blue-600"
      buttonClass="from-purple-500 to-pink-500"
      startLabel="🚀 בואו נבנה!"
      onStart={startGame}
    >
      <div>
        <h3 className="text-lg font-semibold text-purple-700 mb-3">מה תוכלו לבנות:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-purple-100 p-3 rounded-lg">
            <div className="text-2xl mb-1">🟦</div>
            <div>צורות גיאומטריות</div>
          </div>
          <div className="bg-pink-100 p-3 rounded-lg">
            <div className="text-2xl mb-1">🎨</div>
            <div>בחירת צבעים</div>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <div className="text-2xl mb-1">✨</div>
            <div>אפקטים מיוחדים</div>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <div className="text-2xl mb-1">🏰</div>
            <div>מבנים מורכבים</div>
          </div>
        </div>
      </div>
    </GameMenuCard>
  );
}
