import { describe, expect, it } from 'vitest';
import { SCENES } from '@/app/games/find-in-scene/components/sceneData';
import { useFindInSceneStore } from '@/app/games/find-in-scene/findInSceneStore';

const prompts = SCENES.flatMap((scene) => scene.prompts.map((prompt, idx) => ({ scene, prompt, idx })));
const cases = prompts.map((p) => [`${p.scene.id} / ${p.prompt.category}`, p] as const);

describe('find-in-scene prompts', () => {
  it.each(cases)('%s: the announced number matches the items in the scene', (_name, { scene, prompt }) => {
    const matching = scene.objects.filter((o) => o.category === prompt.category);
    expect(prompt.count).toBe(matching.length);
    expect(Number(/\d+/.exec(prompt.text)![0])).toBe(matching.length);
  });

  it.each(cases)('%s: tapping every matching item counts as correct and finishes the round', (_name, { scene, prompt, idx }) => {
    useFindInSceneStore.getState().startRound(scene.id, idx);
    const matching = scene.objects.filter((o) => o.category === prompt.category);
    const results = matching.map((o) => useFindInSceneStore.getState().tapObject(o.id));
    expect(results.every((r) => r === 'correct')).toBe(true);
    expect(useFindInSceneStore.getState().phase).toBe('result');
  });

  it('counts a tap on an item of another category as wrong', () => {
    useFindInSceneStore.getState().startRound('playground', 0); // games
    expect(useFindInSceneStore.getState().tapObject('p-tree')).toBe('wrong');
  });
});
