import { Card } from "@/types/game";

interface MemoryCardProps {
  card: Card;
  onClick: (id: number) => void;
}

export default function MemoryCard({ card, onClick }: MemoryCardProps) {
  return (
    <div
      onClick={() => onClick(card.id)}
      className={`
        aspect-square rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg
        ${card.isFlipped || card.isMatched
          ? "bg-white"
          : "bg-gradient-to-br from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500"}
        ${card.isMatched ? "ring-4 ring-green-400" : ""}
      `}
    >
      <div className="w-full h-full flex items-center justify-center">
        {card.isFlipped || card.isMatched ? (
          <span className="text-4xl md:text-6xl">{card.emoji}</span>
        ) : (
          <span className="text-2xl md:text-3xl">❓</span>
        )}
      </div>
    </div>
  );
}