import { AnimalData } from "@/types/game";

interface GameWinMessageProps {
  animals: AnimalData[];
}

export default function GameWinMessage({ animals }: GameWinMessageProps) {
  return (
    <div className="text-center mb-8 p-8 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl shadow-xl animate-bounce-gentle">
      <h2 className="text-4xl font-bold text-orange-800 mb-2">
        🎉 כל הכבוד! 🎉
      </h2>
      <p className="text-2xl text-orange-700 mb-4">מצאת את כל הזוגות!</p>
      
      {/* הצגת כל החיות בחגיגה */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {animals.map((animal, index) => (
          <span 
            key={animal.emoji + index} 
            className="text-3xl animate-bounce"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationDuration: '1s'
            }}
          >
            {animal.emoji}
          </span>
        ))}
      </div>
      
      <div className="text-3xl mt-4 text-orange-600">
        ⭐ מעולה! תמשיך לשחק! ⭐
      </div>
    </div>
  );
}