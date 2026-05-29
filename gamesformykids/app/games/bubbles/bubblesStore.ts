import { makeStore } from '@/lib/stores/createStore';

export interface BubbleData {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  frequency: number;
}

interface BubblesState {
  isPlaying: boolean;
  score: number;
  poppedCount: number;
  bubbles: BubbleData[];
}

interface BubblesActions {
  startGame: () => void;
  stopGame: () => void;
  resetGame: () => void;
  addBubble: (bubble: BubbleData) => void;
  popBubble: (bubbleId: number, scored: boolean) => void;
}

export const useBubblesStore = makeStore<BubblesState & BubblesActions>(
  'BubblesStore',
  (set, get) => ({
    isPlaying: false,
    score: 0,
    poppedCount: 0,
    bubbles: [],
    startGame: () => set({ isPlaying: true, score: 0, poppedCount: 0, bubbles: [] }, false, 'bubbles/startGame'),
    stopGame: () => set({ isPlaying: false }, false, 'bubbles/stopGame'),
    resetGame: () => set({ isPlaying: false, score: 0, poppedCount: 0, bubbles: [] }, false, 'bubbles/resetGame'),
    addBubble: (bubble) => set({ bubbles: [...get().bubbles, bubble] }, false, 'bubbles/addBubble'),
    popBubble: (bubbleId, scored) => {
      const { bubbles, score, poppedCount } = get();
      const newPoppedCount = scored ? poppedCount + 1 : poppedCount;
      set(
        {
          bubbles: bubbles.filter((b) => b.id !== bubbleId),
          score: scored ? score + 10 : score,
          poppedCount: newPoppedCount,
        },
        false,
        'bubbles/popBubble',
      );
    },
  }),
);
