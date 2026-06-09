'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

export default function SurpriseMeButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    if (spinning) return;
    setSpinning(true);

    const available = GamesRegistry.getAllGameRegistrations().filter(g => g.available);
    if (available.length === 0) return;

    const pick = available[Math.floor(Math.random() * available.length)]!;

    setTimeout(() => {
      setSpinning(false);
      router.push(pick.href);
    }, 350);
  };

  return (
    <div className="flex justify-center my-6">
      <button
        onClick={handleClick}
        disabled={spinning}
        className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-xl text-white shadow-xl
          bg-linear-to-r from-fuchsia-500 to-orange-400
          hover:from-fuchsia-600 hover:to-orange-500
          active:scale-95 transition-all duration-200 disabled:opacity-80"
        aria-label="משחק אקראי"
      >
        <span
          className={`text-3xl transition-transform duration-300 ${spinning ? 'animate-spin' : ''}`}
          aria-hidden
        >
          🎲
        </span>
        הפתיעו אותי!
      </button>
    </div>
  );
}
