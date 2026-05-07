'use client';

import { useSoccerGame } from './useSoccerGame';
import SoccerMenuScreen from './components/SoccerMenuScreen';
import SoccerQuestion from './components/SoccerQuestion';
import SoccerResultScreen from './components/SoccerResultScreen';

export default function SoccerGame() {
  const { phase, currentQuestion } = useSoccerGame();

  if (phase === 'menu') return <SoccerMenuScreen />;
  if (phase === 'finished') return <SoccerResultScreen />;
  if (!currentQuestion) return null;
  return <SoccerQuestion />;
}

