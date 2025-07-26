import { BaseGameItem } from "@/lib/types";

interface ClothingCardProps {
  clothingItem: BaseGameItem;
  onClick: (clothingItem: BaseGameItem) => void;
}

/**
 * ClothingCard - A component for displaying clothing item cards in the clothing game
 * 
 * This component handles the rendering of individual clothing item cards with their
 * emoji and Hebrew names
 */
export default function ClothingCard({ clothingItem, onClick }: ClothingCardProps) {
  return (
    <div
      onClick={() => onClick(clothingItem)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600
        border-8 border-white relative overflow-hidden
      `}
    >
      {/* תבנית רקע אופנתית */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 to-rose-400/20">
        <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-3 left-3 w-2 h-2 bg-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-2 w-1 h-1 bg-white/40 rounded-full"></div>
      </div>
      
      <div className="w-full h-full flex flex-col items-center justify-center text-white relative z-10">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {clothingItem.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold text-center px-2">
          {clothingItem.hebrew}
        </div>
      </div>
    </div>
  );
}
