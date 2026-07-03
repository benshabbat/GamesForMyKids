'use client';
import { useState } from 'react';
import { useShareCard } from '@/hooks/shared/social/useShareCard';

interface Props {
  gameEmoji: string;
  gameTitle: string;
  score: number;
  masteryStars?: number | undefined;
  pct?: number | undefined;
}

export default function ShareCardButton({ gameEmoji, gameTitle, score, masteryStars, pct }: Props) {
  const { shareCard } = useShareCard();
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (busy) return;
    setBusy(true);
    await shareCard({ gameEmoji, gameTitle, score, masteryStars, pct });
    setBusy(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={busy}
      className="mt-3 w-full py-2.5 rounded-2xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] active:scale-95 transition-[transform,background-color] flex items-center justify-center gap-2 disabled:opacity-60"
      aria-label="שתף כרטיס תוצאה"
    >
      <span>🖼️</span>
      <span>{busy ? 'מכין כרטיס...' : 'שתף כרטיס תוצאה'}</span>
    </button>
  );
}
