export function initSpeechAndAudio(
  setSpeechEnabled: (enabled: boolean) => void,
  setAudioContext: (ctx: AudioContext | null) => void
) {
  if (typeof window === "undefined") return;

  if ("speechSynthesis" in window) {
    setSpeechEnabled(true);

    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  }

  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (AudioContextClass) {
    setAudioContext(new AudioContextClass());
  }
}