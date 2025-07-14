
interface GameHeaderProps {
  isGameStarted: boolean;
  matchedPairs: number;
  totalPairs: number;
  onStart: () => void;
}

export default function GameHeader({
  isGameStarted,
  matchedPairs,
  totalPairs,
  onStart,
}: GameHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-purple-800 mb-4">
        משחק זיכרון 🧠
      </h1>
      <p className="text-xl text-purple-600 mb-6">מצא את הזוגות הזהים!</p>

      {!isGameStarted ? (
        <button
          onClick={onStart}
          className="px-8 py-4 bg-pink-500 text-white rounded-full text-2xl font-bold hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          התחל משחק! 🎮
        </button>
      ) : (
        <div className="mb-6">
          <p className="text-lg text-purple-700">
            זוגות שנמצאו: {matchedPairs} / {totalPairs}
          </p>
          <button
            onClick={onStart}
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300"
          >
            משחק חדש
          </button>
        </div>
      )}
    </div>
  );
}