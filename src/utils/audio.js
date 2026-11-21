/**
 * Audio System for Interactive Birthday Surprise Website
 * Provides robust Web Audio API sound effects and sweet background music synthesis.
 * Fully autonomous, zero external dependencies required.
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.6;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.musicGain = null;
    this.sfxGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.sfxGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(this.volume * 0.45, this.ctx.currentTime);
        this.musicGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(newVol) {
    this.volume = Math.max(0, Math.min(1, newVol));
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.45, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }

  // Soft Balloon Pop Sound Effect
  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(380, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);

    gain.gain.setValueAtTime(0.7 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.sfxGain || this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);

    try {
      const bufferSize = this.ctx.sampleRate * 0.06;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, t);
      filter.Q.setValueAtTime(1.5, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4 * this.volume, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain || this.ctx.destination);

      whiteNoise.start(t);
    } catch {}
  }

  // Candle Blow Out (Wind / Air whoosh)
  playBlow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const dur = 0.8;
    try {
      const bufferSize = this.ctx.sampleRate * dur;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, t);
      filter.frequency.linearRampToValueAtTime(1200, t + dur * 0.4);
      filter.frequency.exponentialRampToValueAtTime(150, t + dur);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.5 * this.volume, t + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain || this.ctx.destination);

      noise.start(t);
    } catch {}
  }

  // Magical Sparkle Chime / Arpeggio
  playChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    const t = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      const noteTime = t + i * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.3 * this.volume, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);

      osc.connect(gain);
      gain.connect(this.sfxGain || this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.55);
    });
  }

  // Envelope Open / Paper Rustle
  playRustle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(950, t + 0.25);

    gain.gain.setValueAtTime(0.25 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGain || this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // Gift Open Fanfare
  playFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const chords = [
      { f: 523.25, d: 0.1 },
      { f: 659.25, d: 0.1 },
      { f: 783.99, d: 0.1 },
      { f: 1046.50, d: 0.5 },
    ];

    const t = this.ctx.currentTime;
    chords.forEach((chord, i) => {
      const noteTime = t + i * 0.12;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(chord.f, noteTime);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.4 * this.volume, noteTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + chord.d + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain || this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + chord.d + 0.35);
    });
  }

  // Soft Button Click
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.05);

    gain.gain.setValueAtTime(0.2 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.sfxGain || this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Music Box Synthesizer
  startBackgroundMusic() {
    if (this.isPlayingMusic) return;
    this.init();
    if (!this.ctx) return;

    this.isPlayingMusic = true;

    const melody = [
      { note: 392.00, dur: 0.3 },
      { note: 392.00, dur: 0.3 },
      { note: 440.00, dur: 0.6 },
      { note: 392.00, dur: 0.6 },
      { note: 523.25, dur: 0.6 },
      { note: 493.88, dur: 1.1 },

      { note: 392.00, dur: 0.3 },
      { note: 392.00, dur: 0.3 },
      { note: 440.00, dur: 0.6 },
      { note: 392.00, dur: 0.6 },
      { note: 587.33, dur: 0.6 },
      { note: 523.25, dur: 1.1 },

      { note: 392.00, dur: 0.3 },
      { note: 392.00, dur: 0.3 },
      { note: 783.99, dur: 0.6 },
      { note: 659.25, dur: 0.6 },
      { note: 523.25, dur: 0.6 },
      { note: 493.88, dur: 0.6 },
      { note: 440.00, dur: 0.9 },

      { note: 698.46, dur: 0.3 },
      { note: 698.46, dur: 0.3 },
      { note: 659.25, dur: 0.6 },
      { note: 523.25, dur: 0.6 },
      { note: 587.33, dur: 0.6 },
      { note: 523.25, dur: 1.4 },
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isPlayingMusic || !this.ctx) return;

      const item = melody[noteIdx];
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, t);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(item.note * 2, t);

      const targetGain = this.isMuted ? 0 : this.volume * 0.18;
      noteGain.gain.setValueAtTime(0, t);
      noteGain.gain.linearRampToValueAtTime(targetGain, t + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, t + item.dur * 1.6);

      osc.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(this.musicGain || this.ctx.destination);

      osc.start(t);
      osc2.start(t);
      osc.stop(t + item.dur * 1.8);
      osc2.stop(t + item.dur * 1.8);

      noteIdx = (noteIdx + 1) % melody.length;
      const intervalMs = (item.dur + 0.12) * 1000;
      this.musicTimer = setTimeout(playNextNote, intervalMs);
    };

    playNextNote();
  }

  stopBackgroundMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopBackgroundMusic();
      return false;
    } else {
      this.startBackgroundMusic();
      return true;
    }
  }
}

export const sound = new SoundSystem();
