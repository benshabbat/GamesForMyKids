"use client";

import { Profession } from "@/lib/types/game";
import GenericStartScreen from "@/components/shared/GenericStartScreen";

interface StartScreenProps {
  professions: Profession[];
  onStart: () => void;
  onSpeak: (profession: Profession) => void;
}

export default function StartScreen({ professions, onStart, onSpeak }: StartScreenProps) {
  return (
    <GenericStartScreen
      title="משחק מקצועות"
      subtitle="למד על מקצועות מעניינים ותגלה מה כל אחד עושה!"
      instructions={[
        "תראה תיאור של מקצוע",
        "תבחר את המקצוע הנכון מהאפשרויות",
        "תלמד על מקצועות שונים ומעניינים",
      ]}
      itemsToShow={professions.slice(0, 6)}
      renderItem={(profession) => (
        <div
          key={profession.id}
          className={`${profession.color} p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform`}
          onClick={() => onSpeak(profession)}
        >
          <div className="text-4xl mb-2">{profession.emoji}</div>
          <div className="text-sm font-bold text-gray-700">{profession.name}</div>
        </div>
      )}
      onStart={onStart}
      gameColor="purple"
    />
  );
}
