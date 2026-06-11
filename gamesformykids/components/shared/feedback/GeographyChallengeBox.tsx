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

  let title: string;
  let questionText: string;
  if (gameType === 'geography-flags') {
    title = 'זהה את הדגל!';
    questionText = 'לאיזו מדינה שייך הדגל?';
  } else if (gameType === 'geography-capitals') {
    title = `מה הבירה של ${countryName}?`;
    questionText = '🏙️ בחר את הבירה הנכונה!';
  } else {
    title = `באיזו יבשת נמצאת ${countryName}?`;
    questionText = '🌍 בחר את היבשת הנכונה!';
  }

  return (
    <GenericBox title={title} variant="challenge" size="large">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-48 h-32 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={flagUrl}
            alt={`דגל ${countryName ?? ''}`}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-xl font-bold text-blue-700 text-center">{questionText}</p>
      </div>
    </GenericBox>
  );
}
