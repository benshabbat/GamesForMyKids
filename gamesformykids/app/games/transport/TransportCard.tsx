import { Transport } from "@/lib/types/game";

interface TransportCardProps {
  transport: Transport;
  onClick: (transport: Transport) => void;
}

/**
 * TransportCard - A component for displaying transport cards in the transport game
 * 
 * This component handles the rendering of individual transport cards with their
 * emoji and Hebrew names
 */
export default function TransportCard({ transport, onClick }: TransportCardProps) {
  return (
    <div
      onClick={() => onClick(transport)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {transport.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {transport.hebrew}
        </div>
      </div>
    </div>
  );
}