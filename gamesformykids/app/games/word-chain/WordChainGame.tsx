'use client';

import { useWordChainGame } from '@/lib/quiz/useWordChainGame';
import { QuizMenuScreen, QuizResultScreen } from '@/components/game/quiz';
import WordChainQuestion from '@/components/game/quiz/screens/WordChainQuestion';

export default function WordChainGame() {
  const {
    phase, chain, currentWord, lastLetter, choices, score,
    startGame, selectAnswer, restart,
  } = useWordChainGame();

  if (phase === 'menu') {
    return (
      <QuizMenuScreen
        emoji="🔗"
        title="שרשרת מילים"
        description="כל מילה מתחילה באות האחרונה של הקודמת — בנה שרשרת של 10 מילים!"
        theme="indigo"
        buttonLabel="🔗 בואו נשרשר!"
        onStart={startGame}
      />
    );
  }

  if (phase === 'playing' && currentWord) {
    return (
      <WordChainQuestion
        chain={chain}
        currentWord={currentWord}
        lastLetter={lastLetter}
        choices={choices}
        score={score}
        onSelect={selectAnswer}
      />
    );
  }

  return (
    <QuizResultScreen
      onRestart={restart}
      theme="indigo"
      title={score >= 10 ? '🏆 שרשרת שלמה!' : 'כל הכבוד!'}
      subtitle={score >= 10 ? 'הגעת ל-10 מילים — מדהים!' : `הצלחת לשרשר ${score} מילים`}
      correctCount={score}
      total={10}
    />
  );
}
