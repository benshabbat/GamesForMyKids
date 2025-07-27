import { BaseGameItem } from "@/lib/types";

interface ProfessionCardProps {
  profession: BaseGameItem;
  onClick: (profession: BaseGameItem) => void;
}

/**
 * ProfessionCard - A component for displaying profession cards in the profession game
 * 
 * This component handles the rendering of individual profession cards with their
 * emoji and Hebrew names
 */
export default function ProfessionCard({ profession, onClick }: ProfessionCardProps) {
  return (
    <div
      onClick={() => onClick(profession)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {profession.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold text-center">
          {profession.hebrew}
        </div>
      </div>
    </div>
  );
}
