import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ gameType: string }>;
}

export default async function AdvancedGamePage({ params }: Props) {
  const { gameType } = await params;
  redirect(`/games/${gameType}`);
}

export async function generateStaticParams() {
  return [
    { gameType: 'memory' },
    { gameType: 'puzzles' },
    { gameType: 'math' },
    { gameType: 'drawing' },
    { gameType: 'builder' },
  ];
}
