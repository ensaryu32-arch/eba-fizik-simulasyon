// Veck.io High-Definition 3D Models, Textures, Sci-Fi Arena, Authentic AK-47 & Tactical Two-Tone Pistol

// 1. PROCEDURAL HD TEXTURE GENERATORS
function createAKWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Rich Russian amber/cherry laminate wood
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#8B3A18');
  grad.addColorStop(0.3, '#A0451C');
  grad.addColorStop(0.7, '#6E2A10');
  grad.addColorStop(1, '#943D15');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Realistic wood grain rings & stripes
  ctx.fillStyle = 'rgba(50, 15, 5, 0.22)';
  for (let i = 0; i < 45; i++) {
    const y = i * 12 + Math.sin(i * 0.5) * 6;
    ctx.fillRect(0, y, 512, 4 + Math.sin(i) * 3);
  }
  // Subtle highlights
  ctx.fillStyle = 'rgba(255, 180, 100, 0.15)';
  for (let i = 0; i < 30; i++) {
    const y = i * 18 + 5;
    ctx.fillRect(0, y, 512, 3);
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createGunMetalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#23272e';
  ctx.fillRect(0, 0, 256, 256);

  // Stamped steel scratches & noise
  for (let i = 0; i < 600; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.12)';
    ctx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 8 + 2, 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createSilverSlideTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Brushed Satin Chrome / Silver
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#f1f5f9');
  grad.addColorStop(0.3, '#cbd5e1');
  grad.addColorStop(0.7, '#94a3b8');
  grad.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Brushed horizontal metal grain
  for (let i = 0; i < 800; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
    ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 30 + 10, 1);
  }

  // Rear Slide Serrations (Matching Reference Image 2!)
  ctx.fillStyle = '#475569';
  for (let x = 60; x < 180; x += 12) {
    ctx.fillRect(x, 20, 5, 140);
  }

  // Ejection Port Outline
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(260, 30, 80, 50);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createPolymerGripTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#181a1f';
  ctx.fillRect(0, 0, 256, 256);

  // Stippled checkered grip texture
  ctx.fillStyle = '#2c313a';
  for (let x = 0; x < 256; x += 6) {
    for (let y = 0; y < 256; y += 6) {
      if ((x + y) % 12 === 0) {
        ctx.fillRect(x, y, 3, 3);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createFoxG10Texture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 256, 256);
  // Knurled diamond microtexture
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let y = 0; y < 256; y += 4) {
    for (let x = 0; x < 256; x += 4) {
      if ((x + y) % 8 === 0) ctx.fillRect(x, y, 2, 2);
    }
  }
  // Milled diagonal grip grooves matching Photo 2
  for (let i = -100; i < 350; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 120, 256);
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#020617';
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

function createOceanResinTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#0a192f');
  grad.addColorStop(0.2, '#1e3a8a');
  grad.addColorStop(0.5, '#2563eb');
  grad.addColorStop(0.8, '#0284c7');
  grad.addColorStop(1, '#38bdf8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  // Pearlescent dynamic swirling waves matching Photo 4
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * 30);
    ctx.bezierCurveTo(140, i * 30 + 45, 340, i * 30 - 35, 512, i * 30 + 20);
    ctx.lineWidth = 7 + (i % 3) * 4;
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.35)' : 'rgba(186, 230, 253, 0.42)';
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

function createBurlWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 256, 256);
  grad.addColorStop(0, '#60280c');
  grad.addColorStop(0.4, '#854d0e');
  grad.addColorStop(0.8, '#713f12');
  grad.addColorStop(1, '#451a03');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  // Wood burl grain & knots
  ctx.fillStyle = 'rgba(254, 240, 138, 0.12)';
  for (let i = 0; i < 25; i++) {
    ctx.beginPath();
    ctx.arc((i * 47) % 256, (i * 73) % 256, 8 + (i % 5) * 4, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createSatinBladeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#f8fafc');
  grad.addColorStop(0.4, '#e2e8f0');
  grad.addColorStop(0.8, '#cbd5e1');
  grad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);
  // Brushed steel grain
  for (let i = 0; i < 800; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.08)';
    ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 40 + 10, 1);
  }
  return new THREE.CanvasTexture(canvas);
}

function createHDFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, 0, 1024, 1024);

  const tileSize = 256;
  for (let x = 0; x < 1024; x += tileSize) {
    for (let y = 0; y < 1024; y += tileSize) {
      const grad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = grad;
      ctx.fillRect(x + 4, y + 4, tileSize - 8, tileSize - 8);

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.strokeRect(x + 12, y + 12, tileSize - 24, tileSize - 24);

      ctx.fillStyle = '#475569';
      ctx.fillRect(x + 16, y + 16, 12, 12);
      ctx.fillRect(x + tileSize - 28, y + 16, 12, 12);
      ctx.fillRect(x + 16, y + tileSize - 28, 12, 12);
      ctx.fillRect(x + tileSize - 28, y + tileSize - 28, 12, 12);

      ctx.beginPath();
      ctx.arc(x + tileSize / 2, y + tileSize / 2, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#64748b';
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(512, 0); ctx.lineTo(512, 1024);
  ctx.moveTo(0, 512); ctx.lineTo(1024, 512);
  ctx.stroke();

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 16;
  ctx.strokeRect(0, 0, 1024, 1024);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createHDWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, 0, 1024, 512);

  const pw = 256; const ph = 256;
  for (let x = 0; x < 1024; x += pw) {
    for (let y = 0; y < 512; y += ph) {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 6, y + 6, pw - 12, ph - 12);

      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 6;
      ctx.strokeRect(x + 16, y + 16, pw - 32, ph - 32);

      ctx.fillStyle = '#334155';
      const rDots = [[x + 24, y + 24], [x + pw - 24, y + 24], [x + 24, y + ph - 24], [x + pw - 24, y + ph - 24]];
      rDots.forEach(([rx, ry]) => {
        ctx.beginPath();
        ctx.arc(rx, ry, 6, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 12;
  for (let x = 0; x <= 1024; x += pw) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(0, 256); ctx.lineTo(1024, 256); ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createContainerTexture(colorHex = '#ef4444') {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = colorHex;
  ctx.fillRect(0, 0, 512, 256);

  for (let x = 12; x < 500; x += 24) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(x, 8, 10, 240);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(x + 10, 8, 10, 240);
  }

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, 496, 240);

  ctx.fillStyle = '#facc15';
  ctx.fillRect(360, 24, 120, 36);
  ctx.fillStyle = '#000000';
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(365 + i * 20, 24);
    ctx.lineTo(375 + i * 20, 24);
    ctx.lineTo(365 + i * 20, 60);
    ctx.lineTo(355 + i * 20, 60);
    ctx.fill();
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('VK-8089', 30, 50);

  return new THREE.CanvasTexture(canvas);
}

function createCrateTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 242, 242);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(14, 14); ctx.lineTo(242, 242);
  ctx.moveTo(242, 14); ctx.lineTo(14, 242);
  ctx.stroke();
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(128, 128, 28, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

function createBarrelTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f97316';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 40, 256, 20);
  ctx.fillRect(0, 196, 256, 20);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 64px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🔥', 128, 128);
  return new THREE.CanvasTexture(canvas);
}

function createFaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Skin tone matching screenshot
  ctx.fillStyle = '#f6c39d';
  ctx.fillRect(0, 0, 512, 512);

  // Shading / facial structure lines
  ctx.strokeStyle = 'rgba(120, 60, 20, 0.25)';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, 492, 492);

  // 1. Cocked Raised Eyebrow (Left) & Focused Eyebrow (Right) - Iconic Man Face!
  ctx.strokeStyle = '#23150c';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Left eyebrow (raised high with arch)
  ctx.beginPath();
  ctx.moveTo(90, 175);
  ctx.quadraticCurveTo(145, 120, 215, 145);
  ctx.stroke();

  // Right eyebrow (cocked down)
  ctx.beginPath();
  ctx.moveTo(295, 150);
  ctx.quadraticCurveTo(365, 140, 420, 185);
  ctx.stroke();

  // 2. Squinted Sly Eyes & Pupils
  // Left Eye
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(155, 205, 36, 0.1 * Math.PI, 0.9 * Math.PI, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(155, 200, 36, 1.1 * Math.PI, 1.9 * Math.PI, false);
  ctx.stroke();
  // Left pupil
  ctx.fillStyle = '#18110b';
  ctx.beginPath();
  ctx.arc(155, 202, 16, 0, Math.PI * 2);
  ctx.fill();

  // Right Eye
  ctx.beginPath();
  ctx.arc(355, 205, 36, 0.1 * Math.PI, 0.9 * Math.PI, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(355, 200, 36, 1.1 * Math.PI, 1.9 * Math.PI, false);
  ctx.stroke();
  // Right pupil
  ctx.beginPath();
  ctx.arc(355, 202, 16, 0, Math.PI * 2);
  ctx.fill();

  // Eye highlights
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(150, 197, 6, 0, Math.PI * 2);
  ctx.arc(350, 197, 6, 0, Math.PI * 2);
  ctx.fill();

  // 3. Nose hint
  ctx.strokeStyle = '#8d4c20';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(250, 245);
  ctx.lineTo(262, 280);
  ctx.lineTo(245, 285);
  ctx.stroke();

  // 4. Big Cocky Smirk Smile with White Teeth (Iconic Reference Screenshot 1!)
  // Mouth outline & dark cavity
  ctx.fillStyle = '#1e1008';
  ctx.beginPath();
  ctx.moveTo(110, 315);
  ctx.quadraticCurveTo(256, 300, 402, 315);
  ctx.quadraticCurveTo(256, 435, 110, 315);
  ctx.fill();

  // White Teeth Row
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(125, 318);
  ctx.quadraticCurveTo(256, 310, 387, 318);
  ctx.quadraticCurveTo(256, 385, 125, 318);
  ctx.fill();

  // Teeth vertical divider lines
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  for (let x = 165; x <= 345; x += 36) {
    ctx.beginPath();
    ctx.moveTo(x, 315);
    ctx.lineTo(x, 355);
    ctx.stroke();
  }

  // Mouth border stroke & smile dimples
  ctx.strokeStyle = '#23150c';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(110, 315);
  ctx.quadraticCurveTo(256, 300, 402, 315);
  ctx.quadraticCurveTo(256, 435, 110, 315);
  ctx.stroke();

  // Smile cheek dimple lines
  ctx.beginPath();
  ctx.moveTo(95, 305);
  ctx.lineTo(112, 325);
  ctx.moveTo(415, 305);
  ctx.lineTo(400, 325);
  ctx.stroke();

  // Chin crease
  ctx.strokeStyle = 'rgba(120, 60, 20, 0.4)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(256, 445, 22, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// Generate Player Overhead Nameplate Canvas Texture
function createNameplateTexture(name, level = 5, team = 'blue') {
  const canvas = document.createElement('canvas');
  canvas.width = 440; canvas.height = 96;
  const ctx = canvas.getContext('2d');

  const isFriendly = (team === 'blue');

  // Background Badge Card
  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.roundRect(8, 8, 424, 80, 16);
  ctx.fill();

  ctx.strokeStyle = isFriendly ? '#38bdf8' : '#ef4444';
  ctx.lineWidth = 5;
  ctx.roundRect(8, 8, 424, 80, 16);
  ctx.stroke();

  // Level Badge
  ctx.fillStyle = '#f59e0b';
  ctx.roundRect(18, 22, 54, 52, 10);
  ctx.fill();
  ctx.fillStyle = '#1e1b4b';
  ctx.font = '900 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`★${level}`, 45, 48);

  // Player Name
  ctx.fillStyle = isFriendly ? '#38bdf8' : '#ffffff';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(name.length > 14 ? name.substring(0, 14) + '..' : name, 82, 48);

  // Team Pill Badge on Right
  ctx.fillStyle = isFriendly ? '#22c55e' : '#ef4444';
  ctx.roundRect(310, 26, 112, 44, 8);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(isFriendly ? '🛡️ TAKIM' : '🎯 DÜŞMAN', 366, 48);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// Global Textures
const akWoodTex = createAKWoodTexture();
const gunMetalTex = createGunMetalTexture();
const silverSlideTex = createSilverSlideTexture();
const polymerGripTex = createPolymerGripTexture();
const hdFloorTex = createHDFloorTexture();
hdFloorTex.repeat.set(24, 24);
const hdWallTex = createHDWallTexture();
hdWallTex.repeat.set(3, 2);
const redContainerTex = createContainerTexture('#dc2626');
const blueContainerTex = createContainerTexture('#2563eb');
const greenContainerTex = createContainerTexture('#16a34a');
const crateTex = createCrateTexture();
const barrelTex = createBarrelTexture();
const faceTex = createFaceTexture();

// Texture Shader Generator for Weapon Skins (Gold, Rainbow Cosmic, Crimson Vampire, Cyber Honeycomb, Orange SCAR)
function createWeaponSkinMaterial(skinName = 'default', baseColor = 0x22262c) {
  if (!skinName || skinName === 'default') {
    return new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: 0.35,
      metalness: 0.75
    });
  }

  if (skinName.includes('Gold')) {
    return new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.96,
      roughness: 0.12,
      emissive: 0x4a3400,
      emissiveIntensity: 0.22
    });
  }

  if (skinName.includes('Vampire') || skinName.includes('Crimson')) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#090a0f';
    ctx.fillRect(0, 0, 512, 512);
    // Carbon weave pattern
    ctx.fillStyle = 'rgba(30, 35, 45, 0.6)';
    for (let x = 0; x < 512; x += 8) {
      for (let y = 0; y < 512; y += 8) {
        if ((x / 8 + y / 8) % 2 === 0) ctx.fillRect(x, y, 8, 8);
      }
    }
    // Crimson blood splash
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(0, 40); ctx.lineTo(350, 160); ctx.lineTo(512, 400); ctx.lineTo(200, 512); ctx.lineTo(0, 280);
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(380, 220, 42, 0, Math.PI * 2);
    ctx.arc(220, 360, 30, 0, Math.PI * 2);
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({
      map: tex,
      metalness: 0.82,
      roughness: 0.22,
      emissive: 0x3b0707,
      emissiveIntensity: 0.35
    });
  }

  if (skinName.includes('Rainbow') || skinName.includes('Cosmic')) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0.00, '#ff0055');
    grad.addColorStop(0.18, '#ff6600');
    grad.addColorStop(0.36, '#ffea00');
    grad.addColorStop(0.54, '#00ff88');
    grad.addColorStop(0.72, '#00c3ff');
    grad.addColorStop(0.88, '#8800ff');
    grad.addColorStop(1.00, '#ff00aa');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    // Metallic cosmic dust
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 140; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 256, 2, 2);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return new THREE.MeshStandardMaterial({
      map: tex,
      metalness: 0.88,
      roughness: 0.16,
      emissive: 0x221133,
      emissiveIntensity: 0.25
    });
  }

  if (skinName.includes('Neon') || skinName.includes('Cyber')) {
    return new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.85,
      roughness: 0.18,
      emissive: 0x0077aa,
      emissiveIntensity: 0.38
    });
  }

  if (skinName.includes('Dragon') || skinName.includes('Fire')) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, '#1c0704');
    grad.addColorStop(0.3, '#991b1b');
    grad.addColorStop(0.65, '#ea580c');
    grad.addColorStop(0.85, '#f59e0b');
    grad.addColorStop(1, '#fef08a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    // Dragon scales
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 512; x += 16) {
      for (let y = 0; y < 256; y += 16) {
        ctx.beginPath();
        ctx.arc(x + 8, y + 8, 8, 0, Math.PI);
        ctx.stroke();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({
      map: tex,
      metalness: 0.90,
      roughness: 0.15,
      emissive: 0x7c2d12,
      emissiveIntensity: 0.45
    });
  }

  if (skinName.includes('Emerald') || skinName.includes('Fade')) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0, '#064e3b');
    grad.addColorStop(0.35, '#059669');
    grad.addColorStop(0.7, '#10b981');
    grad.addColorStop(0.9, '#06b6d4');
    grad.addColorStop(1, '#0284c7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    const tex = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({
      map: tex,
      metalness: 0.98,
      roughness: 0.06,
      emissive: 0x064e3b,
      emissiveIntensity: 0.25
    });
  }

  if (skinName.includes('Damascus')) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 512, 512);
    // Wavy Damascus steel folds
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    for (let i = 0; i < 70; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 8);
      ctx.bezierCurveTo(150, i * 8 + 25, 350, i * 8 - 25, 512, i * 8 + 10);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({
      map: tex,
      metalness: 0.95,
      roughness: 0.14
    });
  }

  if (skinName.includes('Vulcan') || skinName.includes('Magma')) {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 256, Math.random() * 256);
      ctx.lineTo(Math.random() * 256, Math.random() * 256);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({
      map: tex,
      metalness: 0.85,
      roughness: 0.35,
      emissive: 0xdc2626,
      emissiveIntensity: 0.55
    });
  }

  return new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.35,
    metalness: 0.75
  });
}

