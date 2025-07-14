import { Letter } from "@/types/game";

interface LetterCardProps {
  letter: Letter;
  onClick: (letter: Letter) => void;
  isCorrect?: boolean;
}

export function LetterCard({ letter, onClick, isCorrect }: LetterCardProps) {
  return (
    <div
      onClick={() => onClick(letter)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500
        border-8 border-white flex items-center justify-center
        ${isCorrect ? "ring-4 ring-green-400 ring-offset-4" : ""}
      `}
    >
      <div className="text-center text-white">
        <div className="text-6xl md:text-8xl font-bold mb-2">
          {letter.name}
        </div>
        <div className="text-lg md:text-xl font-semibold">
          {letter.hebrew}
        </div>
      </div>
    </div>
  );
}


