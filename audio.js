// Ultra-Realistic Web Audio API Procedural Sound Engine with 3D Spatial Audio for Veck.io Clone
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  makeDistortionCurve(amount = 20) {
    const k = typeof amount === 'number' ? amount : 20;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // 3D Spatial Gunshot with Distance Falloff & Stereo Panning
  playShot(gunType = 'assault_rifle', sourcePos = null, listenerPos = null, listenerRotY = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Calculate Spatial Attenuation
    let volume = 1.0;
    let pan = 0.0;
    let isDistant = false;

    if (sourcePos && listenerPos) {
      const dx = sourcePos.x - listenerPos.x;
      const dz = sourcePos.z - listenerPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      // Strict 42-meter max range: bot gunfire beyond 42m is completely silent (no spam/noise!)
      const MAX_AUDIBLE_RANGE = 42;
      if (dist > MAX_AUDIBLE_RANGE) return;

      volume = Math.max(0.05, Math.pow(1 - dist / MAX_AUDIBLE_RANGE, 2.0));
      if (dist > 18) isDistant = true;

      const angle = Math.atan2(dx, dz) - listenerRotY;
      pan = Math.max(-0.85, Math.min(0.85, Math.sin(angle)));
    }

    if (gunType === 'knife') {
      this.playKnifeSlash(volume);
      return;
    }
    if (gunType === 'grenade' || gunType === 'rocket') {
      this.playExplosion(volume);
      return;
    }

    if (gunType === 'paintball') {
      // High-pressure pneumatic pop sound
      const popOsc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      popOsc.type = 'sine';
      popOsc.frequency.setValueAtTime(550, t);
      popOsc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
      popGain.gain.setValueAtTime(0.8 * volume, t);
      popGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      popOsc.connect(popGain);
      popGain.connect(spatialDest);
      popOsc.start(t);
      popOsc.stop(t + 0.08);
      return;
    }

    // Spatial Panner Node
    let spatialDest = this.masterGain;
    if (this.ctx.createStereoPanner && pan !== 0) {
      const panner = this.ctx.createStereoPanner();
      panner.pan.setValueAtTime(pan, t);
      panner.connect(this.masterGain);
      spatialDest = panner;
    }

    // LAYER 1: Supersonic Muzzle Crack (High Frequency Transient Snap)
    const crackSize = Math.floor(this.ctx.sampleRate * (isDistant ? 0.02 : (gunType === 'sniper' ? 0.07 : 0.04)));
    const crackBuf = this.ctx.createBuffer(1, crackSize, this.ctx.sampleRate);
    const crackData = crackBuf.getChannelData(0);
    for (let i = 0; i < crackSize; i++) {
      crackData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (crackSize * 0.12));
    }
    const crackSource = this.ctx.createBufferSource();
    crackSource.buffer = crackBuf;

    const crackFilter = this.ctx.createBiquadFilter();
    crackFilter.type = 'bandpass';
    const crackFreq = isDistant ? 1800 : (gunType === 'sniper' ? 4500 : (gunType === 'minigun' ? 3200 : (gunType === 'assault_rifle' ? 3800 : 4800)));
    crackFilter.frequency.setValueAtTime(crackFreq, t);
    crackFilter.Q.setValueAtTime(isDistant ? 1.5 : 3.5, t);

    const crackGain = this.ctx.createGain();
    crackGain.gain.setValueAtTime((gunType === 'sniper' ? 1.2 : 0.9) * volume, t);
    crackGain.gain.exponentialRampToValueAtTime(0.001, t + (gunType === 'sniper' ? 0.08 : 0.04));

    crackSource.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(spatialDest);
    crackSource.start(t);

    // LAYER 2: Heavy Sub-Bass Thump
    const bassOsc = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    const shaper = this.ctx.createWaveShaper();
    shaper.curve = this.makeDistortionCurve(gunType === 'sniper' ? 45 : (gunType === 'assault_rifle' ? 35 : 20));

    bassOsc.type = 'sawtooth';
    const startFreq = gunType === 'sniper' ? 160 : (gunType === 'minigun' ? 260 : (gunType === 'assault_rifle' ? 220 : 280));
    const endFreq = gunType === 'sniper' ? 22 : (gunType === 'assault_rifle' ? 32 : 45);
    const thumpDur = isDistant ? 0.08 : (gunType === 'sniper' ? 0.28 : (gunType === 'assault_rifle' ? 0.16 : 0.10));

    bassOsc.frequency.setValueAtTime(startFreq, t);
    bassOsc.frequency.exponentialRampToValueAtTime(endFreq, t + thumpDur);

    bassGain.gain.setValueAtTime((gunType === 'sniper' ? 1.1 : 0.85) * volume, t);
    bassGain.gain.exponentialRampToValueAtTime(0.001, t + thumpDur);

    bassOsc.connect(shaper);
    shaper.connect(bassGain);
    bassGain.connect(spatialDest);
    bassOsc.start(t);
    bassOsc.stop(t + thumpDur);

    // LAYER 3: Mechanical Bolt / Chamber Snap (Only audible when close!)
    if (!isDistant) {
      const mechOsc = this.ctx.createOscillator();
      const mechGain = this.ctx.createGain();
      mechOsc.type = 'triangle';
      mechOsc.frequency.setValueAtTime(1450, t + 0.005);
      mechOsc.frequency.exponentialRampToValueAtTime(600, t + 0.035);
      mechGain.gain.setValueAtTime(0.4 * volume, t + 0.005);
      mechGain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
      mechOsc.connect(mechGain);
      mechGain.connect(spatialDest);
      mechOsc.start(t + 0.005);
      mechOsc.stop(t + 0.035);
    }

    // LAYER 4: Acoustic Environment Reverb & Spatial Tail
    const tailDur = isDistant ? 0.22 : (gunType === 'assault_rifle' ? 0.45 : 0.3);
    const tailSize = Math.floor(this.ctx.sampleRate * tailDur);
    const tailBuf = this.ctx.createBuffer(2, tailSize, this.ctx.sampleRate);
    const leftData = tailBuf.getChannelData(0);
    const rightData = tailBuf.getChannelData(1);
    for (let i = 0; i < tailSize; i++) {
      const decay = Math.exp(-i / (tailSize * 0.28));
      leftData[i] = (Math.random() * 2 - 1) * decay;
      rightData[i] = (Math.random() * 2 - 1) * decay;
    }
    const tailSource = this.ctx.createBufferSource();
    tailSource.buffer = tailBuf;

    const tailFilter = this.ctx.createBiquadFilter();
    tailFilter.type = 'lowpass';
    tailFilter.frequency.setValueAtTime(isDistant ? 900 : 1800, t);
    tailFilter.frequency.exponentialRampToValueAtTime(isDistant ? 150 : 250, t + tailDur);

    const tailGain = this.ctx.createGain();
    tailGain.gain.setValueAtTime(0.65 * volume, t);
    tailGain.gain.exponentialRampToValueAtTime(0.001, t + tailDur);

    tailSource.connect(tailFilter);
    tailFilter.connect(tailGain);
    tailGain.connect(spatialDest);
    tailSource.start(t);
  }

  playKnifeSlash(volume = 1.0) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.12);
    g.gain.setValueAtTime(0.4 * volume, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  playExplosion(volume = 1.0) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(25, t + 0.8);
    g.gain.setValueAtTime(0.9 * volume, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.8);

    const expDur = 1.0;
    const expSize = Math.floor(this.ctx.sampleRate * expDur);
    const expBuf = this.ctx.createBuffer(1, expSize, this.ctx.sampleRate);
    const d = expBuf.getChannelData(0);
    for (let i = 0; i < expSize; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (expSize * 0.22));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = expBuf;
    const filt = this.ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.setValueAtTime(1200, t);
    filt.frequency.exponentialRampToValueAtTime(80, t + expDur);
    const ng = this.ctx.createGain();
    ng.gain.setValueAtTime(0.85 * volume, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + expDur);
    noise.connect(filt);
    filt.connect(ng);
    ng.connect(this.masterGain);
    noise.start(t);
  }

  playDeploy() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.playClickSound(t, 1200, 700, 0.06, 0.45);
    this.playClickSound(t + 0.05, 550, 1100, 0.08, 0.5);
  }

  playReload() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    this.playClickSound(t + 0.08, 950, 420, 0.09, 0.45);
    this.playClickSound(t + 0.16, 500, 260, 0.08, 0.35);
    this.playClickSound(t + 0.52, 380, 880, 0.11, 0.55);
    this.playClickSound(t + 0.62, 850, 220, 0.09, 0.45);
    this.playClickSound(t + 0.88, 1250, 600, 0.08, 0.5);
    this.playClickSound(t + 0.98, 700, 1400, 0.09, 0.6);
  }

  playClickSound(startTime, startFreq, endFreq, dur, vol = 0.35) {
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(startFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + dur);
    g.gain.setValueAtTime(vol, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(startTime);
    osc.stop(startTime + dur);
  }

  playHit() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, t);
    osc.frequency.setValueAtTime(3200, t + 0.015);
    g.gain.setValueAtTime(0.4, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.04);
  }

  playKill() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, t);
    osc.frequency.setValueAtTime(880, t + 0.08);
    osc.frequency.setValueAtTime(1174.66, t + 0.16);
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.45);
  }

  playJumpPad() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.25);
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);
    g.gain.setValueAtTime(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.04);
  }
}

window.soundFX = new SoundFX();
