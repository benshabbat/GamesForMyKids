'use client';

import { useState, useCallback } from 'react';
import { TZADIKIM_STORIES, TzaddikStory } from './data/tzadikim';

export type GamePhase = 'menu' | 'story' | 'quiz' | 'result' | 'complete';

export interface AnswerFeedback {
  questionIndex: number;
  selectedIndex: number;
  isCorrect: boolean;
}

export function useTzadikimGame() {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [storyIndex, setStoryIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [storyScores, setStoryScores] = useState<number[]>([]);

  const currentStory = TZADIKIM_STORIES[storyIndex];
  if (!currentStory) throw new Error('Invalid story index');
  const totalStories = TZADIKIM_STORIES.length;
  const currentQuestion = currentStory.questions[questionIndex];
  const totalQuestions = currentStory.questions.length;
  const maxScore = totalStories * 3; // 3 questions per story

  const startStory = useCallback((index: number) => {
    setStoryIndex(index);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setPhase('story');
  }, []);

  const startQuiz = useCallback(() => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setPhase('quiz');
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null) return; // already answered
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === (currentQuestion?.correctIndex ?? -1);
    setFeedback({ questionIndex, selectedIndex: answerIndex, isCorrect });
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  }, [selectedAnswer, currentQuestion, questionIndex]);

  const nextQuestion = useCallback(() => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      // end of quiz for this story
      setPhase('result');
    }
  }, [questionIndex, totalQuestions]);

  const nextStory = useCallback(() => {
    // record story score
    const storyCorrect = feedback
      ? storyScores.length
      : storyScores.length;
    setStoryScores(prev => [...prev, storyCorrect]);

    if (storyIndex < totalStories - 1) {
      setStoryIndex(prev => prev + 1);
      setQuestionIndex(0);
      setSelectedAnswer(null);
      setFeedback(null);
      setPhase('story');
    } else {
      setPhase('complete');
    }
  }, [storyIndex, totalStories, feedback, storyScores]);

  const backToMenu = useCallback(() => setPhase('menu'), []);

  const restartGame = useCallback(() => {
    setPhase('menu');
    setStoryIndex(0);
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setStoryScores([]);
  }, []);

  const progressPercent = Math.round((storyIndex / totalStories) * 100);

  return {
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
