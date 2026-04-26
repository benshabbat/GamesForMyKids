/**
 * Returns Tailwind classes for a quiz answer button based on its answer state.
 * @param isRight      - true when this choice is the correct answer
 * @param isSelected   - true when the user picked this choice
 * @param answered     - true once the user has selected any answer
 * @param idleClass    - classes to use while the question is still unanswered
 */
export function answerButtonClass(
  isRight: boolean,
  isSelected: boolean,
  answered: boolean,
  idleClass: string,
): string {
  if (!answered) return idleClass;
  if (isRight)    return 'bg-green-500 border-2 border-green-600 text-white';
  if (isSelected) return 'bg-red-400 border-2 border-red-500 text-white';
  return 'bg-gray-100 border-2 border-gray-200 text-gray-400';
}
