/**
 * Shared countdown timer for fixed-duration games (whack-a-mole, reflex, …).
 *
 * Manages its own interval ID.  Call `start()` when the game begins and
 * `stop()` when cleaning up (startGame reset, page unmount, etc.).
 * When time reaches 0 the interval self-stops and fires `onEnd` — put
 * game-over state updates and any remaining timer cleanup there.
 */

type TimerSet = (partial: Record<string, unknown>, replace?: false, label?: string) => void;
type TimerGet = () => { timeLeft: number };

export interface GameTimerConfig {
  name:  string;   // used as devtools action prefix
  set:   TimerSet;
  get:   TimerGet;
  onEnd: () => void;
}

export function setupGameTimer({ name, set, get, onEnd }: GameTimerConfig): {
  start: () => void;
  stop:  () => void;
} {
  let id: ReturnType<typeof setInterval> | null = null;

  function stop() {
    if (id) { clearInterval(id); id = null; }
  }

  function start() {
    stop();
    id = setInterval(() => {
      const t = get().timeLeft;
      if (t <= 1) {
        stop();
        onEnd();
      } else {
        set({ timeLeft: t - 1 }, false, `${name}/tick`);
      }
    }, 1000);
  }

  return { start, stop };
}
