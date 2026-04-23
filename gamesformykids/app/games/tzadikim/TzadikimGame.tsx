'use client';

import { useTzadikimGame } from './useTzadikimGame';
import StoryMenuView from './components/StoryMenuView';
import StoryReadingView from './components/StoryReadingView';
import QuizView from './components/QuizView';
import ResultView from './components/ResultView';
import CompleteView from './components/CompleteView';

export default function TzadikimGame() {
  const {
    phase,
    storyIndex,
    questionIndex,
    score,
    maxScore,
    selectedAnswer,
    feedback,
    currentStory,
    currentQuestion,
    totalStories,
    totalQuestions,
    stories,
    startStory,
    startQuiz,
    selectAnswer,
    nextQuestion,
    nextStory,
    backToMenu,
    restartGame,
  } = useTzadikimGame();

  if (phase === 'menu') {
    return (
      <StoryMenuView
        stories={stories}
        currentIndex={storyIndex}
        score={score}
        maxScore={maxScore}
        onSelectStory={startStory}
      />
    );
  }

  if (phase === 'story') {
    return (
      <StoryReadingView
        story={currentStory}
        storyIndex={storyIndex}
        totalStories={totalStories}
        onStartQuiz={startQuiz}
        onBack={backToMenu}
      />
    );
  }

  if (phase === 'quiz') {
    return (
      <QuizView
        story={currentStory}
        question={currentQuestion}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
        selectedAnswer={selectedAnswer}
        feedback={feedback}
        score={score}
        onSelectAnswer={selectAnswer}
        onNext={nextQuestion}
      />
    );
  }

  if (phase === 'result') {
    return (
      <ResultView
        story={currentStory}
        storyIndex={storyIndex}
        totalStories={totalStories}
        score={score}
        maxScore={maxScore}
        onNextStory={nextStory}
      />
    );
  }

  if (phase === 'complete') {
    return (
      <CompleteView
        score={score}
        maxScore={maxScore}
        onRestart={restartGame}
      />
    );
  }

  return null;
}
