import { Card } from "@/lib/types/base";

interface MemoryCardProps {
  card: Card;
  onClick: (id: number) => void;
}

export default function MemoryCard({ card, onClick }: MemoryCardProps) {
  return (
    <div
      onClick={() => onClick(card.id)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden
        ${card.isFlipped || card.isMatched
          ? "bg-white border-8 border-white"
          : "bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 border-8 border-white"}
        ${card.isMatched ? "ring-4 ring-green-400 ring-offset-4 animate-pulse" : ""}
        ${card.isFlipped && !card.isMatched ? "animate-bounce" : ""}
      `}
    >
      {/* אפקט זוהר כאשר הקלף מקבל match */}
      {card.isMatched && (
        <div className="absolute inset-0 animate-ping bg-gradient-to-r from-yellow-400 to-orange-400 opacity-30 rounded-2xl"></div>
      )}
      
      {/* תוכן הקלף */}
      <div className="w-full h-full flex items-center justify-center relative z-10">
        {card.isFlipped || card.isMatched ? (
          <span className={`
            text-4xl md:text-6xl transition-all duration-300
            ${card.isMatched ? "animate-bounce-in scale-110" : "animate-flip-in"}
          `}>
            {card.emoji}
          </span>
        ) : (
          <div className="text-center text-white">
            <span className="text-3xl md:text-4xl animate-pulse">❓</span>
            <div className="text-sm mt-2 opacity-80 font-semibold">לחץ לחשיפה</div>
          </div>
        )}
      </div>
      
      {/* אפקט כוכבים כאשר יש match */}
      {card.isMatched && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => `star-${card.id}-${i}`).map((starId) => (
            <div
              key={starId}
              className="absolute text-yellow-400 text-xl animate-bounce"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                animationDelay: `${parseInt(starId.split('-')[2]) * 0.1}s`,
                animationDuration: '2s'
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
