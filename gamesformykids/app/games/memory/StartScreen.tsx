/**
 * ===============================================
 * StartScreen לזיכרון - גרסה חדשה ומשופרת!
 * ===============================================
 * 
 * 🚀 3 שורות במקום 150!
 * משתמש ב-AutoStartScreen החדש
 */

import AutoStartScreen from "@/components/shared/AutoStartScreen";
import { AnimalData } from "@/lib/types/games";
import { BaseGameItem } from "@/lib/types/base";

interface MemoryStartScreenProps {
  items: AnimalData[];
  onStart: () => void;
  onSpeak?: (name: string) => void;
}

export default function StartScreen({ items, onStart, onSpeak }: MemoryStartScreenProps) {
  // ממיר AnimalData לפורמט BaseGameItem עבור AutoStartScreen
  const convertedItems: BaseGameItem[] = items.map((animal) => ({
    name: animal.name,
    hebrew: animal.name,
    english: animal.name,
    emoji: animal.emoji,
    color: '#000000',
    sound: [440],
  }));

  return <AutoStartScreen gameType="memory" items={convertedItems} onStart={onStart} onSpeak={onSpeak} />;
}
