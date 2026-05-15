'use client';
import QuizTopicMenuScreen from '@/components/game/quiz/QuizTopicMenuScreen';
import type { TriviaCategory } from '@/lib/quiz/data/trivia';
import { CATEGORIES, CATEGORY_EMOJIS } from '@/lib/quiz/data/trivia';

interface Props {
  onStart: (category: TriviaCategory | 'all') => void;
}

export default function TriviaMenuScreen({ onStart }: Props) {
  return (
    <QuizTopicMenuScreen
      gradient="from-amber-50 to-yellow-100"
      titleColor="text-amber-800"
      subtitleColor="text-amber-600"
      emoji="🎯"
      title="ידע כללי"
      description="בחר נושא או שחק הכל!"
      topics={CATEGORIES}
      topicEmoji={cat => CATEGORY_EMOJIS[cat]}
      topicClassName="bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-gray-700"
      allLabel="🎯 שאלות מכל הנושאים!"
      allButtonClassName="from-amber-500 to-yellow-500"
      onStart={onStart}
    />
  );
}
