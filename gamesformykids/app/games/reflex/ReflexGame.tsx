'use client';

import { useReflexStore } from './reflexStore';
import ReflexMenuScreen from './components/ReflexMenuScreen';
import ReflexPlayScreen from './components/ReflexPlayScreen';
import ReflexResultScreen from './components/ReflexResultScreen';

export default function ReflexGame() {
  const phase = useReflexStore((s) => s.phase);

  if (phase === 'menu')    return <ReflexMenuScreen />;
  if (phase === 'playing') return <ReflexPlayScreen />;
  return <ReflexResultScreen />;
}