// Global Skin Applicator: Traverses any 3D weapon model and replaces weapon materials in real time
function applySkinToMesh(group, skinName = 'default', weaponType = 'AK-47') {
  if (!group) return;
  const isDefault = !skinName || skinName === 'default';

  group.traverse(child => {
    if (!child.isMesh) return;
    if (child.userData && child.userData.isArmOrGlove) return;
    if (child === group.flash || child.name === 'muzzle_flash') return;

    if (child.userData && child.userData.isWeaponPart) {
      if (isDefault) {
        if (child.userData.defaultMaterial) {
          child.material = child.userData.defaultMaterial;
        }
      } else {
        if (!child.userData.defaultMaterial) {
          child.userData.defaultMaterial = child.material;
        }
        child.material = createWeaponSkinMaterial(skinName, child.userData.baseColor || 0x22262c);
      }
    } else {
      if (!child.userData) child.userData = {};
      if (Math.abs(child.position.x) > 0.25) return;
      if (isDefault) {
        if (child.userData.defaultMaterial) child.material = child.userData.defaultMaterial;
      } else {
        if (!child.userData.defaultMaterial) child.userData.defaultMaterial = child.material;
        child.material = createWeaponSkinMaterial(skinName, 0x22262c);
      }
    }
  });
  group.currentSkin = skinName;
}

// 2. AUTHENTIC 3D AK-47 MODEL (MATCHING REFERENCE IMAGE 3 / media_1790772499129.png 1:1)
function createAuthenticAK47Model(isViewmodel = false, skin = 'default') {
  const root = new THREE.Group();
  const isCustomSkin = skin && skin !== 'default';

  const defaultSteelMat = new THREE.MeshStandardMaterial({
    map: gunMetalTex,
    color: 0x22262c,
    roughness: 0.32,
    metalness: 0.88
  });

  const defaultWoodMat = new THREE.MeshStandardMaterial({
    map: akWoodTex,
    roughness: 0.42,
    metalness: 0.05
  });

  const defaultGripMat = new THREE.MeshStandardMaterial({
    color: 0x802518,
    roughness: 0.48,
    metalness: 0.1
  });

  const darkVentMat = new THREE.MeshBasicMaterial({ color: 0x111317 });

  // Select active materials based on skin
  const steelMat = isCustomSkin ? createWeaponSkinMaterial(skin, 0x22262c) : defaultSteelMat;
  const woodMat = isCustomSkin ? createWeaponSkinMaterial(skin, 0x8a3318) : defaultWoodMat;
  const bakeliteMat = isCustomSkin ? createWeaponSkinMaterial(skin, 0x802518) : defaultGripMat;

  // Stamped Steel Main Receiver
  const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.17, 0.72), steelMat);
  receiver.position.set(0, 0, 0);
  receiver.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Curved Receiver Dust Cover (with top ribs)
  const dustCoverGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.54, 16, 1, false, 0, Math.PI);
  const dustCover = new THREE.Mesh(dustCoverGeom, steelMat);
  dustCover.rotation.z = Math.PI / 2;
  dustCover.position.set(0, 0.085, -0.06);
  dustCover.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Right-Side Charging Handle & Ejection Port (Authentic 3D Detail)
  const ejectionPort = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.055, 0.24), darkVentMat);
  ejectionPort.position.set(0.061, 0.05, 0.02);
  ejectionPort.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: darkVentMat };

  const boltHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.09, 8), steelMat);
  boltHandle.rotation.z = Math.PI / 2;
  boltHandle.rotation.y = 0.3;
  boltHandle.position.set(0.095, 0.05, 0.05);
  boltHandle.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Safety Selector Lever (Right side)
  const selectorLever = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.025, 0.22), steelMat);
  selectorLever.position.set(0.062, -0.01, 0.14);
  selectorLever.rotation.x = -0.15;
  selectorLever.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Classic Wood Stock (Reference Image 3)
  const stockGeom = new THREE.BoxGeometry(0.10, 0.22, 0.65);
  const stock = new THREE.Mesh(stockGeom, woodMat);
  stock.position.set(0, -0.05, 0.62);
  stock.rotation.x = 0.06;
  stock.userData = { isWeaponPart: true, partType: 'wood', defaultMaterial: defaultWoodMat, baseColor: 0x8a3318 };

  // Buttplate
  const buttplate = new THREE.Mesh(new THREE.BoxGeometry(0.105, 0.23, 0.03), steelMat);
  buttplate.position.set(0, -0.06, 0.94);
  buttplate.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Bakelite / Wooden Pistol Grip (Matching Screenshot 3)
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.26, 0.12), bakeliteMat);
  grip.position.set(0, -0.19, 0.22);
  grip.rotation.x = -0.32;
  grip.userData = { isWeaponPart: true, partType: 'wood', defaultMaterial: defaultGripMat, baseColor: 0x802518 };

  // Trigger & Guard
  const triggerGuard = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.10, 0.16), steelMat);
  triggerGuard.position.set(0, -0.11, 0.12);
  triggerGuard.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Upper and Lower Wood Handguard (Matching Reference Screenshot 3)
  const handguardLower = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.14, 0.46), woodMat);
  handguardLower.position.set(0, 0.02, -0.45);
  handguardLower.userData = { isWeaponPart: true, partType: 'wood', defaultMaterial: defaultWoodMat, baseColor: 0x8a3318 };

  const gasTubeUpper = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.09, 0.42), woodMat);
  gasTubeUpper.position.set(0, 0.11, -0.44);
  gasTubeUpper.userData = { isWeaponPart: true, partType: 'wood', defaultMaterial: defaultWoodMat, baseColor: 0x8a3318 };

  // Iconic AK-47 Handguard Ventilation Ports (Visible in Screenshot 3 on both sides!)
  const ventL1 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.024, 0.08), darkVentMat);
  ventL1.position.set(-0.066, 0.045, -0.40);
  const ventL2 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.024, 0.08), darkVentMat);
  ventL2.position.set(-0.066, 0.045, -0.52);

  const ventR1 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.024, 0.08), darkVentMat);
  ventR1.position.set(0.066, 0.045, -0.40);
  const ventR2 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.024, 0.08), darkVentMat);
  ventR2.position.set(0.066, 0.045, -0.52);

  // Steel Long Barrel & Gas Block
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.82, 16), steelMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0.04, -0.78);
  barrel.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Cleaning Rod Beneath Barrel
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.64, 8), steelMat);
  rod.rotation.x = Math.PI / 2;
  rod.position.set(0, -0.02, -0.72);
  rod.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Slanted Gas Block (Screenshot 3)
  const gasBlock = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.10, 0.10), steelMat);
  gasBlock.position.set(0, 0.08, -0.70);
  gasBlock.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Authentic AK Triangular Front Sight Hood (Screenshot 3)
  const frontSightHood = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.12, 0.05), steelMat);
  frontSightHood.position.set(0, 0.11, -1.06);
  frontSightHood.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  const frontSightPin = new THREE.Mesh(
    new THREE.BoxGeometry(0.012, 0.065, 0.012),
    new THREE.MeshBasicMaterial({ color: 0x00ff88 })
  );
  frontSightPin.position.set(0, 0.125, -1.06);

  // Rear Tangent Sight Leaf
  const rearSightLeft = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.045, 0.02), steelMat);
  rearSightLeft.position.set(-0.038, 0.165, 0.12);
  rearSightLeft.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };
  const rearSightRight = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.045, 0.02), steelMat);
  rearSightRight.position.set(0.038, 0.165, 0.12);
  rearSightRight.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Curved 30-Round Steel Banana Magazine with Reinforcement Ribs (Screenshot 3)
  const mag = new THREE.Group();
  const magMesh1 = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.26, 0.18), steelMat);
  magMesh1.position.set(0, -0.15, -0.10);
  magMesh1.rotation.x = 0.28;
  magMesh1.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  const magMesh2 = new THREE.Mesh(new THREE.BoxGeometry(0.088, 0.24, 0.16), steelMat);
  magMesh2.position.set(0, -0.32, -0.18);
  magMesh2.rotation.x = 0.52;
  magMesh2.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  // Magazine Floor Plate
  const magFloor = new THREE.Mesh(new THREE.BoxGeometry(0.094, 0.03, 0.17), steelMat);
  magFloor.position.set(0, -0.42, -0.24);
  magFloor.rotation.x = 0.52;
  magFloor.userData = { isWeaponPart: true, partType: 'steel', defaultMaterial: defaultSteelMat, baseColor: 0x22262c };

  mag.add(magMesh1, magMesh2, magFloor);

  root.add(
    receiver, dustCover, ejectionPort, boltHandle, selectorLever,
    stock, buttplate, grip, triggerGuard,
    handguardLower, gasTubeUpper, ventL1, ventL2, ventR1, ventR2,
    barrel, rod, gasBlock,
    frontSightHood, frontSightPin, rearSightLeft, rearSightRight, mag
  );
  root.mag = mag;

  // Viewmodel Arms & Gloves
  if (isViewmodel) {
    const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.6 });
    const gloveMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.72), sleeveMat);
    leftArm.position.set(-0.35, -0.26, -0.3);
    leftArm.rotation.set(0.4, 0.5, -0.2);
    leftArm.userData = { isArmOrGlove: true };

    const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.22), gloveMat);
    leftHand.position.set(-0.06, -0.04, -0.55);
    leftHand.userData = { isArmOrGlove: true };

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.8), sleeveMat);
    rightArm.position.set(0.28, -0.28, 0.25);
    rightArm.rotation.set(0.35, -0.3, 0.1);
    rightArm.userData = { isArmOrGlove: true };

    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.22), gloveMat);
    rightHand.position.set(0.05, -0.12, 0.18);
    rightHand.userData = { isArmOrGlove: true };

    root.add(leftArm, leftHand, rightArm, rightHand);

    // Muzzle Flash
    const flashGeom = new THREE.OctahedronGeometry(0.26, 0);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xffea00, transparent: true, opacity: 0 });
    const flash = new THREE.Mesh(flashGeom, flashMat);
    flash.position.set(0, 0.04, -1.35);
    root.add(flash);
    root.flash = flash;

    root.scale.set(0.72, 0.72, 0.72);
  } else {
    // World Model scale for NPCs and Showcase
    root.scale.set(0.48, 0.48, 0.48);
  }

  return root;
}

