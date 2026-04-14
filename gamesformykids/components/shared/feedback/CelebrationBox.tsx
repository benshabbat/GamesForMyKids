import GenericBox from "../displays/GenericBox";
import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import type { ComponentTypes } from "@/lib/types";

/**
 * 🎯 CelebrationBox עם קונטקסט - ללא props!
 */
export default function CelebrationBox({ 
  className = "" 
}: ComponentTypes.CelebrationBoxProps) {
  const { 
    config, 
    currentChallenge, 
    showCelebration 
  } = useUniversalGame();
  
  // אם אין חגיגה או אין אתגר נוכחי, לא להציג
  if (!showCelebration || !currentChallenge) {
    return null;
  }
  
  const label = config.itemLabel || "פריט";
  const value = currentChallenge.hebrew;
  const points = 10; // יכול להיות דינמי מהקונטקסט בעתיד

  return (
    <GenericBox
      title="מעולה!"
      icon="🎉"
      variant="celebration"
      animation="bounce"
      size="large"
      className={className}
    >
      <p className="text-2xl text-orange-700">
        מצאת את ה{label} {value}!
      </p>
      <div className="text-3xl mt-4">+{points} נקודות! ⭐</div>
    </GenericBox>
  );
}
