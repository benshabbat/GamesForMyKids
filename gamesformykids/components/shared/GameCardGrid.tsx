import { ReactNode } from "react";
import { Color, Letter, Shape, NumberItem } from "@/lib/types/game";
import { GameCard } from "./GameCard";

// Generic type for all game items
type GameItemType = Color | Letter | Shape | NumberItem;

interface GameCardGridProps<T extends GameItemType> {
  items: T[];
  onItemClick: (item: T) => void;
  currentChallenge?: T | null;
  gridCols?: string;
  maxWidth?: string;
  showSoundIcon?: boolean;
  renderCustomCard?: (item: T, isCorrect: boolean) => ReactNode;
}

export function GameCardGrid<T extends GameItemType>({
  items,
  onItemClick,
  currentChallenge,
  gridCols = "grid-cols-2 md:grid-cols-3",
  maxWidth = "max-w-3xl",
  showSoundIcon = true,
  renderCustomCard,
}: GameCardGridProps<T>) {
  return (
    <div className={`grid ${gridCols} gap-6 ${maxWidth} mx-auto`}>
      {items.map((item) => (
        <div key={item.name}>
          {renderCustomCard ? (
            renderCustomCard(item, currentChallenge?.name === item.name)
          ) : (
            <GameCard
              item={item}
              onClick={onItemClick}
              isCorrect={currentChallenge?.name === item.name}
              showSoundIcon={showSoundIcon}
            />
          )}
        </div>
      ))}
    </div>
  );
}
