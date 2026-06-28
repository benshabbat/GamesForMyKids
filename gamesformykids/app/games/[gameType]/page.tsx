import { notFound } from "next/navigation";
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateGameMetadata, buildGameJsonLd } from '@/lib/utils/game/gameMetadata';
import { GameTypeProvider } from '@/lib/providers';
import { UltimateGamePage, GameLogicSync, GameEngagementSync } from '@/components/game/universal';
import { type GamePageParams, CUSTOM_GAME_TYPES } from './gamePageConstants';
import { resolveGameType, isSupportedGame, buildStaticParams } from './gamePageUtils';
import CustomGameRenderer from './CustomGameRenderer';
import { loadGameItems } from '@/lib/constants/gameItemsLoader';
import RelatedGames from '@/components/game/RelatedGames';

const QRButton = dynamic(() => import('@/components/game/QRButton'));

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

  const meta = generateGameMetadata(actualGameType, gameType);
  const jsonLd = buildGameJsonLd(
    actualGameType,
    typeof meta.title === 'string' ? meta.title : String(meta.title ?? ''),
    typeof meta.description === 'string' ? meta.description : '',
  );

  const jsonLdScript = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );

  if (CUSTOM_GAME_TYPES.has(actualGameType)) {
    return (
      <>
        {jsonLdScript}
        <CustomGameRenderer gameType={actualGameType} />
        <RelatedGames gameType={actualGameType} />
        <QRButton gameType={actualGameType} />
      </>
    );
  }

  const gameItems = await loadGameItems(actualGameType);

  return (
    <>
      {jsonLdScript}
      <GameTypeProvider initialGameType={actualGameType} initialGameItems={gameItems}>
        <GameLogicSync />
        <GameEngagementSync />
        <UltimateGamePage />
      </GameTypeProvider>
      <RelatedGames gameType={actualGameType} />
      <QRButton gameType={actualGameType} />
    </>
  );
}

export async function generateStaticParams() {
  return buildStaticParams();
}
