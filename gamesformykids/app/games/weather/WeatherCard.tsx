import { Weather } from "@/lib/types/game";

interface WeatherCardProps {
  weather: Weather;
  onClick: (weather: Weather) => void;
}

/**
 * WeatherCard - A component for displaying weather cards in the weather game
 * 
 * This component handles the rendering of individual weather cards with their
 * emoji and Hebrew names
 */
export default function WeatherCard({ weather, onClick }: WeatherCardProps) {
  return (
    <div
      onClick={() => onClick(weather)}
      className={`
        aspect-square rounded-3xl cursor-pointer transition-all 
        duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
        bg-gradient-to-br from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600
        border-8 border-white
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce-in">
          {weather.emoji}
        </div>
        <div className="text-xl md:text-2xl font-bold">
          {weather.hebrew}
        </div>
      </div>
    </div>
  );
}
