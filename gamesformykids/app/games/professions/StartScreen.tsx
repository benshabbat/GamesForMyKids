"use client";

import { Profession } from "@/lib/types/game";
import GenericStartScreen from "@/components/shared/GenericStartScreen";
import GameItem from "@/components/shared/GameItem";

interface StartScreenProps {
  professions: Profession[];
  onStart: () => void;
  onSpeak: (profession: Profession) => void;
}

// הגדרת צעדי המשחק
const PROFESSION_GAME_STEPS = [
  {
    icon: "👂",
    title: "הקשב",
    description: "הקשב לתיאור המקצוע"
  },
  {
    icon: "👁️", 
    title: "חפש",
    description: "חפש את האימוג'י המתאים"
  },
  {
    icon: "🎯",
    title: "בחר",
    description: "בחר את התשובה הנכונה"
  }
];

export default function StartScreen({ professions, onStart, onSpeak }: StartScreenProps) {
  return (
    <GenericStartScreen
      title="👩‍⚕️ משחק מקצועות 👩‍⚕️"
      subTitle="למד על מקצועות מעניינים!"
      textColorHeader="text-purple-800"
      textColorSubHeader="text-purple-700" 
      gameSteps={PROFESSION_GAME_STEPS}
      gameStepsBgClass="bg-purple-100 bg-opacity-90"
      items={professions}
      onStart={onStart}
      buttonFromColor="from-purple-500"
      buttonToColor="to-purple-700"
      backgroundStyle="bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-300"
      itemsTitle="המקצועות:"
      itemsDescription="לחץ על מקצוע כדי לשמוע עליו"
      renderItem={(profession: Profession) => (
        <GameItem
          key={profession.id}
          hebrewText={profession.name}
          color={profession.color}
          icon={<span className="text-2xl">{profession.emoji}</span>}
          onClick={() => onSpeak(profession)}
        />
      )}
    />
  );
}
