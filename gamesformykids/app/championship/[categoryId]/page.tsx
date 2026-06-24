import ChampionshipClient from './ChampionshipClient';

interface Props {
  params: Promise<{ categoryId: string }>;
}

export default async function ChampionshipPage({ params }: Props) {
  const { categoryId } = await params;
  return <ChampionshipClient categoryId={categoryId} />;
}
