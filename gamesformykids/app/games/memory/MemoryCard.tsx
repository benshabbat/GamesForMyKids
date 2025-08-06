import { Card } from "@/lib/types/base";

interface MemoryCardProps {
  card: Card;
  onClick: () => void;
}

export default function MemoryCard({ card, onClick }: MemoryCardProps) {
  const handleClick = () => {
    console.log('MemoryCard clicked, card ID:', card.id);
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden
        ${card.isFlipped || card.isMatched
          ? "bg-gradient-to-br from-white to-gray-50 border-8 border-white"
          : "bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 border-8 border-white"}
        ${card.isMatched ? "ring-4 ring-green-400 ring-offset-4 animate-glow" : ""}
        ${card.isFlipped && !card.isMatched ? "animate-bounce-gentle" : ""}
      `}
    >
      {/* רקע מעגל מיוחד לכרטיסים פתוחים */}
      {(card.isFlipped || card.isMatched) && (
        <div className="absolute inset-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl opacity-50"></div>
      )}

      {/* אפקט זוהר כאשר הקלף מקבל match */}
      {card.isMatched && (
        <div className="absolute inset-0 animate-ping bg-gradient-to-r from-yellow-400 to-orange-400 opacity-30 rounded-2xl"></div>
      )}
      
      {/* תוכן הקלף */}
      <div className="w-full h-full flex items-center justify-center relative z-10">
        {card.isFlipped || card.isMatched ? (
          <span className={`
            text-5xl md:text-7xl transition-all duration-500
            ${card.isMatched ? "animate-bounce" : ""}
            filter drop-shadow-lg
          `}>
            {card.emoji}
          </span>
        ) : (
          <div className="text-center text-white">
            <span className="text-4xl md:text-5xl animate-pulse filter drop-shadow-lg">❓</span>
            <div className="text-sm mt-2 opacity-90 font-bold tracking-wide">לחץ</div>
          </div>
        )}
      </div>
      
      {/* אפקט כוכבים כאשר יש match */}
      {card.isMatched && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-400 text-2xl animate-bounce filter drop-shadow-lg"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1.2s'
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

      {/* גבול זוהר לכרטיסים שנמצאו */}
      {card.isMatched && (
        <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-3xl opacity-20 animate-pulse"></div>
      )}
    </div>
  );
}
