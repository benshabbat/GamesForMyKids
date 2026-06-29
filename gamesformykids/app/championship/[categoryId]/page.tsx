import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';
import ChampionshipClient from './ChampionshipClient';

interface Props {
  params: Promise<{ categoryId: string }>;
}

export function generateStaticParams() {
  return Object.keys(GAME_CATEGORIES).map((categoryId) => ({ categoryId }));
}

export default async function ChampionshipPage({ params }: Props) {
  const { categoryId } = await params;
  return <ChampionshipClient categoryId={categoryId} />;
}