// 3. TWO-TONE TACTICAL PISTOL (MATCHING REFERENCE IMAGE 2 1:1)
function createTwoTonePistolModel(isViewmodel = false) {
  const root = new THREE.Group();

  const silverSlideMat = new THREE.MeshStandardMaterial({
    map: silverSlideTex,
    roughness: 0.25,
    metalness: 0.85
  });

  const polymerFrameMat = new THREE.MeshStandardMaterial({
    map: polymerGripTex,
    roughness: 0.6,
    metalness: 0.1
  });

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.35,
    metalness: 0.8
  });

  // 1. Brushed Silver Upper Slide (Reference Image 2)
  const slide = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.12, 0.52), silverSlideMat);
  slide.position.set(0, 0.06, 0);

  // Front & Rear Sights on Slide
  const frontSight = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.04, 0.03), steelMat);
  frontSight.position.set(0, 0.14, -0.22);

  const rearSight = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.045, 0.03), steelMat);
  rearSight.position.set(0, 0.14, 0.22);

  // Barrel Tip
  const barrelTip = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.08, 16), steelMat);
  barrelTip.rotation.x = Math.PI / 2;
  barrelTip.position.set(0, 0.05, -0.28);

  // 2. Matte Black Polymer Lower Receiver & Textured Grip (Reference Image 2)
  const lowerFrame = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.08, 0.48), polymerFrameMat);
  lowerFrame.position.set(0, -0.02, -0.02);

  // Ergonomic Pistol Grip
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.32, 0.14), polymerFrameMat);
  grip.position.set(0, -0.18, 0.10);
  grip.rotation.x = -0.25;

  // Magazine Base Plate
  const magBase = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.04, 0.16), steelMat);
  magBase.position.set(0, -0.34, 0.14);
  magBase.rotation.x = -0.25;

  // Rounded Trigger Guard & Trigger
  const triggerGuard = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.14), steelMat);
  triggerGuard.position.set(0, -0.10, -0.02);

  const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.07, 0.04), steelMat);
  trigger.position.set(0, -0.10, 0.01);
  trigger.rotation.x = 0.3;

  root.add(slide, frontSight, rearSight, barrelTip, lowerFrame, grip, magBase, triggerGuard, trigger);

  if (isViewmodel) {
    const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.6 });
    const gloveMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.75), sleeveMat);
    rightArm.position.set(0.24, -0.25, 0.35);
    rightArm.rotation.set(0.3, -0.2, 0.1);

    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.20), gloveMat);
    rightHand.position.set(0.02, -0.14, 0.12);

    const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.18), gloveMat);
    leftHand.position.set(-0.06, -0.18, 0.10);
    leftHand.rotation.set(0.2, 0.4, -0.1);

    root.add(rightArm, rightHand, leftHand);

    // Muzzle Flash
    const flashGeom = new THREE.OctahedronGeometry(0.18, 0);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xffea00, transparent: true, opacity: 0 });
    const flash = new THREE.Mesh(flashGeom, flashMat);
    flash.position.set(0, 0.05, -0.45);
    root.add(flash);
    root.flash = flash;

    root.scale.set(0.8, 0.8, 0.8);
  } else {
    root.scale.set(0.55, 0.55, 0.55);
  }

  return root;
}

// 4. M9 BAYONET / TACTICAL COMBAT KNIFE (HIGH FIDELITY 3D STEEL)
function createCombatKnifeModel(isViewmodel = false, skin = 'default') {
  const root = new THREE.Group();
  const isCustomSkin = skin && skin !== 'default';

  const defaultBladeMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.98,
    roughness: 0.08
  });

  const steelGuardMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.90,
    roughness: 0.25
  });

  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a, // Tactical dark composite polymer
    roughness: 0.50,
    metalness: 0.15
  });

  const darkFullerMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.35
  });

  const bladeMat = isCustomSkin ? createWeaponSkinMaterial(skin, 0xf8fafc) : defaultBladeMat;

  // 1. Razor-sharp Clip-Point Steel Blade
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.11, 0.55), bladeMat);
  blade.position.set(0, 0.04, -0.36);
  blade.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };

  // Razor Wedge Cutting Edge
  const edge = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.016, 0.54, 4), bladeMat);
  edge.rotation.x = Math.PI / 2;
  edge.position.set(0, -0.018, -0.36);
  edge.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };

  // Swedge / Angled Tanto Tip
  const swedge = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.07, 0.16), bladeMat);
  swedge.position.set(0, 0.08, -0.56);
  swedge.rotation.x = -0.38;
  swedge.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };

  // Fuller / Blood Groove on both sides
  const fuller = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.024, 0.32), darkFullerMat);
  fuller.position.set(0, 0.045, -0.34);
  fuller.userData = { isWeaponPart: true, defaultMaterial: darkFullerMat, baseColor: 0x1e293b };

  // Aggressive Sawback Spine Teeth (7 triangular serrations)
  const sawGroup = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.025, 0.024), bladeMat);
    tooth.position.set(0, 0.105, -0.18 - i * 0.038);
    tooth.rotation.x = 0.5;
    sawGroup.add(tooth);
  }
  sawGroup.userData = { isWeaponPart: true };

  // Steel Crossguard with Muzzle Ring
  const guardBar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.20, 0.035), steelGuardMat);
  guardBar.position.set(0, 0.02, -0.08);
  guardBar.userData = { isWeaponPart: true, defaultMaterial: steelGuardMat, baseColor: 0x334155 };

  const muzzleRing = new THREE.Mesh(new THREE.TorusGeometry(0.032, 0.009, 8, 16), steelGuardMat);
  muzzleRing.position.set(0, 0.13, -0.08);
  muzzleRing.userData = { isWeaponPart: true, defaultMaterial: steelGuardMat, baseColor: 0x334155 };

  // Ergonomic Cylindrical Ribbed Grip Handle
  const handleGroup = new THREE.Group();
  const handleCore = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.038, 0.30, 16), gripMat);
  handleCore.rotation.x = Math.PI / 2;
  handleCore.position.set(0, 0, 0.08);
  handleGroup.add(handleCore);

  // 5 Ribbed Grip Rings
  for (let i = 0; i < 5; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.040, 0.007, 8, 16), gripMat);
    ring.position.set(0, 0, -0.03 + i * 0.055);
    handleGroup.add(ring);
  }
  handleGroup.userData = { isWeaponPart: true, defaultMaterial: gripMat, baseColor: 0x0f172a };

  // Steel Pommel Buttcap
  const pommel = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.075, 0.04), steelGuardMat);
  pommel.position.set(0, 0, 0.25);
  pommel.userData = { isWeaponPart: true, defaultMaterial: steelGuardMat, baseColor: 0x334155 };

  root.add(blade, edge, swedge, fuller, sawGroup, guardBar, muzzleRing, handleGroup, pommel);

  if (isViewmodel) {
    const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.6 });
    const gloveMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.75), sleeveMat);
    rightArm.position.set(0.25, -0.22, 0.3);
    rightArm.rotation.set(0.4, -0.2, 0.1);
    rightArm.userData = { isArmOrGlove: true };

    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.22), gloveMat);
    rightHand.position.set(0.02, -0.05, 0.10);
    rightHand.userData = { isArmOrGlove: true };

    root.add(rightArm, rightHand);
    root.scale.set(0.78, 0.78, 0.78);
  } else {
    root.scale.set(0.52, 0.52, 0.52);
  }

  return root;
}

