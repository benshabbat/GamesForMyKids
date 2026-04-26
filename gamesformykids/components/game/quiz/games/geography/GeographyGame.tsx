'use client';
import { useGeographyGame } from './useGeographyGame';
import { QuestionMode } from './data/countries';
import GeographyMenuScreen from './components/GeographyMenuScreen';
import GeographyQuestion from './components/GeographyQuestion';
import GeographyResultScreen from './components/GeographyResultScreen';

export default function GeographyGame() {
  const { phase, current, startGame, selectAnswer, restart } = useGeographyGame();

  if (phase === 'menu') return <GeographyMenuScreen onStart={(mode: QuestionMode) => startGame(mode)} />;
  if (phase === 'playing' && current) return <GeographyQuestion current={current} onSelect={selectAnswer} />;
  return <GeographyResultScreen onRestart={restart} />;
}
