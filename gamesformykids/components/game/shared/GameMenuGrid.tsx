'use client';

import { ReactNode } from 'react';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

// Tailwind safe-list (full strings so JIT doesn't purge):
// sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5
// gap-2 gap-3 gap-4 gap-6
const COLS_MAP = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
} as const;

const GAP_MAP = {
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  6: 'gap-6',
} as const;

export interface MenuCardConfig {
  emoji: string;
  title: string;
  description: string;
  gradientClass: string;
  animateEmoji?: boolean | undefined;
  hint?: string | undefined;
}

interface Props<T> {
  card: MenuCardConfig;
  items: T[];
  getKey: (item: T) => string | number;
  onSelect: (item: T) => void;
  renderItem: (item: T) => ReactNode;
  buttonClass: string;
  columns?: keyof typeof COLS_MAP;
  gap?: keyof typeof GAP_MAP;
  footer?: ReactNode;
}

/**
 * Configuration-driven menu renderer.
 * Wraps GameMenuCard and renders a responsive grid of selectable buttons.
 * Use for game lobby screens that offer a choice of levels/categories.
 */
export default function GameMenuGrid<T>({
  card,
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
      emoji={card.emoji}
      title={card.title}
      description={card.description}
      gradientClass={card.gradientClass}
      animateEmoji={card.animateEmoji}
      hint={card.hint}
    >
      <div className={`grid grid-cols-2 ${COLS_MAP[columns]} ${GAP_MAP[gap]}`}>
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
