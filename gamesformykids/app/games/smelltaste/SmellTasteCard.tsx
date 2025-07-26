import { BaseGameItem } from "@/lib/types";

interface SmellTasteCardProps {
  smellTasteItem: BaseGameItem;
  onClick: (smellTasteItem: BaseGameItem) => void;
}

/**
 * SmellTasteCard - A component for displaying smell/taste cards in the smell/taste game
 * 
 * This component handles the rendering of individual smell/taste cards with their
 * emoji and Hebrew names
 */
export default function SmellTasteCard({ smellTasteItem, onClick }: SmellTasteCardProps) {
  return (
    <div
      onClick={() => onClick(smellTasteItem)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-amber-400 to-orange-600 hover:from-amber-500 hover:to-orange-700
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {smellTasteItem.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {smellTasteItem.hebrew}
        </div>
      </div>
    </div>
  );
}
