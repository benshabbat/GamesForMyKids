import GenericBox from "../displays/GenericBox";
import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import type { ComponentTypes } from "@/lib/types";

/**
 * 🎯 CelebrationBox עם קונטקסט - ללא props!
 */
export default function CelebrationBox({ 
  className = "" 
}: ComponentTypes.ContextBasedComponentProps) {
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

  const funFact = (currentChallenge as { funFact?: string }).funFact;

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
      {funFact && (
        <p className="mt-3 text-sm text-orange-600 bg-orange-50 rounded-xl px-3 py-2 leading-relaxed" dir="rtl">
          💡 {funFact}
        </p>
      )}
    </GenericBox>
  );
}
