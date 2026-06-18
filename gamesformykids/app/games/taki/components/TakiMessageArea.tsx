'use client';

import { useTakiGame } from '../useTakiGame';

export default function TakiMessageArea() {
  const { message, playerHand } = useTakiGame();

  return (
    <div className="text-center px-4">
      <p className="text-yellow-200 text-sm font-medium bg-black/30 rounded-xl py-2 px-3 inline-block max-w-xs">
        {message}
        {playerHand.length <= 2 && (
          <span className="ms-2 font-bold text-yellow-400 animate-bounce inline-block">טאקי! 🃏</span>
        )}
      </p>
    </div>
  );
}
