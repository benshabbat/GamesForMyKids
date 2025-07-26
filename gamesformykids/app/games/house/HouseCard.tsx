import { BaseGameItem } from "@/lib/types/base";

interface HouseCardProps {
  houseItem: BaseGameItem;
  onClick: (houseItem: BaseGameItem) => void;
}

/**
 * HouseCard - A component for displaying house item cards in the house game
 * 
 * This component handles the rendering of individual house item cards with their
 * emoji and Hebrew names
 */
export default function HouseCard({ houseItem, onClick }: HouseCardProps) {
  return (
    <div
      onClick={() => onClick(houseItem)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {houseItem.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {houseItem.hebrew}
        </div>
      </div>
    </div>
  );
}