// 4.1 BUTTERFLY KNIFE / BALISONG (KELEBEK BIÇAK)
function createButterflyKnifeModel(isViewmodel = false, skin = 'default') {
  const root = new THREE.Group();
  const isCustomSkin = skin && skin !== 'default';

  const defaultBladeMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.98,
    roughness: 0.08
  });

  const handleSteelMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.92,
    roughness: 0.20
  });

  const pinGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.95,
    roughness: 0.15
  });

  const bladeMat = isCustomSkin ? createWeaponSkinMaterial(skin, 0xf8fafc) : defaultBladeMat;

  // Curved Balisong Bowie Blade
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.085, 0.52), bladeMat);
  blade.position.set(0, 0.03, -0.32);
  blade.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };

  const edge = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.014, 0.50, 4), bladeMat);
  edge.rotation.x = Math.PI / 2;
  edge.position.set(0, -0.015, -0.32);
  edge.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };

  // Swedge top curve
  const swedge = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.045, 0.18), bladeMat);
  swedge.position.set(0, 0.065, -0.48);
  swedge.rotation.x = -0.30;
  swedge.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };

  // Tang Kicker & Zen Pins
  const tang = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.09, 0.06), handleSteelMat);
  tang.position.set(0, 0.02, -0.06);
  tang.userData = { isWeaponPart: true };

  // Safe Handle (Left) - Skeletonized with 4 weight-reduction holes
  const handleL = new THREE.Group();
  const handleLMesh = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.044, 0.44), handleSteelMat);
  handleLMesh.position.set(-0.025, 0.01, 0.16);
  handleL.add(handleLMesh);

  // 4 circular hole details
  for (let i = 0; i < 4; i++) {
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.026, 12), pinGoldMat);
    hole.rotation.z = Math.PI / 2;
    hole.position.set(-0.025, 0.01, 0.02 + i * 0.095);
    handleL.add(hole);
  }
  handleL.userData = { isWeaponPart: true };

  // Bite Handle (Right) - Skeletonized with 4 weight-reduction holes
  const handleR = new THREE.Group();
  const handleRMesh = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.044, 0.44), handleSteelMat);
  handleRMesh.position.set(0.025, 0.01, 0.16);
  handleR.add(handleRMesh);

  for (let i = 0; i < 4; i++) {
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.026, 12), pinGoldMat);
    hole.rotation.z = Math.PI / 2;
    hole.position.set(0.025, 0.01, 0.02 + i * 0.095);
    handleR.add(hole);
  }
  handleR.userData = { isWeaponPart: true };

  // Pivot Pins (Connecting blade to handles)
  const pinL = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.035, 12), pinGoldMat);
  pinL.rotation.z = Math.PI / 2;
  pinL.position.set(-0.025, 0.02, -0.05);

  const pinR = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.035, 12), pinGoldMat);
  pinR.rotation.z = Math.PI / 2;
  pinR.position.set(0.025, 0.02, -0.05);

  // Bottom T-Latch Clasp
  const latch = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.022, 0.06), pinGoldMat);
  latch.position.set(0, 0.01, 0.39);

  root.add(blade, edge, swedge, tang, handleL, handleR, pinL, pinR, latch);

  if (isViewmodel) {
    const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.6 });
    const gloveMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.75), sleeveMat);
    rightArm.position.set(0.24, -0.22, 0.3);
    rightArm.rotation.set(0.4, -0.2, 0.1);
    rightArm.userData = { isArmOrGlove: true };

    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.22), gloveMat);
    rightHand.position.set(0.02, -0.04, 0.16);
    rightHand.userData = { isArmOrGlove: true };

    root.add(rightArm, rightHand);
    root.scale.set(0.82, 0.82, 0.82);
  } else {
    root.scale.set(0.55, 0.55, 0.55);
  }

  return root;
}

// 4.2 HANDCRAFTED CUSTOM HUNTING KNIFE (AVCI BIÇAĞI - MATCHING PHOTO 4 1:1)
function createHuntsmanKnifeModel(isViewmodel = false, skin = 'default') {
  const root = new THREE.Group();
  const isCustomSkin = skin && skin !== 'default';

  const burlWoodTex = createBurlWoodTexture();
  const oceanResinTex = createOceanResinTexture();
  const satinBladeTex = createSatinBladeTexture();

  const defaultBladeMat = new THREE.MeshStandardMaterial({
    map: satinBladeTex,
    color: 0xf8fafc,
    metalness: 0.96,
    roughness: 0.12
  });

  const razorEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.99,
    roughness: 0.05
  });

  const bolsterWoodMat = new THREE.MeshStandardMaterial({
    map: burlWoodTex,
    roughness: 0.55,
    metalness: 0.05
  });

  const oceanResinMat = new THREE.MeshStandardMaterial({
    map: oceanResinTex,
    roughness: 0.20,
    metalness: 0.28
  });

  const steelTangMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.92,
    roughness: 0.22
  });

  const pinMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.95,
    roughness: 0.15
  });

  const paracordMat = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    roughness: 0.85,
    metalness: 0.05
  });

  const beadMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.96,
    roughness: 0.15
  });

  const bladeMat = isCustomSkin ? createWeaponSkinMaterial(skin, 0xf8fafc) : defaultBladeMat;

  // 1. Broad Hunting Blade Body with Satin Finish (Photo 4)
  const bladeGroup = new THREE.Group();
  const mainBlade = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.14, 0.44), bladeMat);
  mainBlade.position.set(0, 0.045, -0.24);
  mainBlade.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };
  bladeGroup.add(mainBlade);

  // Upward Sweeping Belly Curve to Drop-Point Tip (Photo 4)
  const bellyCurve = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.11, 0.16), bladeMat);
  bellyCurve.position.set(0, 0.065, -0.48);
  bellyCurve.rotation.x = -0.42;
  bellyCurve.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };
  bladeGroup.add(bellyCurve);

  const dropTip = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.12, 4), bladeMat);
  dropTip.rotation.set(-Math.PI / 2 + 0.35, 0, 0);
  dropTip.scale.set(0.14, 1.0, 0.9);
  dropTip.position.set(0, 0.05, -0.56);
  dropTip.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };
  bladeGroup.add(dropTip);

  // Polished Razor-Sharp Cutting Edge Along Lower Belly
  const razorEdge = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.014, 0.46, 4), razorEdgeMat);
  razorEdge.rotation.x = Math.PI / 2;
  razorEdge.position.set(0, -0.026, -0.26);
  razorEdge.userData = { isWeaponPart: true, defaultMaterial: razorEdgeMat, baseColor: 0xffffff };
  bladeGroup.add(razorEdge);

  // 5 Rounded Semicircular Thumb Jimping Notches on Spine (Photo 4)
  for (let i = 0; i < 5; i++) {
    const notchTooth = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.018, 0.022), bladeMat);
    notchTooth.position.set(0, 0.122, -0.16 - i * 0.046);
    bladeGroup.add(notchTooth);
  }

  // Machined Slot / Fuller Cutout Through the Blade (Photo 4)
  const slotOuter = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.024, 0.14), steelTangMat);
  slotOuter.position.set(0, 0.048, -0.22);
  const slotInner = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.018, 0.13), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
  slotInner.position.set(0, 0.048, -0.22);
  bladeGroup.add(slotOuter, slotInner);

  // Integral Downward Finger Guard / Bolster (Photo 4)
  const guard = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.09, 0.045), steelTangMat);
  guard.position.set(0, -0.04, -0.035);
  guard.rotation.x = 0.25;
  bladeGroup.add(guard);

  // 2. Hybrid Burl Wood & Ocean Blue Resin Handle (Photo 4)
  const handleGroup = new THREE.Group();

  // Full steel tang core
  const tangCore = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.11, 0.36), steelTangMat);
  tangCore.position.set(0, 0.01, 0.14);
  handleGroup.add(tangCore);

  // Forward Bolster Segment (Natural Burl Wood - Photo 4)
  const woodL = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.115, 0.10), bolsterWoodMat);
  woodL.position.set(-0.022, 0.01, 0.01);
  const woodR = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.115, 0.10), bolsterWoodMat);
  woodR.position.set(0.022, 0.01, 0.01);
  handleGroup.add(woodL, woodR);

  // Main Handle Body (Swirling Ocean Blue Pearlescent Resin - Photo 4)
  const resinL = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.12, 0.24), oceanResinMat);
  resinL.position.set(-0.023, 0.01, 0.18);
  const resinR = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.12, 0.24), oceanResinMat);
  resinR.position.set(0.023, 0.01, 0.18);
  handleGroup.add(resinL, resinR);

  // 3 Silver Mosaic Rivet Pins (Photo 4)
  const pinPositions = [0.03, 0.15, 0.25];
  pinPositions.forEach(zPos => {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.076, 12), pinMat);
    pin.rotation.z = Math.PI / 2;
    pin.position.set(0, 0.01, zPos);
    handleGroup.add(pin);
  });

  // 3. Extended Pommel Tang with Lanyard Hole (Photo 4)
  const pommelTang = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.09, 0.06), steelTangMat);
  pommelTang.position.set(0, 0.005, 0.33);
  const lanyardHole = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.026, 12), new THREE.MeshBasicMaterial({ color: 0x020617 }));
  lanyardHole.rotation.z = Math.PI / 2;
  lanyardHole.position.set(0, 0.005, 0.335);
  handleGroup.add(pommelTang, lanyardHole);

  // 4. Vibrant Royal Blue Braided Paracord Lanyard & Silver Beads (Photo 4)
  const lanyardGroup = new THREE.Group();

  // Loop through hole
  const loopTorus = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.006, 8, 16), paracordMat);
  loopTorus.position.set(0, -0.01, 0.36);
  loopTorus.rotation.y = Math.PI / 2;

  // Braided snake-knot cylinder
  const knotBody = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.11, 8), paracordMat);
  knotBody.rotation.x = 0.55;
  knotBody.position.set(0, -0.06, 0.41);

  // Knot texture wraps
  for (let k = 0; k < 4; k++) {
    const wrap = new THREE.Mesh(new THREE.TorusGeometry(0.018, 0.004, 6, 12), paracordMat);
    wrap.position.set(0, -0.035 - k * 0.02, 0.395 + k * 0.015);
    wrap.rotation.x = 0.55;
    lanyardGroup.add(wrap);
  }

  // Two dangling cord tails
  const tailL = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.14, 8), paracordMat);
  tailL.position.set(-0.018, -0.16, 0.44);
  tailL.rotation.z = 0.22;
  tailL.rotation.x = 0.35;

  const tailR = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.14, 8), paracordMat);
  tailR.position.set(0.018, -0.16, 0.45);
  tailR.rotation.z = -0.22;
  tailR.rotation.x = 0.35;

  // Two Carved Silver Beads at Cord Ends (Photo 4)
  const beadL = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.034, 12), beadMat);
  beadL.position.set(-0.030, -0.22, 0.47);
  beadL.rotation.z = 0.22;

  const beadR = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.034, 12), beadMat);
  beadR.position.set(0.030, -0.22, 0.48);
  beadR.rotation.z = -0.22;

  lanyardGroup.add(loopTorus, knotBody, tailL, tailR, beadL, beadR);

  // Combine All Components into Unified Knife Group
  root.add(bladeGroup, handleGroup, lanyardGroup);

  // Center Knife Center-of-Mass for Pristine Showcase & First-Person Handling
  root.position.set(0, 0, 0.08);

  if (isViewmodel) {
    const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.6 });
    const gloveMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.75), sleeveMat);
    rightArm.position.set(0.25, -0.22, 0.3);
    rightArm.rotation.set(0.4, -0.2, 0.1);
    rightArm.userData = { isArmOrGlove: true };

    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.22), gloveMat);
    rightHand.position.set(0.02, -0.04, 0.12);
    rightHand.userData = { isArmOrGlove: true };

    root.add(rightArm, rightHand);
    root.scale.set(0.78, 0.78, 0.78);
  } else {
    root.scale.set(0.62, 0.62, 0.62);
  }

  return root;
}

// 5. M67 FRAG GRENADE MODEL (SLOT 4 EXPLOSIVE)
function createFragGrenadeModel(isViewmodel = false) {
  const root = new THREE.Group();

  const oliveMat = new THREE.MeshStandardMaterial({
    color: 0x365314, // Military olive drab
    roughness: 0.55,
    metalness: 0.2
  });

  const fuseMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8, // Steel zinc fuse
    metalness: 0.8,
    roughness: 0.3
  });

  const pinMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15, // Brass safety pin ring
    metalness: 0.9,
    roughness: 0.2
  });

  // Spherical/Ovoid Grenade Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), oliveMat);
  body.scale.set(1.0, 1.25, 1.0);

  // Fuse Neck & Thread
  const fuseNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.12, 12), fuseMat);
  fuseNeck.position.y = 0.20;

  // Curved Safety Lever / Spoon
  const spoon = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, 0.02), fuseMat);
  spoon.position.set(0, 0.12, 0.12);
  spoon.rotation.x = -0.25;

  // Pull Ring Pin
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.012, 8, 16), pinMat);
  ring.position.set(0.08, 0.22, 0.02);
  ring.rotation.y = Math.PI / 2;

  root.add(body, fuseNeck, spoon, ring);

  if (isViewmodel) {
    const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.6 });
    const gloveMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.72), sleeveMat);
    rightArm.position.set(0.22, -0.22, 0.3);
    rightArm.rotation.set(0.35, -0.2, 0.1);

    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.22), gloveMat);
    rightHand.position.set(0.01, -0.06, 0.04);

    root.add(rightArm, rightHand);
    root.scale.set(0.85, 0.85, 0.85);
  } else {
    root.scale.set(0.55, 0.55, 0.55);
  }

  return root;
}

