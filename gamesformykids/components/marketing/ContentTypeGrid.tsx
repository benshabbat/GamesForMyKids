'use client';
import { useMemo, useState, useEffect } from 'react';
import GameCard from '@/components/game/GameCard';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';
import type { ContentType } from './ContentTypeTabBar';

const CONTENT_IDS: Record<Exclude<ContentType, 'games'>, string[]> = {
  creative: [
    'drawing', 'coloring', 'color-mix', 'art-craft', 'building', 'puzzles',
    'melody-maker', 'craft-guide', 'avatar-maker', 'tetris', 'puppet-story',
    'famous-paintings',
  ],
  riddles: [
    'riddles', 'riddles-pro', 'trivia', 'trivia-categories', 'true-false',
    'opposites', 'word-scramble', 'jokes-browser', 'rhyming', 'proverbs',
    'visual-opposites', 'emoji-math',
  ],
  tools: [
    'spinner', 'age-calculator', 'kids-encyclopedia', 'kids-songs', 'clock',
    'days-of-week', 'months-of-year', 'israel-map',
  ],
};

const TAB_TITLES: Record<Exclude<ContentType, 'games'>, { title: string; subtitle: string }> = {
  creative: { title: '🎨 יצירה ואומנות', subtitle: 'ציור, יצירה, מוזיקה ועוד' },
  riddles:  { title: '🤣 חידות וטריוויה', subtitle: 'חידות, ניחושים ושאלות' },
  tools:    { title: '🎲 כלים חינוכיים', subtitle: 'כלים שימושיים לכיתה ולבית' },
};

interface Props {
  contentType: Exclude<ContentType, 'games'>;
}

export default function ContentTypeGrid({ contentType }: Props) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  const games = useMemo(() => {
    const ids = CONTENT_IDS[contentType];
    return ids.flatMap((id) => {
      const g = GamesRegistry.getGameById(id);
      return g ? [g] : [];
    });
  }, [contentType]);

  const { title, subtitle } = TAB_TITLES[contentType];

  if (!hydrated) {
    return (
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="h-10 w-64 bg-gray-200 motion-safe:animate-pulse rounded-xl mx-auto mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 motion-safe:animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8" dir="rtl">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {games.map((game, index) => (
          <GameCard key={game.id} game={game} animationDelay={Math.min(index * 50, 600)} />
        ))}
      </div>
    </div>
  );
}
