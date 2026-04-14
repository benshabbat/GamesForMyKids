"use client";

import { useGameSessionStore } from "@/lib/stores/gameSessionStore";
import { GameItemCardProps } from "@/lib/types/components/cards";

const COLORS = [
  { bg: "bg-orange-400", hover: "hover:bg-orange-500", border: "border-orange-300" },
  { bg: "bg-blue-400",   hover: "hover:bg-blue-500",   border: "border-blue-300"   },
  { bg: "bg-green-400",  hover: "hover:bg-green-500",  border: "border-green-300"  },
  { bg: "bg-purple-400", hover: "hover:bg-purple-500", border: "border-purple-300" },
];

/**
 * MathGameCard — shows the option number as repeated emojis.
 * The emoji is taken from the current challenge stored in gameSessionStore.
 */
export default function MathGameCard({ item, onClick }: GameItemCardProps) {
  const currentChallenge = useGameSessionStore((s) => s.currentChallenge);
  const emoji = currentChallenge?.emoji || "⭐";
  const count = Number(item.name);
  const colorIndex = Math.abs(count) % COLORS.length;
  const { bg, hover, border } = COLORS[colorIndex];

  // Clamp emoji repetitions to avoid huge grids
  const clampedCount = Math.min(count, 10);

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        ${bg} ${hover} ${border}
        border-4 rounded-3xl p-4 w-full aspect-square
        flex flex-col items-center justify-center gap-2
        shadow-lg hover:shadow-xl
        transform hover:scale-105 active:scale-95
        transition-all duration-200 cursor-pointer
      `}
    >
      {/* Number */}
      <span className="text-white font-black text-3xl leading-none drop-shadow">
        {count}
      </span>

      {/* Emoji grid */}
      <div className="flex flex-wrap justify-center gap-0.5 max-w-full">
        {Array.from({ length: clampedCount }).map((_, i) => (
          <span key={i} className="text-xl leading-none">
            {emoji}
          </span>
        ))}
      </div>
    </button>
  );
}
