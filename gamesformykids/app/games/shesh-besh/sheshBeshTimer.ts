/**
 * Timer factory — returns a `{ schedule, clear }` object with no module-level
 * mutable globals. Each call to `createTimer()` produces an independent timer.
 */
export function createTimer() {
  let _timer: ReturnType<typeof setTimeout> | null = null;

  function clear() {
    if (_timer) {
      clearTimeout(_timer);
      _timer = null;
    }
  }

  function schedule(fn: () => void, ms: number) {
    clear();
    _timer = setTimeout(fn, ms);
  }

  return { schedule, clear };
}
