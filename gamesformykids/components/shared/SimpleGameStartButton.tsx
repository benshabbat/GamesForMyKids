interface SimpleGameStartButtonProps {
  onStart: () => void;
  fromColor: string;
  toColor: string;
  text?: string;
}

/**
 * SimpleGameStartButton - כפתור התחלה פשוט ללא קונטקסט
 */
export default function SimpleGameStartButton({ 
  onStart, 
  fromColor, 
  toColor, 
  text = "🎮 בואו נתחיל לשחק! 🎮" 
}: SimpleGameStartButtonProps) {
  return (
    <div className="mb-8">
      <button
        onClick={onStart}
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
