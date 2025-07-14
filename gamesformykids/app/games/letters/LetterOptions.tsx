import { Volume2 } from "lucide-react";
import { Letter } from "@/types/game";

type LetterOptionsProps = {
  options: Letter[];
  currentChallenge?: Letter | null;
  onLetterClick: (letter: Letter) => void;
};

export default function LetterOptions({
  options,
  onLetterClick,
}: LetterOptionsProps) {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      {options.map((letter) => (
        <div
          key={letter.name}
          onClick={() => onLetterClick(letter)}
          className="aspect-square rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl bg-gradient-to-br from-orange-400 to-red-400 text-white border-8 border-white"
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-6xl md:text-8xl font-bold mb-2">
              {letter.hebrew}
            </div>
            <div className="text-sm md:text-base opacity-80">
              {letter.english}
            </div>
            <Volume2 className="w-6 h-6 opacity-70 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}