'use client';

import type { SoccerQuestion as SoccerQuestionData } from '../data/soccer';
import { PitchBackground, GoalAnimation } from './SoccerShared';
import SoccerGameHeader from './SoccerGameHeader';
import SoccerProgressBar from './SoccerProgressBar';
import SoccerQuestionCard from './SoccerQuestionCard';
import SoccerAnswerGrid from './SoccerAnswerGrid';
import SoccerNextButton from './SoccerNextButton';

interface Props {
  current: SoccerQuestionData;
  showGoal: boolean;
  onSelect: (idx: number) => void;
}

export default function SoccerQuestion({ current, showGoal, onSelect }: Props) {
  return (
    <PitchBackground>
      {showGoal && <GoalAnimation />}
      <div className="flex flex-col min-h-screen p-4">
        <SoccerGameHeader current={current} />
        <SoccerProgressBar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <SoccerQuestionCard current={current} />
          <SoccerAnswerGrid current={current} onSelect={onSelect} />
          <SoccerNextButton />
        </div>
      </div>
    </PitchBackground>
  );
}
