import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';
import { GameTypeProvider } from '@/lib/providers';
import { UltimateGamePage, GameLogicSync, GameEngagementSync } from '@/components/game/universal';
import { type GamePageParams, CUSTOM_GAME_TYPES } from './gamePageConstants';
import { resolveGameType, isSupportedGame, buildStaticParams } from './gamePageUtils';
import CustomGameRenderer from './CustomGameRenderer';
import { loadGameItems } from '@/lib/constants/gameItemsLoader';

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

  const gameItems = await loadGameItems(actualGameType);

  return (
    <GameTypeProvider initialGameType={actualGameType} initialGameItems={gameItems}>
      <GameLogicSync />
      <GameEngagementSync />
      <UltimateGamePage />
    </GameTypeProvider>
  );
}

export async function generateStaticParams() {
  return buildStaticParams();
}
