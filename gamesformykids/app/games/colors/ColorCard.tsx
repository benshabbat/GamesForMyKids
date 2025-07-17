import { Color } from "@/lib/types/game";

interface ColorCardProps {
  color: Color;
  onClick: (color: Color) => void;
}

/**
 * ColorCard - A component for displaying color cards in the color game
 * 
 * This component handles the rendering of individual color cards with their
 * Hebrew names and appropriate background colors
 */
export default function ColorCard({ color, onClick }: ColorCardProps) {
  return (
    <div
      onClick={() => onClick(color)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        ${color.tailwindClass}
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-xl md:text-2xl font-bold text-white">
          {color.hebrew}
        </div>
      </div>
    </div>
  );
}
