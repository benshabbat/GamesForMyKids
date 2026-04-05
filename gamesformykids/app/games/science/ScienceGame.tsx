'use client';
import { useScienceGame } from './useScienceGame';
import { TOPICS, TOPIC_EMOJIS } from './data/questions';
import ScienceMenuScreen from './components/ScienceMenuScreen';
import ScienceQuestion from './components/ScienceQuestion';
import ScienceResultScreen from './components/ScienceResultScreen';

export default function ScienceGame() {
  const {
    phase, index, score, selected, isCorrect, current, total,
    startGame, selectAnswer, next, goMenu, restart,
  } = useScienceGame();

  if (phase === 'menu') return <ScienceMenuScreen topics={TOPICS} topicEmojis={TOPIC_EMOJIS} onStart={startGame} />;

  if (phase === 'playing' && current) {
    return (
      <ScienceQuestion
        index={index}
        total={total}
        score={score}
        current={current}
        selected={selected as number | null}
        isCorrect={isCorrect}
        onSelect={selectAnswer}
        onNext={next}
        onMenu={goMenu}
      />
    );
  }

  return <ScienceResultScreen score={score} total={total} onRestart={restart} onMenu={goMenu} />;
}
