'use client';

import { ReactNode } from 'react';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

// Tailwind safe-list (full strings so JIT doesn't purge):
// grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5
// gap-2 gap-3 gap-4 gap-6
const COLS_MAP = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
} as const;

const GAP_MAP = {
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  6: 'gap-6',
} as const;

interface Props<T> {
  // GameMenuCard passthrough
  emoji: string;
  title: string;
  description: string;
  gradientClass: string;
  animateEmoji?: boolean;
  hint?: string;
  // Grid
  items: T[];
  getKey: (item: T) => string | number;
  onSelect: (item: T) => void;
  renderItem: (item: T) => ReactNode;
  buttonClass: string;
  columns?: keyof typeof COLS_MAP;
  gap?: keyof typeof GAP_MAP;
  // Optional footer rendered below the grid
  footer?: ReactNode;
}

/**
 * Configuration-driven menu renderer.
 * Wraps GameMenuCard and renders a responsive grid of selectable buttons.
 * Use for game lobby screens that offer a choice of levels/categories.
 */
export default function GameMenuGrid<T>({
  emoji,
  title,
  description,
  gradientClass,
  animateEmoji,
  hint,
  items,
  getKey,
  onSelect,
  renderItem,
  buttonClass,
  columns = 2,
  gap = 3,
  footer,
}: Props<T>) {
  return (
    <GameMenuCard
      emoji={emoji}
      title={title}
      description={description}
      gradientClass={gradientClass}
      animateEmoji={animateEmoji}
      hint={hint}
    >
      <div className={`grid ${COLS_MAP[columns]} ${GAP_MAP[gap]}`}>
        {items.map((item) => (
          <button
            key={getKey(item)}
            onClick={() => onSelect(item)}
            className={buttonClass}
          >
            {renderItem(item)}
          </button>
        ))}
      </div>
      {footer}
    </GameMenuCard>
  );
}