// 6. PAINTBALL GUN MODEL (PRIMARY OPTION)
function createPaintballGunModel(isViewmodel = false) {
  const root = new THREE.Group();

  const markerMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.3, metalness: 0.6 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4, metalness: 0.5 });
  const hopperMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.2 });

  const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.50), markerMat);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.65, 16), blackMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0.02, -0.55);

  const hopperFeed = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 12), blackMat);
  hopperFeed.position.set(0, 0.14, -0.08);

  const hopper = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), hopperMat);
  hopper.scale.set(0.9, 0.8, 1.4);
  hopper.position.set(0, 0.26, -0.08);

  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.24, 0.12), blackMat);
  grip.position.set(0, -0.16, 0.12);
  grip.rotation.x = -0.25;

  const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.45, 16), blackMat);
  tank.rotation.x = Math.PI / 2;
  tank.position.set(0, -0.22, 0.45);

  root.add(receiver, barrel, hopperFeed, hopper, grip, tank);

  if (isViewmodel) {
    const flashGeom = new THREE.OctahedronGeometry(0.22, 0);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0 });
    const flash = new THREE.Mesh(flashGeom, flashMat);
    flash.position.set(0, 0.02, -0.9);
    root.add(flash);
    root.flash = flash;
    root.scale.set(0.72, 0.72, 0.72);
  } else {
    root.scale.set(0.5, 0.5, 0.5);
  }
  return root;
}

// 7. ROTARY MINIGUN MODEL (PRIMARY OPTION)
function createMinigunModel(isViewmodel = false) {
  const root = new THREE.Group();

  const cyanMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.3, metalness: 0.7 });
  const pinkMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.3, metalness: 0.7 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.3, metalness: 0.85 });

  const motorBody = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.55, 16), cyanMat);
  motorBody.rotation.x = Math.PI / 2;

  // 6 Rotating Barrels
  const barrelGroup = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const bMat = i % 2 === 0 ? pinkMat : steelMat;
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.95, 12), bMat);
    b.rotation.x = Math.PI / 2;
    b.position.set(Math.cos(angle) * 0.10, Math.sin(angle) * 0.10, -0.72);
    barrelGroup.add(b);
  }

  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 8, 16), cyanMat);
  ring1.position.z = -0.55;
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 8, 16), cyanMat);
  ring2.position.z = -1.05;
  barrelGroup.add(ring1, ring2);

  const topHandle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.35), steelMat);
  topHandle.position.set(0, 0.20, 0.05);

  root.add(motorBody, barrelGroup, topHandle);
  root.barrelGroup = barrelGroup;

  if (isViewmodel) {
    const flashGeom = new THREE.OctahedronGeometry(0.35, 0);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xffea00, transparent: true, opacity: 0 });
    const flash = new THREE.Mesh(flashGeom, flashMat);
    flash.position.set(0, 0, -1.35);
    root.add(flash);
    root.flash = flash;
    root.scale.set(0.68, 0.68, 0.68);
  } else {
    root.scale.set(0.45, 0.45, 0.45);
  }
  return root;
}

// 8. HIGH-CALIBER SNIPER RIFLE MODEL (PRIMARY OPTION)
function createSniperModel(isViewmodel = false) {
  const root = new THREE.Group();

  const purpleMat = new THREE.MeshStandardMaterial({ color: 0x7e22ce, roughness: 0.35, metalness: 0.4 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.25, metalness: 0.9 });

  const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.18, 0.92), purpleMat);
  const stock = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.24, 0.65), purpleMat);
  stock.position.set(0, -0.04, 0.72);

  const longBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 1.35, 16), darkSteel);
  longBarrel.rotation.x = Math.PI / 2;
  longBarrel.position.set(0, 0.04, -1.05);

  const muzzleBrake = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.18), darkSteel);
  muzzleBrake.position.set(0, 0.04, -1.75);

  // High-Power Optical Scope
  const scopeMount = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.35), darkSteel);
  scopeMount.position.set(0, 0.14, -0.08);

  const scopeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.55, 16), darkSteel);
  scopeBody.rotation.x = Math.PI / 2;
  scopeBody.position.set(0, 0.20, -0.08);

  const scopeLensFront = new THREE.Mesh(new THREE.CircleGeometry(0.048, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
  scopeLensFront.position.set(0, 0.20, -0.36);

  root.add(chassis, stock, longBarrel, muzzleBrake, scopeMount, scopeBody, scopeLensFront);

  if (isViewmodel) {
    const flashGeom = new THREE.OctahedronGeometry(0.38, 0);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0 });
    const flash = new THREE.Mesh(flashGeom, flashMat);
    flash.position.set(0, 0.04, -1.85);
    root.add(flash);
    root.flash = flash;
    root.scale.set(0.68, 0.68, 0.68);
  } else {
    root.scale.set(0.45, 0.45, 0.45);
  }
  return root;
}

// 9. RPG-7 ROCKET LAUNCHER MODEL (PRIMARY OPTION)
function createRocketLauncherModel(isViewmodel = false) {
  const root = new THREE.Group();

  const woodHeatMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.5 });
  const tubeMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.35, metalness: 0.8 });
  const warheadMat = new THREE.MeshStandardMaterial({ color: 0x4d7c0f, roughness: 0.4, metalness: 0.3 });

  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.065, 1.45, 16), tubeMat);
  tube.rotation.x = Math.PI / 2;

  const heatShield = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.65, 16), woodHeatMat);
  heatShield.rotation.x = Math.PI / 2;
  heatShield.position.set(0, 0, 0.1);

  // Large Warhead Rocket (Rocket tip)
  const warheadCone = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.45, 16), warheadMat);
  warheadCone.rotation.x = -Math.PI / 2;
  warheadCone.position.set(0, 0, -0.92);

  const warheadBase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.06, 0.22, 16), warheadMat);
  warheadBase.rotation.x = Math.PI / 2;
  warheadBase.position.set(0, 0, -0.72);

  root.add(tube, heatShield, warheadCone, warheadBase);

  if (isViewmodel) {
    const flashGeom = new THREE.OctahedronGeometry(0.45, 0);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xff5500, transparent: true, opacity: 0 });
    const flash = new THREE.Mesh(flashGeom, flashMat);
    flash.position.set(0, 0, -1.2);
    root.add(flash);
    root.flash = flash;
    root.scale.set(0.68, 0.68, 0.68);
  } else {
    root.scale.set(0.45, 0.45, 0.45);
  }
  return root;
}

// 4. BLOCKY CHARACTER MODEL WITH WEAPONS & NICKNAME BILLBOARD
function createBlockyCharacter(options = {}) {
  const root = new THREE.Group();

  const shirtHex = options.shirtColor || 0x6c4bf6;
  const pantsHex = options.pantsColor || 0x1f2438;
  const skinHex = options.skinColor || 0xf5c6a5;
  const hairHex = options.hairColor || 0x4a2c11;

  const skinMat = new THREE.MeshStandardMaterial({ color: skinHex, roughness: 0.5 });
  const faceMat = new THREE.MeshStandardMaterial({ map: faceTex, roughness: 0.5 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: shirtHex, roughness: 0.4 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: pantsHex, roughness: 0.6 });
  const hairMat = new THREE.MeshStandardMaterial({ color: hairHex, roughness: 0.7 });

  // Head with Iconic Man Face
  const headMats = [skinMat, skinMat, skinMat, skinMat, faceMat, skinMat];
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 0.85), headMats);
  head.position.y = 2.0; head.castShadow = true;

  // Brown Middle-Parted Hair (Matching Reference Screenshot 1)
  const hairGroup = new THREE.Group();
  const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.28, 0.92), hairMat);
  hairTop.position.y = 0.38;

  // Left & Right Parted Bangs drooping down sides of forehead
  const hairLeftBang = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.22), hairMat);
  hairLeftBang.position.set(-0.30, 0.20, 0.40);
  hairLeftBang.rotation.z = -0.15;

  const hairRightBang = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.22), hairMat);
  hairRightBang.position.set(0.30, 0.20, 0.40);
  hairRightBang.rotation.z = 0.15;

  const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.55, 0.25), hairMat);
  hairBack.position.set(0, 0.15, -0.38);

  hairGroup.add(hairTop, hairLeftBang, hairRightBang, hairBack);
  head.add(hairGroup);

  // Torso
  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.15, 0.55), shirtMat);
  torso.position.y = 1.1; torso.castShadow = true;

  // Arms
  const armGeom = new THREE.BoxGeometry(0.42, 1.1, 0.42);
  const leftArm = new THREE.Group();
  leftArm.position.set(-0.78, 1.55, 0);
  const leftArmMesh = new THREE.Mesh(armGeom, shirtMat);
  leftArmMesh.position.y = -0.45; leftArmMesh.castShadow = true;
  leftArm.add(leftArmMesh);

  const rightArm = new THREE.Group();
  rightArm.position.set(0.78, 1.55, 0);
  const rightArmMesh = new THREE.Mesh(armGeom, shirtMat);
  rightArmMesh.position.y = -0.45; rightArmMesh.castShadow = true;
  rightArm.add(rightArmMesh);

  // Legs
  const legGeom = new THREE.BoxGeometry(0.46, 0.95, 0.48);
  const leftLeg = new THREE.Group();
  leftLeg.position.set(-0.28, 0.95, 0);
  const leftLegMesh = new THREE.Mesh(legGeom, pantsMat);
  leftLegMesh.position.y = -0.475; leftLegMesh.castShadow = true;
  leftLeg.add(leftLegMesh);

  const rightLeg = new THREE.Group();
  rightLeg.position.set(0.28, 0.95, 0);
  const rightLegMesh = new THREE.Mesh(legGeom, pantsMat);
  rightLegMesh.position.y = -0.475; rightLegMesh.castShadow = true;
  rightLeg.add(rightLegMesh);

  root.add(head, torso, leftArm, rightArm, leftLeg, rightLeg);

  // Attach 3D Handheld Weapon directly to Right Arm for natural tactical holding
  let heldWeapon = null;
  if (options.isEnemy || options.isBot || options.weaponType) {
    heldWeapon = options.weaponType === 'pistol' ? createTwoTonePistolModel(false) : createAuthenticAK47Model(false);
    heldWeapon.position.set(0, -0.45, -0.38);
    heldWeapon.rotation.set(0.1, -0.05, 0);
    rightArm.add(heldWeapon);

    // Natural 2-Hand Tactical Aiming Pose
    rightArm.rotation.set(-1.25, -0.2, 0);
    leftArm.rotation.set(-1.15, 0.5, -0.25);
  }

  // Overhead Floating Nickname & Health Plate
  let hpFill = null;
  let nameplateSprite = null;
  if (options.name) {
    const hpGroup = new THREE.Group();
    hpGroup.position.set(0, 2.9, 0);

    // Nickname Canvas Plane
    const nameTex = createNameplateTexture(options.name, options.level || 5, options.teamColor || 'blue');
    const nameMat = new THREE.MeshBasicMaterial({ map: nameTex, transparent: true, side: THREE.DoubleSide });
    nameplateSprite = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.45), nameMat);
    nameplateSprite.position.y = 0.38;
    hpGroup.add(nameplateSprite);

    // Health Bar Frame
    const bgBar = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.12, 0.04),
      new THREE.MeshBasicMaterial({ color: 0x0f172a })
    );
    hpGroup.add(bgBar);

    const fillGeom = new THREE.BoxGeometry(1.36, 0.08, 0.05);
    fillGeom.translate(0.68, 0, 0);
    hpFill = new THREE.Mesh(
      fillGeom,
      new THREE.MeshBasicMaterial({ color: options.teamColor === 'blue' ? 0x00f0ff : 0xef4444 })
    );
    hpFill.position.x = -0.68;
    hpGroup.add(hpFill);

    root.add(hpGroup);
    root.hpGroup = hpGroup;
  }

  return {
    group: root,
    head: head,
    leftArm: leftArm,
    rightArm: rightArm,
    leftLeg: leftLeg,
    rightLeg: rightLeg,
    heldWeapon: heldWeapon,
    hpFill: hpFill,
    nameplateSprite: nameplateSprite
  };
}

