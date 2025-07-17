interface GameStartButtonProps {
  onStart: () => void;
  fromColor?: string;
  toColor?: string;
}

//todo: just name for colors to gradient ex (from name-color to name-color)
function GameStartButton({
  onStart,
  fromColor = "pink",
  toColor = "purple",
}: GameStartButtonProps) {
  // Create class names dynamically
  const buttonClass = `px-12 py-6 cursor-pointer bg-gradient-to-r from-${fromColor}-500 to-${toColor}-500 text-white rounded-full text-3xl font-bold hover:from-${fromColor}-600 hover:to-${toColor}-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6`;
  
  return (
    <button
      onClick={() => {
        console.log("Start button clicked");
        onStart();
      }}
      className={buttonClass}
    >
      בואו נתחיל! 🚀
    </button>
  );
}

export default GameStartButton;
