// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import PuppetClient from '@/app/games/puppet-story/PuppetClient';
import { usePuppetStore } from '@/app/games/puppet-story/puppetStore';
import { CHARACTERS, SETTINGS, STORY_TEMPLATES, resolveText } from '@/app/games/puppet-story/data/storyTemplates';

const template = STORY_TEMPLATES[0]!;
const [char1, char2] = [CHARACTERS[0]!, CHARACTERS[1]!];
const setting = SETTINGS[0]!;

function textOf(raw: string) {
  return resolveText(raw, char1, char2, setting);
}

describe('puppet-story quiz', () => {
  beforeEach(() => {
    usePuppetStore.setState({
      phase: 'quiz', pickStep: 2, char1, char2, setting, template,
      panelIndex: 0, questionIndex: 0, correctAnswers: 0,
    });
  });
  afterEach(cleanup);

  it('counts the right answer as correct wherever the shuffled button lands', () => {
    render(<PuppetClient />);
    const q = template.questions[0]!;
    fireEvent.click(screen.getByRole('button', { name: textOf(q.options[q.correctIndex]!) }));
    expect(usePuppetStore.getState().correctAnswers).toBe(1);
    expect(usePuppetStore.getState().questionIndex).toBe(1);
  });

  it('counts a wrong answer as wrong', () => {
    render(<PuppetClient />);
    const q = template.questions[0]!;
    const wrongIdx = q.options.findIndex((_, i) => i !== q.correctIndex);
    fireEvent.click(screen.getByRole('button', { name: textOf(q.options[wrongIdx]!) }));
    expect(usePuppetStore.getState().correctAnswers).toBe(0);
  });

  it('does not always put the correct answer first', () => {
    const q = template.questions[0]!;
    const correctText = textOf(q.options[q.correctIndex]!);
    const positions = new Set<number>();
    for (let i = 0; i < 40; i++) {
      const { unmount } = render(<PuppetClient />);
      const texts = new Set(q.options.map(textOf));
      const buttons = screen.getAllByRole('button').filter((b) => texts.has(b.textContent ?? ''));
      positions.add(buttons.findIndex((b) => b.textContent === correctText));
      unmount();
    }
    expect(positions.size).toBeGreaterThan(1);
  });
});