// 5. 3D VECK.IO ZEPPELIN / BLIMP WITH ROTATING PROPELLERS
function createZeppelin() {
  const blimp = new THREE.Group();

  const hullGeom = new THREE.SphereGeometry(14, 32, 24);
  hullGeom.scale(2.5, 1, 1);
  const hull = new THREE.Mesh(hullGeom, new THREE.MeshStandardMaterial({
    color: 0x6a0dad,
    roughness: 0.3,
    metalness: 0.1
  }));
  blimp.add(hull);

  const finMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.4 });
  const fin1 = new THREE.Mesh(new THREE.BoxGeometry(8, 6, 0.5), finMat);
  fin1.position.set(-30, 0, 0);
  const fin2 = new THREE.Mesh(new THREE.BoxGeometry(8, 0.5, 6), finMat);
  fin2.position.set(-30, 0, 0);
  blimp.add(fin1, fin2);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(14, 4, 4), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
  cabin.position.set(0, -13, 0);
  blimp.add(cabin);

  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512; signCanvas.height = 256;
  const sctx = signCanvas.getContext('2d');
  sctx.fillStyle = '#0f0c24';
  sctx.roundRect(10, 10, 492, 236, 30);
  sctx.fill();
  sctx.strokeStyle = '#ffd700';
  sctx.lineWidth = 16;
  sctx.strokeRect(15, 15, 482, 226);
  sctx.fillStyle = '#ffffff';
  sctx.font = 'italic 900 86px sans-serif';
  sctx.textAlign = 'center';
  sctx.textBaseline = 'middle';
  sctx.fillText('VECK.IO', 256, 128);

  const signTex = new THREE.CanvasTexture(signCanvas);
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 10),
    new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide })
  );
  signMesh.position.set(0, 0, 14.2);
  blimp.add(signMesh);

  const propMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
  const prop1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4, 0.6), propMat);
  prop1.position.set(-6, -13, 3);
  const prop2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4, 0.6), propMat);
  prop2.position.set(-6, -13, -3);
  blimp.add(prop1, prop2);
  blimp.props = [prop1, prop2];

  blimp.position.set(-70, 110, -130);
  blimp.rotation.y = 0.35;
  return blimp;
}

// 6. 3D DRIFTING PUFFY CLOUDS
function createPuffyClouds() {
  const clouds = new THREE.Group();
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.95,
    flatShading: true
  });

  for (let i = 0; i < 18; i++) {
    const cloud = new THREE.Group();
    const numPuffs = 5 + Math.floor(Math.random() * 4);
    for (let j = 0; j < numPuffs; j++) {
      const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(9 + Math.random() * 7, 1), cloudMat);
      puff.position.set((j - numPuffs / 2) * 9, Math.random() * 5, (Math.random() - 0.5) * 8);
      cloud.add(puff);
    }
    const angle = (i / 18) * Math.PI * 2;
    const r = 180 + Math.random() * 50;
    cloud.position.set(Math.cos(angle) * r, 85 + Math.random() * 45, Math.sin(angle) * r);
    clouds.add(cloud);
  }
  return clouds;
}

// 7. COMPLETE ARENA MAP WITH PHYSICAL COLLIDERS
function createVeckArenaMap() {
  const arena = new THREE.Group();
  const colliders = [];

  const floorGeom = new THREE.PlaneGeometry(320, 320, 64, 64);
  const floorMat = new THREE.MeshStandardMaterial({
    map: hdFloorTex,
    roughness: 0.35,
    metalness: 0.1
  });
  const floor = new THREE.Mesh(floorGeom, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  arena.add(floor);

  const wallMat = new THREE.MeshStandardMaterial({
    map: hdWallTex,
    roughness: 0.45,
    metalness: 0.05
  });

  const addWall = (w, h, d, x, y, z) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    arena.add(mesh);

    colliders.push({
      minX: x - w / 2, maxX: x + w / 2,
      minZ: z - d / 2, maxZ: z + d / 2,
      minY: y - h / 2, maxY: y + h / 2
    });
    return mesh;
  };

  addWall(320, 26, 6, 0, 13, -160);
  addWall(320, 26, 6, 0, 13, 160);
  addWall(6, 26, 320, -160, 13, 0);
  addWall(6, 26, 320, 160, 13, 0);

  const neonTopMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const addNeonTrim = (w, d, x, y, z) => {
    const trim = new THREE.Mesh(new THREE.BoxGeometry(w, 0.8, d), neonTopMat);
    trim.position.set(x, y, z);
    arena.add(trim);
  };
  addNeonTrim(320, 6.2, 0, 26.4, -160);
  addNeonTrim(320, 6.2, 0, 26.4, 160);
  addNeonTrim(6.2, 320, -160, 26.4, 0);
  addNeonTrim(6.2, 320, 160, 26.4, 0);

  addWall(80, 18, 7, -50, 9, -40);
  addWall(80, 18, 7, 50, 9, 40);
  addWall(7, 18, 80, -40, 9, 50);
  addWall(7, 18, 80, 40, 9, -50);

  const platformMat = new THREE.MeshStandardMaterial({ map: hdFloorTex, roughness: 0.4 });
  const addCatwalk = (w, d, x, y, z) => {
    const plat = new THREE.Mesh(new THREE.BoxGeometry(w, 2, d), platformMat);
    plat.position.set(x, y, z);
    plat.castShadow = true;
    plat.receiveShadow = true;
    arena.add(plat);

    const pilMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, y, 1.8), pilMat);
    p1.position.set(x - w / 2 + 2, y / 2, z - d / 2 + 2);
    const p2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, y, 1.8), pilMat);
    p2.position.set(x + w / 2 - 2, y / 2, z + d / 2 - 2);
    p1.castShadow = true; p2.castShadow = true;
    arena.add(p1, p2);

    colliders.push({
      minX: (x - w / 2 + 2) - 1.2, maxX: (x - w / 2 + 2) + 1.2,
      minZ: (z - d / 2 + 2) - 1.2, maxZ: (z - d / 2 + 2) + 1.2,
      minY: 0, maxY: y
    });
    colliders.push({
      minX: (x + w / 2 - 2) - 1.2, maxX: (x + w / 2 - 2) + 1.2,
      minZ: (z + d / 2 - 2) - 1.2, maxZ: (z + d / 2 - 2) + 1.2,
      minY: 0, maxY: y
    });
  };

  addCatwalk(28, 28, 0, 10, 0);
  addCatwalk(32, 16, -75, 8, -75);
  addCatwalk(32, 16, 75, 8, 75);
  addCatwalk(16, 32, -75, 8, 75);
  addCatwalk(16, 32, 75, 8, -75);

  const addContainer = (tex, x, y, z, rotY = 0) => {
    const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4, metalness: 0.2 });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(24, 9, 10), mat);
    mesh.position.set(x, y + 4.5, z);
    mesh.rotation.y = rotY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    arena.add(mesh);

    const cos = Math.abs(Math.cos(rotY));
    const sin = Math.abs(Math.sin(rotY));
    const hw = (24 * cos + 10 * sin) / 2;
    const hd = (24 * sin + 10 * cos) / 2;

    colliders.push({
      minX: x - hw, maxX: x + hw,
      minZ: z - hd, maxZ: z + hd,
      minY: y, maxY: y + 9
    });
  };

  addContainer(redContainerTex, -25, 0, -20, 0.4);
  addContainer(blueContainerTex, 25, 0, 20, -0.3);
  addContainer(greenContainerTex, -70, 0, 15, 1.57);
  addContainer(redContainerTex, 70, 0, -15, 1.57);
  addContainer(blueContainerTex, -25, 9, -20, 0.4);

  const addCrate = (x, y, z, size = 4) => {
    const cMat = new THREE.MeshStandardMaterial({ map: crateTex, roughness: 0.5 });
    const crate = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), cMat);
    crate.position.set(x, y + size / 2, z);
    crate.castShadow = true;
    crate.receiveShadow = true;
    arena.add(crate);

    colliders.push({
      minX: x - size / 2, maxX: x + size / 2,
      minZ: z - size / 2, maxZ: z + size / 2,
      minY: y, maxY: y + size
    });
  };

  const addBarrel = (x, y, z) => {
    const bMat = new THREE.MeshStandardMaterial({ map: barrelTex, roughness: 0.4 });
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 4.2, 16), bMat);
    barrel.position.set(x, y + 2.1, z);
    barrel.castShadow = true;
    barrel.receiveShadow = true;
    arena.add(barrel);

    colliders.push({
      minX: x - 1.8, maxX: x + 1.8,
      minZ: z - 1.8, maxZ: z + 1.8,
      minY: y, maxY: y + 4.2
    });
  };

  addCrate(15, 0, -12, 4);
  addCrate(18, 0, -12, 4);
  addCrate(16.5, 4, -12, 3.5);
  addBarrel(14, 0, -6);
  addBarrel(17, 0, -6);
  addCrate(-15, 0, 12, 4);
  addBarrel(-13, 0, 18);
  addBarrel(-16, 0, 18);

  const jumpPads = [
    [-32, 0.2, -32], [32, 0.2, 32],
    [-32, 0.2, 32], [32, 0.2, -32],
    [0, 0.2, 55], [0, 0.2, -55],
    [-85, 0.2, 0], [85, 0.2, 0]
  ];
  const padMat = new THREE.MeshStandardMaterial({
    color: 0x00ff88,
    emissive: 0x00ff88,
    emissiveIntensity: 2.0
  });

  jumpPads.forEach(([px, py, pz]) => {
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 0.35, 32), padMat);
    pad.position.set(px, py, pz);
    arena.add(pad);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(3.4, 4.2, 32),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(px, 0.05, pz);
    arena.add(ring);
  });

  const zeppelin = createZeppelin();
  const clouds = createPuffyClouds();
  arena.add(zeppelin, clouds);
  arena.zeppelin = zeppelin;
  arena.clouds = clouds;

  return { group: arena, jumpPads: jumpPads, colliders: colliders, zeppelin: zeppelin, clouds: clouds };
}

