"use client";

import { useUniversalGame } from '@/contexts/UniversalGameContext';
import { BaseGameItem } from "@/lib/types/core/base";
import { GameCardGrid } from "./cards/GameCardGrid";
import GameHints from "./feedback/GameHints";
import TipsBox from "./feedback/TipsBox";

export default function GameMainContent() {
  const game = useUniversalGame();

  return (
    <div className="space-y-8">
      {/* 🎯 Game Grid */}
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <GameCardGrid
          items={game.options}
          onItemClick={game.handleItemClick}
          currentChallenge={game.currentChallenge}
          gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          maxWidth="max-w-4xl"
          renderCustomCard={(item: BaseGameItem) => (
            <game.CardComponent item={item} onClick={game.handleItemClick} />
          )}
        />
      </div>

      {/* 💡 Hints */}
      {game.hints.length > 0 && (
        <div className="bg-yellow-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <GameHints 
            hints={[]}
            showHints={false}
          />
        </div>
      )}

      {/* 📊 Quick Stats */}
      <div className="text-center">
        <button
          onClick={() => game.setShowProgressModal(true)}
          className="
            px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg
            hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 
            transition-all duration-200 font-bold
          "
        >
          📈 דיוק משחק: {Math.round(game.currentAccuracy)}%
        </button>
      </div>

      {/* 💡 Tips */}
      <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl shadow-lg">
        <TipsBox />
      </div>
    </div>
  );
}
