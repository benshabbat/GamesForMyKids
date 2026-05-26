'use client';

import { useTransportGame } from './useTransportGame';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useShallow } from 'zustand/react/shallow';
import type { TransportType } from './data/transport';
import TransportMenuScreen from './components/TransportMenuScreen';
import TransportQuestion from './components/TransportQuestion';
import TransportResultScreen from './components/TransportResultScreen';

export default function TransportGame() {
  const { phase, categories, current, category, startGame, selectAnswer } = useTransportGame();
  const { index, total, score, selected, isCorrect, nextQuestion } = useQuizGameStore(
    useShallow(s => ({
      index: s.index,
      total: s.total,
      score: s.score,
      selected: s.selected,
      isCorrect: s.isCorrect,
      nextQuestion: s.nextQuestion,
    }))
  );

  if (phase === 'menu') return (
    <TransportMenuScreen
      types={categories as readonly TransportType[]}
      onStart={(type) => startGame(type)}
    />
  );

  if (phase === 'result') return (
    <TransportResultScreen
      correctCount={score}
      total={total}
      transportType={category as TransportType}
      onRestart={(type) => startGame(type)}
    />
  );

  if (!current) return null;

  return (
    <TransportQuestion
      currentQuestion={current}
      onSelect={(idx) => selectAnswer(String(idx))}
      index={index}
      total={total}
      score={score}
      selected={selected !== null ? Number(selected) : null}
      isCorrect={isCorrect ?? false}
      phase={selected !== null ? 'answered' : 'playing'}
      onNext={nextQuestion}
    />
  );
}
