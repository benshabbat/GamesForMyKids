import { Card } from "@/lib/types/base";
import MemoryCard from "./MemoryCard";

interface MemoryGameBoardProps {
  cards: Card[];
  onCardClick: (id: number) => void;
  isGamePaused?: boolean;
}

export default function MemoryGameBoard({ cards, onCardClick, isGamePaused }: MemoryGameBoardProps) {
  // חישוב מספר העמודות בהתאם למספר הקלפים
  const getGridCols = () => {
    const cardCount = cards.length;
    if (cardCount <= 12) return "grid-cols-3 md:grid-cols-4"; // 6 זוגות - 3x4
    if (cardCount <= 18) return "grid-cols-3 md:grid-cols-6"; // 9 זוגות - 3x6
    return "grid-cols-4 md:grid-cols-6"; // 12 זוגות - 4x6
  };

  return (
    <div className="relative">
      {/* מסך השהיה */}
      {isGamePaused && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 rounded-2xl">
          <div className="bg-white p-6 rounded-xl text-center shadow-2xl">
            <div className="text-4xl mb-3">⏸️</div>
            <div className="text-2xl font-bold text-gray-800">המשחק מושהה</div>
            <div className="text-gray-600 mt-2">לחץ על &quot;המשך&quot; כדי להמשיך</div>
          </div>
        </div>
      )}
      
      {/* לוח המשחק */}
      <div className={`grid ${getGridCols()} gap-4 max-w-2xl mx-auto ${isGamePaused ? 'blur-sm' : ''}`}>
        {cards.map((card, index) => (
          <div 
            key={card.id}
            className="animate-fade-in"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both'
            }}
          >
            <MemoryCard card={card} onClick={onCardClick} />
          </div>
        ))}
      </div>
    </div>
  );
}
