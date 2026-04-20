"use client";

import { useBuildingStore } from '@/lib/stores/buildingStore';

export default function BuildingStartScreen() {
  const startGame = useBuildingStore((s) => s.startGame);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600">
      <div className="text-center p-8 bg-white/90 rounded-3xl shadow-xl max-w-lg mx-4">
        <div className="text-6xl mb-4">🏗️</div>
        <h1 className="text-3xl font-bold text-purple-800 mb-4">משחק הבנייה</h1>
        <p className="text-lg text-purple-600 mb-6">
          בנו עולמות מדהימים עם צורות, צבעים ויצירתיות!
        </p>
        
        <div className="mb-6">
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
        
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg w-full"
        >
          🚀 בואו נבנה!
        </button>
      </div>
    </div>
  );
}
