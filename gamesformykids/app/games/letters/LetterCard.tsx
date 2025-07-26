import { BaseGameItem } from "@/lib/types/base";
import SoundIcon from "@/components/shared/SoundIcon";

interface LetterCardProps {
  letter: BaseGameItem;
  onClick: (letter: BaseGameItem) => void;
}

/**
 * LetterCard - A component for displaying letter cards in the letter game
 * 
 * This component handles the rendering of individual letter cards with their
 * Hebrew character and English transliteration
 */
export default function LetterCard({ letter, onClick }: LetterCardProps) {
  return (
    <div
      onClick={() => onClick(letter)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-5xl md:text-7xl font-bold mb-2">
          {letter.hebrew}
        </div>
        <div className="text-lg md:text-xl font-semibold">
          {letter.english}
        </div>
        <div className="mt-2 opacity-70">
          <SoundIcon type="eye" />
        </div>
      </div>
    </div>
  );
}
