'use client';

import { usePuzzleGame } from '../usePuzzleGame';

export default function FeedbackMessage() {
  const { feedbackMessage: message, feedbackType: type } = usePuzzleGame();
  if (!message) return null;
  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg animate-bounce ${
      type === 'success' ? 'bg-green-500' : 'bg-orange-500'
    }`}>
      {message}
    </div>
  );
}
