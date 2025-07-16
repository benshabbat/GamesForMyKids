interface GameStartButtonProps {
  onStart: () => void;
  bgClass?: string;
    bgClassHover?: string;
}

//todo: just name for colors to gradient
function GameStartButton({
  onStart,
  bgClass = "bg-gradient-to-r from-pink-500 to-purple-500",
  bgClassHover = "hover:from-pink-600 hover:to-purple-600",
}: GameStartButtonProps) {
  return (
    <button
      onClick={onStart}
      className={`px-12 py-6 ${bgClass} text-white rounded-full text-3xl font-bold ${bgClassHover} transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6`}
    >
      בואו נתחיל! 🚀
    </button>
  );
}

export default GameStartButton;
