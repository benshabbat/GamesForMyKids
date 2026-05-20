'use client';

import { useGeographyGame } from '@/lib/quiz/useGeographyGame';
import { QuizGameShell, QuizResultScreen } from '@/components/game/quiz';
import GeographyMenuScreen from '@/components/game/quiz/screens/GeographyMenuScreen';
import GeographyQuestion from '@/components/game/quiz/screens/GeographyQuestion';

export default function GeographyClient() {
  const { current, startGame, selectAnswer, restart } = useGeographyGame();
  return (
    <QuizGameShell
      menu={<GeographyMenuScreen onStart={startGame} />}
      question={current ? <GeographyQuestion current={current} onSelect={selectAnswer} /> : null}
      result={<QuizResultScreen onRestart={restart} theme="teal" />}
    />
  );
}
