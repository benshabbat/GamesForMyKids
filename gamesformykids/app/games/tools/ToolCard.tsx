import { BaseGameItem } from "@/lib/types/base";

interface ToolCardProps {
  tool: BaseGameItem;
  onClick: (tool: BaseGameItem) => void;
}

/**
 * ToolCard - A component for displaying tool cards in the tools game
 * 
 * This component handles the rendering of individual tool cards with their
 * emoji and Hebrew names
 */
export default function ToolCard({ tool, onClick }: ToolCardProps) {
  return (
    <div
      onClick={() => onClick(tool)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {tool.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {tool.hebrew}
        </div>
      </div>
    </div>
  );
}
