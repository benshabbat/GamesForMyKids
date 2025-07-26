interface MathNumberCardProps {
  number: number;
  onClick: (number: number) => void;
}

export default function MathNumberCard({ number, onClick }: MathNumberCardProps) {
  return (
    <div
      onClick={() => onClick(number)}
      className="
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600
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
