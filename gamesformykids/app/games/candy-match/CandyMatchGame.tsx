'use client';
import { useCandyMatch } from './useCandyMatch';
import CandyMatchMenuScreen from './components/CandyMatchMenuScreen';
import CandyMatchBoard from './components/CandyMatchBoard';
import CandyMatchResultScreen from './components/CandyMatchResultScreen';

export default function CandyMatchGame() {
  const { phase } = useCandyMatch();

  if (phase === 'menu') return <CandyMatchMenuScreen />;
  if (phase === 'result') return <CandyMatchResultScreen />;
  return <CandyMatchBoard />;
}
