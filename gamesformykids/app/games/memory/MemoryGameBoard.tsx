import { useMemoryContext } from "@/contexts";
import MemoryCard from "./MemoryCard";

export default function MemoryGameBoard() {
  const {
    state: { cards, isGamePaused },
    handleCardClick,
    gridCols,
    getCardDisplayData,
    getAnimationDelay
  } = useMemoryContext();

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
      <div className={`grid ${gridCols} gap-4 max-w-2xl mx-auto ${isGamePaused ? 'blur-sm' : ''}`}>
        {cards.map((_, index) => {
          const card = getCardDisplayData(index);
          
          return (
            <div 
              key={`memory-card-${index}`}
              className="animate-fade-in"
              style={{ 
                animationDelay: getAnimationDelay(index),
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
