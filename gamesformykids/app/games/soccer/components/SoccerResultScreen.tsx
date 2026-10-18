'use client';

import { useSoccerResult } from '../hooks/useSoccerResult';
import { PitchBackground } from './SoccerShared';
import SoccerScoreDisplay from './SoccerScoreDisplay';
import SoccerResultActions from './SoccerResultActions';

interface Props {
  onRestart: () => void;
}

export default function SoccerResultScreen({ onRestart }: Props) {
  const { trophy, msg } = useSoccerResult();

  return (
    <PitchBackground>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-9xl mb-4">{trophy}</div>
        <h2 className="text-4xl font-black text-white mb-3">{msg}</h2>
        <SoccerScoreDisplay />
        <SoccerResultActions onRestart={onRestart} />
      </div>
    </PitchBackground>
  );
}
