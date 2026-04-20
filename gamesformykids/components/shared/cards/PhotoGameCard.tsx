"use client";

import { useState, ComponentType } from "react";
import { GameItemCardProps } from "@/lib/types/components/cards";
import {
  PHOTO_CARD_CONFIGS,
  PhotoCardConfig,
  PhotoCardGameType,
} from "@/lib/constants/ui/photoCardConfigs";

// ─── Generic Component ────────────────────────────────────────────────────────

interface PhotoGameCardProps extends GameItemCardProps {
  config: PhotoCardConfig;
}

function PhotoGameCard({ item, onClick, isSelected, config }: PhotoGameCardProps) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = config.imageUrls[item.name];
  const cardBg = config.cardBgMap?.[item.name] ?? config.cardBg;
  const border = isSelected ? config.selectedBorder : config.defaultBorder;

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        w-full aspect-square rounded-3xl cursor-pointer transition-all duration-300
        transform hover:scale-110 shadow-xl hover:shadow-2xl
        ${cardBg} flex flex-col items-center justify-center overflow-hidden
        border-8 ${border}
      `}
    >
      {/* Image area */}
      <div
        className={`flex-1 w-full overflow-hidden flex items-center justify-center ${config.imagePadding ?? ""}`}
      >
        {imageUrl && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={item.english || item.name}
            className={`w-full h-full ${config.objectFit === "cover" ? "object-cover" : "object-contain"}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-6xl">{item.emoji}</span>
        )}
      </div>

      {/* Label */}
      <div className={`w-full ${config.labelBg} py-1 px-2`}>
        <span
          className={`text-xs md:text-sm font-bold ${config.labelText} text-center block leading-tight`}
        >
          {item.hebrew}
        </span>
      </div>
    </button>
  );
}

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * יוצר קומפוננט card ספציפי לפי סוג המשחק.
 * משמש ב-GameCardMap במקום קובץ נפרד לכל משחק.
 *
 * @example
 * 'butterflies': createPhotoCard('butterflies'),
 */
export function createPhotoCard(
  gameType: PhotoCardGameType
): ComponentType<GameItemCardProps> {
  const config = PHOTO_CARD_CONFIGS[gameType];
  function Card(props: GameItemCardProps) {
    return <PhotoGameCard {...props} config={config} />;
  }
  Card.displayName = `PhotoGameCard(${gameType})`;
  return Card;
}

export default PhotoGameCard;
