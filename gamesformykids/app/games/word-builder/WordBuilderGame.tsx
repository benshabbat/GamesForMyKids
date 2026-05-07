'use client';

import { useWordBuilderGame } from './useWordBuilderGame';
import WordBuilderMenuScreen from './components/WordBuilderMenuScreen';
import WordBuilderQuestion from './components/WordBuilderQuestion';
import WordBuilderResultScreen from './components/WordBuilderResultScreen';

export default function WordBuilderGame() {
  const { phase } = useWordBuilderGame();

  if (phase === 'menu') return <WordBuilderMenuScreen />;

  if (phase === 'playing') return <WordBuilderQuestion />;

  return <WordBuilderResultScreen />;
}
