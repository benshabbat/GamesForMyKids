"use client";

import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import { useKeyboardAnswerSelect } from '@/hooks/shared/useKeyboardAnswerSelect';
import { BaseGameItem } from "@/lib/types/core/base";
import { GameCardGrid } from "./cards/GameCardGrid";
import GameHints from "./feedback/GameHints";
import TipsBox from "./feedback/TipsBox";

export default function GameMainContent() {
  const game = useUniversalGame();
  const keyboardEnabled = game.isPlaying && !game.showCelebration;

  const { focusedIdx } = useKeyboardAnswerSelect(
    game.options.length,
    (idx) => {
      const item = game.options[idx] as BaseGameItem | undefined;
      if (item) game.handleItemClick(item);
    },
    keyboardEnabled,
  );

  return (
    <div className="space-y-8">
      {/* 🎯 Game Grid */}
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <GameCardGrid
          items={game.options as BaseGameItem[]}
          onItemClick={game.handleItemClick}
          currentChallenge={game.currentChallenge}
          gridCols="grid-cols-2 md:grid-cols-4"
          maxWidth="max-w-4xl"
          {...(keyboardEnabled ? { focusedIdx } : {})}
          renderCustomCard={(item: BaseGameItem) => (
            <game.CardComponent item={item} onClick={game.handleItemClick} />
          )}
        />

        {/* Keyboard hints — desktop only */}
        {keyboardEnabled && (
          <div className="hidden md:flex justify-center gap-3 mt-4" aria-hidden>
            {game.options.slice(0, 4).map((_, idx) => (
              <span
                key={idx}
                className={`text-xs font-mono px-2 py-0.5 rounded border transition-colors ${
                  idx === focusedIdx
                    ? 'border-blue-400 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-400 bg-gray-50'
                }`}
              >
                [{idx + 1}]
              </span>
            ))}
          </div>
        )}
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
            px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg
            hover:from-purple-600 hover:to-pink-600 transform hover:scale-105
            transition-transform duration-200 font-bold
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
