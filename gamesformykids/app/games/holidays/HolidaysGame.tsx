'use client';

import { useHolidaysGame } from './useHolidaysGame';
import { HOLIDAYS } from './data/holidays';
import HolidaysMenuScreen from './components/HolidaysMenuScreen';
import HolidaysQuizScreen from './components/HolidaysQuizScreen';
import HolidaysResultScreen from './components/HolidaysResultScreen';
import HolidaysCompleteScreen from './components/HolidaysCompleteScreen';

export default function HolidaysGame() {
  const {
    phase, holidayIndex, questionIndex, score, maxScore,
    selected, isCorrect, current, currentQuestion,
    totalHolidays, totalQuestions, holidays,
    startHoliday, selectAnswer, next, nextHoliday, goMenu, restart,
  } = useHolidaysGame();

  if (phase === 'menu') {
    return <HolidaysMenuScreen holidays={holidays} score={score} maxScore={maxScore} onStart={startHoliday} />;
  }

  if (phase === 'quiz') {
    return (
      <HolidaysQuizScreen
        current={current}
        currentQuestion={currentQuestion}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
        score={score}
        selected={selected}
        isCorrect={isCorrect}
        onSelect={selectAnswer}
        onNext={next}
        onMenu={goMenu}
      />
    );
  }

  if (phase === 'result') {
    const nextHolidayInfo = holidayIndex < totalHolidays - 1 ? HOLIDAYS[holidayIndex + 1] : null;
    return (
      <HolidaysResultScreen
        current={current}
        score={score}
        maxScore={maxScore}
        holidayIndex={holidayIndex}
        totalHolidays={totalHolidays}
        nextHolidayInfo={nextHolidayInfo}
        onNext={nextHoliday}
        onMenu={goMenu}
      />
    );
  }

  return <HolidaysCompleteScreen score={score} maxScore={maxScore} onRestart={restart} />;
}
