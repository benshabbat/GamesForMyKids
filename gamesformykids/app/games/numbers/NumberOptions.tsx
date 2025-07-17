import { Volume2 } from "lucide-react";
import { NumberItem } from "@/lib/types/game";

type NumberOptionsProps = {
  options: NumberItem[];
  currentChallenge?: NumberItem | null;
  onNumberClick: (number: NumberItem) => void;
};

export default function NumberOptions({
  options,
  onNumberClick,
}: NumberOptionsProps) {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      {options.map((number) => (
        <div
          key={number.name}
          onClick={() => onNumberClick(number)}
          className={`
            aspect-square rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
            bg-gradient-to-br from-indigo-400 to-purple-400 text-white
            border-8 border-white
          `}
        >
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="text-8xl md:text-9xl font-bold mb-2">
              {number.digit}
            </div>
            <div className="text-lg md:text-xl font-bold text-center">
              {number.hebrew}
            </div>
            <div className="text-sm opacity-80 mt-1">
              {number.english}
            </div>
            <Volume2 className="w-5 h-5 opacity-70 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}