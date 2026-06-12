export function vibrateCorrect() {
  navigator.vibrate?.(30);
}

export function vibrateWrong() {
  navigator.vibrate?.([15, 10, 15]);
}
