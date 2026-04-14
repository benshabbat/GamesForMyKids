"use client";

import { useMathChallengeBox } from './useMathChallengeBox';
import {
  MAX_EMOJI_VISIBLE,
  MATH_BOX_LABELS,
  type EmojiRowProps,
} from './mathChallengeBoxConstants';

function EmojiRow({ count, emoji, crossed }: EmojiRowProps) {
  const visible = Math.min(count, MAX_EMOJI_VISIBLE);
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
  const vm = useMathChallengeBox();

  if (!vm.show) return null;

  const { firstNumber, secondNumber, emoji, isAddition, opSymbol } = vm;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-center">
      <h2 className="text-2xl font-bold text-orange-800 mb-6">{MATH_BOX_LABELS.title}</h2>

      <div className="flex items-center justify-center gap-6 flex-wrap">
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl font-black text-blue-700">{firstNumber}</span>
          <EmojiRow count={firstNumber} emoji={emoji} />
        </div>

        <span className="text-5xl">{opSymbol}</span>

        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl font-black text-green-700">{secondNumber}</span>
          <EmojiRow count={secondNumber} emoji={emoji} crossed={!isAddition} />
        </div>

        <span className="text-5xl font-black text-orange-600">{MATH_BOX_LABELS.equalsQuestion}</span>
      </div>
    </div>
  );
}
