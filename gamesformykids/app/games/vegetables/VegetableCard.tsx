import { BaseGameItem } from "@/lib/types/base";

interface VegetableCardProps {
  vegetable: BaseGameItem;
  onClick: (vegetable: BaseGameItem) => void;
}

/**
 * VegetableCard - A component for displaying vegetable cards in the vegetable game
 * 
 * This component handles the rendering of individual vegetable cards with their
 * emoji and Hebrew names
 */
export default function VegetableCard({ vegetable, onClick }: VegetableCardProps) {
  return (
    <div
      onClick={() => onClick(vegetable)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {vegetable.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {vegetable.hebrew}
        </div>
      </div>
    </div>
  );
}
