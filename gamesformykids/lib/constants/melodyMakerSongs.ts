export interface MelodyMakerSong {
  id: string;
  title: string;
  emoji: string;
  notes: number[];
}

// Note indices: 0=C4(דו), 1=D4(רה), 2=E4(מי), 3=F4(פה), 4=G4(סול), 5=A4(לה), 6=B4(סי), 7=C5(דו)
export const MELODY_MAKER_SONGS: MelodyMakerSong[] = [
  {
    id: 'yeled-katan',
    title: 'ילד קטן',
    emoji: '👦',
    notes: [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0],
  },
  {
    id: 'nikolai',
    title: 'ניקולאי',
    emoji: '🎵',
    notes: [2, 1, 0, 1, 2, 2, 2, 1, 1, 1, 2, 4, 4],
  },
  {
    id: 'roshi-roshi',
    title: 'ראשי ראשי',
    emoji: '🎶',
    notes: [0, 0, 0, 1, 2, 2, 1, 2, 3, 4],
  },
];
