import { Animal } from "@/lib/types/game";

interface AnimalCardProps {
  animal: Animal;
  isCorrect: boolean;
  onClick: (animal: Animal) => void;
}

/**
 * AnimalCard - A component for displaying animal cards in the animal game
 * 
 * This component handles the rendering of individual animal cards with their
 * emoji and Hebrew names
 */
export default function AnimalCard({ animal, isCorrect, onClick }: AnimalCardProps) {
  return (
    <div
      onClick={() => onClick(animal)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-emerald-400 to-green-600 hover:from-emerald-500 hover:to-green-700
        border-8 border-white
        ${isCorrect ? "ring-4 ring-green-400 ring-offset-4" : ""}
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {animal.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {animal.hebrew}
        </div>
      </div>
    </div>
  );
}