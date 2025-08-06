import { notFound } from 'next/navigation';

export default function AdvancedGamePage() {
  // For now, redirect to not found since advanced games are not implemented yet
  // In the future, this could handle different advanced game types
  
  return notFound();
}

// Generate static params for known game types (if any)
export async function generateStaticParams() {
  return [
    // Add game types here when they are implemented
    // { gameType: 'puzzle-advanced' },
    // { gameType: 'memory-advanced' },
  ];
}
