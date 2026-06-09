'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

function pickThree() {
  const all = GamesRegistry.getAllGameRegistrations().filter(g => g.available);
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default function NotFoundSuggestions() {
  const [games] = useState(pickThree);

  if (games.length === 0) return null;

  return (
    <div className="mt-8">
      <p className="text-purple-700 font-bold text-lg mb-4">🎮 בינתיים — שחקו!</p>
      <div className="grid grid-cols-3 gap-3">
        {games.map(game => (
          <Link
            key={game.id}
            href={game.href}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl text-white font-bold text-sm text-center shadow-lg
              hover:scale-105 transition-transform duration-200 ${game.color}`}
          >
            <span className="text-3xl mb-1">{game.emoji}</span>
            <span className="leading-tight">{game.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
