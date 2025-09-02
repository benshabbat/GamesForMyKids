import { ComponentTypes } from "@/lib/types";
import { useGameActions } from "@/hooks";

// Use the new organized type from ComponentTypes
type GameItemType = ComponentTypes.GameItemType;
type GameCardGridProps<T extends GameItemType> = ComponentTypes.GameCardGridProps<T>;

export function GameCardGrid<T extends GameItemType>({
  items,
  onItemClick: propOnItemClick,
  currentChallenge,
  gridCols = "grid-cols-2 md:grid-cols-3",
  maxWidth = "max-w-3xl",
  gap = "gap-6",
  showSoundIcon = false,
  compareKey = 'name' as keyof T,
  renderCustomCard,
  cardClassName = "",
  useContext = false,
}: GameCardGridProps<T>) {
  
  // 🎮 שימוש בקונטקסט אם מבוקש
  const gameActions = useGameActions();
  
  // החלטה על הפונקציה הסופית לטיפול בקליק
  const handleItemClick = propOnItemClick || (useContext ? ((item: T) => {
    // לוגיקה חכמה - בדיקה אם הפריט נכון
    const isCorrect = currentChallenge ? isCurrentItem(item, currentChallenge) : false;
    
    if (isCorrect && gameActions?.onCorrect) {
      gameActions.onCorrect();
    } else if (!isCorrect && gameActions?.onWrong) {
      gameActions.onWrong();
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
