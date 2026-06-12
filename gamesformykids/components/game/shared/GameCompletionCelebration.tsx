'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGameAudio } from '@/hooks/shared/audio/useGameAudio';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { getGameConfettiEmojis } from '@/lib/utils/game/getGameConfettiEmojis';

const CELEBRATION_PHRASES = [
  'כל הכבוד! עשית עבודה מדהימה!',
  'וואו! אתה פשוט מדהים!',
  'יופי! הצלחת!',
  'כל הכבוד! המשך כך!',
] as const;

function getSeasonalEmojis(): string[] {
  const m = new Date().getMonth(); // 0-11
  if (m === 8 || m === 9)  return ['🍎', '🍯', '🌙', '✨', '🏠', '⭐', '🌟', '🎊']; // Sep-Oct: Rosh Hashana/Sukkot
  if (m === 10 || m === 11) return ['🕎', '❄️', '⭐', '🌟', '✨', '💫', '🎁', '🌨️']; // Nov-Dec: Hanukkah/winter
  if (m === 0 || m === 1)  return ['❄️', '⛄', '🌨️', '💫', '⭐', '🌟', '✨', '🎈']; // Jan-Feb: winter
  if (m === 2 || m === 3)  return ['🌸', '🌼', '🦋', '🌷', '🌻', '✨', '🎉', '🎊']; // Mar-Apr: Purim/Pesach/spring
  if (m === 4 || m === 5)  return ['☀️', '🌈', '🎓', '🌞', '🎉', '⭐', '🏆', '🌟']; // May-Jun: Independence/end of year
  return ['☀️', '🏖️', '🍉', '🌴', '🎈', '🌊', '🌞', '💫'];                           // Jul-Aug: summer
}

const KEYFRAMES = `
@keyframes gfk-confetti-fall {
  0%   { transform: translateY(-60px) rotate(0deg); opacity: 1; }
  80%  { opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}
`;

interface Props {
  isPerfect?: boolean;
}

export function GameCompletionCelebration({ isPerfect = false }: Props) {
  const [visible, setVisible] = useState(true);
  const { playSuccessSound } = useGameAudio();
  const params = useParams();
  const gameType = typeof params?.gameType === 'string' ? params.gameType : undefined;

  const emojis = getGameConfettiEmojis(gameType) ?? getSeasonalEmojis();
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: emojis[i % emojis.length]!,
    left: `${5 + i * 4.5}%`,
    delay: `${i * 0.1}s`,
    size: 1.5 + (i % 3) * 0.4,
  }));

  useEffect(() => {
    playSuccessSound();
    const phrase = CELEBRATION_PHRASES[Math.floor(Math.random() * CELEBRATION_PHRASES.length)]!;
    speakHebrew(phrase);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }
    const duration = isPerfect ? 4000 : 2500;
    const id = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden>
        {particles.map(({ id, emoji, left, delay, size }) => (
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
