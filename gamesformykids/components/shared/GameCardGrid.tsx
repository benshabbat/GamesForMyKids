import { ReactNode } from "react";
import { BaseGameItem, ColorItem, ShapeItem, NumberItem } from "@/lib/types";
import { useGameActions, useGameInfo } from "@/hooks/shared/useGameContext";

// Combined type for all our game items
type GameItemType = BaseGameItem | ColorItem | ShapeItem | NumberItem;

interface GameCardGridProps<T extends GameItemType> {
  // Core properties
  /** Array of items to display in the grid */
  items: T[];
  /** Callback function when an item is clicked - אופציונלי אם משתמשים בקונטקסט */
  onItemClick?: (item: T) => void;
  /** The current challenge/selected item (used to highlight the correct item) */
  currentChallenge?: T | null;
  
  // Display options
  /** Tailwind CSS grid column classes (default: "grid-cols-2 md:grid-cols-3") */
  gridCols?: string;
  /** Tailwind CSS max-width class (default: "max-w-3xl") */
  maxWidth?: string;
  /** Tailwind CSS gap class (default: "gap-6") */
  gap?: string;
  /** Whether to show a sound icon on cards (default: true) */
  showSoundIcon?: boolean;
  
  // Comparison and rendering
  /** Which property to use when comparing items (default: 'name') */
  compareKey?: keyof T;
  /** Custom render function for cards - if provided, default card rendering is not used */
  renderCustomCard?: (item: T, isCorrect: boolean) => ReactNode;
  /** Additional CSS classes to apply to default cards */
  cardClassName?: string;
  
  // Context usage
  /** Whether to use game context for click handling (default: false) */
  useContext?: boolean;
}

export function GameCardGrid<T extends GameItemType>({
  items,
  onItemClick: propOnItemClick,
  currentChallenge,
  gridCols = "grid-cols-2 md:grid-cols-3",
  maxWidth = "max-w-3xl",
  gap = "gap-6",
  showSoundIcon = true,
  compareKey = 'name' as keyof T,
  renderCustomCard,
  cardClassName = "",
  useContext = false,
}: GameCardGridProps<T>) {
  
  // 🎮 שימוש בקונטקסט אם מבוקש
  const gameActions = useGameActions();
  const gameInfo = useGameInfo();
  
  // החלטה על הפונקציה הסופית לטיפול בקליק
  const handleItemClick = propOnItemClick || (useContext ? ((item: T) => {
    // לוגיקה חכמה - בדיקה אם הפריט נכון
    const isCorrect = currentChallenge ? isCurrentItem(item, currentChallenge) : false;
    
    if (isCorrect && gameActions?.onCorrect) {
      gameActions.onCorrect({ 
        item_id: String('id' in item ? (item as { id: string | number }).id : item.name), 
        item_name: String(item.name),
        gameType: gameInfo?.gameType 
      });
    } else if (!isCorrect && gameActions?.onWrong) {
      gameActions.onWrong({ 
        item_id: String('id' in item ? (item as { id: string | number }).id : item.name), 
        item_name: String(item.name),
        gameType: gameInfo?.gameType 
      });
    }
  }) : () => {});
  // Helper function to determine if an item is the current challenge
  const isCurrentItem = (item: T, challenge?: T | null): boolean => {
    if (!challenge) return false;
    
    // Safe comparison for objects
    if (typeof item === 'object' && item !== null && typeof challenge === 'object' && challenge !== null) {
      if (compareKey in item && compareKey in challenge) {
        return item[compareKey] === challenge[compareKey];
      }
    }
    
    // Direct comparison for primitives
    return item === challenge;
  };

  // Helper function to get a unique key for each item
  const getItemKey = (item: T): string => {
    // Check if item is an object and has a name property
    if (typeof item === 'object' && item !== null && 'name' in item) {
      return String(item.name);
    }
    // Fallback to compareKey or item itself as string
    if (typeof item === 'object' && item !== null && compareKey in item) {
      return String(item[compareKey]);
    }
    // If item is a primitive (number, string), use it directly
    return String(item);
  };

  return (
    <div className={`grid ${gridCols} ${gap} ${maxWidth} mx-auto`}>
      {items.map((item) => {
        const isCorrect = isCurrentItem(item, currentChallenge);
        
        return (
          <div key={getItemKey(item)}>
            {renderCustomCard ? (
              renderCustomCard(item, isCorrect)
            ) : (
              // Default card rendering
              <div
                onClick={() => handleItemClick(item)}
                className={`
                  aspect-square rounded-3xl cursor-pointer transition-all 
                  duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
                  bg-gradient-to-br from-gray-400 to-gray-600 
                  border-8 border-white
                  ${isCorrect ? "ring-4 ring-green-400 ring-offset-4" : ""}
                  ${cardClassName}
                `}
              >
                <div className="w-full h-full flex flex-col items-center justify-center text-white">
                  {/* Display the hebrew property if it exists */}
                  {'hebrew' in item && (
                    <div className="text-4xl md:text-6xl font-bold mb-2">
                      {String(item.hebrew)}
                    </div>
                  )}
                  
                  {/* Display the english property if it exists */}
                  {'english' in item && (
                    <div className="text-lg md:text-xl font-semibold">
                      {String(item.english)}
                    </div>
                  )}
                  
                  {/* Display the digit property if it exists */}
                  {'digit' in item && (
                    <div className="text-6xl md:text-8xl font-bold mb-2">
                      {String(item.digit)}
                    </div>
                  )}
                  
                  {showSoundIcon && (
                    <div className="mt-2 opacity-70">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mx-auto">
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
