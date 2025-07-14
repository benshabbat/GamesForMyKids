import { AnimalData } from "@/types/game";

interface GameWinMessageProps {
  animals: AnimalData[];
}

export default function GameWinMessage({ animals }: GameWinMessageProps) {
  return (
    <div className="text-center mb-8 p-6 bg-yellow-200 rounded-2xl shadow-lg animate-bounce-gentle">
      <h2 className="text-3xl font-bold text-yellow-800 mb-2">
        🎉 כל הכבוד! 🎉
      </h2>
      <p className="text-xl text-yellow-700">מצאת את כל הזוגות!</p>
      <div className="mt-4 text-2xl">
        {animals.map((animal) => (
          <span key={animal.emoji} className="mx-1">
            {animal.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}