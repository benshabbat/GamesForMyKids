import { Volume2 } from "lucide-react";
import { Shape } from "@/types/game";
import { 
  CircleIcon, 
  SquareIcon, 
  TriangleIcon, 
  RectangleIcon, 
  StarIcon, 
  HeartIcon, 
  DiamondIcon, 
  OvalIcon 
} from "./ShapeIcons";

type ShapeOptionsProps = {
  options: Shape[];
  currentChallenge?: Shape | null;
  onShapeClick: (shape: Shape) => void;
};

const ShapeIconMap = {
  circle: CircleIcon,
  square: SquareIcon,
  triangle: TriangleIcon,
  rectangle: RectangleIcon,
  star: StarIcon,
  heart: HeartIcon,
  diamond: DiamondIcon,
  oval: OvalIcon,
};

export default function ShapeOptions({
  options,
  onShapeClick,
}: ShapeOptionsProps) {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      {options.map((shape) => {
        const IconComponent = ShapeIconMap[shape.name as keyof typeof ShapeIconMap] || CircleIcon;
        
        return (
          <div
            key={shape.name}
            onClick={() => onShapeClick(shape)}
            className={`
              aspect-square rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
              ${shape.color} text-white
              border-8 border-white
            `}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <IconComponent size={80} className="mb-2" />
              <div className="text-lg md:text-xl font-bold text-center">
                {shape.hebrew}
              </div>
              <div className="text-sm opacity-80 mt-1">
                {shape.english}
              </div>
              <Volume2 className="w-5 h-5 opacity-70 mt-2" />
            </div>
          </div>
        );
      })}
    </div>
  );
}