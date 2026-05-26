'use client';

import { useState, useCallback } from 'react';
import { TZADIKIM_STORIES, TzaddikStory } from './data/tzadikim';
import { useQuizQuestionState } from '@/lib/quiz/useQuizQuestionState';

export type GamePhase = 'menu' | 'story' | 'quiz' | 'result' | 'complete';

export function useTzadikimGame() {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [storyIndex, setStoryIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentStory: TzaddikStory = TZADIKIM_STORIES[storyIndex];
  const totalStories = TZADIKIM_STORIES.length;
  const maxScore = totalStories * 3;

  const {
    questionIndex,
    selected,
    isCorrect,
    currentQuestion,
    totalQuestions,
    selectAnswer,
    nextQuestion,
    resetQuestionState,
  } = useQuizQuestionState({
    questions: currentStory.questions,
    onCorrect: () => setScore(prev => prev + 1),
    onComplete: () => setPhase('result'),
  });

  const startStory = useCallback((index: number) => {
    setStoryIndex(index);
    resetQuestionState();
    setPhase('story');
  }, [resetQuestionState]);

  const startQuiz = useCallback(() => {
    resetQuestionState();
    setPhase('quiz');
  }, [resetQuestionState]);

  const nextStory = useCallback(() => {
    if (storyIndex < totalStories - 1) {
      setStoryIndex(prev => prev + 1);
      resetQuestionState();
      setPhase('story');
    } else {
      setPhase('complete');
    }
  }, [storyIndex, totalStories, resetQuestionState]);

  const backToMenu = useCallback(() => setPhase('menu'), []);

  const restartGame = useCallback(() => {
    setPhase('menu');
    setStoryIndex(0);
    setScore(0);
    resetQuestionState();
  }, [resetQuestionState]);

  const progressPercent = Math.round((storyIndex / totalStories) * 100);

  return {
    phase,
    storyIndex,
    questionIndex,
    score,
    maxScore,
    selected,
    isCorrect,
    currentStory,
    currentQuestion,
    totalStories,
    totalQuestions,
    progressPercent,
    stories: TZADIKIM_STORIES,
    startStory,
    startQuiz,
    backToMenu,
    selectAnswer,
    nextQuestion,
    nextStory,
    restartGame,
  };
}
