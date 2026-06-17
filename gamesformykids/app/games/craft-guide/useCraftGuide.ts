'use client';
import { useState } from 'react';
import { CRAFT_PROJECTS, type CraftProject } from '@/lib/constants/craftProjects';

type Phase = 'menu' | 'materials' | 'steps' | 'done';

export function useCraftGuide() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [project, setProject] = useState<CraftProject | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const selectProject = (id: string) => {
    const p = CRAFT_PROJECTS.find((x) => x.id === id);
    if (!p) return;
    setProject(p);
    setStepIndex(0);
    setPhase('materials');
  };

  const startSteps = () => {
    setStepIndex(0);
    setPhase('steps');
  };

  const nextStep = () => {
    if (!project) return;
    if (stepIndex < project.steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setPhase('done');
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const backToMenu = () => {
    setPhase('menu');
    setProject(null);
    setStepIndex(0);
  };

  const currentStep = project ? project.steps[stepIndex] : null;
  const totalSteps = project ? project.steps.length : 0;

  return {
    phase,
    project,
    projects: CRAFT_PROJECTS,
    stepIndex,
    totalSteps,
    currentStep,
    selectProject,
    startSteps,
    nextStep,
    prevStep,
    backToMenu,
  };
}
