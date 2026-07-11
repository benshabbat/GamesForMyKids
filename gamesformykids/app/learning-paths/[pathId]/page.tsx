import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LEARNING_PATHS, getLearningPath } from '@/lib/constants/learningPaths';
import LearningPathDetailClient from './LearningPathDetailClient';

interface Props {
  params: Promise<{ pathId: string }>;
}

export function generateStaticParams() {
  return LEARNING_PATHS.map((path) => ({ pathId: path.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pathId } = await params;
  const path = getLearningPath(pathId);
  if (!path) return {};
  return {
    title: `${path.title} | מסלולי למידה | GamesForMyKids`,
    description: path.description,
  };
}

export default async function LearningPathDetailPage({ params }: Props) {
  const { pathId } = await params;
  const path = getLearningPath(pathId);
  if (!path) notFound();
  return <LearningPathDetailClient pathId={pathId} />;
}
