'use client';

import { useBuildingStore } from '@/lib/stores/buildingStore';

export default function BuildingGameHeader() {
  const score = useBuildingStore((s) => s.score);
  const achievements = useBuildingStore((s) => s.achievements);

  return (
    <div className="text-center mb-4 md:mb-6">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-xl animate-pulse">
        🏗️ סטודיו הבנייה הקסום 🏗️
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-6 mb-2 md:mb-4">
        <div className="bg-yellow-400/90 backdrop-blur-sm rounded-xl px-3 py-1 md:px-4 md:py-2">
          <span className="text-lg md:text-xl font-bold text-gray-800">ניקוד: {score}</span>
        </div>
        {achievements.length > 0 && (
          <div className="bg-purple-400/90 backdrop-blur-sm rounded-xl px-3 py-1 md:px-4 md:py-2">
            <span className="text-white font-bold text-sm md:text-base">🏆 הישגים: {achievements.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
