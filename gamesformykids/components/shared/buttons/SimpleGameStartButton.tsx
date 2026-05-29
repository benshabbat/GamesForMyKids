import { useGameActions } from '@/hooks';

type SimpleGameStartButtonProps = {
  fromColor?: string;
  toColor?: string;
  text?: string;
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
  const { startGame } = useGameActions();

  const handleStart = () => {
    if (customOnStart) {
      customOnStart();
    } else {
      startGame();
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
          focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:outline-none
        `}
      >
        {text}
      </button>
    </div>
  );
}
