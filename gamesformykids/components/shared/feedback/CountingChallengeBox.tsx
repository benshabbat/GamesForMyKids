"use client";

import { useCountingChallengeStore } from '@/lib/stores/countingChallengeStore';

export default function CountingChallengeBox() {
  const challenge = useCountingChallengeStore((s) => s.challenge);

  if (!challenge) return null;

  const visible = Math.min(challenge.correctAnswer, 20);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-center">
      <h2 className="text-2xl font-bold text-cyan-800 mb-4">
        כמה {challenge.itemPlural} יש?
      </h2>
      <div className="flex flex-wrap justify-center gap-2 text-5xl leading-none mb-2">
        {Array.from({ length: visible }).map((_, i) => (
          <span key={i}>{challenge.emoji}</span>
        ))}
      </div>
    </div>
  );
}
