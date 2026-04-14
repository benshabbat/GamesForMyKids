"use client";

import { useMathChallengeStore } from "@/lib/stores/mathChallengeStore";
import { useGameSessionStore } from "@/lib/stores/gameSessionStore";

const MAX_VISIBLE = 10;

function EmojiRow({ count, emoji, crossed }: { count: number; emoji: string; crossed?: boolean }) {
  const visible = Math.min(count, MAX_VISIBLE);
  return (
    <div className="flex flex-wrap justify-center gap-1">
      {Array.from({ length: visible }).map((_, i) => (
        <span key={i} className="text-3xl leading-none relative">
          {emoji}
          {crossed && (
            <span className="absolute inset-0 flex items-center justify-center text-red-500 text-4xl font-black pointer-events-none">
              ×
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function MathChallengeBox() {
  const challenge     = useMathChallengeStore((s) => s.challenge);
  const showCelebration = useGameSessionStore((s) => s.showCelebration);

  if (!challenge || showCelebration) return null;

  const { firstNumber, secondNumber, operation, emoji } = challenge;
  const isAddition = operation === "addition";
  const opSymbol   = isAddition ? "➕" : "➖";

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-center">
      <h2 className="text-2xl font-bold text-orange-800 mb-6">פתור את התרגיל</h2>

      <div className="flex items-center justify-center gap-6 flex-wrap">
        {/* First operand */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl font-black text-blue-700">{firstNumber}</span>
          <EmojiRow count={firstNumber} emoji={emoji} />
        </div>

        {/* Operator */}
        <span className="text-5xl">{opSymbol}</span>

        {/* Second operand */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl font-black text-green-700">{secondNumber}</span>
          {isAddition ? (
            <EmojiRow count={secondNumber} emoji={emoji} />
          ) : (
            <EmojiRow count={secondNumber} emoji={emoji} crossed />
          )}
        </div>

        {/* Equals + question mark */}
        <span className="text-5xl font-black text-orange-600">= ?</span>
      </div>
    </div>
  );
}
