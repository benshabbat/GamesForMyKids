import { Card } from "@/lib/types/game";

interface MemoryCardProps {
  card: Card;
  onClick: (id: number) => void;
}

export default function MemoryCard({ card, onClick }: MemoryCardProps) {
  return (
    <div
      onClick={() => onClick(card.id)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl
        ${card.isFlipped || card.isMatched
          ? "bg-white border-8 border-white"
          : "bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 border-8 border-white"}
        ${card.isMatched ? "ring-4 ring-green-400 ring-offset-4 animate-pulse" : ""}
      `}
    >
      <div className="w-full h-full flex items-center justify-center">
        {card.isFlipped || card.isMatched ? (
          <span className="text-4xl md:text-6xl animate-bounce-in">{card.emoji}</span>
        ) : (
          <div className="text-center text-white">
            <span className="text-3xl md:text-4xl">❓</span>
            <div className="text-sm mt-2 opacity-80">לחץ לחשיפה</div>
          </div>
        )}
      </div>
    </div>
  );
}
