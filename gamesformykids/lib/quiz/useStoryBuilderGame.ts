'use client';
import { useState, useCallback, useMemo } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { STORY_TEMPLATES, type StoryTemplate, type Blank } from './data/storyBuilderData';
import { shuffle } from '@/lib/utils';

export function useStoryBuilderGame() {
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const { startQuiz, selectAnswer, nextQuestion } = useQuizGameStore();

  const [stories] = useState(() => shuffle([...STORY_TEMPLATES]));
  const [storyOffset, setStoryOffset] = useState(0);
  const [filledWords, setFilledWords] = useState<string[]>([]);

  const story: StoryTemplate = stories[storyOffset % stories.length]!;
  const blanks: Blank[] = story.blanks;
  const currentBlank: Blank | null = blanks[index] ?? null;

  const startGame = useCallback(() => {
    setFilledWords([]);
    startQuiz('story-builder', blanks.length);
  }, [startQuiz, blanks.length]);

  const selectWord = useCallback((word: string) => {
    setFilledWords(prev => [...prev, word]);
    selectAnswer(word, true);
    nextQuestion();
  }, [selectAnswer, nextQuestion]);

  const restart = useCallback(() => {
    setStoryOffset(prev => prev + 1);
    setFilledWords([]);
    // startGame will pick up the new story on next render via storyOffset
    // We need a fresh story's blank count — derive it here
    const nextStory = stories[(storyOffset + 1) % stories.length]!;
    startQuiz('story-builder', nextStory.blanks.length);
  }, [stories, storyOffset, startQuiz]);

  const completedStory: string | null = useMemo(() => {
    if (filledWords.length < blanks.length) return null;
    return story.segments.reduce((acc, seg, i) => acc + seg + (filledWords[i] ?? ''), '');
  }, [story, filledWords, blanks.length]);

  return { phase, story, currentBlank, currentBlankIdx: index, filledWords, completedStory, startGame, selectWord, restart };
}
