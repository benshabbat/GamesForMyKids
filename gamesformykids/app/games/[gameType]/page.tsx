import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';
import { GameTypeProvider } from '@/lib/providers';
import { UltimateGamePage, GameLogicSync } from '@/components/game/universal';
import { QuizGameRouter } from '@/components/game/quiz';
import { QUIZ_GAME_TYPES } from '@/lib/quiz/quizGameTypes';
import { type GamePageParams, CUSTOM_GAME_TYPES } from './gamePageConstants';
import { resolveGameType, isSupportedGame, buildStaticParams } from './gamePageUtils';
import CustomGameRenderer from './CustomGameRenderer';

interface PageProps {
  params: Promise<GamePageParams>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { gameType } = await params;
  const actualGameType = resolveGameType(gameType);
  return generateGameMetadata(actualGameType, gameType);
}

export default async function UniversalGamePage({ params }: PageProps) {
  const { gameType } = await params;
  const actualGameType = resolveGameType(gameType);

  if (!isSupportedGame(actualGameType)) notFound();

  if (CUSTOM_GAME_TYPES.has(actualGameType)) {
    return <CustomGameRenderer gameType={actualGameType} />;
  }

  const isQuizGame = QUIZ_GAME_TYPES.has(actualGameType);

  return (
    <GameTypeProvider initialGameType={actualGameType}>
      {isQuizGame ? (
        <QuizGameRouter />
      ) : (
        <>
          <GameLogicSync />
          <UltimateGamePage />
        </>
      )}
    </GameTypeProvider>
  );
}

export async function generateStaticParams() {
  return buildStaticParams();
}
