
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';

export const FeedbackMessage: React.FC = () => {
  const message = usePuzzleStore(s => s.feedbackMessage);
  const type = usePuzzleStore(s => s.feedbackType);
  if (!message) return null;

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg animate-bounce ${
      type === 'success' ? 'bg-green-500' : 'bg-orange-500'
    }`}>
      {message}
    </div>
  );
};
