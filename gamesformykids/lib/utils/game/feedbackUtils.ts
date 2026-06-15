/**
 * Feedback utilities — speech/audio feedback functions
 */
import { FEEDBACK_MESSAGES, GAME_CONSTANTS } from '../../constants';
import { speakHebrew, cancelSpeech, isSpeechEnabled } from '../speech/enhancedSpeechUtils';
import { logError } from '../errorUtils';
import { delay } from './gameUtils';
import { getChildName } from './getChildName';

/**
 * מחזיר הודעת משוב אקראית
 */
export function getRandomFeedbackMessage(type: 'SUCCESS' | 'WRONG' | 'START'): string {
  const messages = FEEDBACK_MESSAGES[type];
  return messages[Math.floor(Math.random() * messages.length)]!;
}

/** Injects the child's name into a SUCCESS message when available. */
function personalizeSuccessMessage(msg: string): string {
  const name = getChildName();
  if (!name) return msg;
  // Messages ending with ! get the name prepended; others get it appended.
  return msg.endsWith('!') ? `${name}, ${msg}` : `${msg}, ${name}!`;
}

/**
 * משמיע משוב קולי חיובי
 */
export async function speakPositiveFeedback(): Promise<void> {
  cancelSpeech();
  await delay(GAME_CONSTANTS.DELAYS.SUCCESS_SPEAK_DELAY);
  try {
    await speakHebrew(personalizeSuccessMessage(getRandomFeedbackMessage('SUCCESS')));
  } catch (error) {
    logError('שגיאה בהשמעת משוב חיובי:', error);
  }
}

/**
 * משמיע משוב קולי שלילי
 */
export async function speakNegativeFeedback(): Promise<void> {
  cancelSpeech();
  await delay(GAME_CONSTANTS.DELAYS.WRONG_ANSWER_DELAY);
  try {
    await speakHebrew(getRandomFeedbackMessage('WRONG'));
  } catch (error) {
    logError('שגיאה בהשמעת משוב שלילי:', error);
  }
}

/**
 * משמיע ברכת התחלה אקראית
 */
export async function speakStartMessage(): Promise<void> {
  cancelSpeech();
  await delay(GAME_CONSTANTS.DELAYS.START_GAME_DELAY);
  try {
    await speakHebrew(getRandomFeedbackMessage('START'));
  } catch (error) {
    logError('שגיאה בהשמעת ברכת התחלה:', error);
  }
}

/**
 * משמיע את השם של פריט במשחק
 */
export async function speakItemName(
  itemName: string,
  translator: (name: string) => string,
): Promise<void> {
  if (!isSpeechEnabled()) return;

  cancelSpeech();
  await delay(GAME_CONSTANTS.DELAYS.SPEAK_DELAY);

  try {
    const hebrewName = translator(itemName);
    const success = await speakHebrew(hebrewName);
    if (!success) {
      logError('Failed to speak item:', itemName);
    }
  } catch (error) {
    logError('שגיאה בהשמעת הפריט:', error);
  }
}
