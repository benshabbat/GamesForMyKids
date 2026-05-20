"use client";
import Image from 'next/image';
import GenericBox from "../displays/GenericBox";
import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';

export default function GeographyChallengeBox() {
  const { currentChallenge, showCelebration, gameType } = useUniversalGame();

  if (!currentChallenge || showCelebration) return null;

  const iso2 = currentChallenge.id ?? currentChallenge.name;
  const flagUrl = `https://flagcdn.com/w160/${iso2}.png`;
  const countryName = currentChallenge.plural ?? currentChallenge.hebrew;

  let questionText: string;
  if (gameType === 'geography-flags') {
    questionText = 'לאיזו מדינה שייך הדגל?';
  } else if (gameType === 'geography-capitals') {
    questionText = `🏙️ מה הבירה של ${countryName}?`;
  } else {
    questionText = `🌍 באיזו יבשת נמצאת ${countryName}?`;
  }

  return (
    <GenericBox title="זהה את הדגל!" variant="challenge" size="large">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-48 h-32 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={flagUrl}
            alt="דגל"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <p className="text-2xl font-bold text-blue-800 text-center">{questionText}</p>
      </div>
    </GenericBox>
  );
}