// 7.2 NEW HIGH-TECH MAP: CYBER CITY (NEON METROPOLIS)
function createCyberCityMap() {
  const city = new THREE.Group();
  const colliders = [];

  // Dark Cyber Asphalt with Cyan/Magenta Glow Grid
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#060814';
  ctx.fillRect(0, 0, 1024, 1024);

  // Hex / Grid Lines
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.28)';
  ctx.lineWidth = 3;
  for (let i = 0; i <= 1024; i += 64) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
  }
  // Neon accents
  ctx.strokeStyle = 'rgba(236, 72, 153, 0.45)';
  ctx.lineWidth = 6;
  ctx.strokeRect(128, 128, 768, 768);
  ctx.strokeRect(384, 384, 256, 256);

  const floorTex = new THREE.CanvasTexture(canvas);
  floorTex.wrapS = THREE.RepeatWrapping; floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(16, 16);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(360, 360),
    new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.25, metalness: 0.35 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  city.add(floor);

  // Materials
  const buildingMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.45, metalness: 0.6 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.9, opacity: 0.85, transparent: true });
  const cyanNeonMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const pinkNeonMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
  const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.7 });

  const addBuilding = (w, h, d, x, z, neonColor = 0x00f0ff) => {
    const bMesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMat);
    bMesh.position.set(x, h / 2, z);
    bMesh.castShadow = true;
    bMesh.receiveShadow = true;
    city.add(bMesh);

    // Glowing Neon Top Trim
    const nMat = new THREE.MeshBasicMaterial({ color: neonColor });
    const trim = new THREE.Mesh(new THREE.BoxGeometry(w + 0.4, 0.8, d + 0.4), nMat);
    trim.position.set(x, h + 0.4, z);
    city.add(trim);

    // Illuminated Cyber Windows
    for (let wy = 4; wy < h - 4; wy += 8) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 3, d * 0.7), glassMat);
      win.position.set(x, wy, z);
      city.add(win);
    }

    colliders.push({
      minX: x - w / 2, maxX: x + w / 2,
      minZ: z - d / 2, maxZ: z + d / 2,
      minY: 0, maxY: h
    });
    return bMesh;
  };

  // Perimeter High-Tech Border Walls
  const addPerimeter = (w, h, d, x, z) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMat);
    wall.position.set(x, h / 2, z);
    city.add(wall);
    const trim = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 1, d + 0.2), cyanNeonMat);
    trim.position.set(x, h + 0.5, z);
    city.add(trim);
    colliders.push({
      minX: x - w / 2, maxX: x + w / 2,
      minZ: z - d / 2, maxZ: z + d / 2,
      minY: 0, maxY: h
    });
  };

  addPerimeter(360, 30, 8, 0, -180);
  addPerimeter(360, 30, 8, 0, 180);
  addPerimeter(8, 30, 360, -180, 0);
  addPerimeter(8, 30, 360, 180, 0);

  // 4 Tactical Tower Blocks with Sniper Rooftops
  addBuilding(24, 14, 24, -60, -60, 0x00f0ff);
  addBuilding(24, 14, 24, 60, -60, 0xff007f);
  addBuilding(24, 14, 24, -60, 60, 0xff007f);
  addBuilding(24, 14, 24, 60, 60, 0x00f0ff);

  // Additional Cyber City Buildings
  addBuilding(18, 22, 18, -110, 0, 0x38bdf8);
  addBuilding(18, 22, 18, 110, 0, 0x38bdf8);
  addBuilding(32, 16, 14, 0, -110, 0xf59e0b);
  addBuilding(32, 16, 14, 0, 110, 0xf59e0b);

  // Elevated Skybridges Connecting the Towers
  const addSkybridge = (w, d, x, y, z) => {
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(w, 1.2, d), bridgeMat);
    bridge.position.set(x, y, z);
    city.add(bridge);

    const railL = new THREE.Mesh(new THREE.BoxGeometry(w, 1.4, 0.4), cyanNeonMat);
    railL.position.set(x, y + 1.2, z - d / 2);
    const railR = new THREE.Mesh(new THREE.BoxGeometry(w, 1.4, 0.4), cyanNeonMat);
    railR.position.set(x, y + 1.2, z + d / 2);
    city.add(railL, railR);

    colliders.push({
      minX: x - w / 2, maxX: x + w / 2,
      minZ: z - d / 2, maxZ: z + d / 2,
      minY: y - 0.6, maxY: y + 0.6
    });
  };

  addSkybridge(96, 6, 0, 14, -60);
  addSkybridge(96, 6, 0, 14, 60);

  // Center Holographic Monolith Obelisk
  const obelisk = new THREE.Mesh(new THREE.BoxGeometry(10, 26, 10), buildingMat);
  obelisk.position.set(0, 13, 0);
  const obeliskBeacon = new THREE.Mesh(new THREE.OctahedronGeometry(4, 0), new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true }));
  obeliskBeacon.position.set(0, 29, 0);
  city.add(obelisk, obeliskBeacon);
  colliders.push({ minX: -5, maxX: 5, minZ: -5, maxZ: 5, minY: 0, maxY: 26 });

  // Tactical Sci-Fi Energy Crates & Shipping Containers
  const addContainer = (w, h, d, x, z, col = 0x2563eb) => {
    const cMesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: col, roughness: 0.4, metalness: 0.5 }));
    cMesh.position.set(x, h / 2, z);
    city.add(cMesh);
    colliders.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, minY: 0, maxY: h });
  };

  addContainer(14, 4.5, 6, -25, -20, 0xef4444);
  addContainer(14, 4.5, 6, 25, 20, 0x0284c7);
  addContainer(6, 4.5, 14, -20, 25, 0x10b981);
  addContainer(6, 4.5, 14, 20, -25, 0x8b5cf6);

  // 4 Glowing Jump Pads (Launch Players to Rooftops)
  const jumpPads = [
    [-60, 0, -42],
    [60, 0, -42],
    [-60, 0, 42],
    [60, 0, 42]
  ];

  jumpPads.forEach(([px, py, pz]) => {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 0.4, 24), new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 }));
    base.position.set(px, 0.2, pz);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.8, 2.2, 24), new THREE.MeshBasicMaterial({ color: 0xff007f, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(px, 0.42, pz);
    city.add(base, ring);
  });

  return { group: city, jumpPads: jumpPads, colliders: colliders, obeliskBeacon: obeliskBeacon };
}

// 8. 3D LOBBY ENVIRONMENT
function createLobbyEnvironment() {
  const lobby = new THREE.Group();
  const floor = new THREE.Mesh(
    new THREE.CylinderGeometry(32, 32, 0.6, 64),
    new THREE.MeshStandardMaterial({ map: hdFloorTex, roughness: 0.35, metalness: 0.1 })
  );
  floor.position.y = -0.3;
  lobby.add(floor);

  const centerPad = new THREE.Mesh(
    new THREE.RingGeometry(2.4, 3.8, 64),
    new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide })
  );
  centerPad.rotation.x = -Math.PI / 2;
  centerPad.position.y = 0.02;
  lobby.add(centerPad);

  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const px = Math.cos(angle) * 28;
    const pz = Math.sin(angle) * 28;
    const col = new THREE.Mesh(
      new THREE.CylinderGeometry(1.0, 1.2, 22, 24),
      new THREE.MeshStandardMaterial({ color: 0x1f2438, roughness: 0.4 })
    );
    col.position.set(px, 11, pz);
    lobby.add(col);
  }
  return lobby;
}

// ==========================================
// 9. COMPLETE 3D WEAPONS & SKINS SYSTEM
// ==========================================

// 1. ASSAULT RIFLE / SCAR-L (MATCHING REFERENCE SCREENSHOT 1 1:1)
function createAssaultRifleModel(isViewmodel = false, skin = 'default') {
  const root = new THREE.Group();

  // Orange / Tan SCAR-L Polymer (Screenshot 1)
  const scarOrangeMat = skin === 'default'
    ? new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.45, metalness: 0.15 })
    : createWeaponSkinMaterial(skin, 0xf59e0b);

  const blackSteelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35, metalness: 0.85 });

  // Monolithic Upper Receiver
  const upperReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.18, 0.82), scarOrangeMat);
  upperReceiver.position.set(0, 0.04, 0);

  // Top Full-Length Picatinny Rail
  const picatinnyRail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.84), blackSteelMat);
  picatinnyRail.position.set(0, 0.14, 0);

  // SCAR Characteristic Adjustable Stock (Screenshot 1)
  const stock = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.22, 0.55), scarOrangeMat);
  stock.position.set(0, -0.01, 0.65);
  const cheekRest = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.32), blackSteelMat);
  cheekRest.position.set(0, 0.11, 0.62);

  // Black Lower Receiver & Ergonomic Grip
  const lowerReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.45), scarOrangeMat);
  lowerReceiver.position.set(0, -0.08, 0.05);

  const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.26, 0.13), scarOrangeMat);
  pistolGrip.position.set(0, -0.22, 0.22);
  pistolGrip.rotation.x = -0.32;

  // Black Curved Magazine (Screenshot 1)
  const mag = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.34, 0.16), blackSteelMat);
  mag.position.set(0, -0.24, -0.06);
  mag.rotation.x = 0.22;

  // Heavy Fluted Barrel & Flash Hider
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 16), blackSteelMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0.04, -0.65);

  const muzzleBrake = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.14, 16), blackSteelMat);
  muzzleBrake.rotation.x = Math.PI / 2;
  muzzleBrake.position.set(0, 0.04, -0.96);

  // Flip-Up Iron Sights
  const frontSight = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.01, 8, 16), blackSteelMat);
  frontSight.position.set(0, 0.18, -0.38);

  const rearSight = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.01, 8, 16), blackSteelMat);
  rearSight.position.set(0, 0.18, 0.32);

  root.add(upperReceiver, picatinnyRail, stock, cheekRest, lowerReceiver, pistolGrip, mag, barrel, muzzleBrake, frontSight, rearSight);
  root.mag = mag;

  if (isViewmodel) {
    const flashGeom = new THREE.OctahedronGeometry(0.28, 0);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xffea00, transparent: true, opacity: 0 });
    const flash = new THREE.Mesh(flashGeom, flashMat);
    flash.position.set(0, 0.04, -1.1);
    root.add(flash);
    root.flash = flash;
    root.scale.set(0.72, 0.72, 0.72);
  } else {
    root.scale.set(0.5, 0.5, 0.5);
  }

  return root;
}

// 2. BURST RIFLE (FAMAS BULLPUP DESIGN)
function createBurstRifleModel(isViewmodel = false, skin = 'default') {
  const root = new THREE.Group();
  const mainMat = createWeaponSkinMaterial(skin, 0x334155);
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.35, metalness: 0.85 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.85), mainMat);
  const handleTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.65), mainMat);
  handleTop.position.set(0, 0.16, -0.05);

  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.12), darkMat);
  grip.position.set(0, -0.18, -0.12);
  grip.rotation.x = -0.25;

  const rearMag = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.26, 0.14), darkMat);
  rearMag.position.set(0, -0.18, 0.30); // Bullpup rear magazine!

  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.55, 16), darkMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0.02, -0.65);

  root.add(body, handleTop, grip, rearMag, barrel);

  if (isViewmodel) {
    const flashGeom = new THREE.OctahedronGeometry(0.26, 0);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0 });
    const flash = new THREE.Mesh(flashGeom, flashMat);
    flash.position.set(0, 0.02, -0.95);
    root.add(flash);
    root.flash = flash;
    root.scale.set(0.72, 0.72, 0.72);
  } else {
    root.scale.set(0.5, 0.5, 0.5);
  }
  return root;
}

// 3. SHAWTY / SAWED-OFF DOUBLE BARREL SHOTGUN
function createShawtyModel(isViewmodel = false, skin = 'default') {
  const root = new THREE.Group();
  const woodMat = createWeaponSkinMaterial(skin, 0x78350f);
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.25, metalness: 0.9 });

  const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.14, 0.32), steelMat);
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.14), woodMat);
  grip.position.set(0, -0.14, 0.18);
  grip.rotation.x = -0.45;

  const barrelLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.65, 16), steelMat);
  barrelLeft.rotation.x = Math.PI / 2;
  barrelLeft.position.set(-0.035, 0.03, -0.42);

  const barrelRight = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.65, 16), steelMat);
  barrelRight.rotation.x = Math.PI / 2;
  barrelRight.position.set(0.035, 0.03, -0.42);

  const forend = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 0.35), woodMat);
  forend.position.set(0, -0.03, -0.30);

  root.add(receiver, grip, barrelLeft, barrelRight, forend);

  if (isViewmodel) {
    const flashGeom = new THREE.OctahedronGeometry(0.35, 0);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0 });
    const flash = new THREE.Mesh(flashGeom, flashMat);
    flash.position.set(0, 0.03, -0.8);
    root.add(flash);
    root.flash = flash;
    root.scale.set(0.75, 0.75, 0.75);
  } else {
    root.scale.set(0.5, 0.5, 0.5);
  }
  return root;
}

