// Ultra-Realistic Web Audio API Procedural Sound Engine with 3D Spatial Audio for Veck.io Clone
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.masterGain = null;
    this.engineOsc1 = null;
    this.engineOsc2 = null;
    this.engineGain = null;
    this.engineFilter = null;
    this.isEngineRunning = false;
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

  playJump() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(420, t + 0.08);
    g.gain.setValueAtTime(0.2, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  playBandage() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    
    // Rustle wrap noise + gentle healing chime
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(780, t + 0.35);
    g.gain.setValueAtTime(0.28, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.35);
  }

  playCarHonk() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Dual-tone auto horn (440Hz + 550Hz)
    const o1 = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o1.type = 'sawtooth';
    o2.type = 'sawtooth';
    o1.frequency.setValueAtTime(435, t);
    o2.frequency.setValueAtTime(548, t);
    g.gain.setValueAtTime(0.35, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

    o1.connect(g);
    o2.connect(g);
    g.connect(this.masterGain);
    o1.start(t); o2.start(t);
    o1.stop(t + 0.38); o2.stop(t + 0.38);
  }

  playLootPickup() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(1040, t + 0.12);
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  playSuppressedShot(sourcePos = null, listenerPos = null, listenerRotY = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    let volume = 0.55;
    let pan = 0.0;
    if (sourcePos && listenerPos) {
      const dx = sourcePos.x - listenerPos.x;
      const dz = sourcePos.z - listenerPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > 30) return; // Very tight stealth radius
      volume = Math.max(0.04, Math.pow(1 - dist / 30, 2.0) * 0.4);
      const angle = Math.atan2(dx, dz) - listenerRotY;
      pan = Math.max(-1.0, Math.min(1.0, Math.sin(angle)));
    }

    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (panner) panner.pan.setValueAtTime(pan, t);

    // Muffled stealth sub-pop
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.07);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.012));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.Q.setValueAtTime(2.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.85, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.065);

    noise.connect(filter);
    filter.connect(gain);
    if (panner) {
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      gain.connect(this.masterGain);
    }
    noise.start(t);
  }

  playSilencerAttach() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(840, t + 0.08);
    g.gain.setValueAtTime(0.45, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.11);
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

  // Realistic Wooden Door Open/Close Creak & Latch
  playDoor(isOpen = true) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(isOpen ? 480 : 320, t);
    clickOsc.frequency.exponentialRampToValueAtTime(140, t + 0.05);
    clickGain.gain.setValueAtTime(0.35, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    clickOsc.connect(clickGain);
    clickGain.connect(this.masterGain);
    clickOsc.start(t);
    clickOsc.stop(t + 0.05);

    const creakOsc = this.ctx.createOscillator();
    const creakGain = this.ctx.createGain();
    creakOsc.type = 'sawtooth';
    creakOsc.frequency.setValueAtTime(isOpen ? 120 : 160, t + 0.03);
    creakOsc.frequency.linearRampToValueAtTime(isOpen ? 180 : 90, t + 0.22);
    creakGain.gain.setValueAtTime(0.18, t + 0.03);
    creakGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    creakOsc.connect(creakGain);
    creakGain.connect(this.masterGain);
    creakOsc.start(t + 0.03);
    creakOsc.stop(t + 0.22);
  }

  // Natural Combat Boot Footsteps (Subtle, tactile, non-abrasive)
  playFootstep(surface = 'grass') {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Layer 1: Soft Low-End Body Thud (tactile heel/boot strike)
    const thudOsc = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thudOsc.type = 'sine';
    const startPitch = surface === 'wood' ? 105 : (surface === 'water' ? 130 : 80);
    const endPitch = surface === 'wood' ? 52 : (surface === 'water' ? 65 : 40);
    thudOsc.frequency.setValueAtTime(startPitch, t);
    thudOsc.frequency.exponentialRampToValueAtTime(endPitch, t + 0.05);
    thudGain.gain.setValueAtTime(0.07, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    thudOsc.connect(thudGain);
    thudGain.connect(this.masterGain);
    thudOsc.start(t);
    thudOsc.stop(t + 0.05);

    // Layer 2: Subtle Lowpass Brush/Rustle (gentle tread friction, low gain)
    const noiseSize = Math.floor(this.ctx.sampleRate * 0.045);
    const noiseBuf = this.ctx.createBuffer(1, noiseSize, this.ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.01));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = surface === 'wood' ? 'bandpass' : 'lowpass';
    filter.frequency.setValueAtTime(surface === 'wood' ? 360 : 210, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.05, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(t);
  }

  // Realistic Procedural Vehicle Engine Sound (Car & Motorbike)
  startEngineAudio(isBike = false) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || this.isEngineRunning) return;

    try {
      const t = this.ctx.currentTime;
      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.setValueAtTime(0.01, t);
      this.engineGain.gain.linearRampToValueAtTime(0.22, t + 0.25);

      this.engineFilter = this.ctx.createBiquadFilter();
      this.engineFilter.type = 'lowpass';
      this.engineFilter.frequency.setValueAtTime(isBike ? 440 : 320, t);
      this.engineFilter.Q.setValueAtTime(2.2, t);

      // Low rumble combustion oscillator
      this.engineOsc1 = this.ctx.createOscillator();
      this.engineOsc1.type = isBike ? 'sawtooth' : 'triangle';
      this.engineOsc1.frequency.setValueAtTime(isBike ? 85 : 55, t);

      // Mechanical rev oscillator
      this.engineOsc2 = this.ctx.createOscillator();
      this.engineOsc2.type = 'sawtooth';
      this.engineOsc2.frequency.setValueAtTime(isBike ? 170 : 110, t);

      const osc2Gain = this.ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.42, t);
      this.engineOsc2.connect(osc2Gain);
      osc2Gain.connect(this.engineFilter);

      this.engineOsc1.connect(this.engineFilter);
      this.engineFilter.connect(this.engineGain);
      this.engineGain.connect(this.masterGain);

      this.engineOsc1.start(t);
      this.engineOsc2.start(t);
      this.isEngineRunning = true;
    } catch (e) {
      console.warn('Engine audio error:', e);
    }
  }

  updateEngineAudio(speed = 0, isAccelerating = false, isBike = false) {
    if (!this.isEngineRunning || !this.ctx || !this.engineOsc1) return;
    const t = this.ctx.currentTime;
    const absSpeed = Math.abs(speed);

    // RPM pitch mapping
    const baseFreq1 = isBike ? 80 : 50;
    const maxFreq1 = isBike ? 340 : 230;
    const targetFreq1 = baseFreq1 + (Math.min(100, absSpeed) / 100) * (maxFreq1 - baseFreq1) + (isAccelerating ? 25 : 0);
    this.engineOsc1.frequency.setTargetAtTime(targetFreq1, t, 0.08);

    if (this.engineOsc2) {
      this.engineOsc2.frequency.setTargetAtTime(targetFreq1 * 2.05, t, 0.08);
    }

    if (this.engineFilter) {
      const targetFilter = (isBike ? 380 : 280) + (absSpeed * 8) + (isAccelerating ? 240 : 0);
      this.engineFilter.frequency.setTargetAtTime(Math.min(2200, targetFilter), t, 0.08);
    }

    if (this.engineGain) {
      const targetGain = 0.15 + (Math.min(100, absSpeed) / 100) * 0.13 + (isAccelerating ? 0.07 : 0);
      this.engineGain.gain.setTargetAtTime(targetGain, t, 0.08);
    }
  }

  stopEngineAudio() {
    if (!this.isEngineRunning || !this.ctx) return;
    const t = this.ctx.currentTime;
    if (this.engineGain) {
      try {
        this.engineGain.gain.linearRampToValueAtTime(0.001, t + 0.12);
      } catch (e) {}
    }
    setTimeout(() => {
      try {
        if (this.engineOsc1) { this.engineOsc1.stop(); this.engineOsc1.disconnect(); this.engineOsc1 = null; }
        if (this.engineOsc2) { this.engineOsc2.stop(); this.engineOsc2.disconnect(); this.engineOsc2 = null; }
        if (this.engineFilter) { this.engineFilter.disconnect(); this.engineFilter = null; }
        if (this.engineGain) { this.engineGain.disconnect(); this.engineGain = null; }
      } catch (e) {}
      this.isEngineRunning = false;
    }, 150);
  }

  // Sci-Fi Hologram Revive Beacon Signal & Horn
  playReviveBeacon() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.6);
    g.gain.setValueAtTime(0.4, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.7);
  }

  // Water Splash / Sloshing Sound
  playWaterSplash() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    const size = Math.floor(this.ctx.sampleRate * 0.2);
    const buf = this.ctx.createBuffer(1, size, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < size; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.04));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  // Crisp Optic / Scope Click
  playScopeZoom() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, t);
    osc.frequency.exponentialRampToValueAtTime(450, t + 0.035);
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.035);
  }
}

window.soundFX = new SoundFX();
