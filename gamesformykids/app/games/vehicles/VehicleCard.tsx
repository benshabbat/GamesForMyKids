import { Vehicle } from "@/lib/types/game";

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

/**
 * VehicleCard - A component for displaying vehicle cards in the vehicle game
 * 
 * This component handles the rendering of individual vehicle cards with their
 * emoji and Hebrew names
 */
export default function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  return (
    <div
      onClick={() => onClick(vehicle)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {vehicle.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {vehicle.hebrew}
        </div>
      </div>
    </div>
  );
}
