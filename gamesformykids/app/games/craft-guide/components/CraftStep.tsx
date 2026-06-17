'use client';
import { useEffect } from 'react';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import type { CraftStep as CraftStepType } from '@/lib/constants/craftProjects';

interface Props {
  step: CraftStepType;
  stepNumber: number;
  totalSteps: number;
  projectName: string;
  projectColor: string;
  onNext: () => void;
  onPrev: () => void;
  onBack: () => void;
}

export default function CraftStep({
  step, stepNumber, totalSteps, projectName, projectColor, onNext, onPrev, onBack,
}: Props) {
  useEffect(() => {
    speakHebrew(`שלב ${stepNumber}: ${step.instruction}`);
  }, [stepNumber, step.instruction]);

  const progress = (stepNumber / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fce4ec 100%)' }}
      dir="rtl">
      <div className="w-full max-w-md space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-lg">← חזרה</button>
          <span className="font-bold text-gray-700 text-lg">{projectName}</span>
        </div>

        {/* Progress bar */}
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-linear-to-br ${projectColor} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center text-sm text-gray-500">
          שלב {stepNumber} מתוך {totalSteps}
        </div>

        {/* Step card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center space-y-6">
          <div className="text-8xl">{step.emoji}</div>
          <p className="text-xl font-semibold text-gray-800 leading-relaxed">{step.instruction}</p>
          <button
            onClick={() => speakHebrew(`שלב ${stepNumber}: ${step.instruction}`)}
            className="text-blue-500 text-sm hover:text-blue-700 flex items-center gap-1 mx-auto"
          >
            🔊 שמע שוב
          </button>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onPrev}
            disabled={stepNumber === 1}
            className="bg-white border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-2xl disabled:opacity-30 active:scale-95 transition-transform"
          >
            ← הקודם
          </button>
          <button
            onClick={onNext}
            className={`bg-linear-to-br ${projectColor} text-white font-bold py-3 rounded-2xl shadow-lg active:scale-95 transition-transform`}
          >
            {stepNumber === totalSteps ? 'סיום! 🎉' : 'הבא →'}
          </button>
        </div>
      </div>
    </div>
  );
}
