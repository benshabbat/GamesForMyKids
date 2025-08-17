import { ReactNode } from "react";
import { BaseGameItem, ColorItem, ShapeItem, NumberItem } from "@/lib/types";
import { useGameActions, useGameInfo } from "@/hooks/shared/useGameContext";

// Combined type for all our game items
type GameItemType = BaseGameItem | ColorItem | ShapeItem | NumberItem;

interface EnhancedGameCardGridProps<T extends GameItemType> {
  // Core properties (רק מה שבאמת חובה)
  /** Array of items to display in the grid */
  items: T[];
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
  
  // Override for context (אופציונלי)
  customOnItemClick?: (item: T) => void;
}

/**
 * Enhanced GameCardGrid - ללא Props Drilling!
 * 
 * 🎯 יתרונות:
 * - אוטומטית מקבלת את onItemClick מהקונטקסט
 * - משתמשת ב-useGameActions לטיפול בקליקים
 * - אפשרות לעקיפת הקונטקסט במקרה הצורך
 * - פחות props דרושים!
 * 
 * 📝 שימוש:
 * <EnhancedGameCardGrid items={items} currentChallenge={challenge} />
 */
export function EnhancedGameCardGrid<T extends GameItemType>({
  items,
  currentChallenge,
  gridCols = "grid-cols-2 md:grid-cols-3",
  maxWidth = "max-w-3xl",
  gap = "gap-6",
  showSoundIcon = true,
  compareKey = 'name' as keyof T,
  renderCustomCard,
  cardClassName = "",
  customOnItemClick,
}: EnhancedGameCardGridProps<T>) {
  
  // 🎮 שימוש בקונטקסט - ללא props drilling!
  const gameActions = useGameActions();
  const gameInfo = useGameInfo();
  
  // החלטה על הפונקציה הסופית לטיפול בקליק
  const handleItemClick = customOnItemClick || ((item: T) => {
    // לוגיקה חכמה - בדיקה אם הפריט נכון
    const isCorrect = currentChallenge ? item[compareKey] === currentChallenge[compareKey] : false;
    
    if (isCorrect && gameActions?.onCorrect) {
      gameActions.onCorrect({ 
        item_id: String(item.id || item.name), 
        item_name: String(item.name || item.hebrew),
        gameType: gameInfo?.gameType 
      });
    } else if (!isCorrect && gameActions?.onWrong) {
      gameActions.onWrong({ 
        item_id: String(item.id || item.name), 
        item_name: String(item.name || item.hebrew),
        gameType: gameInfo?.gameType 
      });
    }
  });
  
  // Helper function to determine if an item is the current challenge
  const isCurrentItem = (item: T, challenge?: T | null): boolean => {
    if (!challenge) return false;
    
    // Handle different comparison strategies
    if (compareKey === 'name') {
      return item.name === challenge.name;
    }
    
    if (compareKey === 'hebrew') {
      return (item as any).hebrew === (challenge as any).hebrew;
    }
    
    // Generic comparison using the specified key
    return item[compareKey] === challenge[compareKey];
  };

  // Default card renderer
  const renderDefaultCard = (item: T, isCorrect: boolean) => (
    <div
      key={String(item.id || item.name)}
      onClick={() => handleItemClick(item)}
      className={`
        relative group cursor-pointer 
        bg-gradient-to-br from-white to-blue-50 
        rounded-2xl p-6 shadow-lg border-2 border-blue-200
        hover:shadow-2xl hover:scale-105 hover:border-blue-400
        transition-all duration-300 ease-out
        active:scale-95 active:shadow-lg
        ${isCorrect ? 'ring-4 ring-green-400 bg-gradient-to-br from-green-50 to-green-100' : ''}
        ${cardClassName}
      `}
    >
      {/* תוכן הקלף */}
      <div className="text-center">
        {/* אייקון קול */}
        {showSoundIcon && (
          <div className="absolute top-2 right-2 text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity">
            🔊
          </div>
        )}
        
        {/* תמונה או אייקון אם קיים */}
        {(item as any).icon && (
          <div className="text-4xl mb-3">
            {(item as any).icon}
          </div>
        )}
        
        {/* שם העברי */}
        <div className="text-xl font-bold text-gray-800 mb-2">
          {(item as any).hebrew || item.name}
        </div>
        
        {/* שם באנגלית אם קיים */}
        {item.name !== (item as any).hebrew && (
          <div className="text-sm text-gray-600">
            {item.name}
          </div>
        )}
        
        {/* אפקט hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );

  return (
    <div className={`${maxWidth} mx-auto`}>
      <div className={`grid ${gridCols} ${gap}`}>
        {items.map((item) => {
          const isCorrect = isCurrentItem(item, currentChallenge);
          
          if (renderCustomCard) {
            return (
              <div key={String(item.id || item.name)} onClick={() => handleItemClick(item)}>
                {renderCustomCard(item, isCorrect)}
              </div>
            );
          }
          
          return renderDefaultCard(item, isCorrect);
        })}
      </div>
      
      {/* מידע נוסף מהקונטקסט */}
      {gameInfo?.gameType && (
        <div className="mt-4 text-center text-sm text-gray-500">
          משחק: {gameInfo.title || gameInfo.gameType}
        </div>
      )}
    </div>
  );
}

/**
 * גרסה פשוטה שרק צריכה items
 */
export function SimpleGameCardGrid<T extends GameItemType>({
  items,
  ...props
}: { items: T[] } & Partial<EnhancedGameCardGridProps<T>>) {
  return <EnhancedGameCardGrid items={items} {...props} />;
}
