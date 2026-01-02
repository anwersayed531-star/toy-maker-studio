import { useCallback, useRef } from 'react';

type SoundType = 'click' | 'success' | 'warning' | 'error' | 'victory' | 'gameOver' | 'decision';

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) => {
    if (!enabledRef.current) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  }, [getAudioContext]);

  const playSound = useCallback((sound: SoundType) => {
    if (!enabledRef.current) return;

    switch (sound) {
      case 'click':
        playTone(800, 0.1, 'sine', 0.2);
        break;
      case 'success':
        playTone(523, 0.15, 'sine', 0.3);
        setTimeout(() => playTone(659, 0.15, 'sine', 0.3), 100);
        setTimeout(() => playTone(784, 0.2, 'sine', 0.3), 200);
        break;
      case 'warning':
        playTone(440, 0.2, 'triangle', 0.3);
        setTimeout(() => playTone(440, 0.2, 'triangle', 0.3), 250);
        break;
      case 'error':
        playTone(200, 0.3, 'sawtooth', 0.2);
        setTimeout(() => playTone(150, 0.4, 'sawtooth', 0.2), 200);
        break;
      case 'victory':
        [523, 659, 784, 1047].forEach((freq, i) => {
          setTimeout(() => playTone(freq, 0.3, 'sine', 0.3), i * 150);
        });
        break;
      case 'gameOver':
        [392, 349, 330, 294].forEach((freq, i) => {
          setTimeout(() => playTone(freq, 0.4, 'triangle', 0.25), i * 200);
        });
        break;
      case 'decision':
        playTone(600, 0.1, 'sine', 0.15);
        setTimeout(() => playTone(700, 0.15, 'sine', 0.2), 80);
        break;
    }
  }, [playTone]);

  const toggleSound = useCallback((enabled: boolean) => {
    enabledRef.current = enabled;
  }, []);

  const isSoundEnabled = useCallback(() => enabledRef.current, []);

  return { playSound, toggleSound, isSoundEnabled };
};
