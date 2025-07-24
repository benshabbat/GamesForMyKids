import { Instrument } from "@/lib/types/game";

interface InstrumentCardProps {
  instrument: Instrument;
  onClick: (instrument: Instrument) => void;
}

/**
 * InstrumentCard - A component for displaying instrument cards in the instrument game
 * 
 * This component handles the rendering of individual instrument cards with their
 * emoji and Hebrew names
 */
export default function InstrumentCard({ instrument, onClick }: InstrumentCardProps) {
  return (
    <div
      onClick={() => onClick(instrument)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {instrument.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {instrument.hebrew}
        </div>
      </div>
    </div>
  );
}
