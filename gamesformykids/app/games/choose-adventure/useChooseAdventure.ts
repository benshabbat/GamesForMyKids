'use client';
import { useState, useCallback } from 'react';
import { STORIES } from '@/lib/constants/stories/stories';
import type { Story, StoryNode } from '@/lib/constants/stories/stories';

export type AdventurePhase = 'menu' | 'story' | 'ending';

export function useChooseAdventure() {
  const [phase, setPhase] = useState<AdventurePhase>('menu');
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [endingsFound, setEndingsFound] = useState<Record<string, Set<string>>>({});

  const selectStory = useCallback((story: Story) => {
    const startNode = story.nodes.find((n) => n.id === story.startId) ?? null;
    setCurrentStory(story);
    setCurrentNode(startNode);
    setPhase('story');
  }, []);

  const makeChoice = useCallback((nextId: string) => {
    if (!currentStory) return;
    const next = currentStory.nodes.find((n) => n.id === nextId) ?? null;
    if (!next) return;
    if (next.isEnding) {
      setEndingsFound((prev) => {
        const storySet = new Set(prev[currentStory.id] ?? []);
        storySet.add(next.id);
        return { ...prev, [currentStory.id]: storySet };
      });
      setPhase('ending');
    }
    setCurrentNode(next);
  }, [currentStory]);

  const returnToMenu = useCallback(() => {
    setPhase('menu');
    setCurrentStory(null);
    setCurrentNode(null);
  }, []);

  const readAgain = useCallback(() => {
    if (!currentStory) return;
    const startNode = currentStory.nodes.find((n) => n.id === currentStory.startId) ?? null;
    setCurrentNode(startNode);
    setPhase('story');
  }, [currentStory]);

  const getEndingsCount = useCallback((storyId: string) => {
    return endingsFound[storyId]?.size ?? 0;
  }, [endingsFound]);

  return {
    phase,
    stories: STORIES,
    currentStory,
    currentNode,
    selectStory,
    makeChoice,
    returnToMenu,
    readAgain,
    getEndingsCount,
  };
}
