'use client';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

const GenericQuizGame = dynamic(() => import('@/components/game/quiz/GenericQuizGame'));

/**
 * Games that use the config-driven GenericQuizGame component.
 */
export const GENERIC_QUIZ_GAMES: Record<string, ComponentType> = {
  'riddles':         GenericQuizGame,
  'capitals':        GenericQuizGame,
  'spelling':        GenericQuizGame,
  'fractions':       GenericQuizGame,
  'emotions':        GenericQuizGame,
  'instruments':     GenericQuizGame,
  'world-languages': GenericQuizGame,
  'opposites':       GenericQuizGame,
  'sports-quiz':     GenericQuizGame,
  'continents':      GenericQuizGame,
  'healthy-food':    GenericQuizGame,
  'family':          GenericQuizGame,
  'english-words':   GenericQuizGame,
  'shapes-3d':       GenericQuizGame,
};
