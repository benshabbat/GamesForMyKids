interface MasteryData {
  plays: number;
  accuracies: number[];
}

function key(gameId: string): string {
  return `gfk_stars_${gameId}`;
}

/** Record the accuracy of a completed game session and increment play count. */
export function recordGameSession(gameId: string, accuracy: number): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(key(gameId));
    const data: MasteryData = raw ? (JSON.parse(raw) as MasteryData) : { plays: 0, accuracies: [] };
    data.plays++;
    data.accuracies = [...data.accuracies.slice(-9), accuracy];
    localStorage.setItem(key(gameId), JSON.stringify(data));
  } catch {}
}

/** Returns 0–3 mastery stars based on play count + average accuracy. */
export function getMasteryStars(gameId: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(key(gameId));
    if (!raw) return 0;
    const data = JSON.parse(raw) as MasteryData;
    const avg =
      data.accuracies.length > 0
        ? data.accuracies.reduce((a, b) => a + b, 0) / data.accuracies.length
        : 0;
    if (data.plays >= 5 && avg >= 90) return 3;
    if (data.plays >= 3 && avg >= 70) return 2;
    if (data.plays >= 1) return 1;
    return 0;
  } catch {
    return 0;
  }
}
