'use client';
import QuizTopicMenuScreen from '@/components/game/quiz/QuizTopicMenuScreen';
import { TOPICS, TOPIC_EMOJIS, type ScienceTopic } from '@/lib/quiz/data/science';

interface Props {
  onStart: (topic: ScienceTopic | 'all') => void;
}

export default function ScienceMenuScreen({ onStart }: Props) {
  return (
    <QuizTopicMenuScreen
      gradient="from-cyan-50 to-indigo-100"
      titleColor="text-indigo-800"
      subtitleColor="text-indigo-600"
      emoji="🔬"
      title="מדע לילדים"
      description="גלה סודות המדע!"
      topics={TOPICS}
      topicEmoji={t => TOPIC_EMOJIS[t]}
      topicClassName="bg-white border-2 border-indigo-200 hover:border-indigo-400 text-indigo-800"
      allLabel="🌟 כל הנושאים"
      allButtonClassName="from-cyan-500 to-indigo-600"
      onStart={onStart}
    />
  );
}
