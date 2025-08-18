import GenericBox from "./GenericBox";
import { useUniversalGame } from '@/contexts/UniversalGameContext';

/**
 * 🎯 TipsBox עם קונטקסט - ללא props!
 */
export default function TipsBox() {
  const { config } = useUniversalGame();
  
  const tip = config.tip || "💡 טיפ: הקשב בקפידה!";
  const description = config.tipDescription || "לחץ על הסמל למעלה כדי לשמוע שוב";
  
  return (
    <div className="text-center mt-8">
      <GenericBox
        title={tip}
        variant="tips"
        size="medium"
      >
        <p className="text-gray-600">
          {description}
        </p>
      </GenericBox>
    </div>
  );
}