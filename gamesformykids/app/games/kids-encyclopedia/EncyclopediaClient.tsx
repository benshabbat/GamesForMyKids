'use client';

import { useEncyclopediaStore } from './encyclopediaStore';
import EncyclopediaCategoryGrid from './components/EncyclopediaCategoryGrid';
import EncyclopediaEntryGrid from './components/EncyclopediaEntryGrid';
import EncyclopediaCard from './components/EncyclopediaCard';
import EncyclopediaCollection from './components/EncyclopediaCollection';

export default function EncyclopediaClient() {
  const viewMode = useEncyclopediaStore((s) => s.viewMode);

  if (viewMode === 'grid') return <EncyclopediaEntryGrid />;
  if (viewMode === 'card') return <EncyclopediaCard />;
  if (viewMode === 'collection') return <EncyclopediaCollection />;
  return <EncyclopediaCategoryGrid />;
}
