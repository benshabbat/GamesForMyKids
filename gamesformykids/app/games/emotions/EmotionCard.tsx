import { BaseGameItem } from "@/lib/types/base"; 

interface EmotionCardProps {
  emotion: BaseGameItem;
  onClick: (emotion: BaseGameItem) => void;
}

/**
 * EmotionCard - A component for displaying emotion cards in the emotion game
 * 
 * This component handles the rendering of individual emotion cards with their
 * emoji and Hebrew names
 */
export default function EmotionCard({ emotion, onClick }: EmotionCardProps) {
  return (
    <div
      onClick={() => onClick(emotion)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        ${emotion.color}
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-pulse">
          {emotion.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {emotion.hebrew}
        </div>
      </div>
    </div>
  );
}
