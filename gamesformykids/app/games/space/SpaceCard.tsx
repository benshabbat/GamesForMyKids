import { SpaceObject } from "@/lib/types/game";

interface SpaceCardProps {
  spaceObject: SpaceObject;
  onClick: (spaceObject: SpaceObject) => void;
}

/**
 * SpaceCard - A component for displaying space object cards in the space game
 * 
 * This component handles the rendering of individual space object cards with their
 * emoji and Hebrew names
 */
export default function SpaceCard({ spaceObject, onClick }: SpaceCardProps) {
  return (
    <div
      onClick={() => onClick(spaceObject)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700
        border-8 border-white relative overflow-hidden
      `}
    >
      {/* כוכבים ברקע */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-20">
        <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-3 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
      </div>
      
      <div className="w-full h-full flex flex-col items-center justify-center text-white relative z-10">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {spaceObject.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold text-center px-2">
          {spaceObject.hebrew}
        </div>
      </div>
    </div>
  );
}
