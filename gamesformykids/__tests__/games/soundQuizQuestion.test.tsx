// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import SoundQuizQuestion from '@/app/games/sound-quiz/components/SoundQuizQuestion';
import { SOUND_CLIPS } from '@/app/games/sound-quiz/data/soundClips';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';

const clip = SOUND_CLIPS.find((c) => c.id === 'a2')!; // dog
const round = { clip, choices: SOUND_CLIPS.filter((c) => c.category === 'animals').slice(0, 4) };

function renderQuestion(choicesRevealed: boolean) {
  const noop = () => {};
  return render(
    <SoundQuizQuestion current={round} choicesRevealed={choicesRevealed} onPlaySound={noop} onReplaySound={noop} onSelect={noop} />,
  );
}

describe('SoundQuizQuestion mystery card', () => {
  beforeEach(() => {
    useQuizGameStore.getState().startQuiz('sound-quiz', 5);
  });
  afterEach(() => {
    cleanup();
    useQuizGameStore.getState().goToMenu();
  });

  it('shows the question mark before the sound is played', () => {
    const { container } = renderQuestion(false);
    expect(container.querySelector('.text-7xl')!.textContent).toBe('❓');
  });

  it('keeps the question mark after pressing play, while the child still has to answer', () => {
    const { container } = renderQuestion(true);
    expect(container.querySelector('.text-7xl')!.textContent).toBe('❓');
  });

  it('reveals the clip emoji once the question is answered', () => {
    useQuizGameStore.getState().selectAnswer(clip.id, true);
    const { container } = renderQuestion(true);
    expect(container.querySelector('.text-7xl')!.textContent).toBe(clip.emoji);
  });
});

describe('sound clip data', () => {
  it('names the horse "סוס"', () => {
    expect(SOUND_CLIPS.find((c) => c.emoji === '🐴')!.name).toBe('סוס');
  });

  it('has unique ids and unique names, so a quiz round never shows two identical choices', () => {
    expect(new Set(SOUND_CLIPS.map((c) => c.id)).size).toBe(SOUND_CLIPS.length);
    expect(new Set(SOUND_CLIPS.map((c) => c.name)).size).toBe(SOUND_CLIPS.length);
  });
});
