import { Volume2 } from "lucide-react";
import { Color } from "@/lib/types/game";

type ColorGridProps = {
  colors: Color[];
  currentChallenge?: Color | null;
  onColorClick: (color: Color) => void;
};

export default function ColorGrid({ colors, onColorClick }: ColorGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
      {colors.map((color) => (
        <div
          key={color.name}
          onClick={() => onColorClick(color)}
          className={`
            aspect-square rounded-3xl cursor-pointer transition-all 
            duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
            ${color.value}
            border-8 border-white
          `}
        >
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <div className="text-2xl md:text-4xl font-bold mb-2">
              {color.hebrew}
            </div>
            <Volume2 className="w-8 h-8 opacity-70" />
          </div>
        </div>
      ))}
    </div>
  );
}
