import { Card } from "@/lib/types/base";
import MemoryCard from "./MemoryCard";

interface MemoryGameBoardProps {
  cards: Card[];
  onCardClick: (id: number) => void;
}

export default function MemoryGameBoard({ cards, onCardClick }: MemoryGameBoardProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
      {cards.map((card) => (
        <MemoryCard key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
}
