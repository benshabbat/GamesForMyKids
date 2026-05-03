import { useGameActions } from '@/hooks';

type SimpleGameStartButtonProps = {
  fromColor?: string | undefined;
  toColor?: string | undefined;
  text?: string | undefined;
  customOnStart?: (() => void) | undefined;
};

/**
 * SimpleGameStartButton - כפתור התחלה עם שימוש בקונטקסט
 */
export default function SimpleGameStartButton({ 
  fromColor, 
  toColor, 
  text = "🎮 בואו נתחיל לשחק! 🎮",
  customOnStart
}: SimpleGameStartButtonProps) {
  const { start } = useGameActions();
  
  const handleStart = () => {
    if (customOnStart) {
      customOnStart();
    } else {
      start();
    }
  };
  
  return (
    <div className="mb-8">
      <button
        onClick={handleStart}
        className={`
          px-12 py-4 bg-gradient-to-r ${fromColor} ${toColor} text-white text-2xl font-bold 
          rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 
          transition-all duration-300 border-4 border-white
        `}
      >
        {text}
      </button>
    </div>
  );
}
