'use client';
import { useArithmeticGame } from './useArithmeticGame';
import { TIME_PER_QUESTION } from './data/questions';
import ArithmeticMenuScreen from './components/ArithmeticMenuScreen';
import ArithmeticQuestion from './components/ArithmeticQuestion';
import ArithmeticResultScreen from './components/ArithmeticResultScreen';

export default function ArithmeticGame() {
  const {
    phase, level, question, questionNum, score, correct,
    selected, isCorrect, timeLeft, totalQuestions, levels,
    startGame, selectAnswer, advance, goMenu,
  } = useArithmeticGame();

  if (phase === 'menu') return <ArithmeticMenuScreen levels={levels} onStart={startGame} />;

  if (phase === 'playing' && question) {
    const timePct = (timeLeft / TIME_PER_QUESTION) * 100;
    return (
      <ArithmeticQuestion
        level={level} question={question} questionNum={questionNum}
        totalQuestions={totalQuestions} score={score}
        selected={selected} isCorrect={isCorrect}
        timeLeft={timeLeft} timePct={timePct}
        onSelect={selectAnswer} onAdvance={advance} onMenu={goMenu}
      />
    );
  }

  return <ArithmeticResultScreen level={level} correct={correct} totalQuestions={totalQuestions} score={score} onRestart={() => startGame(level)} onMenu={goMenu} />;
}
