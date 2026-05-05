import { makeStore } from '@/lib/stores/createStore';

// ── Types ──────────────────────────────────────────────────────────────────

export interface Coin {
  id:       number;
  x:        number;
  y:        number;
  speed:    number;
  rotation: number;
}

function getDims(isMobile: boolean) {
  return {
    gameWidth:    isMobile ? 350 : 800,
    gameHeight:   isMobile ? 450 : 600,
    basketWidth:  isMobile ? 80  : 120,
    basketHeight: isMobile ? 50  : 70,
  };
}

// ── Store ──────────────────────────────────────────────────────────────────

interface TzedakahState {
  coins:          Coin[];
  score:          number;
  gameStarted:    boolean;
  basketX:        number;
  gameTime:       number;
  collectedCoins: number;
  isMobile:       boolean;
  gameWidth:      number;
  gameHeight:     number;
  basketWidth:    number;
  basketHeight:   number;
}

interface TzedakahActions {
  startGame:   () => void;
  moveBasket:  (rawX: number) => void;
  stepBasket:  (dir: -1 | 1) => void;
  setIsMobile: (v: boolean) => void;
}

const INITIAL: TzedakahState = {
  coins: [], score: 0, gameStarted: false, basketX: 400, gameTime: 60,
  collectedCoins: 0, isMobile: false, ...getDims(false),
};

export const useTzedakahStore = makeStore<TzedakahState & TzedakahActions>(
  'TzedakahStore',
  (set, get) => {
    let coinId  = 0;
    let moveId:  ReturnType<typeof setInterval> | null = null;
    let spawnId: ReturnType<typeof setInterval> | null = null;
    let timerId: ReturnType<typeof setInterval> | null = null;

    function stopAll() {
      if (moveId)  { clearInterval(moveId);  moveId  = null; }
      if (spawnId) { clearInterval(spawnId); spawnId = null; }
      if (timerId) { clearInterval(timerId); timerId = null; }
    }

    function tickCoins() {
      const { isMobile, coins, basketX, gameHeight, basketWidth, basketHeight, score, collectedCoins } = get();
      const coinSize = isMobile ? 32 : 48;
      let s = score, c = collectedCoins;
      const updated = coins
        .map(coin => ({ ...coin, y: coin.y + coin.speed, rotation: coin.rotation + 5 }))
        .filter(coin => {
          if (
            coin.y + coinSize >= gameHeight - basketHeight &&
            coin.y + coinSize <= gameHeight    &&
            coin.x + coinSize >= basketX       &&
            coin.x            <= basketX + basketWidth
          ) { s += 10; c += 1; return false; }
          return coin.y < gameHeight + coinSize;
        });
      set({ coins: updated, score: s, collectedCoins: c }, false, 'tzedakah/tick');
    }

    function spawnCoin() {
      const { isMobile, gameWidth, coins } = get();
      const coinSize = isMobile ? 32 : 48;
      set({
        coins: [...coins, {
          id: coinId++, x: Math.random() * (gameWidth - coinSize),
          y: -coinSize, speed: 2 + Math.random() * 3, rotation: 0,
        }],
      }, false, 'tzedakah/spawn');
    }

    return {
      ...INITIAL,

      setIsMobile: (v: boolean) => set({ isMobile: v, ...getDims(v) }, false, 'tzedakah/resize'),

      moveBasket: (rawX: number) => {
        const { gameStarted, gameWidth, basketWidth } = get();
        if (!gameStarted) return;
        set({ basketX: Math.max(0, Math.min(gameWidth - basketWidth, rawX)) }, false, 'tzedakah/moveBasket');
      },

      stepBasket: (dir: -1 | 1) => {
        const { gameStarted, basketX, gameWidth, basketWidth } = get();
        if (!gameStarted) return;
        set({ basketX: Math.max(0, Math.min(gameWidth - basketWidth, basketX + dir * 20)) }, false, 'tzedakah/stepBasket');
      },

      startGame: () => {
        stopAll();
        coinId = 0;
        const { isMobile } = get();
        set({
          coins: [], score: 0, gameStarted: true, gameTime: 60, collectedCoins: 0,
          basketX: isMobile ? 135 : 340, ...getDims(isMobile),
        }, false, 'tzedakah/start');
        moveId  = setInterval(tickCoins, 16);
        spawnId = setInterval(spawnCoin, 800);
        timerId = setInterval(() => {
          const t = get().gameTime;
          if (t <= 1) { stopAll(); set({ gameTime: 0, gameStarted: false }, false, 'tzedakah/end'); }
          else        { set({ gameTime: t - 1 }, false, 'tzedakah/timerTick'); }
        }, 1000);
      },
    };
  },
);
