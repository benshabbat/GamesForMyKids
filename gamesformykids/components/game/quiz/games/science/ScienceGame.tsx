'use client';
import { useScienceGame } from './useScienceGame';
import { TOPICS, TOPIC_EMOJIS } from './data/questions';
import ScienceMenuScreen from './components/ScienceMenuScreen';
import ScienceQuestion from './components/ScienceQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function ScienceGame() {
  const { phase, current, choices, correctLabel, startGame, selectAnswer, restart } = useScienceGame();

  if (phase === 'menu') return <ScienceMenuScreen topics={TOPICS} topicEmojis={TOPIC_EMOJIS} onStart={startGame} />;
  if (phase === 'playing' && current) return <ScienceQuestion current={current} choices={choices} correctLabel={correctLabel} onSelect={selectAnswer} />;
  return <QuizResultScreen onRestart={restart} theme="cyan" />;
}
