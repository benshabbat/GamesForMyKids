import { Shape } from "@/lib/types/game";
import * as ShapeIcons from "../../../public/icons/ShapeIcons";

interface ShapeCardProps {
  shape: Shape;
  onClick: (shape: Shape) => void;
}

/**
 * ShapeCard - A component for displaying shape cards in the shape game
 * 
 * This component handles the rendering of individual shape cards with their SVG icons
 */
export default function ShapeCard({ shape, onClick }: ShapeCardProps) {
  // Helper function to render the appropriate icon based on shape.svg value
  const renderShapeIcon = (svgType: string, size: number = 80) => {
    switch (svgType) {
      case "circle":
        return <ShapeIcons.CircleIcon size={size} />;
      case "square":
        return <ShapeIcons.SquareIcon size={size} />;
      case "triangle":
        return <ShapeIcons.TriangleIcon size={size} />;
      case "rectangle":
        return <ShapeIcons.RectangleIcon size={size} />;
      case "star":
        return <ShapeIcons.StarIcon size={size} />;
      case "heart":
        return <ShapeIcons.HeartIcon size={size} />;
      case "diamond":
        return <ShapeIcons.DiamondIcon size={size} />;
      case "oval":
        return <ShapeIcons.OvalIcon size={size} />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onClick(shape)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="mb-2">
          {renderShapeIcon(shape.svg)}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {shape.hebrew}
        </div>
      </div>
    </div>
  );
}
