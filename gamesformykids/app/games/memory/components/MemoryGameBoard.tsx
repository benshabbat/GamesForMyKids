import { useMemoryStore } from "../stores/useMemoryStore";
import MemoryCard from "./MemoryCard";
import PauseOverlay from "./PauseOverlay";

export default function MemoryGameBoard() {
  const {
    cards,
    isGamePaused,
    handleCardClick,
    getGridCols,
    getCardDisplayData,
    getAnimationDelay,
  } = useMemoryStore();

  const gridCols = getGridCols();

  return (
    <div className="relative">
      {isGamePaused && <PauseOverlay />}

      <div className={`grid ${gridCols} gap-4 max-w-2xl mx-auto ${isGamePaused ? 'blur-sm' : ''}`}>
        {cards.map((_, index) => {
          const card = getCardDisplayData(index);
          return (
            <div
              key={`memory-card-${index}`}
              className="animate-fade-in"
              style={{ animationDelay: getAnimationDelay(index), animationFillMode: 'both' }}
            >
              <MemoryCard card={card} onClick={() => handleCardClick(index)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
