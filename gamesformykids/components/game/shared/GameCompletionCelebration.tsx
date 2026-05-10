'use client';

import { useState, useEffect } from 'react';
import { useGameAudio } from '@/hooks/shared/audio/useGameAudio';

const EMOJIS = ['🎉', '⭐', '🌟', '🎊', '✨', '🎈', '🏆', '💫'];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  emoji: EMOJIS[i % EMOJIS.length],
  left: `${5 + i * 4.5}%`,
  delay: `${i * 0.1}s`,
  size: 1.5 + (i % 3) * 0.4,
}));

const KEYFRAMES = `
@keyframes gfk-confetti-fall {
  0%   { transform: translateY(-60px) rotate(0deg); opacity: 1; }
  80%  { opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}
`;

export function GameCompletionCelebration() {
  const [visible, setVisible] = useState(true);
  const { playSuccessSound } = useGameAudio();

  useEffect(() => {
    playSuccessSound();
    const id = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden>
        {PARTICLES.map(({ id, emoji, left, delay, size }) => (
          <span
            key={id}
            style={{
              position: 'absolute',
              top: 0,
              left,
              fontSize: `${size}rem`,
              animation: `gfk-confetti-fall 2s ease-in forwards`,
              animationDelay: delay,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </>
  );
}
