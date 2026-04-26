'use client';

import { useGameTypeStore } from '@/lib/stores/gameTypeStore';
import { QUIZ_GAME_CONFIGS, type QuizGameConfig } from '@/lib/quiz/quizGameConfigs';
import { useGenericQuizGame } from '@/lib/quiz/useGenericQuizGame';
import { QuizGameShell } from './QuizGameShell';
import { QuizMenuScreen } from './QuizMenuScreen';
import { QuizQuestionShell } from './QuizQuestionShell';
import { QuizResultScreen } from './QuizResultScreen';
import type { GameType } from '@/lib/types/core/base';

export default function GenericQuizGame() {
  const gameType = useGameTypeStore(s => s.currentGameType);
  const config = gameType ? QUIZ_GAME_CONFIGS[gameType as GameType] : null;
  if (!config) return null;
  return <GenericQuizGameContent config={config} />;
}

function GenericQuizGameContent({ config }: { config: QuizGameConfig }) {
  const { current, choices, correctLabel, startGame, selectAnswer, restart } = useGenericQuizGame(config);
  return (
    <QuizGameShell
      menu={
        <QuizMenuScreen
          emoji={config.emoji} title={config.title} description={config.description}
          theme={config.theme} preview={config.preview} buttonLabel={config.buttonLabel}
          onStart={startGame}
        />
      }
      question={current && (
        <QuizQuestionShell
          theme={config.theme}
          choices={choices}
          correctLabel={correctLabel}
          onSelect={selectAnswer}
          correctMsg={config.correctMsg}
          wrongMsg={config.wrongMsg?.(current)}
        >
          {config.renderQuestion(current)}
        </QuizQuestionShell>
      )}
      result={<QuizResultScreen onRestart={restart} theme={config.theme} />}
    />
  );
}
