// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';

const { speakMock } = vi.hoisted(() => ({ speakMock: vi.fn() }));
vi.mock('@/lib/utils/speech/speaker', () => ({ speakHebrew: speakMock }));

import DiceClient from '@/app/games/dice/DiceClient';

const ROLL_MS = 600;
const NUMBER_WORDS = ['אחד', 'שניים', 'שלוש', 'ארבע', 'חמש', 'שש'];

const typeTab = (label: string) => screen.getByRole('button', { name: new RegExp(label) }) as HTMLButtonElement;
const countButton = (n: number) => screen.getByRole('button', { name: String(n) }) as HTMLButtonElement;
const rollButton = () => screen.getByRole('button', { name: /זרוק|\.\.\./ }) as HTMLButtonElement;
const diceFaces = (container: HTMLElement) => Array.from(container.querySelectorAll('.w-24.h-24'));

beforeEach(() => {
  vi.useFakeTimers();
  speakMock.mockClear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('DiceClient while rolling', () => {
  it('disables the type and count selectors during the roll and re-enables them after', () => {
    render(<DiceClient />);

    fireEvent.click(rollButton());

    ['מספרים', 'אותיות', 'צבעים', 'חיות'].forEach(label => expect(typeTab(label).disabled).toBe(true));
    [1, 2, 3].forEach(n => expect(countButton(n).disabled).toBe(true));

    act(() => {
      vi.advanceTimersByTime(ROLL_MS);
    });

    ['מספרים', 'אותיות', 'צבעים', 'חיות'].forEach(label => expect(typeTab(label).disabled).toBe(false));
    [1, 2, 3].forEach(n => expect(countButton(n).disabled).toBe(false));
  });

  it('ignores a type switch attempted mid-roll, so the faces match what is spoken', () => {
    const { container } = render(<DiceClient />);

    fireEvent.click(rollButton());
    fireEvent.click(typeTab('חיות')); // attempted while rolling
    act(() => {
      vi.advanceTimersByTime(ROLL_MS);
    });

    const spoken = speakMock.mock.calls[0]![0] as string;
    expect(NUMBER_WORDS.some(word => spoken.includes(word))).toBe(true);

    const faces = diceFaces(container);
    expect(faces).toHaveLength(1);
    expect(faces[0]!.textContent).toMatch(/^[1-6]$/);
  });

  it('ignores a dice-count change attempted mid-roll', () => {
    const { container } = render(<DiceClient />);

    fireEvent.click(rollButton());
    fireEvent.click(countButton(3)); // attempted while rolling
    act(() => {
      vi.advanceTimersByTime(ROLL_MS);
    });

    // One die was rolled, and the selector still says one die (active = white with shadow).
    expect(diceFaces(container)).toHaveLength(1);
    expect(countButton(1).className).toContain('shadow-md');
    expect(countButton(3).className).not.toContain('shadow-md');
  });

  it('still lets the player switch type between rolls', () => {
    const { container } = render(<DiceClient />);

    fireEvent.click(typeTab('חיות'));
    fireEvent.click(rollButton());
    act(() => {
      vi.advanceTimersByTime(ROLL_MS);
    });

    const faces = diceFaces(container);
    expect(faces).toHaveLength(1);
    expect(['🐶', '🐱', '🐭', '🐹', '🐰', '🦊']).toContain(faces[0]!.textContent);
  });
});
