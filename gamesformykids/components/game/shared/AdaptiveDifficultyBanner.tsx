'use client';

import { useAdaptiveDifficulty } from '@/hooks/shared/game-state/useAdaptiveDifficulty';

export default function AdaptiveDifficultyBanner() {
  const { banner } = useAdaptiveDifficulty();

  if (!banner) return null;

  return (
    <div
      className={`
        fixed top-16 inset-x-0 z-40 flex justify-center pointer-events-none
      `}
      dir="rtl"
    >
      <div
        className={`
          px-5 py-2.5 rounded-full shadow-xl text-white font-bold text-sm
          motion-safe:animate-bounce
          ${banner.positive
            ? 'bg-linear-to-l from-emerald-500 to-teal-500'
            : 'bg-linear-to-l from-orange-500 to-amber-500'
          }
        `}
      >
        {banner.text}
      </div>
    </div>
  );
}
