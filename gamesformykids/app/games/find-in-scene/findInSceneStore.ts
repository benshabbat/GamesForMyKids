'use client';
import { create } from 'zustand';
import { SCENES, type Scene, type ScenePrompt } from './components/sceneData';

type Phase = 'menu' | 'playing' | 'result';

interface State {
  phase: Phase;
  scene: Scene;
  prompt: ScenePrompt;
  targetIds: Set<string>;
  foundIds: Set<string>;
  wrongId: string | null; // id of object that just had wrong tap (for shake)
  timeLeft: number;
  score: number;
}

interface Actions {
  startRound: (sceneId: string, promptIdx?: number) => void;
  tapObject: (objectId: string) => 'correct' | 'wrong' | 'already';
  tick: () => void;
  resetGame: () => void;
}

const INITIAL_SCENE = SCENES[0]!;
const INITIAL_PROMPT = INITIAL_SCENE.prompts[0]!;

function buildTargetIds(scene: Scene, prompt: ScenePrompt): Set<string> {
  return new Set(
    scene.objects
      .filter(o => o.category === prompt.category)
      .slice(0, prompt.count)
      .map(o => o.id)
  );
}

export const useFindInSceneStore = create<State & Actions>((set, get) => ({
  phase: 'menu',
  scene: INITIAL_SCENE,
  prompt: INITIAL_PROMPT,
  targetIds: buildTargetIds(INITIAL_SCENE, INITIAL_PROMPT),
  foundIds: new Set<string>(),
  wrongId: null,
  timeLeft: 60,
  score: 0,

  startRound: (sceneId, promptIdx) => {
    const scene = SCENES.find(s => s.id === sceneId) ?? SCENES[0]!;
    const idx = promptIdx !== undefined ? promptIdx : Math.floor(Math.random() * scene.prompts.length);
    const prompt = scene.prompts[idx] ?? scene.prompts[0]!;
    const targetIds = buildTargetIds(scene, prompt);
    set({ phase: 'playing', scene, prompt, targetIds, foundIds: new Set(), wrongId: null, timeLeft: 60, score: 0 });
  },

  tapObject: (objectId) => {
    const { targetIds, foundIds } = get();
    if (foundIds.has(objectId)) return 'already';

    if (targetIds.has(objectId)) {
      const newFound = new Set(foundIds);
      newFound.add(objectId);
      const allFound = newFound.size >= targetIds.size;
      const timeBonus = allFound ? Math.round(get().timeLeft * 5) : 0;
      set({
        foundIds: newFound,
        score: get().score + 50 + timeBonus,
        phase: allFound ? 'result' : 'playing',
        wrongId: null,
      });
      return 'correct';
    } else {
      set({ wrongId: objectId });
      setTimeout(() => {
        if (get().wrongId === objectId) set({ wrongId: null });
      }, 600);
      return 'wrong';
    }
  },

  tick: () => {
    const { timeLeft, phase } = get();
    if (phase !== 'playing') return;
    if (timeLeft <= 1) {
      set({ timeLeft: 0, phase: 'result' });
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  resetGame: () => {
    set({
      phase: 'menu',
      scene: INITIAL_SCENE,
      prompt: INITIAL_PROMPT,
      targetIds: buildTargetIds(INITIAL_SCENE, INITIAL_PROMPT),
      foundIds: new Set(),
      wrongId: null,
      timeLeft: 60,
      score: 0,
    });
  },
}));