// 4. TACTICAL COMPOUND BOW
function createBowModel(isViewmodel = false, skin = 'default') {
  const root = new THREE.Group();
  const limbMat = createWeaponSkinMaterial(skin, 0x0284c7);
  const cableMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const riser = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.08), limbMat);

  const topLimb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.55, 0.04), limbMat);
  topLimb.position.set(0, 0.45, -0.15);
  topLimb.rotation.x = -0.45;

  const botLimb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.55, 0.04), limbMat);
  botLimb.position.set(0, -0.45, -0.15);
  botLimb.rotation.x = 0.45;

  const string = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 1.4, 8), cableMat);
  string.position.set(0, 0, -0.32);

  const arrow = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.95, 8), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
  arrow.rotation.x = Math.PI / 2;
  arrow.position.set(0, 0.05, -0.45);

  root.add(riser, topLimb, botLimb, string, arrow);
  root.scale.set(0.65, 0.65, 0.65);
  return root;
}

// 5. FOX KNIVES KARAMBIT MOD. 478 (MATCHING PHOTO 2 1:1)
function createKarambitModel(isViewmodel = false, skin = 'default') {
  const root = new THREE.Group();
  const isCustomSkin = skin && skin !== 'default';

  const foxG10Tex = createFoxG10Texture();
  const satinBladeTex = createSatinBladeTexture();

  const defaultBladeMat = new THREE.MeshStandardMaterial({
    map: satinBladeTex,
    color: 0xf8fafc,
    metalness: 0.98,
    roughness: 0.08
  });

  const blackCoatingMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.82,
    roughness: 0.28
  });

  const g10HandleMat = new THREE.MeshStandardMaterial({
    map: foxG10Tex,
    color: 0x111827,
    roughness: 0.55,
    metalness: 0.15
  });

  const steelLinerMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.92,
    roughness: 0.20
  });

  const torxScrewMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.90,
    roughness: 0.22
  });

  const bladeMat = isCustomSkin ? createWeaponSkinMaterial(skin, 0xf8fafc) : defaultBladeMat;

  // 1. Hawkbill Curved Talon Blade with Two-Tone Finish (Photo 2)
  const bladeGroup = new THREE.Group();

  // Upper Blade Spine with Black PVD Coating (Photo 2)
  const spineSection1 = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.12, 0.24), blackCoatingMat);
  spineSection1.position.set(0, 0.05, -0.14);
  bladeGroup.add(spineSection1);

  // Curved Forward Hawkbill Spine
  const spineSection2 = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.10, 0.18), blackCoatingMat);
  spineSection2.position.set(0, 0.02, -0.31);
  spineSection2.rotation.x = -0.38;
  bladeGroup.add(spineSection2);

  // Sharp Needle Claw Tip (Curving downward - Photo 2)
  const clawTip = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.16, 4), bladeMat);
  clawTip.rotation.set(-Math.PI / 2 + 0.65, 0, 0);
  clawTip.scale.set(0.14, 1.0, 0.85);
  clawTip.position.set(0, -0.05, -0.42);
  clawTip.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };
  bladeGroup.add(clawTip);

  // Lower Curved Razor Cutting Edge (Satin Polished Bevel - Photo 2)
  const edgeCurve1 = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.016, 0.22, 4), bladeMat);
  edgeCurve1.rotation.x = Math.PI / 2;
  edgeCurve1.position.set(0, -0.02, -0.14);
  edgeCurve1.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };

  const edgeCurve2 = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.014, 0.18, 4), bladeMat);
  edgeCurve2.rotation.set(Math.PI / 2 - 0.38, 0, 0);
  edgeCurve2.position.set(0, -0.045, -0.31);
  edgeCurve2.userData = { isWeaponPart: true, defaultMaterial: defaultBladeMat, baseColor: 0xf8fafc };
  bladeGroup.add(edgeCurve1, edgeCurve2);

  // Emerson Wave Opener Thumb Hook (Photo 2)
  const waveHook = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.045, 0.065), blackCoatingMat);
  waveHook.position.set(0, 0.125, -0.11);
  waveHook.rotation.x = -0.45;
  bladeGroup.add(waveHook);

  // Thumb Ramp Jimping Grooves (Photo 2)
  for (let j = 0; j < 3; j++) {
    const jimp = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.012, 0.012), steelLinerMat);
    jimp.position.set(0, 0.138, -0.075 - j * 0.022);
    bladeGroup.add(jimp);
  }

  // Skeletonized Oval Thumb Slot Cutout in Blade (Photo 2)
  const slotFrame = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.034, 0.09), blackCoatingMat);
  slotFrame.position.set(0, 0.06, -0.16);
  const slotHole = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.022, 0.075), new THREE.MeshBasicMaterial({ color: 0x020617 }));
  slotHole.position.set(0, 0.06, -0.16);
  bladeGroup.add(slotFrame, slotHole);

  // Laser Marking Badge (Photo 2 "FOX KNIVES Mod. 478")
  const laserPlate = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.022, 0.07), new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.9,
    roughness: 0.15
  }));
  laserPlate.position.set(0, 0.015, -0.16);
  bladeGroup.add(laserPlate);

  // 2. Sculpted Anatomical G10 Handle with 3 Finger Scallops (Photo 2)
  const handleGroup = new THREE.Group();

  // Full Tang Steel Liners
  const tang = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.10, 0.38), steelLinerMat);
  tang.position.set(0, 0.01, 0.14);
  handleGroup.add(tang);

  // Left & Right Contoured G10 Scales
  const scaleL = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.105, 0.36), g10HandleMat);
  scaleL.position.set(-0.022, 0.01, 0.14);
  const scaleR = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.105, 0.36), g10HandleMat);
  scaleR.position.set(0.022, 0.01, 0.14);
  handleGroup.add(scaleL, scaleR);

  // 3 Deep Finger Scallops / Ergonomic Indents on the Inner Underside (Photo 2)
  const fingerGrooveZ = [0.03, 0.13, 0.23];
  fingerGrooveZ.forEach(fz => {
    const indentL = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.028, 12), steelLinerMat);
    indentL.rotation.z = Math.PI / 2;
    indentL.position.set(-0.022, -0.045, fz);
    const indentR = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.028, 12), steelLinerMat);
    indentR.rotation.z = Math.PI / 2;
    indentR.position.set(0.022, -0.045, fz);
    handleGroup.add(indentL, indentR);
  });

  // Large Torx Pivot Screw with Recessed Washer Collar (Photo 2)
  const pivotCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.076, 16), torxScrewMat);
  pivotCollar.rotation.z = Math.PI / 2;
  pivotCollar.position.set(0, 0.02, -0.02);

  const pivotCore = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.082, 6), steelLinerMat);
  pivotCore.rotation.z = Math.PI / 2;
  pivotCore.position.set(0, 0.02, -0.02);
  handleGroup.add(pivotCollar, pivotCore);

  // Body Torx Screws Spaced Along the Handle Scales (Photo 2)
  const screwPositions = [0.08, 0.18, 0.28];
  screwPositions.forEach(sz => {
    const sCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.075, 12), torxScrewMat);
    sCollar.rotation.z = Math.PI / 2;
    sCollar.position.set(0, 0.035, sz);
    handleGroup.add(sCollar);
  });

  // 3. Seamless Solid Retention Ring Pommel with Skull Crusher Spike (Photo 2)
  const ringGroup = new THREE.Group();

  // Solid Steel Ring Body
  const ringTorus = new THREE.Mesh(new THREE.TorusGeometry(0.082, 0.016, 12, 28), steelLinerMat);
  ringTorus.position.set(0, 0.01, 0.39);
  ringTorus.userData = { isWeaponPart: true };

  // Inner ring chamfer liner
  const innerLiner = new THREE.Mesh(new THREE.CylinderGeometry(0.066, 0.066, 0.028, 20), torxScrewMat);
  innerLiner.rotation.z = Math.PI / 2;
  innerLiner.position.set(0, 0.01, 0.39);

  // Pointed Rear Impact Striker / Skull Crusher Spike on Ring Rim (Photo 2)
  const spike = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.055, 4), steelLinerMat);
  spike.rotation.set(Math.PI / 2, 0, 0);
  spike.position.set(0, 0.01, 0.495);

  // Jimping Ridges on Outer Ring Edge
  for (let rj = 0; rj < 3; rj++) {
    const rjMesh = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.012, 0.014), torxScrewMat);
    rjMesh.position.set(0, 0.098 + rj * 0.005, 0.38 + rj * 0.02);
    ringGroup.add(rjMesh);
  }

  ringGroup.add(ringTorus, innerLiner, spike);

  // Combine All Components into Unified Knife Group
  root.add(bladeGroup, handleGroup, ringGroup);

  // Center Knife Center-of-Mass at Pivot/Grip for Flawless Showcase Rotation
  root.position.set(0, 0, 0.06);

  if (isViewmodel) {
    const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.6 });
    const gloveMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

    // Reverse-Grip (Icepick Grip) Viewmodel with Finger Through Ring
    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.75), sleeveMat);
    rightArm.position.set(0.24, -0.22, 0.32);
    rightArm.rotation.set(0.35, -0.15, 0.1);
    rightArm.userData = { isArmOrGlove: true };

    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.22), gloveMat);
    rightHand.position.set(0.02, -0.05, 0.18);
    rightHand.userData = { isArmOrGlove: true };

    root.add(rightArm, rightHand);
    root.scale.set(0.82, 0.82, 0.82);
  } else {
    root.scale.set(0.60, 0.60, 0.60);
  }

  return root;
}

// EXPORT ALL 3D MODELS GLOBALLY
window.models = {
  createAK47Model: (isVm, skin) => createAuthenticAK47Model(isVm, skin),
  createAssaultRifleModel: (isVm, skin) => createAssaultRifleModel(isVm, skin),
  createBurstRifleModel: (isVm, skin) => createBurstRifleModel(isVm, skin),
  createPistolModel: (isVm, skin) => createTwoTonePistolModel(isVm, skin),
  createKnifeModel: (isVm, skin) => createCombatKnifeModel(isVm, skin),
  createCombatKnifeModel: (isVm, skin) => createCombatKnifeModel(isVm, skin),
  createKarambitModel: (isVm, skin) => createKarambitModel(isVm, skin),
  createButterflyKnifeModel: (isVm, skin) => createButterflyKnifeModel(isVm, skin),
  createHuntsmanKnifeModel: (isVm, skin) => createHuntsmanKnifeModel(isVm, skin),
  createFragGrenadeModel: (isVm, skin) => createFragGrenadeModel(isVm, skin),
  createPaintballGunModel: (isVm, skin) => createPaintballGunModel(isVm, skin),
  createMinigunModel: (isVm, skin) => createMinigunModel(isVm, skin),
  createSniperModel: (isVm, skin) => createSniperModel(isVm, skin),
  createRocketLauncherModel: (isVm, skin) => createRocketLauncherModel(isVm, skin),
  createShawtyModel: (isVm, skin) => createShawtyModel(isVm, skin),
  createBowModel: (isVm, skin) => createBowModel(isVm, skin),
  applySkinToMesh: (mesh, skin, type) => applySkinToMesh(mesh, skin, type),
  createWeaponSkinMaterial: (skin, base) => createWeaponSkinMaterial(skin, base),
  createVeckAvatar: (options) => createBlockyCharacter(options),
  createBlockyCharacter: (options) => createBlockyCharacter(options),
  createSciFiArena: () => createVeckArenaMap(),
  createVeckArenaMap: () => createVeckArenaMap(),
  createCyberCityMap: () => createCyberCityMap(),
  createLobbyEnvironment: () => createLobbyEnvironment()
};

