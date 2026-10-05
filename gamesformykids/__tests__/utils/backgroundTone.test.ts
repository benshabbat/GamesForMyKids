import { describe, it, expect } from 'vitest';
import { isLightBackground, relativeLuminance } from '@/lib/utils/backgroundTone';

describe('relativeLuminance', () => {
  it('is 0 for black and 1 for white', () => {
    expect(relativeLuminance(0, 0, 0)).toBe(0);
    expect(relativeLuminance(255, 255, 255)).toBeCloseTo(1);
  });
});

describe('isLightBackground', () => {
  it('treats pastel gradients as light', () => {
    // colors game
    expect(isLightBackground('linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a8e6cf 50%, #dcedc1 75%, #ffd3e1 100%)')).toBe(true);
  });

  it('treats deep gradients as dark', () => {
    // flags game
    expect(isLightBackground('linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)')).toBe(false);
    expect(isLightBackground('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')).toBe(false);
  });

  it('parses short hex, 8-digit hex and rgb()/rgba() stops', () => {
    expect(isLightBackground('#fff')).toBe(true);
    expect(isLightBackground('#000000cc')).toBe(false);
    expect(isLightBackground('rgb(250, 250, 250)')).toBe(true);
    expect(isLightBackground('rgba(10,10,40,0.9)')).toBe(false);
  });

  it('falls back when there is no parseable color', () => {
    expect(isLightBackground(undefined)).toBe(true);
    expect(isLightBackground('url(/bg.png)')).toBe(true);
    expect(isLightBackground('navy', false)).toBe(false);
  });
});
