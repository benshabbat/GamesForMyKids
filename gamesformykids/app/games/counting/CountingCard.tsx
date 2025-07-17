import { CountingChallenge } from "@/lib/types/game";

interface CountingCardProps {
  number: number;
  onClick: (number: number) => void;
}

export default function CountingCard({ number, onClick }: CountingCardProps) {
  return (
    <div
      onClick={() => onClick(number)}
      className="
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600
        border-8 border-white
      "
    >
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-6xl md:text-8xl font-bold">
          {number}
        </div>
      </div>
    </div>
  );
}