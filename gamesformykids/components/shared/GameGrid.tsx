import { ReactNode } from "react";

export interface GameGridProps<T> {
  items: T[];
  currentItem?: T | null;
  renderItem: (item: T, isCorrect: boolean) => ReactNode;
  gridCols?: string;
  maxWidth?: string;
}

export function GameGrid<T extends { name: string }>({
  items,
  currentItem,
  renderItem,
  gridCols = "grid-cols-2 md:grid-cols-3",
  maxWidth = "max-w-3xl"
}: GameGridProps<T>) {
  return (
    <div className={`grid ${gridCols} gap-6 ${maxWidth} mx-auto`}>
      {items.map((item) => (
        <div key={item.name}>
          {renderItem(item, currentItem?.name === item.name)}
        </div>
      ))}
    </div>
  );
}
