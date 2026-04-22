'use client';

import { useSoccerStore } from '../store/soccerStore';
import { PitchBackground, GoalAnimation } from './SoccerShared';
import SoccerGameHeader from './SoccerGameHeader';
import SoccerProgressBar from './SoccerProgressBar';
import SoccerQuestionCard from './SoccerQuestionCard';
import SoccerAnswerGrid from './SoccerAnswerGrid';
import SoccerNextButton from './SoccerNextButton';

export default function SoccerQuestion() {
  const { showGoal } = useSoccerStore();

  return (
    <PitchBackground>
      {showGoal && <GoalAnimation />}
      <div className="flex flex-col min-h-screen p-4" dir="rtl">
        <SoccerGameHeader />
        <SoccerProgressBar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <SoccerQuestionCard />
          <SoccerAnswerGrid />
          <SoccerNextButton />
        </div>
      </div>
    </PitchBackground>
  );
}
