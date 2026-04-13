'use client';

import PuzzleHeader from '../shared/PuzzleHeader';
import { CUSTOM_HEADER_CONFIG } from '../constants/headerConfig';

export default function CustomHeader() {
  return <PuzzleHeader title={CUSTOM_HEADER_CONFIG.title} subtitle={CUSTOM_HEADER_CONFIG.subtitle} />;
}
