"use client";

import { BaseGameItem } from "@/lib/types/core/base";
import { useAutoGame } from "@/hooks";
import { GameCardGrid } from "../../../shared";
import { GameHints } from "../../../shared";
import { TipsBox } from "../../../shared";
import VoiceAnswerButton from "../../../shared/buttons/VoiceAnswerButton";
import { REAL_PHOTO_CARD_MAP } from "../../../shared/GameCardMap";
import { useAudioSettingsStore } from "@/lib/stores/audioSettingsStore";

interface AutoGameBodyProps {
  renderCard?: ((item: BaseGameItem, onClick: (item: BaseGameItem) => void) => React.ReactNode) | undefined;
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
    gameType,
  } = useAutoGame();

  const showRealPhotos = useAudioSettingsStore((s) => s.showRealPhotos);
  const PhotoCard = showRealPhotos && gameType ? REAL_PHOTO_CARD_MAP[gameType] : undefined;
  const EffectiveCard = PhotoCard ?? CardComponent;

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
            <EffectiveCard item={item} onClick={handleItemClick} />
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

      {/* כפתורי פעולה */}
      <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
        <VoiceAnswerButton options={options || []} onMatch={handleItemClick} />
        <button
          onClick={() => setShowProgressModal(true)}
          className="
            px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg
            hover:bg-blue-600 hover:scale-105
            transition-[transform,colors] duration-200 font-bold
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
