import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logError, logWarning } from '@/lib/utils/errorUtils';

describe('logError', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it('calls console.error in development', () => {
    vi.stubEnv('NODE_ENV', 'development');
    logError('test error', new Error('boom'));
    expect(console.error).toHaveBeenCalledWith('test error', expect.any(Error));
    vi.unstubAllEnvs();
  });

  it('does not call console.error in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    logError('test error');
    expect(console.error).not.toHaveBeenCalled();
    vi.unstubAllEnvs();
  });

  it('works with no error argument', () => {
    vi.stubEnv('NODE_ENV', 'development');
    logError('message only');
    expect(console.error).toHaveBeenCalledWith('message only', undefined);
    vi.unstubAllEnvs();
  });
});

describe('logWarning', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it('calls console.warn in development', () => {
    vi.stubEnv('NODE_ENV', 'development');
    logWarning('watch out', { detail: 42 });
    expect(console.warn).toHaveBeenCalledWith('watch out', { detail: 42 });
    vi.unstubAllEnvs();
  });

  it('does not call console.warn in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    logWarning('watch out');
    expect(console.warn).not.toHaveBeenCalled();
    vi.unstubAllEnvs();
  });

  it('works with no data argument', () => {
    vi.stubEnv('NODE_ENV', 'development');
    logWarning('message only');
    expect(console.warn).toHaveBeenCalledWith('message only', undefined);
    vi.unstubAllEnvs();
  });
});
