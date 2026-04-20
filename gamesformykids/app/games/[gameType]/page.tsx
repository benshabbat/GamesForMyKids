import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { generateGameMetadata } from '@/lib/utils/game/gameMetadata';
import { GameTypeProvider } from '@/lib/providers';
import { UltimateGamePage, GameLogicSync } from '@/components/game/universal';
import { type GamePageParams } from './gamePageConstants';
import { resolveGameType, isSupportedGame, buildStaticParams } from './gamePageUtils';

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

  return (
    <GameTypeProvider initialGameType={actualGameType}>
      <GameLogicSync />
      <UltimateGamePage />
    </GameTypeProvider>
  );
}

export async function generateStaticParams() {
  return buildStaticParams();
}
