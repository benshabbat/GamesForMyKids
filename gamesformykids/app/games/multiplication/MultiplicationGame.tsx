'use client';

import { useMultiplicationGame } from './useMultiplicationGame';
import { LEVELS, QUESTIONS_PER_LEVEL, TIME_PER_QUESTION } from './data/tables';
import MultiplicationMenuScreen from './components/MultiplicationMenuScreen';
import MultiplicationQuestion from './components/MultiplicationQuestion';
import MultiplicationResultScreen from './components/MultiplicationResultScreen';

export default function MultiplicationGame() {
  const {
    phase, level, question, questionNum, score, correct,
    selected, isCorrect, timeLeft, totalQuestions,
    startGame, selectAnswer, advance, goMenu,
  } = useMultiplicationGame();

  if (phase === 'menu') {
    return <MultiplicationMenuScreen levels={LEVELS} questionsPerLevel={QUESTIONS_PER_LEVEL} timePerQuestion={TIME_PER_QUESTION} onStart={startGame} />;
  }

  if (phase === 'playing' && question) {
    return (
      <MultiplicationQuestion
        level={level}
        question={question}
        questionNum={questionNum}
        totalQuestions={totalQuestions}
        score={score}
        selected={selected}
        isCorrect={isCorrect ?? false}
        timeLeft={timeLeft}
        timePerQuestion={TIME_PER_QUESTION}
        onSelect={selectAnswer}
        onAdvance={advance}
        onMenu={goMenu}
      />
    );
  }

  return <MultiplicationResultScreen level={level} correct={correct} totalQuestions={totalQuestions} score={score} onRestart={startGame} onMenu={goMenu} />;
}
