export interface ColorMix {
  id: string;
  color1: string;
  color2: string;
  label1: string;
  label2: string;
  result: string;
  resultLabel: string;
  wrongOptions: string[]; // result labels to use as distractors
}

export const COLOR_MIXES: ColorMix[] = [
  { id: 'red-yellow',   color1: '#e74c3c', color2: '#f1c40f', label1: 'אדום',    label2: 'צהוב',   result: '#e67e22', resultLabel: 'כתום',      wrongOptions: ['ירוק', 'סגול', 'ורוד'] },
  { id: 'blue-yellow',  color1: '#3498db', color2: '#f1c40f', label1: 'כחול',    label2: 'צהוב',   result: '#27ae60', resultLabel: 'ירוק',       wrongOptions: ['כתום', 'סגול', 'חום'] },
  { id: 'red-blue',     color1: '#e74c3c', color2: '#3498db', label1: 'אדום',    label2: 'כחול',   result: '#8e44ad', resultLabel: 'סגול',       wrongOptions: ['ירוק', 'כתום', 'ורוד'] },
  { id: 'red-white',    color1: '#e74c3c', color2: '#ecf0f1', label1: 'אדום',    label2: 'לבן',    result: '#f7a8b0', resultLabel: 'ורוד',       wrongOptions: ['כתום', 'סגול', 'אדמדם'] },
  { id: 'blue-white',   color1: '#3498db', color2: '#ecf0f1', label1: 'כחול',    label2: 'לבן',    result: '#85c1e9', resultLabel: 'תכלת',       wrongOptions: ['ירוק בהיר', 'לילך', 'אפור'] },
  { id: 'red-black',    color1: '#e74c3c', color2: '#2c3e50', label1: 'אדום',    label2: 'שחור',   result: '#7b241c', resultLabel: 'אדום כהה',   wrongOptions: ['כתום', 'סגול', 'חום כהה'] },
  { id: 'yellow-white', color1: '#f1c40f', color2: '#ecf0f1', label1: 'צהוב',    label2: 'לבן',    result: '#fdebd0', resultLabel: 'קרם',        wrongOptions: ['ירוק בהיר', 'ורוד', 'לבנבן'] },
  { id: 'blue-red2',    color1: '#1a5276', color2: '#e74c3c', label1: 'כחול כהה', label2: 'אדום',  result: '#6c3483', resultLabel: 'סגול כהה',   wrongOptions: ['כחול', 'ורוד', 'חום'] },
  { id: 'orange-blue',  color1: '#e67e22', color2: '#3498db', label1: 'כתום',    label2: 'כחול',   result: '#5d6d7e', resultLabel: 'אפור חום',   wrongOptions: ['ירוק', 'סגול', 'כחול כהה'] },
  { id: 'green-blue',   color1: '#27ae60', color2: '#3498db', label1: 'ירוק',    label2: 'כחול',   result: '#1abc9c', resultLabel: 'ירוק-כחול',  wrongOptions: ['כחול כהה', 'אפור', 'צהוב'] },
  { id: 'yellow-blue2', color1: '#f39c12', color2: '#2980b9', label1: 'צהוב-כתום', label2: 'כחול', result: '#5d6d7e', resultLabel: 'אפור',       wrongOptions: ['ירוק', 'חום', 'סגול'] },
  { id: 'red-green',    color1: '#e74c3c', color2: '#27ae60', label1: 'אדום',    label2: 'ירוק',   result: '#6e4e1e', resultLabel: 'חום',        wrongOptions: ['כתום', 'סגול', 'אפור'] },
];

export const QUESTIONS_PER_GAME = 10;
