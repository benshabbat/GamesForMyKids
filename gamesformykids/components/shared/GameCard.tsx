import { ReactNode } from "react";
import { Volume2 } from "lucide-react";
import { Color, Letter, Shape, NumberItem } from "@/lib/types/game";

// Generic type for all game items (Color, Letter, Shape, NumberItem)
type GameItemType = Color | Letter | Shape | NumberItem;

interface GameCardProps<T extends GameItemType> {
  item: T;
  onClick: (item: T) => void;
  isCorrect?: boolean;
  backgroundColor?: string;
  showSoundIcon?: boolean;
  renderCustomContent?: (item: T) => ReactNode;
}

export function GameCard<T extends GameItemType>({
  item,
  onClick,
  isCorrect = false,
  backgroundColor,
  showSoundIcon = true,
  renderCustomContent
}: GameCardProps<T>) {
  // Type guards
  const isColor = (item: GameItemType): item is Color => "value" in item;
  const isShape = (item: GameItemType): item is Shape => "svg" in item;
  const isNumberItem = (item: GameItemType): item is NumberItem => "digit" in item;
  
  // Set default background based on item type or use provided backgroundColor
  const getBgColor = () => {
    if (backgroundColor) return backgroundColor;
    if (isColor(item)) return item.value; // For colors
    if (isShape(item)) return item.color; // For shapes
    return "bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500"; // Default for letters
  };

  return (
    <div
      onClick={() => onClick(item)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        ${getBgColor()}
        border-8 border-white flex items-center justify-center
        ${isCorrect ? "ring-4 ring-green-400 ring-offset-4" : ""}
      `}
    >
      {renderCustomContent ? (
        renderCustomContent(item)
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white">
          <div className="text-center">
            {/* All item types have hebrew */}
              <div className="text-4xl md:text-6xl font-bold mb-2">
                {item.hebrew}
              </div>
            
            {/* Only letters, shapes and numbers have english */}
            {("english" in item) && (
              <div className="text-lg md:text-xl font-semibold">
                {isNumberItem(item) ? item.english : 
                 isShape(item) ? item.english :
                 "english" in item ? (item as Letter).english : ""}
              </div>
            )}
            
            {/* Only numbers have digits */}
            {isNumberItem(item) && (
              <div className="text-6xl md:text-8xl font-bold mb-2">
                {item.digit}
              </div>
            )}
            {showSoundIcon && <Volume2 className="w-8 h-8 opacity-70 mx-auto mt-2" />}
          </div>
        </div>
      )}
    </div>
  );
}
