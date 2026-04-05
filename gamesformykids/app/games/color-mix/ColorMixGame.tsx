'use client';
import { useColorMixGame } from './useColorMixGame';
import ColorMixMenuScreen from './components/ColorMixMenuScreen';
import ColorMixQuestion from './components/ColorMixQuestion';
import ColorMixResultScreen from './components/ColorMixResultScreen';

export default function ColorMixGame() {
  const {
    phase, index, score, selected, isCorrect, current, total,
    startGame, selectAnswer, next, goMenu, restart,
  } = useColorMixGame();

  if (phase === 'menu') return <ColorMixMenuScreen onStart={startGame} />;

  if (phase === 'playing' && current) return (
    <ColorMixQuestion
      index={index} total={total} score={score}
      mix={current.mix} choices={current.choices}
      selected={selected} isCorrect={isCorrect}
      onSelect={selectAnswer} onNext={next} onMenu={goMenu}
    />
  );

  return <ColorMixResultScreen score={score} total={total} onRestart={restart} onMenu={goMenu} />;
}
