import { NumberItem } from "@/lib/types/games";

interface NumberCardProps {
  number: NumberItem;
  onClick: (number: NumberItem) => void;
}

/**
 * NumberCard - A component for displaying number cards in the number game
 * 
 * This component handles the rendering of individual number cards with their
 * digit and Hebrew name
 */
export default function NumberCard({ number, onClick }: NumberCardProps) {
  return (
    <div
      onClick={() => onClick(number)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl font-bold mb-2">
          {number.digit}
        </div>
        <div className="text-lg md:text-xl font-semibold">
          {number.hebrew}
        </div>
      </div>
    </div>
  );
}
