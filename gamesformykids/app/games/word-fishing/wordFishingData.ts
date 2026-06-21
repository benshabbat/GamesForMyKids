export type FishingWave = {
  question: string;
  target: { label: string; emoji: string };
  distractors: Array<{ label: string; emoji: string }>;
};

export const FISHING_WAVES: FishingWave[] = [
  {
    question: 'תפוס את בעל הצוואר הארוך!',
    target: { label: "ג'ירפה", emoji: '🦒' },
    distractors: [{ label: 'כריש', emoji: '🦈' }, { label: 'ארנב', emoji: '🐰' }, { label: 'תמנון', emoji: '🐙' }, { label: 'פרה', emoji: '🐄' }],
  },
  {
    question: 'תפוס את הציפור!',
    target: { label: 'תוכי', emoji: '🦜' },
    distractors: [{ label: 'כלב', emoji: '🐶' }, { label: 'חתול', emoji: '🐱' }, { label: 'דג', emoji: '🐟' }, { label: 'פרה', emoji: '🐄' }],
  },
  {
    question: 'תפוס את החיה שחיה בים!',
    target: { label: 'לווייתן', emoji: '🐋' },
    distractors: [{ label: 'ארנב', emoji: '🐰' }, { label: 'פיל', emoji: '🐘' }, { label: 'אריה', emoji: '🦁' }, { label: 'פרה', emoji: '🐄' }],
  },
  {
    question: 'תפוס את הפרפר!',
    target: { label: 'פרפר', emoji: '🦋' },
    distractors: [{ label: 'כריש', emoji: '🦈' }, { label: 'צב', emoji: '🐢' }, { label: 'דולפין', emoji: '🐬' }, { label: 'עכבר', emoji: '🐭' }],
  },
  {
    question: 'תפוס את בעל הקרן!',
    target: { label: 'קרנף', emoji: '🦏' },
    distractors: [{ label: 'חתול', emoji: '🐱' }, { label: 'תוכי', emoji: '🦜' }, { label: 'דג', emoji: '🐟' }, { label: 'תמנון', emoji: '🐙' }],
  },
  {
    question: 'תפוס את הדג!',
    target: { label: 'דג', emoji: '🐟' },
    distractors: [{ label: 'כלב', emoji: '🐶' }, { label: 'ארנב', emoji: '🐰' }, { label: 'פיל', emoji: '🐘' }, { label: 'אריה', emoji: '🦁' }],
  },
  {
    question: 'תפוס את החיה הגדולה ביותר!',
    target: { label: 'פיל', emoji: '🐘' },
    distractors: [{ label: 'עכבר', emoji: '🐭' }, { label: 'ארנב', emoji: '🐰' }, { label: 'חתול', emoji: '🐱' }, { label: 'כלב', emoji: '🐶' }],
  },
  {
    question: 'תפוס את הקוף!',
    target: { label: 'קוף', emoji: '🐒' },
    distractors: [{ label: 'כריש', emoji: '🦈' }, { label: 'תנין', emoji: '🐊' }, { label: 'פרה', emoji: '🐄' }, { label: 'צב', emoji: '🐢' }],
  },
  {
    question: 'תפוס את הצב!',
    target: { label: 'צב', emoji: '🐢' },
    distractors: [{ label: 'ארנב', emoji: '🐰' }, { label: 'תוכי', emoji: '🦜' }, { label: 'פיל', emoji: '🐘' }, { label: 'קוף', emoji: '🐒' }],
  },
  {
    question: 'תפוס את הכריש!',
    target: { label: 'כריש', emoji: '🦈' },
    distractors: [{ label: "ג'ירפה", emoji: '🦒' }, { label: 'פרה', emoji: '🐄' }, { label: 'ארנב', emoji: '🐰' }, { label: 'עכבר', emoji: '🐭' }],
  },
  {
    question: 'תפוס את הדולפין!',
    target: { label: 'דולפין', emoji: '🐬' },
    distractors: [{ label: 'כלב', emoji: '🐶' }, { label: 'חתול', emoji: '🐱' }, { label: 'אריה', emoji: '🦁' }, { label: 'פרפר', emoji: '🦋' }],
  },
  {
    question: 'תפוס את האריה!',
    target: { label: 'אריה', emoji: '🦁' },
    distractors: [{ label: 'דג', emoji: '🐟' }, { label: 'פרפר', emoji: '🦋' }, { label: 'קוף', emoji: '🐒' }, { label: 'צב', emoji: '🐢' }],
  },
  {
    question: 'תפוס את התמנון!',
    target: { label: 'תמנון', emoji: '🐙' },
    distractors: [{ label: 'ארנב', emoji: '🐰' }, { label: 'פיל', emoji: '🐘' }, { label: 'קרנף', emoji: '🦏' }, { label: 'כלב', emoji: '🐶' }],
  },
  {
    question: 'תפוס את הפרה!',
    target: { label: 'פרה', emoji: '🐄' },
    distractors: [{ label: 'כריש', emoji: '🦈' }, { label: 'דולפין', emoji: '🐬' }, { label: 'תמנון', emoji: '🐙' }, { label: 'קרנף', emoji: '🦏' }],
  },
  {
    question: 'תפוס את התנין!',
    target: { label: 'תנין', emoji: '🐊' },
    distractors: [{ label: 'ארנב', emoji: '🐰' }, { label: 'תוכי', emoji: '🦜' }, { label: 'פרפר', emoji: '🦋' }, { label: 'עכבר', emoji: '🐭' }],
  },
  {
    question: 'תפוס את העכבר!',
    target: { label: 'עכבר', emoji: '🐭' },
    distractors: [{ label: 'פיל', emoji: '🐘' }, { label: 'אריה', emoji: '🦁' }, { label: "ג'ירפה", emoji: '🦒' }, { label: 'קרנף', emoji: '🦏' }],
  },
  {
    question: 'תפוס את החיה שאוהבת לאכול גזר!',
    target: { label: 'ארנב', emoji: '🐰' },
    distractors: [{ label: 'כריש', emoji: '🦈' }, { label: 'לווייתן', emoji: '🐋' }, { label: 'תנין', emoji: '🐊' }, { label: 'תמנון', emoji: '🐙' }],
  },
  {
    question: 'תפוס את הכלב!',
    target: { label: 'כלב', emoji: '🐶' },
    distractors: [{ label: 'דג', emoji: '🐟' }, { label: 'צב', emoji: '🐢' }, { label: 'קוף', emoji: '🐒' }, { label: 'כריש', emoji: '🦈' }],
  },
];
