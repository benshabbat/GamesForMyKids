import { BaseGameItem } from "@/lib/types";

interface FruitCardProps {
  fruit: BaseGameItem;
  onClick: (fruit: BaseGameItem) => void;
}

/**
 * FruitCard - A component for displaying fruit cards in the fruit game
 * 
 * This component handles the rendering of individual fruit cards with their
 * emoji and Hebrew names
 */
export default function FruitCard({ fruit, onClick }: FruitCardProps) {
  return (
    <div
      onClick={() => onClick(fruit)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {fruit.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {fruit.hebrew}
        </div>
      </div>
    </div>
  );
}
