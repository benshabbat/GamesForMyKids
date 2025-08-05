import { notFound } from 'next/navigation';

export default function AdvancedGamePage() {
  // For now, redirect to not found since advanced games are not implemented yet
  // In the future, this could handle different advanced game types
  
  return notFound();
}

// Generate static params for known game types (if any)
export async function generateStaticParams() {
  // Return at least one param to satisfy static export
  return [
    { gameType: 'coming-soon' },
  ];
}
