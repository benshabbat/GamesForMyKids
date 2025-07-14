import { Letter } from "@/types/game";
import { LetterCard } from "./LetterCard";

interface LetterGridProps {
  letters: Letter[];
  onLetterClick: (letter: Letter) => void;
  correctLetter?: Letter | null;
}

export function LetterGrid({ letters, onLetterClick, correctLetter }: LetterGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      {letters.map((letter) => (
        <LetterCard
          key={letter.name}
          letter={letter}
          onClick={onLetterClick}
          isCorrect={correctLetter?.name === letter.name}
        />
      ))}
    </div>
  );
}