// Veck.io High-Definition 3D Models, Textures, Sci-Fi Arena, Authentic AK-47 & Tactical Two-Tone Pistol

// Polyfill for older canvas contexts
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (!r) r = 0;
    if (typeof r === 'number') r = [r, r, r, r];
    var tl = r[0] || 0, tr = r[1] || tl, br = r[2] || tl, bl = r[3] || tr;
    this.beginPath();
    this.moveTo(x + tl, y);
    this.lineTo(x + w - tr, y);
    this.quadraticCurveTo(x + w, y, x + w, y + tr);
    this.lineTo(x + w, y + h - br);
    this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    this.lineTo(x + bl, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - bl);
    this.lineTo(x, y + tl);
    this.quadraticCurveTo(x, y, x + tl, y);
    this.closePath();
    return this;
  };
}

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

// Realistic Muzzle Flash Procedural Texture & Cross-Plane Mesh (Eliminates ugly solid yellow polygon!)
function createMuzzleFlashTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 62);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.25, 'rgba(255, 220, 100, 0.95)');
  grad.addColorStop(0.55, 'rgba(255, 110, 20, 0.6)');
  grad.addColorStop(0.85, 'rgba(255, 40, 0, 0.2)');
  grad.addColorStop(1, 'rgba(255, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(64, 64, 62, 0, Math.PI * 2);
  ctx.fill();

  // Multi-directional fiery flash sparks
  ctx.fillStyle = 'rgba(255, 245, 200, 0.95)';
  ctx.beginPath();
  ctx.moveTo(64, 6);
  ctx.lineTo(68, 58);
  ctx.lineTo(122, 64);
  ctx.lineTo(68, 70);
  ctx.lineTo(64, 122);
  ctx.lineTo(60, 70);
  ctx.lineTo(6, 64);
  ctx.lineTo(60, 58);
  ctx.closePath();
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

const realisticMuzzleFlashTex = createMuzzleFlashTexture();

function createRealisticMuzzleFlashMesh(size = 0.32) {
  const flashGroup = new THREE.Group();
  flashGroup.visible = false;

  const mat = new THREE.MeshBasicMaterial({
    map: realisticMuzzleFlashTex,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const p1 = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
  const p2 = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
  p2.rotation.y = Math.PI / 2;
  const p3 = new THREE.Mesh(new THREE.PlaneGeometry(size * 0.85, size * 0.85), mat);
  p3.rotation.z = Math.PI / 4;

  flashGroup.add(p1, p2, p3);
  flashGroup.mat = mat;
  flashGroup.baseSize = size;
  return flashGroup;
}

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

    // Realistic Muzzle Flash
    const flash = createRealisticMuzzleFlashMesh(0.36);
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

    // Realistic Muzzle Flash
    const flash = createRealisticMuzzleFlashMesh(0.24);
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
    const flash = createRealisticMuzzleFlashMesh(0.28);
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
    const flash = createRealisticMuzzleFlashMesh(0.42);
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
    const flash = createRealisticMuzzleFlashMesh(0.45);
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
    const flash = createRealisticMuzzleFlashMesh(0.55);
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
    // Scale up weapon so it is prominently visible in 3rd person
    heldWeapon.scale.set(1.35, 1.35, 1.35);
    // Position weapon in hand and align barrel along arm aim vector
    heldWeapon.position.set(-0.05, -0.72, 0.12);
    heldWeapon.rotation.set(1.42, -0.05, 0.05);
    rightArm.add(heldWeapon);

    // Natural 2-Hand Tactical Aiming Pose
    rightArm.rotation.set(-1.35, -0.15, 0);
    leftArm.rotation.set(-1.22, 0.45, -0.2);
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

// 8. 3D LOBBY ENVIRONMENT (AUTHENTIC VECK.IO SCI-FI HANGAR & PEDESTALS)
function createRuneCircleTexture(color1 = '#00f0ff', color2 = '#3b82f6') {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const cx = 256, cy = 256;

  if (ctx.clearRect) ctx.clearRect(0, 0, 512, 512);

  // Outer glowing ring
  ctx.strokeStyle = color1;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, 230, 0, Math.PI * 2);
  ctx.stroke();

  // Tick marks
  ctx.lineWidth = 4;
  for (let i = 0; i < 36; i++) {
    const angle = (i / 36) * Math.PI * 2;
    const r1 = i % 3 === 0 ? 210 : 220;
    const r2 = 230;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
    ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
    ctx.stroke();
  }

  // Middle ring
  ctx.strokeStyle = color2;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, 180, 0, Math.PI * 2);
  ctx.stroke();

  // Inner arcane geometric star (8 points)
  ctx.strokeStyle = color1;
  ctx.lineWidth = 5;
  ctx.beginPath();
  for (let i = 0; i <= 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const r = i % 2 === 0 ? 150 : 75;
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();

  // Center core glowing circle
  ctx.fillStyle = color1;
  ctx.beginPath();
  ctx.arc(cx, cy, 32, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createLobbyHangarSignTexture(title, subtitle, rooms, accentColor = '#00f0ff') {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0a0f1d';
  ctx.fillRect(0, 0, 512, 256);

  // Border
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 504, 248);

  // Header Banner
  ctx.fillStyle = accentColor;
  ctx.fillRect(8, 8, 496, 52);

  ctx.fillStyle = '#050811';
  ctx.font = '900 28px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(title, 24, 44);

  ctx.textAlign = 'right';
  ctx.font = '700 18px sans-serif';
  ctx.fillText(subtitle, 488, 42);

  // Match rows
  rooms.forEach((r, idx) => {
    const y = 96 + idx * 46;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.fillRect(20, y - 26, 472, 38);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(r.name, 32, y);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(r.count, 330, y);

    ctx.fillStyle = '#22c55e';
    ctx.fillRect(400, y - 18, 76, 26);
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 14px sans-serif';
    ctx.fillText('JOIN', 438, y);
  });

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createLobbyPedestalBillboard(text, icon = '⚡', color = '#00f0ff') {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 96;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(10, 15, 28, 0.88)';
  if (ctx.roundRect) ctx.roundRect(8, 8, 240, 80, 16);
  else ctx.fillRect(8, 8, 240, 80);
  ctx.fill();

  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  if (ctx.roundRect) ctx.roundRect(8, 8, 240, 80, 16);
  else ctx.strokeRect(8, 8, 240, 80);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${icon} ${text}`, 128, 48);

  const tex = new THREE.CanvasTexture(canvas);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 0.9),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide })
  );
  return mesh;
}

function createLobbyEnvironment() {
  const lobby = new THREE.Group();
  lobby.userData = {
    pedestalWeapons: [],
    runes: [],
    ambientBots: [],
    particles: []
  };

  // 1. Main Hangar Runway Floor
  const floorGeom = new THREE.PlaneGeometry(18, 70);
  const floorMat = new THREE.MeshStandardMaterial({
    map: hdFloorTex,
    roughness: 0.35,
    metalness: 0.2
  });
  const mainFloor = new THREE.Mesh(floorGeom, floorMat);
  mainFloor.rotation.x = -Math.PI / 2;
  mainFloor.position.set(0, -0.05, -20);
  mainFloor.receiveShadow = true;
  lobby.add(mainFloor);

  // Outer Extended Floor Borders
  const outerFloorMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.6 });
  const leftOuterFloor = new THREE.Mesh(new THREE.PlaneGeometry(20, 70), outerFloorMat);
  leftOuterFloor.rotation.x = -Math.PI / 2;
  leftOuterFloor.position.set(-19, -0.06, -20);
  const rightOuterFloor = new THREE.Mesh(new THREE.PlaneGeometry(20, 70), outerFloorMat);
  rightOuterFloor.rotation.x = -Math.PI / 2;
  rightOuterFloor.position.set(19, -0.06, -20);
  lobby.add(leftOuterFloor, rightOuterFloor);

  // 2. Dual Glowing Neon Floor Runway Tracks (Matching Veck.io Reference)
  // Left: Vibrant Gold/Yellow Track
  const yellowStripe = new THREE.Mesh(
    new THREE.PlaneGeometry(0.35, 64),
    new THREE.MeshBasicMaterial({ color: 0xffd700 })
  );
  yellowStripe.rotation.x = -Math.PI / 2;
  yellowStripe.position.set(-2.0, 0.01, -22);
  lobby.add(yellowStripe);

  // Right: Vibrant Neon Cyan Track
  const cyanStripe = new THREE.Mesh(
    new THREE.PlaneGeometry(0.35, 64),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff })
  );
  cyanStripe.rotation.x = -Math.PI / 2;
  cyanStripe.position.set(2.0, 0.01, -22);
  lobby.add(cyanStripe);

  // Center glowing runway chevrons
  for (let z = 2; z >= -48; z -= 6) {
    const arrow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.2),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, opacity: 0.7, transparent: true })
    );
    arrow.rotation.x = -Math.PI / 2;
    arrow.position.set(0, 0.015, z);
    lobby.add(arrow);
  }

  // 3. Center Player Podium
  const centerBase = new THREE.Mesh(
    new THREE.CylinderGeometry(3.2, 3.4, 0.35, 48),
    new THREE.MeshStandardMaterial({ color: 0x161b26, roughness: 0.3, metalness: 0.5 })
  );
  centerBase.position.set(0, 0.12, 0);
  centerBase.receiveShadow = true;
  lobby.add(centerBase);

  // Glowing Purple Edge Ring
  const centerEdgeRing = new THREE.Mesh(
    new THREE.RingGeometry(3.0, 3.35, 48),
    new THREE.MeshBasicMaterial({ color: 0xd946ef, side: THREE.DoubleSide })
  );
  centerEdgeRing.rotation.x = -Math.PI / 2;
  centerEdgeRing.position.set(0, 0.31, 0);
  lobby.add(centerEdgeRing);

  // Center Arcane Energy Rune Pad
  const centerRuneTex = createRuneCircleTexture('#d946ef', '#00f0ff');
  const centerRune = new THREE.Mesh(
    new THREE.PlaneGeometry(5.6, 5.6),
    new THREE.MeshBasicMaterial({ map: centerRuneTex, transparent: true, side: THREE.DoubleSide })
  );
  centerRune.rotation.x = -Math.PI / 2;
  centerRune.position.set(0, 0.32, 0);
  lobby.add(centerRune);
  lobby.userData.runes.push({ mesh: centerRune, speed: 0.25 });

  // 4. Left "Quick TDM" Pedestal (Golden AK-47 & Blue Rune Circle)
  const tdmBase = new THREE.Mesh(
    new THREE.CylinderGeometry(2.0, 2.2, 0.28, 36),
    new THREE.MeshStandardMaterial({ color: 0x131a2a, roughness: 0.35, metalness: 0.4 })
  );
  tdmBase.position.set(-5.0, 0.1, -2.4);
  lobby.add(tdmBase);

  const tdmRuneTex = createRuneCircleTexture('#00f0ff', '#3b82f6');
  const tdmRune = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 3.6),
    new THREE.MeshBasicMaterial({ map: tdmRuneTex, transparent: true, side: THREE.DoubleSide })
  );
  tdmRune.rotation.x = -Math.PI / 2;
  tdmRune.position.set(-5.0, 0.25, -2.4);
  lobby.add(tdmRune);
  lobby.userData.runes.push({ mesh: tdmRune, speed: -0.35 });

  // Floating Golden AK-47 Model on Left Pedestal
  const tdmGun = createAuthenticAK47Model(false, 'gold');
  tdmGun.scale.set(1.5, 1.5, 1.5);
  tdmGun.position.set(-5.0, 1.35, -2.4);
  tdmGun.rotation.set(0.15, 0.4, -0.1);
  tdmGun.userData = { baseY: 1.35, phase: 0 };
  lobby.add(tdmGun);
  lobby.userData.pedestalWeapons.push(tdmGun);

  // 3D Billboard above Left Pedestal
  const tdmSign = createLobbyPedestalBillboard('Quick TDM', '⚡', '#00f0ff');
  tdmSign.position.set(-5.0, 2.25, -2.4);
  lobby.add(tdmSign);

  // 5. Right "Quick Arcade" Pedestal (Cyan Minigun & Neon Rune Circle)
  const arcadeBase = new THREE.Mesh(
    new THREE.CylinderGeometry(2.0, 2.2, 0.28, 36),
    new THREE.MeshStandardMaterial({ color: 0x131a2a, roughness: 0.35, metalness: 0.4 })
  );
  arcadeBase.position.set(5.0, 0.1, -2.4);
  lobby.add(arcadeBase);

  const arcadeRuneTex = createRuneCircleTexture('#10b981', '#06b6d4');
  const arcadeRune = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 3.6),
    new THREE.MeshBasicMaterial({ map: arcadeRuneTex, transparent: true, side: THREE.DoubleSide })
  );
  arcadeRune.rotation.x = -Math.PI / 2;
  arcadeRune.position.set(5.0, 0.25, -2.4);
  lobby.add(arcadeRune);
  lobby.userData.runes.push({ mesh: arcadeRune, speed: 0.35 });

  // Floating Minigun / Submachine Gun on Right Pedestal
  const arcadeGun = createMinigunModel(false, 'neon');
  arcadeGun.scale.set(1.2, 1.2, 1.2);
  arcadeGun.position.set(5.0, 1.35, -2.4);
  arcadeGun.rotation.set(0.15, -0.4, 0.1);
  arcadeGun.userData = { baseY: 1.35, phase: Math.PI };
  lobby.add(arcadeGun);
  lobby.userData.pedestalWeapons.push(arcadeGun);

  // 3D Billboard above Right Pedestal
  const arcadeSign = createLobbyPedestalBillboard('Quick Arcade', '🎮', '#10b981');
  arcadeSign.position.set(5.0, 2.25, -2.4);
  lobby.add(arcadeSign);

  // 6. Sci-Fi Hangar Pillars & Overhead Truss Beams
  const pillarZ = [4, -4, -12, -20, -28, -36, -44];
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x181f2e, roughness: 0.4, metalness: 0.6 });
  const neonMatCyan = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const neonMatAmber = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

  pillarZ.forEach((pz, idx) => {
    [-8.0, 8.0].forEach(px => {
      // Main Pillar Column
      const col = new THREE.Mesh(new THREE.BoxGeometry(1.4, 14, 1.4), pillarMat);
      col.position.set(px, 7, pz);
      lobby.add(col);

      // Vertical LED Neon Strip
      const led = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 13, 0.12),
        idx % 2 === 0 ? neonMatCyan : neonMatAmber
      );
      led.position.set(px + (px > 0 ? -0.72 : 0.72), 7, pz);
      lobby.add(led);
    });

    // Overhead Structural Cross-Truss Beam
    const crossBeam = new THREE.Mesh(
      new THREE.BoxGeometry(17.4, 0.8, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x0f1522, roughness: 0.5 })
    );
    crossBeam.position.set(0, 13.6, pz);
    lobby.add(crossBeam);
  });

  // 7. Giant Hanging Digital Match Screens / Billboards
  const leftScreenTex = createLobbyHangarSignTexture('VECK.IO TDM', '7/8 PLAYERS', [
    { name: 'Block Arena (TDM)', count: '7/8' },
    { name: 'Vertigo (FFA)', count: '5/8' },
    { name: 'Cyber City (TDM)', count: '8/8' }
  ], '#0284c7');
  const leftScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 4),
    new THREE.MeshBasicMaterial({ map: leftScreenTex, side: THREE.DoubleSide })
  );
  leftScreen.position.set(-7.2, 6.2, -10);
  leftScreen.rotation.y = Math.PI / 7;
  lobby.add(leftScreen);

  const rightScreenTex = createLobbyHangarSignTexture('BATTLEFIELD', '6/8 PLAYERS', [
    { name: 'Gun Game Arena', count: '6/8' },
    { name: 'PUBG Survival 4x4', count: '14/20' },
    { name: 'Sniper Only FFA', count: '4/8' }
  ], '#f59e0b');
  const rightScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 4),
    new THREE.MeshBasicMaterial({ map: rightScreenTex, side: THREE.DoubleSide })
  );
  rightScreen.position.set(7.2, 6.2, -10);
  rightScreen.rotation.y = -Math.PI / 7;
  lobby.add(rightScreen);

  // 8. Rear Hallway Gateway Arch (Deep Hangar Portal)
  const portalArch = new THREE.Mesh(
    new THREE.BoxGeometry(12, 11, 1),
    new THREE.MeshStandardMaterial({ color: 0x0b101c, roughness: 0.4 })
  );
  portalArch.position.set(0, 5.5, -48);
  lobby.add(portalArch);

  const portalHole = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.28 })
  );
  portalHole.position.set(0, 4.2, -47.4);
  lobby.add(portalHole);

  // 9. Ambient Lobby Characters (Other Players Standing/Idling in Hallway)
  const bot1 = createBlockyCharacter({
    name: 'VeckWarrior17',
    level: 7,
    teamColor: 'blue',
    shirtColor: 0x3b82f6,
    pantsColor: 0x18181b,
    weaponType: 'ak47',
    isEnemy: false
  });
  bot1.group.position.set(-1.8, 0, -9.5);
  bot1.group.rotation.y = 0.25;
  lobby.add(bot1.group);
  lobby.userData.ambientBots.push(bot1);

  const bot2 = createBlockyCharacter({
    name: 'anderson23',
    level: 4,
    teamColor: 'blue',
    shirtColor: 0x8b5cf6,
    pantsColor: 0x1e293b,
    weaponType: 'pistol',
    isEnemy: false
  });
  bot2.group.position.set(1.9, 0, -16);
  bot2.group.rotation.y = -0.35;
  lobby.add(bot2.group);
  lobby.userData.ambientBots.push(bot2);

  const bot3 = createBlockyCharacter({
    name: 'VeckWinner76',
    level: 9,
    teamColor: 'red',
    shirtColor: 0xef4444,
    pantsColor: 0x0f172a,
    weaponType: 'ak47',
    isEnemy: false
  });
  bot3.group.position.set(-1.4, 0, -24);
  bot3.group.rotation.y = 0.15;
  lobby.add(bot3.group);
  lobby.userData.ambientBots.push(bot3);

  // 10. Floating Ambient Energy Particles
  const pGeom = new THREE.BoxGeometry(0.08, 0.08, 0.08);
  const pMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
  for (let i = 0; i < 30; i++) {
    const p = new THREE.Mesh(pGeom, pMat);
    p.position.set(
      (Math.random() - 0.5) * 14,
      0.5 + Math.random() * 4.5,
      (Math.random() - 0.5) * 36 - 8
    );
    p.userData = {
      baseY: p.position.y,
      speed: 0.5 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2
    };
    lobby.add(p);
    lobby.userData.particles.push(p);
  }

  // 11. Atmospheric Lighting for Lobby
  const lobbyKeyLight = new THREE.PointLight(0x00f0ff, 1.4, 16);
  lobbyKeyLight.position.set(0, 4.5, 1.5);
  lobby.add(lobbyKeyLight);

  const lobbyFillLight = new THREE.PointLight(0xffb703, 0.9, 14);
  lobbyFillLight.position.set(0, 3.8, -6);
  lobby.add(lobbyFillLight);

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
    const flash = createRealisticMuzzleFlashMesh(0.36);
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
    const flash = createRealisticMuzzleFlashMesh(0.32);
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
    const flash = createRealisticMuzzleFlashMesh(0.42);
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

// ==========================================
// 9. REALISTIC PROCEDURAL TERRAIN TEXTURES (PUBG STYLE)
// ==========================================
function createPubgGrassTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#4a6736';
  ctx.fillRect(0, 0, 256, 256);

  // Natural grass tufts & soil variation
  for (let i = 0; i < 4000; i++) {
    const rx = Math.random() * 256;
    const ry = Math.random() * 256;
    const rShade = Math.random();
    if (rShade < 0.35) ctx.fillStyle = '#3c542b';
    else if (rShade < 0.7) ctx.fillStyle = '#5c7d42';
    else if (rShade < 0.9) ctx.fillStyle = '#423d24';
    else ctx.fillStyle = '#688c49';
    ctx.fillRect(rx, ry, Math.random() * 3 + 1, Math.random() * 4 + 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(40, 40);
  return tex;
}

function createPubgRoadTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Dark asphalt base
  ctx.fillStyle = '#27272a';
  ctx.fillRect(0, 0, 256, 256);

  // Asphalt gravel noise
  for (let i = 0; i < 3000; i++) {
    const rx = Math.random() * 256;
    const ry = Math.random() * 256;
    ctx.fillStyle = Math.random() < 0.5 ? '#1f1f23' : '#333338';
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Yellow dashed road stripes in center
  ctx.fillStyle = '#facc15';
  ctx.fillRect(122, 20, 12, 60);
  ctx.fillRect(122, 140, 12, 60);

  // White edge lines
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(8, 0, 8, 256);
  ctx.fillRect(240, 0, 8, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 35);
  return tex;
}

const pubgGrassTex = createPubgGrassTexture();
const pubgRoadTex = createPubgRoadTexture();

// ==========================================
// 10. DRIVABLE PUBG UAZ / JEEP VEHICLE
// ==========================================
function createPubgJeepVehicle(startX = 0, startZ = 0, startAngle = 0) {
  const jeepGroup = new THREE.Group();

  const armyGreenMat = new THREE.MeshStandardMaterial({ color: 0x3d4f27, roughness: 0.7, metalness: 0.25 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.45, metalness: 0.8 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.4, roughness: 0.1, metalness: 0.9 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9, metalness: 0.1 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.35, metalness: 0.7 });
  const lightGlowMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
  const tailGlowMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  // 1. Lower Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.7, 6.8), darkMetalMat);
  chassis.position.y = 0.85;
  chassis.castShadow = true;
  jeepGroup.add(chassis);

  // 2. Main Body Tub
  const body = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.9, 6.6), armyGreenMat);
  body.position.y = 1.45;
  body.castShadow = true;
  jeepGroup.add(body);

  // 3. Engine Hood
  const hood = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.75, 2.5), armyGreenMat);
  hood.position.set(0, 1.95, -1.95);
  hood.castShadow = true;
  jeepGroup.add(hood);

  // 4. Front Radiator Grill (iconic vertical slits)
  const grill = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.65, 0.15), darkMetalMat);
  grill.position.set(0, 1.95, -3.22);
  jeepGroup.add(grill);

  // 5. Bumpers
  const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.4, 0.4), darkMetalMat);
  frontBumper.position.set(0, 0.8, -3.4);
  const winch = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 12), darkMetalMat);
  winch.rotation.z = Math.PI / 2;
  winch.position.set(0, 0.8, -3.65);
  jeepGroup.add(frontBumper, winch);

  const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.4, 0.4), darkMetalMat);
  rearBumper.position.set(0, 0.8, 3.4);
  jeepGroup.add(rearBumper);

  // 6. Glowing Headlights & Taillights
  const hlLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.15, 16), lightGlowMat);
  hlLeft.rotation.x = Math.PI / 2;
  hlLeft.position.set(-1.15, 1.95, -3.23);
  const hlRight = hlLeft.clone();
  hlRight.position.x = 1.15;
  jeepGroup.add(hlLeft, hlRight);

  const tlLeft = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.12), tailGlowMat);
  tlLeft.position.set(-1.3, 1.6, 3.32);
  const tlRight = tlLeft.clone();
  tlRight.position.x = 1.3;
  jeepGroup.add(tlLeft, tlRight);

  // 7. Windshield Frame & Tinted Glass
  const windshieldFrame = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.25, 0.15), armyGreenMat);
  windshieldFrame.position.set(0, 2.7, -0.65);
  windshieldFrame.rotation.x = 0.22;
  const windshieldGlass = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.95, 0.08), glassMat);
  windshieldGlass.position.set(0, 2.7, -0.64);
  windshieldGlass.rotation.x = 0.22;
  jeepGroup.add(windshieldFrame, windshieldGlass);

  // 8. Roll Cage & Roof Top
  const roof = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.2, 3.6), armyGreenMat);
  roof.position.set(0, 3.35, 1.15);
  roof.castShadow = true;
  jeepGroup.add(roof);

  const makePillar = (px, pz) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.5, 8), darkMetalMat);
    p.position.set(px, 2.6, pz);
    jeepGroup.add(p);
  };
  makePillar(-1.5, -0.6);
  makePillar(1.5, -0.6);
  makePillar(-1.5, 1.2);
  makePillar(1.5, 1.2);
  makePillar(-1.5, 2.8);
  makePillar(1.5, 2.8);

  // 9. Cabin Interior (Seats & Steering Wheel)
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x292524, roughness: 0.9 });
  const seatDriver = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.1, 1.1), seatMat);
  seatDriver.position.set(-0.75, 1.8, 0.3);
  const seatPass = seatDriver.clone();
  seatPass.position.x = 0.75;
  const steerWheel = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.045, 8, 16), darkMetalMat);
  steerWheel.position.set(-0.75, 2.3, -0.4);
  steerWheel.rotation.x = 0.45;
  jeepGroup.add(seatDriver, seatPass, steerWheel);

  // 10. Spare Tire on Tailgate
  const spareWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.5, 16), tireMat);
  spareWheel.position.set(0, 1.9, 3.55);
  spareWheel.rotation.x = Math.PI / 2;
  jeepGroup.add(spareWheel);

  // 11. 4 Thick Off-Road Wheels with Steerable Front Pivots
  function createWheelMesh() {
    const wGroup = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.65, 18), tireMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.68, 12), rimMat);
    rim.rotation.z = Math.PI / 2;
    wGroup.add(tire, rim);
    return { group: wGroup, tire: tire };
  }

  // Front-Left with steering pivot
  const flPivot = new THREE.Group();
  flPivot.position.set(-1.85, 0.75, -2.0);
  const flWheel = createWheelMesh();
  flPivot.add(flWheel.group);
  jeepGroup.add(flPivot);

  // Front-Right with steering pivot
  const frPivot = new THREE.Group();
  frPivot.position.set(1.85, 0.75, -2.0);
  const frWheel = createWheelMesh();
  frPivot.add(frWheel.group);
  jeepGroup.add(frPivot);

  // Rear Wheels
  const rlWheel = createWheelMesh();
  rlWheel.group.position.set(-1.85, 0.75, 2.0);
  jeepGroup.add(rlWheel.group);

  const rrWheel = createWheelMesh();
  rrWheel.group.position.set(1.85, 0.75, 2.0);
  jeepGroup.add(rrWheel.group);

  jeepGroup.position.set(startX, 0, startZ);
  jeepGroup.rotation.y = startAngle;

  return {
    group: jeepGroup,
    wheels: {
      flPivot: flPivot,
      frPivot: frPivot,
      flTire: flWheel.tire,
      frTire: frWheel.tire,
      rlTire: rlWheel.tire,
      rrTire: rrWheel.tire
    },
    pos: new THREE.Vector3(startX, 0, startZ),
    vel: new THREE.Vector3(0, 0, 0),
    speed: 0,
    angle: startAngle,
    steerAngle: 0,
    isDriven: false,
    maxSpeed: 82,
    reverseMax: -26,
    accel: 38,
    brakeDecel: 52,
    friction: 0.985,
    turnSpeed: 2.3
  };
}

// ==========================================
// 11. GIANT PUBG SURVIVAL MAP (ENTERABLE HOUSES, WAREHOUSE, TOWERS & LOOT)
// ==========================================
// Silencer / Suppressor 3D Tactical Mesh
function createSilencerModel() {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x111317, roughness: 0.35, metalness: 0.85 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.32, 16), mat);
  body.rotation.x = Math.PI / 2;
  const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.04, 16), new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.5 }));
  tip.rotation.x = Math.PI / 2;
  tip.position.z = 0.18;
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.06, 16), new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.6 }));
  collar.rotation.x = Math.PI / 2;
  collar.position.z = -0.16;
  group.add(body, tip, collar);
  return group;
}

// ==========================================
// 11. GIANT 1400-METER PUBG SURVIVAL MAP (POCHINKI, MILITARY, FARM, BRIDGE, RNG LOOT & SILENCERS)
// ==========================================

function createDeathCrateModel() {
  const g = new THREE.Group();
  const crateMat = new THREE.MeshStandardMaterial({ color: 0x1e3a2f, roughness: 0.6, metalness: 0.3 });
  const strapMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8 });
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.7, 0.9), crateMat);
  box.position.y = 0.35;
  box.castShadow = true;
  g.add(box);

  const strap1 = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.72, 0.16), strapMat);
  strap1.position.set(0, 0.35, -0.22);
  const strap2 = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.72, 0.16), strapMat);
  strap2.position.set(0, 0.35, 0.22);
  g.add(strap1, strap2);

  // Tactical beacon / glow ring on ground
  const ringGeom = new THREE.RingGeometry(0.8, 1.2, 16);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.75 });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.04;
  g.add(ring);
  g.lootRing = ring;

  return g;
}


// 10.5 MILITARY CARGO TRANSPORT PLANE & PARACHUTE MODELS (PUBG AIR DROP)
function createMilitaryCargoPlane() {
  const g = new THREE.Group();
  const planeMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.4 });
  const wingMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.4 });
  const engineMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.6 });
  const propMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

  // Fuselage (Body)
  const body = new THREE.Mesh(new THREE.BoxGeometry(7, 6.5, 38), planeMat);
  body.castShadow = true;
  g.add(body);

  // Cockpit Nose (Tapered)
  const nose = new THREE.Mesh(new THREE.ConeGeometry(4.2, 8, 4), planeMat);
  nose.rotation.x = -Math.PI / 2;
  nose.rotation.y = Math.PI / 4;
  nose.position.set(0, 0, 23);
  g.add(nose);

  // Wings (Giant Main Wingspan: 48m)
  const wings = new THREE.Mesh(new THREE.BoxGeometry(48, 0.6, 7), wingMat);
  wings.position.set(0, 2.5, 2);
  wings.castShadow = true;
  g.add(wings);

  // Tail Vertical Fin & Rudder
  const vFin = new THREE.Mesh(new THREE.BoxGeometry(0.8, 9, 7), wingMat);
  vFin.position.set(0, 7.5, -17);
  const hStab = new THREE.Mesh(new THREE.BoxGeometry(16, 0.5, 5), wingMat);
  hStab.position.set(0, 8.5, -17);
  g.add(vFin, hStab);

  // 4 Turboprop Engines & Spinning Propellers
  const engineX = [-14, -7, 7, 14];
  engineX.forEach(ex => {
    const nacelle = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 6, 12), engineMat);
    nacelle.rotation.x = Math.PI / 2;
    nacelle.position.set(ex, 1.5, 5);
    g.add(nacelle);

    // Propeller Blades
    const prop1 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.25, 0.08), propMat);
    const prop2 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.6, 0.08), propMat);
    prop1.position.set(ex, 1.5, 8.1);
    prop2.position.set(ex, 1.5, 8.1);
    g.add(prop1, prop2);
  });

  // Open Rear Cargo Loading Door (Where players jump from!)
  const cargoRamp = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.3, 5), wingMat);
  cargoRamp.position.set(0, -2.4, -20.5);
  cargoRamp.rotation.x = 0.35;
  g.add(cargoRamp);

  return g;
}

function createParachuteModel() {
  const g = new THREE.Group();
  const chuteMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.9, side: THREE.DoubleSide });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.9, side: THREE.DoubleSide });
  const cordMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });

  // Main Domed Parachute Canopy
  const canopy = new THREE.Mesh(new THREE.SphereGeometry(3.6, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.45), chuteMat);
  canopy.position.set(0, 4.8, 0);
  g.add(canopy);

  // Orange Accent Stripe
  const stripe = new THREE.Mesh(new THREE.SphereGeometry(3.62, 16, 4, 0, Math.PI * 2, Math.PI * 0.18, Math.PI * 0.08), trimMat);
  stripe.position.set(0, 4.8, 0);
  g.add(stripe);

  // Suspension Cords (Lines down to player)
  for (let c = 0; c < 8; c++) {
    const ang = (c / 8) * Math.PI * 2;
    const topX = Math.cos(ang) * 3.4;
    const topZ = Math.sin(ang) * 3.4;
    const lineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(topX, 4.8 - 0.9, topZ),
      new THREE.Vector3(0, 0.2, 0)
    ]);
    const line = new THREE.Line(lineGeom, cordMat);
    g.add(line);
  }

  return g;
}

function createPubgSurvivalMap() {
  const mapGroup = new THREE.Group();
  const colliders = [];
  const lootItems = [];
  const spawnPoints = [];

  // Materials
  const floorWoodMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
  const brickMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.85 });
  const woodWallMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
  const roofTileMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.7 });
  const metalBridgeMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.3 });
  const warehouseMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
  const dirtRoadMat = new THREE.MeshStandardMaterial({ color: 0x78563a, roughness: 0.95 });
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, transparent: true, opacity: 0.85 });
  const containerColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6, 0x06b6d4];
  const schoolYellowMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 });
  const schoolRoofMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
  const poolTileMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.35 });

  // Helper Box with collider
  const addBoxObject = (w, h, d, x, y, z, mat, hasCollider = true) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y + h / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mapGroup.add(mesh);
    if (hasCollider) {
      colliders.push({
        minX: x - w / 2, maxX: x + w / 2,
        minZ: z - d / 2, maxZ: z + d / 2,
        minY: y, maxY: y + h
      });
    }
    return mesh;
  };

  // 1. CLEAN NATURAL PUBG TERRAIN (2600m x 2600m - No strange cone spikes!)
  pubgGrassTex.repeat.set(130, 130);
  const terrainMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2600, 2600),
    new THREE.MeshStandardMaterial({ map: pubgGrassTex, roughness: 0.85 })
  );
  terrainMesh.rotation.x = -Math.PI / 2;
  terrainMesh.position.set(0, 0, 0);
  terrainMesh.receiveShadow = true;
  mapGroup.add(terrainMesh);

  // Distant Ocean / Water Ring Surrounding Map
  const oceanMesh = new THREE.Mesh(
    new THREE.RingGeometry(1290, 2200, 32),
    waterMat
  );
  oceanMesh.rotation.x = -Math.PI / 2;
  oceanMesh.position.set(0, -0.2, 0);
  mapGroup.add(oceanMesh);

  // 2. MAIN ASPHALT HIGHWAY (Z: -1250 to +1250, Width: 16m)
  pubgRoadTex.repeat.set(1, 100);
  const highwayMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 2500),
    new THREE.MeshStandardMaterial({ map: pubgRoadTex, roughness: 0.6, metalness: 0.1 })
  );
  highwayMesh.rotation.x = -Math.PI / 2;
  highwayMesh.position.set(0, 0.04, 0);
  highwayMesh.receiveShadow = true;
  mapGroup.add(highwayMesh);

  // East-West Cross Avenues
  const addCrossRoad = (zPos, width = 14, length = 1000, xOffset = 0) => {
    const cr = new THREE.Mesh(new THREE.PlaneGeometry(width, length), dirtRoadMat);
    cr.rotation.x = -Math.PI / 2;
    cr.rotation.z = Math.PI / 2;
    cr.position.set(xOffset, 0.05, zPos);
    mapGroup.add(cr);
  };
  addCrossRoad(820, 14, 1100, 50);    // Rozhok Avenue
  addCrossRoad(420, 14, 900, 150);    // School Avenue
  addCrossRoad(-120, 16, 1200, -80);  // Pochinki Boulevard
  addCrossRoad(-600, 14, 800, 100);   // Farm Road

  // 3. RIVER & SUSPENSION HIGHWAY BRIDGE (Z: 110 to 190)
  const riverMesh = new THREE.Mesh(new THREE.PlaneGeometry(800, 80), waterMat);
  riverMesh.rotation.x = -Math.PI / 2;
  riverMesh.position.set(0, 0.02, 150);
  mapGroup.add(riverMesh);

  // Steel Truss Bridge
  addBoxObject(18, 1.2, 90, 0, 1.2, 150, concreteMat);
  addBoxObject(1.4, 24, 1.4, -9.5, 1.2, 120, metalBridgeMat);
  addBoxObject(1.4, 24, 1.4, 9.5, 1.2, 120, metalBridgeMat);
  addBoxObject(1.4, 24, 1.4, -9.5, 1.2, 180, metalBridgeMat);
  addBoxObject(1.4, 24, 1.4, 9.5, 1.2, 180, metalBridgeMat);
  addBoxObject(20.4, 1.4, 1.4, 0, 24, 120, metalBridgeMat);
  addBoxObject(20.4, 1.4, 1.4, 0, 24, 180, metalBridgeMat);
  addBoxObject(0.8, 1.4, 90, -9.5, 1.8, 150, metalBridgeMat);
  addBoxObject(0.8, 1.4, 90, 9.5, 1.8, 150, metalBridgeMat);

  // 4. ENTERABLE HOUSE GENERATOR (100% OPEN DOORWAYS & CLIMBABLE STAIRS)
  const addEnterableHouse = (cx, cz, rotY = 0) => {
    const houseGroup = new THREE.Group();
    houseGroup.position.set(cx, 0, cz);
    houseGroup.rotation.y = rotY;

    // Ground Floor Plate
    const gf = new THREE.Mesh(new THREE.BoxGeometry(16, 0.3, 20), floorWoodMat);
    gf.position.set(0, 0.15, 0);
    houseGroup.add(gf);

    const addHW = (w, h, d, px, py, pz, mat = brickMat) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(px, py + h / 2, pz);
      m.castShadow = true; m.receiveShadow = true;
      houseGroup.add(m);
    };

    // Ground Floor Walls
    addHW(16, 5.8, 0.5, 0, 0.3, -9.75); // Back Wall
    addHW(0.5, 5.8, 20, -7.75, 0.3, 0); // Left Wall
    addHW(0.5, 5.8, 20, 7.75, 0.3, 0);  // Right Wall
    addHW(5.5, 5.8, 0.5, -5.25, 0.3, 9.75); // Front Wall Left
    addHW(5.5, 5.8, 0.5, 5.25, 0.3, 9.75);  // Front Wall Right
    addHW(5.0, 1.8, 0.5, 0, 4.3, 9.75);     // Door Header (Doorway width 5.0m, height 4.0m)

    // Interior Ground Partition Wall with doorway
    addHW(6, 5.8, 0.4, 4.5, 0.3, 0);
    addHW(4, 5.8, 0.4, -5.5, 0.3, 0);
    addHW(6, 1.6, 0.4, -0.5, 4.5, 0);

    // 2nd Floor Slab
    const f2Geom = new THREE.BoxGeometry(16, 0.35, 20);
    const floor2 = new THREE.Mesh(f2Geom, floorWoodMat);
    floor2.position.set(0, 6.1, 0);
    houseGroup.add(floor2);

    // 2nd Floor Walls & Open Balcony
    addHW(16, 5.2, 0.5, 0, 6.25, -9.75);
    addHW(0.5, 5.2, 20, -7.75, 6.25, 0);
    addHW(0.5, 5.2, 20, 7.75, 6.25, 0);
    addHW(5.5, 5.2, 0.5, -5.25, 6.25, 9.75);
    addHW(5.5, 5.2, 0.5, 5.25, 6.25, 9.75);
    addHW(5.0, 1.4, 0.5, 0, 10.05, 9.75);

    // Open Balcony Railing
    const bFloor = new THREE.Mesh(new THREE.BoxGeometry(8, 0.3, 4), concreteMat);
    bFloor.position.set(0, 6.1, 11.8);
    houseGroup.add(bFloor);
    addHW(8, 1.2, 0.3, 0, 6.25, 13.7, metalBridgeMat);
    addHW(0.3, 1.2, 4, -3.9, 6.25, 11.8, metalBridgeMat);
    addHW(0.3, 1.2, 4, 3.9, 6.25, 11.8, metalBridgeMat);

    // Pitched Roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(12, 3.8, 4), roofTileMat);
    roof.position.set(0, 13.4, 0);
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);

    // Interior Climbable Wooden Staircase
    const numSteps = 14;
    const stepH = 5.9 / numSteps; // ~0.42m
    const stepD = 14.0 / numSteps; // ~1.0m
    for (let st = 0; st < numSteps; st++) {
      const stepMesh = new THREE.Mesh(new THREE.BoxGeometry(2.6, stepH, stepD), woodWallMat);
      stepMesh.position.set(5.5, 0.3 + (st + 0.5) * stepH, -7.5 + (st + 0.5) * stepD);
      houseGroup.add(stepMesh);
    }

    mapGroup.add(houseGroup);

    // Colliders for Enterable House
    if (rotY === Math.PI) {
      colliders.push({ minX: cx - 8.2, maxX: cx + 8.2, minZ: cz + 9.3, maxZ: cz + 10.3, minY: 0, maxY: 12 });
      colliders.push({ minX: cx - 8.2, maxX: cx - 2.8, minZ: cz - 10.3, maxZ: cz - 9.3, minY: 0, maxY: 12 });
      colliders.push({ minX: cx + 2.8, maxX: cx + 8.2, minZ: cz - 10.3, maxZ: cz - 9.3, minY: 0, maxY: 12 });
    } else {
      colliders.push({ minX: cx - 8.2, maxX: cx + 8.2, minZ: cz - 10.3, maxZ: cz - 9.3, minY: 0, maxY: 12 });
      colliders.push({ minX: cx - 8.2, maxX: cx - 2.8, minZ: cz + 9.3, maxZ: cz + 10.3, minY: 0, maxY: 12 });
      colliders.push({ minX: cx + 2.8, maxX: cx + 8.2, minZ: cz + 9.3, maxZ: cz + 10.3, minY: 0, maxY: 12 });
    }
    colliders.push({ minX: cx - 8.3, maxX: cx - 7.3, minZ: cz - 10.3, maxZ: cz + 10.3, minY: 0, maxY: 12 });
    colliders.push({ minX: cx + 7.3, maxX: cx + 8.3, minZ: cz - 10.3, maxZ: cz + 10.3, minY: 0, maxY: 12 });

    // Stair Colliders
    if (rotY === Math.PI) {
      for (let st = 0; st < numSteps; st++) {
        const sZ = cz + 7.5 - st * stepD;
        const sY = 0.2 + (st + 1) * stepH;
        colliders.push({ minX: cx - 6.9, maxX: cx - 4.1, minZ: sZ - stepD * 0.55, maxZ: sZ + stepD * 0.55, minY: 0, maxY: sY });
      }
      colliders.push({ minX: cx - 3.8, maxX: cx + 7.8, minZ: cz - 9.8, maxZ: cz + 9.8, minY: 5.9, maxY: 6.35 });
      colliders.push({ minX: cx - 7.8, maxX: cx - 3.8, minZ: cz - 9.8, maxZ: cz - 0.5, minY: 5.9, maxY: 6.35 });
      colliders.push({ minX: cx - 4.0, maxX: cx + 4.0, minZ: cz - 13.8, maxZ: cz - 9.8, minY: 5.9, maxY: 6.35 });
    } else {
      for (let st = 0; st < numSteps; st++) {
        const sZ = cz - 7.5 + st * stepD;
        const sY = 0.2 + (st + 1) * stepH;
        colliders.push({ minX: cx + 4.1, maxX: cx + 6.9, minZ: sZ - stepD * 0.55, maxZ: sZ + stepD * 0.55, minY: 0, maxY: sY });
      }
      colliders.push({ minX: cx - 7.8, maxX: cx + 3.8, minZ: cz - 9.8, maxZ: cz + 9.8, minY: 5.9, maxY: 6.35 });
      colliders.push({ minX: cx + 3.8, maxX: cx + 7.8, minZ: cz + 0.5, maxZ: cz + 9.8, minY: 5.9, maxY: 6.35 });
      colliders.push({ minX: cx - 4.0, maxX: cx + 4.0, minZ: cz + 9.8, maxZ: cz + 13.8, minY: 5.9, maxY: 6.35 });
    }
  };

  // 5. PUBG SCHOOL COMPLEX & ADJACENT INDOOR SWIMMING POOL (Z: 420, X: 350)
  const addPubgSchool = (cx, cz) => {
    const schoolGroup = new THREE.Group();
    schoolGroup.position.set(cx, 0, cz);

    const gFloor = new THREE.Mesh(new THREE.BoxGeometry(54, 0.4, 40), concreteMat);
    gFloor.position.set(0, 0.2, 0);
    schoolGroup.add(gFloor);

    const addSW = (w, h, d, px, py, pz, mat = schoolYellowMat) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(px, py + h / 2, pz);
      m.castShadow = true; m.receiveShadow = true;
      schoolGroup.add(m);
    };

    // Ground Floor Outer Walls
    addSW(23, 5.2, 0.6, -15.5, 0.4, 19.7);
    addSW(23, 5.2, 0.6, 15.5, 0.4, 19.7);
    addSW(8, 1.4, 0.6, 0, 4.2, 19.7);
    addSW(54, 5.2, 0.6, 0, 0.4, -19.7);
    addSW(0.6, 5.2, 40, -26.7, 0.4, 0);
    addSW(0.6, 5.2, 40, 26.7, 0.4, 0);

    // Ground Floor Classroom Partition Walls
    addSW(20, 5.0, 0.4, -15, 0.4, 0);
    addSW(20, 5.0, 0.4, 15, 0.4, 0);
    addSW(0.4, 5.0, 16, -6, 0.4, 10);
    addSW(0.4, 5.0, 16, 6, 0.4, 10);
    addSW(0.4, 5.0, 16, -6, 0.4, -10);
    addSW(0.4, 5.0, 16, 6, 0.4, -10);

    // 2nd Floor Slab
    const floor2 = new THREE.Mesh(new THREE.BoxGeometry(46, 0.4, 40), floorWoodMat);
    floor2.position.set(0, 5.6, 0);
    schoolGroup.add(floor2);

    // 2nd Floor Walls
    addSW(54, 4.8, 0.6, 0, 5.8, 19.7, schoolYellowMat);
    addSW(54, 4.8, 0.6, 0, 5.8, -19.7, schoolYellowMat);
    addSW(0.6, 4.8, 40, -26.7, 5.8, 0, schoolYellowMat);
    addSW(0.6, 4.8, 40, 26.7, 5.8, 0, schoolYellowMat);
    addSW(0.4, 4.8, 38, -6, 5.8, 0, concreteMat);
    addSW(0.4, 4.8, 38, 6, 5.8, 0, concreteMat);

    // School Roof Terrace (10.6m high)
    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(54, 0.5, 40), schoolRoofMat);
    roofSlab.position.set(0, 10.6, 0);
    schoolGroup.add(roofSlab);

    // Roof Parapets
    addSW(54, 1.2, 0.5, 0, 10.85, 19.75, concreteMat);
    addSW(54, 1.2, 0.5, 0, 10.85, -19.75, concreteMat);
    addSW(0.5, 1.2, 40, -26.75, 10.85, 0, concreteMat);
    addSW(0.5, 1.2, 40, 26.75, 10.85, 0, concreteMat);

    // Roof HVAC & sniper sandbags
    addSW(6, 2.2, 4, -12, 10.85, 6, warehouseMat);
    addSW(6, 2.2, 4, 12, 10.85, -6, warehouseMat);
    addSW(8, 1.4, 1.2, 0, 10.85, 14, concreteMat);

    // Interior Stairs
    for (let st = 0; st < 13; st++) {
      const step1 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.4, 0.6), concreteMat);
      step1.position.set(-22, 0.2 + (st + 0.5) * 0.4, -12 + st * 0.6);
      schoolGroup.add(step1);
      const step2 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.4, 0.6), concreteMat);
      step2.position.set(-22, 5.6 + (st + 0.5) * 0.4, -4 + st * 0.6);
      schoolGroup.add(step2);
    }
    for (let st = 0; st < 13; st++) {
      const step1 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.4, 0.6), concreteMat);
      step1.position.set(22, 0.2 + (st + 0.5) * 0.4, 12 - st * 0.6);
      schoolGroup.add(step1);
      const step2 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.4, 0.6), concreteMat);
      step2.position.set(22, 5.6 + (st + 0.5) * 0.4, 4 - st * 0.6);
      schoolGroup.add(step2);
    }

    // Indoor Swimming Pool Hall (X: -43)
    const poolFloor = new THREE.Mesh(new THREE.BoxGeometry(30, 0.4, 28), concreteMat);
    poolFloor.position.set(-43, 0.2, 0);
    schoolGroup.add(poolFloor);
    const poolBasin = new THREE.Mesh(new THREE.BoxGeometry(18, 0.2, 12), poolTileMat);
    poolBasin.position.set(-43, 0.3, 0);
    schoolGroup.add(poolBasin);
    addSW(1.5, 3.2, 1.5, -50, 0.4, 0, metalBridgeMat);
    addSW(5.5, 0.3, 1.8, -47.5, 3.6, 0, concreteMat);
    addSW(30, 11, 0.6, -43, 0.4, 13.7, brickMat);
    addSW(30, 11, 0.6, -43, 0.4, -13.7, brickMat);
    addSW(0.6, 11, 28, -57.7, 0.4, 0, brickMat);
    addSW(6, 11, 0.6, -30, 0.4, 4, concreteMat);
    addSW(6, 11, 0.6, -30, 0.4, -4, concreteMat);

    // Basketball Courtyard
    const court = new THREE.Mesh(new THREE.PlaneGeometry(28, 18), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 }));
    court.rotation.x = -Math.PI / 2;
    court.position.set(0, 0.05, 32);
    schoolGroup.add(court);

    mapGroup.add(schoolGroup);

    // Colliders for School
    colliders.push({ minX: cx - 27, maxX: cx + 27, minZ: cz - 20, maxZ: cz - 19, minY: 0, maxY: 12 });
    colliders.push({ minX: cx - 27, maxX: cx - 4, minZ: cz + 19, maxZ: cz + 20, minY: 0, maxY: 12 });
    colliders.push({ minX: cx + 4, maxX: cx + 27, minZ: cz + 19, maxZ: cz + 20, minY: 0, maxY: 12 });
    colliders.push({ minX: cx - 27.2, maxX: cx - 26.2, minZ: cz - 20, maxZ: cz + 20, minY: 0, maxY: 12 });
    colliders.push({ minX: cx + 26.2, maxX: cx + 27.2, minZ: cz - 20, maxZ: cz + 20, minY: 0, maxY: 12 });
    colliders.push({ minX: cx - 26, maxX: cx + 26, minZ: cz - 19, maxZ: cz + 19, minY: 5.4, maxY: 5.85 });
    colliders.push({ minX: cx - 27, maxX: cx + 27, minZ: cz - 20, maxZ: cz + 20, minY: 10.4, maxY: 10.85 });
    colliders.push({ minX: cx - 58, maxX: cx - 28, minZ: cz - 14, maxZ: cz - 13, minY: 0, maxY: 12 });
    colliders.push({ minX: cx - 58, maxX: cx - 28, minZ: cz + 13, maxZ: cz + 14, minY: 0, maxY: 12 });
    colliders.push({ minX: cx - 58.2, maxX: cx - 57.2, minZ: cz - 14, maxZ: cz + 14, minY: 0, maxY: 12 });
  };
  addPubgSchool(350, 420);

  // 6. THREE-STORY APARTMENT BUILDINGS (School Apartments & Yasnaya)
  const addApartmentBuilding = (ax, az, rotY = 0) => {
    const apt = new THREE.Group();
    apt.position.set(ax, 0, az);
    apt.rotation.y = rotY;

    const gf = new THREE.Mesh(new THREE.BoxGeometry(22, 0.4, 22), concreteMat);
    gf.position.set(0, 0.2, 0);
    apt.add(gf);

    const addAW = (w, h, d, px, py, pz, mat = brickMat) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(px, py + h / 2, pz);
      m.castShadow = true; m.receiveShadow = true;
      apt.add(m);
    };

    for (let fl = 0; fl < 3; fl++) {
      const yBase = 0.4 + fl * 4.2;
      if (fl > 0) {
        const slab = new THREE.Mesh(new THREE.BoxGeometry(20, 0.35, 20), floorWoodMat);
        slab.position.set(0, yBase, 0);
        apt.add(slab);
      }
      if (fl === 0) {
        addAW(8, 4.0, 0.5, -6.5, yBase, 10.7);
        addAW(8, 4.0, 0.5, 6.5, yBase, 10.7);
      } else {
        addAW(22, 4.0, 0.5, 0, yBase, 10.7);
      }
      addAW(22, 4.0, 0.5, 0, yBase, -10.7);
      addAW(0.5, 4.0, 22, -10.7, yBase, 0);
      addAW(0.5, 4.0, 22, 10.7, yBase, 0);
      addAW(0.4, 4.0, 14, 0, yBase, -3);

      for (let st = 0; st < 10; st++) {
        const sm = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.42, 0.55), concreteMat);
        sm.position.set(-6, yBase + (st + 0.5) * 0.42, -7 + st * 0.55);
        apt.add(sm);
      }
    }

    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(22, 0.4, 22), concreteMat);
    roofSlab.position.set(0, 13.2, 0);
    apt.add(roofSlab);
    addAW(22, 1.2, 0.4, 0, 13.4, 10.8, concreteMat);
    addAW(22, 1.2, 0.4, 0, 13.4, -10.8, concreteMat);
    addAW(0.4, 1.2, 22, -10.8, 13.4, 0, concreteMat);
    addAW(0.4, 1.2, 22, 10.8, 13.4, 0, concreteMat);

    mapGroup.add(apt);

    colliders.push({ minX: ax - 11.2, maxX: ax + 11.2, minZ: az - 11.2, maxZ: az - 10.2, minY: 0, maxY: 14.5 });
    colliders.push({ minX: ax - 11.2, maxX: ax - 2.8, minZ: az + 10.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 });
    colliders.push({ minX: ax + 2.8, maxX: ax + 11.2, minZ: az + 10.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 });
    colliders.push({ minX: ax - 11.2, maxX: ax - 10.2, minZ: az - 11.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 });
    colliders.push({ minX: ax + 10.2, maxX: ax + 11.2, minZ: az - 11.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 });
    colliders.push({ minX: ax - 11, maxX: ax + 11, minZ: az - 11, maxZ: az + 11, minY: 13.0, maxY: 13.45 });
  };

  // School Apartments Cluster
  addApartmentBuilding(460, 390, 0);
  addApartmentBuilding(460, 450, 0);
  addApartmentBuilding(510, 420, Math.PI / 2);

  // 7. POCHINKI CHURCH & CLIMBABLE BELL TOWER
  const addPochinkiChurch = (cx, cz) => {
    const ch = new THREE.Group();
    ch.position.set(cx, 0, cz);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.95 });

    const fl = new THREE.Mesh(new THREE.BoxGeometry(18, 0.4, 34), stoneMat);
    fl.position.set(0, 0.2, 0);
    ch.add(fl);

    const addCW = (w, h, d, px, py, pz) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), stoneMat);
      m.position.set(px, py + h / 2, pz);
      ch.add(m);
    };
    addCW(18, 12, 0.8, 0, 0.4, -16.6);
    addCW(0.8, 12, 34, -8.6, 0.4, 0);
    addCW(0.8, 12, 34, 8.6, 0.4, 0);
    addCW(6.5, 12, 0.8, -5.5, 0.4, 16.6);
    addCW(6.5, 12, 0.8, 5.5, 0.4, 16.6);
    addCW(5, 4.5, 0.8, 0, 7.5, 16.6);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(14, 6, 4), roofTileMat);
    roof.position.set(0, 15, 0);
    roof.rotation.y = Math.PI / 4;
    ch.add(roof);

    const tower = new THREE.Mesh(new THREE.BoxGeometry(7, 26, 7), stoneMat);
    tower.position.set(-8.5, 13, 16.5);
    ch.add(tower);
    const spire = new THREE.Mesh(new THREE.ConeGeometry(5.5, 8, 4), roofTileMat);
    spire.position.set(-8.5, 30, 16.5);
    spire.rotation.y = Math.PI / 4;
    ch.add(spire);

    mapGroup.add(ch);

    colliders.push({ minX: cx - 9.2, maxX: cx + 9.2, minZ: cz - 17.2, maxZ: cz - 16.0, minY: 0, maxY: 13 });
    colliders.push({ minX: cx - 9.2, maxX: cx - 2.5, minZ: cz + 16.0, maxZ: cz + 17.2, minY: 0, maxY: 13 });
    colliders.push({ minX: cx + 2.5, maxX: cx + 9.2, minZ: cz + 16.0, maxZ: cz + 17.2, minY: 0, maxY: 13 });
    colliders.push({ minX: cx - 9.2, maxX: cx - 8.0, minZ: cz - 17.2, maxZ: cz + 17.2, minY: 0, maxY: 13 });
    colliders.push({ minX: cx + 8.0, maxX: cx + 9.2, minZ: cz - 17.2, maxZ: cz + 17.2, minY: 0, maxY: 13 });
  };
  addPochinkiChurch(-340, -10);

  // 8. DENSE POCHINKI TOWN (16 ENTERABLE 2-STORY HOUSES!)
  // South Avenue (Z: -60)
  addEnterableHouse(-45, -60, 0);
  addEnterableHouse(-80, -60, 0);
  addEnterableHouse(-115, -60, 0);
  addEnterableHouse(-150, -60, 0);
  addEnterableHouse(-185, -60, 0);
  addEnterableHouse(-220, -60, 0);
  addEnterableHouse(-255, -60, 0);
  addEnterableHouse(-290, -60, 0);

  // North Avenue (Z: 40)
  addEnterableHouse(-45, 40, Math.PI);
  addEnterableHouse(-80, 40, Math.PI);
  addEnterableHouse(-115, 40, Math.PI);
  addEnterableHouse(-150, 40, Math.PI);
  addEnterableHouse(-185, 40, Math.PI);
  addEnterableHouse(-220, 40, Math.PI);
  addEnterableHouse(-255, 40, Math.PI);
  addEnterableHouse(-290, 40, Math.PI);

  // Pochinki Stone Walls & Fences
  addBoxObject(110, 1.5, 0.6, -110, 0, -85, concreteMat);
  addBoxObject(110, 1.5, 0.6, -235, 0, -85, concreteMat);
  addBoxObject(110, 1.5, 0.6, -110, 0, 65, concreteMat);
  addBoxObject(110, 1.5, 0.6, -235, 0, 65, concreteMat);

  // 9. ROZHOK RIDGE (12 ENTERABLE 2-STORY HOUSES)
  // South Row (Z: 760)
  addEnterableHouse(-40, 760, 0);
  addEnterableHouse(0, 760, 0);
  addEnterableHouse(40, 760, 0);
  addEnterableHouse(80, 760, 0);
  addEnterableHouse(120, 760, 0);
  addEnterableHouse(160, 760, 0);

  // North Row (Z: 880)
  addEnterableHouse(-40, 880, Math.PI);
  addEnterableHouse(0, 880, Math.PI);
  addEnterableHouse(40, 880, Math.PI);
  addEnterableHouse(80, 880, Math.PI);
  addEnterableHouse(120, 880, Math.PI);
  addEnterableHouse(160, 880, Math.PI);

  // Rozhok Water Tower
  const wtLegMat = metalBridgeMat;
  addBoxObject(1.2, 28, 1.2, 55, 0, 820, wtLegMat);
  addBoxObject(1.2, 28, 1.2, 65, 0, 820, wtLegMat);
  addBoxObject(1.2, 28, 1.2, 55, 0, 830, wtLegMat);
  addBoxObject(1.2, 28, 1.2, 65, 0, 830, wtLegMat);
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 12, 16), concreteMat);
  tank.position.set(60, 34, 825);
  mapGroup.add(tank);

  // 10. YASNAYA POLYANA (8 HOUSES + 2 APARTMENTS + CLOCK TOWER)
  addEnterableHouse(220, 750, 0);
  addEnterableHouse(260, 750, 0);
  addEnterableHouse(300, 750, 0);
  addEnterableHouse(340, 750, 0);
  addEnterableHouse(220, 840, Math.PI);
  addEnterableHouse(260, 840, Math.PI);
  addEnterableHouse(300, 840, Math.PI);
  addEnterableHouse(340, 840, Math.PI);
  addApartmentBuilding(380, 740, 0);
  addApartmentBuilding(380, 840, Math.PI);

  // Yasnaya Clock Tower
  addBoxObject(10, 36, 10, 300, 0, 800, brickMat);
  const clockDial = addBoxObject(4.5, 4.5, 0.4, 300, 30, 805.2, floorWoodMat);

  // 11. FARM ESTATE (6 ENTERABLE HOUSES + 2 RED BARNS)
  addEnterableHouse(80, -550, 0);
  addEnterableHouse(120, -550, 0);
  addEnterableHouse(160, -550, 0);
  addEnterableHouse(80, -650, Math.PI);
  addEnterableHouse(120, -650, Math.PI);
  addEnterableHouse(160, -650, Math.PI);

  const addBarn = (bx, bz) => {
    const barn = new THREE.Group();
    barn.position.set(bx, 0, bz);
    const bMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.8 });
    const fl = new THREE.Mesh(new THREE.BoxGeometry(28, 0.3, 18), floorWoodMat);
    fl.position.set(0, 0.15, 0);
    barn.add(fl);
    const w1 = new THREE.Mesh(new THREE.BoxGeometry(28, 8, 0.4), bMat); w1.position.set(0, 4, -8.8);
    const w2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8, 18), bMat); w2.position.set(-13.8, 4, 0);
    const w3 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8, 18), bMat); w3.position.set(13.8, 4, 0);
    const w4a = new THREE.Mesh(new THREE.BoxGeometry(10, 8, 0.4), bMat); w4a.position.set(-8.8, 4, 8.8);
    const w4b = new THREE.Mesh(new THREE.BoxGeometry(10, 8, 0.4), bMat); w4b.position.set(8.8, 4, 8.8);
    barn.add(w1, w2, w3, w4a, w4b);
    mapGroup.add(barn);

    colliders.push({ minX: bx - 14.2, maxX: bx + 14.2, minZ: bz - 9.2, maxZ: bz - 8.2, minY: 0, maxY: 8 });
    colliders.push({ minX: bx - 14.2, maxX: bx - 13.2, minZ: bz - 9.2, maxZ: bz + 9.2, minY: 0, maxY: 8 });
    colliders.push({ minX: bx + 13.2, maxX: bx + 14.2, minZ: bz - 9.2, maxZ: bz + 9.2, minY: 0, maxY: 8 });
    colliders.push({ minX: bx - 14.2, maxX: bx - 4.0, minZ: bz + 8.2, maxZ: bz + 9.2, minY: 0, maxY: 8 });
    colliders.push({ minX: bx + 4.0, maxX: bx + 14.2, minZ: bz + 8.2, maxZ: bz + 9.2, minY: 0, maxY: 8 });
  };
  addBarn(120, -470);
  addBarn(180, -470);

  // 12. MYLTA & COASTAL SECTOR (6 HOUSES & LIGHTHOUSE)
  addEnterableHouse(-120, -750, 0);
  addEnterableHouse(-160, -750, 0);
  addEnterableHouse(-200, -750, 0);
  addEnterableHouse(-120, -840, Math.PI);
  addEnterableHouse(-160, -840, Math.PI);
  addEnterableHouse(-200, -840, Math.PI);

  const lhBase = addBoxObject(12, 6, 12, -280, 0, -800, concreteMat);
  const lhTower = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 6.5, 28, 16), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.6 }));
  lhTower.position.set(-280, 20, -800);
  mapGroup.add(lhTower);
  colliders.push({ minX: -286, maxX: -274, minZ: -806, maxZ: -794, minY: 0, maxY: 34 });

  // 13. PORT CARGO CRANE & CONTAINERS
  addBoxObject(2.4, 38, 2.4, -280, 0, 640, metalBridgeMat);
  addBoxObject(2.4, 38, 2.4, -280, 0, 690, metalBridgeMat);
  addBoxObject(2.4, 4, 60, -280, 38, 665, metalBridgeMat);
  addBoxObject(30, 3, 2.4, -280, 38, 665, metalBridgeMat);

  const addContainer = (cx, cz, cy = 0, rotY = 0, colorIdx = 0) => {
    const cMat = new THREE.MeshStandardMaterial({ color: containerColors[colorIdx % containerColors.length], roughness: 0.5, metalness: 0.5 });
    const c = addBoxObject(4.5, 4.5, 12, cx, cy, cz, cMat);
    if (rotY !== 0) c.rotation.y = rotY;
  };
  for (let ci = 0; ci < 6; ci++) {
    addContainer(-240, 620 + ci * 14, 0, 0, ci);
    if (ci % 2 === 0) addContainer(-240, 620 + ci * 14, 4.5, 0, ci + 1);
    addContainer(-320, 620 + ci * 14, 0, 0, ci + 2);
    if (ci % 3 === 0) addContainer(-320, 620 + ci * 14, 4.5, 0, ci + 3);
  }

  // Military Warehouses
  const addWarehouse = (wx, wz, rot = 0) => {
    const wh = new THREE.Group();
    wh.position.set(wx, 0, wz);
    wh.rotation.y = rot;
    const wH = 11;
    const makeW = (w, h, d, px, pz) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), warehouseMat);
      m.position.set(px, h / 2, pz);
      wh.add(m);
    };
    makeW(45, wH, 0.6, 0, -12.7);
    makeW(0.6, wH, 26, -22.2, 0);
    makeW(0.6, wH, 26, 22.2, 0);
    makeW(16, wH, 0.6, -14.2, 12.7);
    makeW(16, wH, 0.6, 14.2, 12.7);
    const roofGeom = new THREE.CylinderGeometry(14, 14, 46, 24, 1, false, 0, Math.PI);
    const roofM = new THREE.Mesh(roofGeom, warehouseMat);
    roofM.rotation.z = Math.PI / 2;
    roofM.position.set(0, wH, 0);
    wh.add(roofM);
    mapGroup.add(wh);

    colliders.push({ minX: wx - 23, maxX: wx + 23, minZ: wz - 13.2, maxZ: wz - 12.2, minY: 0, maxY: 11 });
    colliders.push({ minX: wx - 23, maxX: wx - 21.6, minZ: wz - 13.2, maxZ: wz + 13.2, minY: 0, maxY: 11 });
    colliders.push({ minX: wx + 21.6, maxX: wx + 23, minZ: wz - 13.2, maxZ: wz + 13.2, minY: 0, maxY: 11 });
    colliders.push({ minX: wx - 23, maxX: wx - 6.5, minZ: wz + 12.2, maxZ: wz + 13.2, minY: 0, maxY: 11 });
    colliders.push({ minX: wx + 6.5, maxX: wx + 23, minZ: wz + 12.2, maxZ: wz + 13.2, minY: 0, maxY: 11 });
  };
  addWarehouse(0, -900, 0);
  addWarehouse(-70, -860, Math.PI / 2);

  // Watchtowers across compounds
  const addWatchtower = (tx, tz) => {
    addBoxObject(0.6, 15, 0.6, tx - 2.8, 0, tz - 2.8, woodWallMat);
    addBoxObject(0.6, 15, 0.6, tx + 2.8, 0, tz - 2.8, woodWallMat);
    addBoxObject(0.6, 15, 0.6, tx - 2.8, 0, tz + 2.8, woodWallMat);
    addBoxObject(0.6, 15, 0.6, tx + 2.8, 0, tz + 2.8, woodWallMat);
    addBoxObject(6.8, 0.35, 6.8, tx, 15, tz, floorWoodMat);
    colliders.push({ minX: tx - 3.4, maxX: tx + 3.4, minZ: tz - 3.4, maxZ: tz + 3.4, minY: 14.8, maxY: 17 });
  };
  addWatchtower(-120, -550);
  addWatchtower(140, -320);
  addWatchtower(-130, 120);
  addWatchtower(90, 520);
  addWatchtower(260, 950);

  // 14. SPARSE REALISTIC RNG LOOT SYSTEM (~35% CHANCE: MANY ROOMS EMPTY AS REQUESTED)
  const addBandageLoot = (lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const r1 = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.5, 18), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }));
    r1.rotation.z = Math.PI / 2;
    lg.add(r1);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.9, 24), new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'bandage', name: '3x Bandaj (+45 Can)', mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addMedkitLoot = (lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.45, lz);
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.55, 0.75), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.35 }));
    lg.add(box);
    mapGroup.add(lg);
    lootItems.push({ type: 'medkit', name: 'İlk Yardım Çantası (Tam Can)', mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addWeaponLoot = (gunName, lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.6, lz);
    let wModel;
    if (gunName === 'Sniper') wModel = createSniperModel(false);
    else if (gunName === 'Shawty') wModel = createShawtyModel(false);
    else if (gunName === 'Burst Rifle') wModel = createBurstRifleModel(false);
    else if (gunName === 'Pistol') wModel = createTwoTonePistolModel(false);
    else wModel = createAuthenticAK47Model(false);
    wModel.scale.set(0.65, 0.65, 0.65);
    lg.add(wModel);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.8, 1.1, 24), new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.45; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'weapon', gunName: gunName, name: `🔫 ${gunName} Al`, mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addSilencerLoot = (lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.5, lz);
    const sModel = createSilencerModel();
    sModel.scale.set(2.4, 2.4, 2.4);
    lg.add(sModel);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.95, 24), new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.35; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'silencer', name: '🤫 Susturucu (Silencer) Al', mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  // Loot spots throughout houses, school, apartments, church, and warehouses
  const candidateLootSpots = [
    // PUBG SCHOOL
    { x: 350, y: 0.2, z: 410, pref: 'weapon' }, { x: 340, y: 0.2, z: 425, pref: 'weapon' },
    { x: 360, y: 0.2, z: 425, pref: 'bandage' }, { x: 340, y: 5.8, z: 415, pref: 'weapon' },
    { x: 360, y: 5.8, z: 415, pref: 'silencer' }, { x: 350, y: 11.0, z: 420, pref: 'sniper' },
    { x: 338, y: 11.0, z: 430, pref: 'weapon' }, { x: 362, y: 11.0, z: 410, pref: 'medkit' },
    { x: 307, y: 0.2, z: 420, pref: 'weapon' }, { x: 298, y: 3.8, z: 420, pref: 'silencer' },
    // SCHOOL APARTMENTS
    { x: 460, y: 0.2, z: 390, pref: 'weapon' }, { x: 460, y: 8.8, z: 390, pref: 'medkit' }, { x: 460, y: 13.5, z: 390, pref: 'sniper' },
    { x: 460, y: 0.2, z: 450, pref: 'weapon' }, { x: 460, y: 13.5, z: 450, pref: 'sniper' },
    { x: 510, y: 0.2, z: 420, pref: 'weapon' }, { x: 510, y: 13.5, z: 420, pref: 'silencer' },
    // POCHINKI CHURCH & HOUSES
    { x: -340, y: 0.2, z: -10, pref: 'weapon' }, { x: -348, y: 14.0, z: 6, pref: 'sniper' },
    { x: -45, y: 0.2, z: -60, pref: 'weapon' }, { x: -80, y: 0.2, z: -60, pref: 'bandage' }, { x: -80, y: 6.4, z: -60, pref: 'medkit' },
    { x: -115, y: 0.2, z: -60, pref: 'weapon' }, { x: -150, y: 6.4, z: -60, pref: 'silencer' },
    { x: -185, y: 0.2, z: -60, pref: 'weapon' }, { x: -220, y: 0.2, z: -60, pref: 'weapon' },
    { x: -45, y: 0.2, z: 40, pref: 'weapon' }, { x: -80, y: 0.2, z: 40, pref: 'bandage' },
    { x: -115, y: 6.4, z: 40, pref: 'silencer' }, { x: -150, y: 0.2, z: 40, pref: 'weapon' },
    { x: -185, y: 6.4, z: 40, pref: 'medkit' }, { x: -220, y: 0.2, z: 40, pref: 'weapon' },
    // ROZHOK RIDGE
    { x: -40, y: 0.2, z: 760, pref: 'weapon' }, { x: 0, y: 0.2, z: 760, pref: 'bandage' },
    { x: 40, y: 6.4, z: 760, pref: 'silencer' }, { x: 80, y: 0.2, z: 760, pref: 'weapon' },
    { x: 120, y: 0.2, z: 760, pref: 'medkit' }, { x: 160, y: 6.4, z: 760, pref: 'weapon' },
    { x: 0, y: 0.2, z: 880, pref: 'weapon' }, { x: 40, y: 0.2, z: 880, pref: 'bandage' },
    { x: 80, y: 6.4, z: 880, pref: 'silencer' }, { x: 120, y: 0.2, z: 880, pref: 'weapon' },
    // YASNAYA POLYANA
    { x: 220, y: 0.2, z: 750, pref: 'weapon' }, { x: 260, y: 6.4, z: 750, pref: 'silencer' },
    { x: 300, y: 0.2, z: 750, pref: 'medkit' }, { x: 340, y: 0.2, z: 750, pref: 'weapon' },
    { x: 220, y: 0.2, z: 840, pref: 'bandage' }, { x: 260, y: 0.2, z: 840, pref: 'weapon' },
    { x: 380, y: 0.2, z: 740, pref: 'weapon' }, { x: 380, y: 13.5, z: 740, pref: 'sniper' },
    { x: 300, y: 0.2, z: 800, pref: 'weapon' },
    // FARM & COAST
    { x: 80, y: 0.2, z: -550, pref: 'weapon' }, { x: 120, y: 0.2, z: -550, pref: 'bandage' },
    { x: 160, y: 6.4, z: -550, pref: 'weapon' }, { x: 120, y: 0.2, z: -470, pref: 'weapon' },
    { x: 180, y: 0.2, z: -470, pref: 'silencer' },
    { x: -120, y: 0.2, z: -750, pref: 'weapon' }, { x: -160, y: 0.2, z: -750, pref: 'bandage' },
    { x: -280, y: 0.2, z: -800, pref: 'sniper' },
    // WAREHOUSES & PORT
    { x: 0, y: 0.2, z: -900, pref: 'weapon' }, { x: -70, y: 0.2, z: -860, pref: 'silencer' },
    { x: -280, y: 0.2, z: 650, pref: 'weapon' }
  ];

  // ~35% spawn chance: Authentic PUBG loot distribution (many rooms remain empty)
  candidateLootSpots.forEach(spot => {
    if (Math.random() < 0.35) {
      const roll = Math.random();
      if (spot.pref === 'sniper' && Math.random() < 0.5) {
        addWeaponLoot('Sniper', spot.x, spot.y, spot.z);
      } else if (spot.pref === 'silencer' && Math.random() < 0.4) {
        addSilencerLoot(spot.x, spot.y, spot.z);
      } else if (roll < 0.35) {
        addBandageLoot(spot.x, spot.y, spot.z);
      } else if (roll < 0.65) {
        addWeaponLoot('Pistol', spot.x, spot.y, spot.z);
      } else if (roll < 0.80) {
        addWeaponLoot('Shawty', spot.x, spot.y, spot.z);
      } else if (roll < 0.92) {
        addWeaponLoot('AK-47', spot.x, spot.y, spot.z);
      } else if (roll < 0.96) {
        addSilencerLoot(spot.x, spot.y, spot.z);
      } else {
        addMedkitLoot(spot.x, spot.y, spot.z);
      }
    }
  });

  // 15. GUARANTEED PUBG UAZ 4X4 JEEPS (1 CAR ALWAYS PARKED AT TERMINAL DROP OF EACH TEAM'S FLIGHT!)
  // Blue Team LZ (-35, -120): Blue plane's terminal drop! ALWAYS 1 CAR WAITING HERE!
  const jeepBlue = createPubgJeepVehicle(-35, -120, 0);
  // Red Team LZ (30, 820): Red plane's terminal drop! ALWAYS 1 CAR WAITING HERE!
  const jeepRed = createPubgJeepVehicle(30, 820, Math.PI);

  // Extra vehicles across towns
  const jeepSchool = createPubgJeepVehicle(350, 465, 0); // School Courtyard
  const jeepRozhok = createPubgJeepVehicle(60, 750, 0);  // Rozhok Hill
  const jeepPochinki = createPubgJeepVehicle(-150, 0, -1.2); // Pochinki Center
  const jeepFarm = createPubgJeepVehicle(140, -520, 0);   // Farm
  const jeepYasnaya = createPubgJeepVehicle(250, 790, 1.5); // Yasnaya
  const jeepCoast = createPubgJeepVehicle(-160, -700, 0.5); // Coast

  mapGroup.add(
    jeepBlue.group, jeepRed.group, jeepSchool.group, jeepRozhok.group,
    jeepPochinki.group, jeepFarm.group, jeepYasnaya.group, jeepCoast.group
  );
  const vehicles = [
    jeepBlue, jeepRed, jeepSchool, jeepRozhok,
    jeepPochinki, jeepFarm, jeepYasnaya, jeepCoast
  ];

  // 16. BALANCED SPAWN & DROP POINTS FOR TEAMS & FFA
  spawnPoints.push(
    // Blue Team Drop Zone (South - Pochinki)
    { x: -35, y: 0, z: -120, team: 'blue' }, { x: -45, y: 0, z: -100, team: 'blue' },
    { x: -25, y: 0, z: -140, team: 'blue' }, { x: -55, y: 0, z: -125, team: 'blue' },
    { x: -80, y: 0, z: -60, team: 'blue' },  { x: -150, y: 0, z: -60, team: 'blue' },
    { x: 120, y: 0, z: -550, team: 'blue' }, { x: -160, y: 0, z: -750, team: 'blue' },
    // Red Team Drop Zone (North - Rozhok / Yasnaya)
    { x: 30, y: 0, z: 820, team: 'red' },   { x: 45, y: 0, z: 800, team: 'red' },
    { x: 20, y: 0, z: 840, team: 'red' },   { x: 50, y: 0, z: 825, team: 'red' },
    { x: 80, y: 0, z: 760, team: 'red' },   { x: 120, y: 0, z: 760, team: 'red' },
    { x: 260, y: 0, z: 750, team: 'red' },  { x: 300, y: 0, z: 840, team: 'red' },
    // FFA / Solo Drop Points
    { x: 350, y: 0, z: 420 }, { x: 350, y: 11, z: 420 },
    { x: 460, y: 0, z: 390 }, { x: -340, y: 0, z: -10 },
    { x: 0, y: 0, z: 150 },   { x: -120, y: 0, z: 40 },
    { x: 140, y: 0, z: -500 }
  );

  return {
    group: mapGroup,
    colliders: colliders,
    jumpPads: [],
    lootItems: lootItems,
    vehicles: vehicles,
    spawnPoints: spawnPoints
  };
}
window.createPubgSurvivalMap = createPubgSurvivalMap;
window.createCyberCityMap = createCyberCityMap;

window.createDeathCrateModel = createDeathCrateModel;
window.createMilitaryCargoPlane = createMilitaryCargoPlane;
window.createParachuteModel = createParachuteModel;
window.models = {
  createDeathCrateModel: () => createDeathCrateModel(),
  createMilitaryCargoPlane: () => createMilitaryCargoPlane(),
  createParachuteModel: () => createParachuteModel(),
  createSilencerModel: () => createSilencerModel(),
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
  createLobbyEnvironment: () => createLobbyEnvironment(),
  createPubgJeepVehicle: (x, z, angle) => createPubgJeepVehicle(x, z, angle),
  createPubgSurvivalMap: () => createPubgSurvivalMap()
};

