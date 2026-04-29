'use client';
import type { ComponentType } from 'react';
import { GENERIC_QUIZ_GAMES } from './registry/genericQuizGames';
import { CUSTOM_QUIZ_GAMES } from './registry/customQuizGames';
import { COMPLEX_QUIZ_GAMES } from './registry/complexQuizGames';

const QUIZ_COMPONENTS: Record<string, ComponentType> = {
  ...GENERIC_QUIZ_GAMES,
  ...CUSTOM_QUIZ_GAMES,
  ...COMPLEX_QUIZ_GAMES,
};

export function getQuizGameComponent(gameType: string): ComponentType | null {
  return QUIZ_COMPONENTS[gameType] ?? null;
}

