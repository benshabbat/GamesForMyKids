'use client';

import PuzzleHeader from '../shared/PuzzleHeader';
import { SIMPLE_HEADER_CONFIG } from '../constants/headerConfig';

export default function SimpleHeader() {
  return <PuzzleHeader title={SIMPLE_HEADER_CONFIG.title} subtitle={SIMPLE_HEADER_CONFIG.subtitle} />;
}
