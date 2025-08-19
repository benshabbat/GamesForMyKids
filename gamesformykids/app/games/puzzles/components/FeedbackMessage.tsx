
import { usePuzzleFeedback } from '@/app/games/puzzles/hooks/usePuzzleFeedback';

interface FeedbackMessageProps {
  // Allow optional override for special cases
  message?: string;
  type?: 'success' | 'error' | '';
}

/**
 * Shared feedback message component - now uses hook for data
 */
export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ 
  message: overrideMessage, 
  type: overrideType 
}) => {
  const { feedbackMessage, feedbackType } = usePuzzleFeedback();
  
  // Use hook values unless overridden
  const message = overrideMessage ?? feedbackMessage;
  const type = overrideType ?? feedbackType;
  if (!message) return null;

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg animate-bounce ${
      type === 'success' ? 'bg-green-500' : 'bg-orange-500'
    }`}>
      {message}
    </div>
  );
};
