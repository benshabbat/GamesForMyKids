import { useMemoryContext } from "@/contexts";
import MemoryCard from "./MemoryCard";

export default function MemoryGameBoard() {
  const {
    state: { cards, isGamePaused },
    handleCardClick,
  } = useMemoryContext();

  // חישוב מספר העמודות בהתאם למספר הקלפים
  const getGridCols = () => {
    const cardCount = cards.length;
    if (cardCount === 8) return "grid-cols-2 md:grid-cols-4"; // 8 קלפים - 2x4
    if (cardCount === 12) return "grid-cols-3 md:grid-cols-4"; // 12 קלפים - 3x4
    if (cardCount === 16) return "grid-cols-4 md:grid-cols-4"; // 16 קלפים - 4x4
    return "grid-cols-3 md:grid-cols-4"; // ברירת מחדל
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
        {cards.map((memoryCard, index) => {
          // המרה מ-MemoryCard ל-Card format עבור הקומפוננטה
          const card = {
            id: index, // משתמשים באינדקס כמזהה
            emoji: memoryCard.animal.emoji,
            isFlipped: memoryCard.isFlipped,
            isMatched: memoryCard.isMatched
          };
          
          return (
            <div 
              key={`memory-card-${index}`} // key ייחודי באמצעות האינדקס
              className="animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <MemoryCard 
                card={card} 
                onClick={() => handleCardClick(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
