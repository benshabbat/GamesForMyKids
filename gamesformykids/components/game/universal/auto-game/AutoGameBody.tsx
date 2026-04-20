"use client";

import { BaseGameItem } from "@/lib/types/core/base";
import { useAutoGame } from "@/hooks";
import { GameCardGrid } from "../../../shared";
import { GameHints } from "../../../shared";
import { TipsBox } from "../../../shared";

interface AutoGameBodyProps {
  renderCard?: (item: BaseGameItem, onClick: (item: BaseGameItem) => void) => React.ReactNode;
}

/**
 * AutoGameBody - content section of AutoGamePage
 * Contains: GameCardGrid, GameHints, accuracy button, TipsBox
 */
export function AutoGameBody({ renderCard }: AutoGameBodyProps) {
  const {
    options,
    handleItemClick,
    currentChallenge,
    hints,
    currentAccuracy,
    setShowProgressModal,
    CardComponent,
  } = useAutoGame();

  return (
    <div className="space-y-6">
      {/* Grid אוטומטי */}
      <GameCardGrid
        items={options || []}
        onItemClick={handleItemClick}
        currentChallenge={currentChallenge}
        gridCols="grid-cols-2"
        maxWidth="max-w-2xl"
        renderCustomCard={(item) => (
          renderCard ? renderCard(item, handleItemClick) : (
            <CardComponent item={item} onClick={handleItemClick} />
          )
        )}
      />

      {/* רמזים חכמים */}
      {hints && hints.length > 0 && (
        <GameHints
          hints={hints.map((hint, index) => ({
            id: `hint-${index}`,
            text: hint,
            type: "info" as const,
            priority: index,
          }))}
          showHints={true}
        />
      )}

      {/* כפתור סטטיסטיקות */}
      <div className="text-center mt-4">
        <button
          onClick={() => setShowProgressModal(true)}
          className="
            px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg
            hover:bg-blue-600 transform hover:scale-105 
            transition-all duration-200 font-bold
          "
        >
          📊 דיוק: {currentAccuracy || 0}%
        </button>
      </div>

      {/* Tips אוטומטי */}
      <TipsBox />
    </div>
  );
}
