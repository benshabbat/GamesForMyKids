// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ARITHMETIC_CONFIG } from '@/app/games/arithmetic/arithmeticConfig';

const question = { a: 15, b: 3, op: '-' as const, answer: 12, choices: [12, 11, 13, 14] };

describe('arithmetic config equations', () => {
  it('renders the question in a left-to-right bidi-override span so RTL does not reverse it', () => {
    const { container } = render(<p>{ARITHMETIC_CONFIG.renderEquation(question)}</p>);
    const span = container.querySelector('span')!;
    expect(span.textContent).toBe('15 - 3 = ?');
    expect(span.style.direction).toBe('ltr');
    expect(span.style.unicodeBidi).toBe('bidi-override');
  });

  it('renders the feedback equation the same way, outside the status text', () => {
    const { container } = render(<div>{ARITHMETIC_CONFIG.renderFeedbackText(question, true)}</div>);
    const span = container.querySelector('span')!;
    expect(span.textContent).toBe('15 - 3 = 12');
    expect(span.style.unicodeBidi).toBe('bidi-override');
    expect(container.textContent).toContain('נכון');
  });
});
