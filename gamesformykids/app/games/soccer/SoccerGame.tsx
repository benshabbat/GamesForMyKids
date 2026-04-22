'use client';

import { useSoccerStore } from './store/soccerStore';
import SoccerMenuScreen from './components/SoccerMenuScreen';
import SoccerQuestion from './components/SoccerQuestion';
import SoccerResultScreen from './components/SoccerResultScreen';

export default function SoccerGame() {
  const { phase, questions, currentIndex } = useSoccerStore();

  if (phase === 'menu') return <SoccerMenuScreen />;
  if (phase === 'finished') return <SoccerResultScreen />;
  if (!questions[currentIndex]) return null;
  return <SoccerQuestion />;
}

