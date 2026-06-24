'use client';

import { useRouter } from 'next/navigation';
import { useChampionshipStore } from '@/lib/stores/championshipStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';

const ROUND_EMOJIS = ['1️⃣', '2️⃣', '3️⃣'];

export default function ChampionshipOverlay() {
  const router = useRouter();
  const { active, categoryId, categoryTitle, gameIds, round, scores, recordRoundScore } =
    useChampionshipStore();
  const score = useGameProgressStore((s) => s.score);

  if (!active || round < 1 || round > 3 || !gameIds) return null;

  const roundIdx = round - 1;
  const totalSoFar = scores.reduce<number>((sum, s) => sum + (s ?? 0), 0);

  const handleFinishRound = () => {
    recordRoundScore(score);
    router.push(`/championship/${categoryId}`);
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[150] flex items-center justify-between gap-3 bg-linear-to-l from-amber-500 to-yellow-400 px-4 py-3 shadow-lg"
      dir="rtl"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-2xl">🏆</span>
        <div className="min-w-0">
          <p className="text-amber-900 font-black text-sm leading-tight truncate">
            אליפות {categoryTitle}
          </p>
          <p className="text-amber-800 text-xs">
            {ROUND_EMOJIS[roundIdx]} סיבוב {round}/3 &middot; סה&quot;כ: {totalSoFar} נקודות
          </p>
        </div>
      </div>

      <button
        onClick={handleFinishRound}
        className="shrink-0 px-4 py-2 rounded-xl bg-white text-amber-700 font-bold text-sm hover:bg-amber-50 active:scale-95 transition-[transform,background-color]"
      >
        סיים סיבוב ✓
      </button>
    </div>
  );
}
