'use client';
import { useState } from 'react';
import { STORIES } from '@/lib/constants/stories/stories';
import type { Story, StoryNode } from '@/lib/constants/stories/stories';

export type AdventurePhase = 'menu' | 'story' | 'ending';

export function useChooseAdventure() {
  const [phase, setPhase] = useState<AdventurePhase>('menu');
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [endingsFound, setEndingsFound] = useState<Record<string, Set<string>>>({});

  const selectStory = (story: Story) => {
    const startNode = story.nodes.find((n) => n.id === story.startId) ?? null;
    setCurrentStory(story);
    setCurrentNode(startNode);
    setPhase('story');
  };

  const makeChoice = (nextId: string) => {
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
  };

  const returnToMenu = () => {
    setPhase('menu');
    setCurrentStory(null);
    setCurrentNode(null);
  };

  const readAgain = () => {
    if (!currentStory) return;
    const startNode = currentStory.nodes.find((n) => n.id === currentStory.startId) ?? null;
    setCurrentNode(startNode);
    setPhase('story');
  };

  const getEndingsCount = (storyId: string) => {
    return endingsFound[storyId]?.size ?? 0;
  };

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
