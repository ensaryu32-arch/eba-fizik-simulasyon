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
function createNameplateTexture(name, level = 5, isFriendlyOrTeam = true) {
  const canvas = document.createElement('canvas');
  canvas.width = 440; canvas.height = 96;
  const ctx = canvas.getContext('2d');

  const isFriendly = (isFriendlyOrTeam === true || isFriendlyOrTeam === 'blue' || isFriendlyOrTeam === 'teammate' || isFriendlyOrTeam === 'friendly');

  // Background Badge Card
  ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
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
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(name.length > 11 ? name.substring(0, 11) + '..' : name, 82, 48);

  // Team Pill Badge on Right
  ctx.fillStyle = isFriendly ? '#059669' : '#dc2626';
  ctx.roundRect(268, 24, 154, 48, 10);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 15px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(isFriendly ? '🛡️ TAKIM' : '🎯 DÜŞMAN', 345, 48);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}
window.createNameplateTexture = createNameplateTexture;


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

// 5B. M18 SMOKE GRENADE MODEL (CANISTER)
function createSmokeGrenadeModel(isViewmodel = false) {
  const root = new THREE.Group();

  const canBodyMat = new THREE.MeshStandardMaterial({
    color: 0x64748b, // Matte slate/steel canister body
    roughness: 0.45,
    metalness: 0.35
  });

  const stripeMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8, // Vibrant cyan smoke identifier band
    roughness: 0.4,
    metalness: 0.1
  });

  const fuseMat = new THREE.MeshStandardMaterial({
    color: 0x475569, // Zinc fuse cap
    metalness: 0.8,
    roughness: 0.3
  });

  const pinMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15, // Brass safety pin ring
    metalness: 0.9,
    roughness: 0.2
  });

  // Main Canister Cylinder
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.38, 16), canBodyMat);

  // Colored identification band around waist
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.112, 0.112, 0.09, 16), stripeMat);
  band.position.y = 0.02;

  // Fuse Top & Neck
  const fuseNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.10, 12), fuseMat);
  fuseNeck.position.y = 0.24;

  // Safety Lever / Spoon
  const spoon = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.28, 0.015), fuseMat);
  spoon.position.set(0, 0.14, 0.11);
  spoon.rotation.x = -0.15;

  // Brass Pull Ring Pin
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 8, 16), pinMat);
  ring.position.set(0.07, 0.25, 0.02);
  ring.rotation.y = Math.PI / 2;

  root.add(body, band, fuseNeck, spoon, ring);

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

    const isFriendly = (options.isEnemy === false) || (options.isTeammate === true) || (options.teamColor === 'blue' && options.isEnemy !== true);
    // Nickname Canvas Plane
    const nameTex = createNameplateTexture(options.name, options.level || 5, isFriendly);
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
      new THREE.MeshBasicMaterial({ color: isFriendly ? 0x00f0ff : 0xef4444 })
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
    hpFillMat: hpFill ? hpFill.material : null,
    shirtMat: shirtMat,
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
    type: 'jeep',
    name: 'PUBG Askeri UAZ 4x4',
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
    maxSpeed: 96,
    reverseMax: -28,
    accel: 58,
    brakeDecel: 70,
    friction: 0.985,
    turnSpeed: 3.0,
    cockpitPos: new THREE.Vector3(-0.75, 2.45, 0.35)
  };
}

// Iconic Turkish/PUBG Beyaz Toros Station Wagon 3D Model
function createPubgTorosVehicle(startX = 0, startZ = 0, startAngle = 0) {
  const torosGroup = new THREE.Group();

  const whiteBodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, metalness: 0.1 });
  const darkTrimMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7, metalness: 0.3 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.15, metalness: 0.9 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.45, roughness: 0.1, metalness: 0.8 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9, metalness: 0.1 });
  const hubcapMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.25, metalness: 0.85 });
  const lightGlowMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  const tailGlowMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  // 1. Lower Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.5, 6.4), darkTrimMat);
  chassis.position.y = 0.65;
  torosGroup.add(chassis);

  // 2. Main White Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.8, 6.2), whiteBodyMat);
  body.position.y = 1.15;
  body.castShadow = true;
  torosGroup.add(body);

  // 3. Sloped Hood (Classic Toros Front)
  const hood = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.45, 2.2), whiteBodyMat);
  hood.position.set(0, 1.45, -1.9);
  hood.rotation.x = 0.05;
  torosGroup.add(hood);

  // 4. Black Front Grille & Chrome Bumper
  const grille = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.45, 0.12), darkTrimMat);
  grille.position.set(0, 1.45, -3.02);
  const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.32, 0.25), chromeMat);
  frontBumper.position.set(0, 0.75, -3.15);
  torosGroup.add(grille, frontBumper);

  // Rectangular Headlights
  const hlLeft = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.32, 0.1), lightGlowMat);
  hlLeft.position.set(-1.05, 1.45, -3.05);
  const hlRight = hlLeft.clone();
  hlRight.position.x = 1.05;
  torosGroup.add(hlLeft, hlRight);

  // 5. Cabin & Station Wagon Roof
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.95, 3.8), whiteBodyMat);
  cabin.position.set(0, 1.95, 0.8);
  torosGroup.add(cabin);

  // Windshield & Rear Window
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.85, 0.08), glassMat);
  windshield.position.set(0, 1.85, -0.95);
  windshield.rotation.x = 0.35;
  const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.75, 0.08), glassMat);
  rearWindow.position.set(0, 1.85, 2.7);
  torosGroup.add(windshield, rearWindow);

  // Side Windows
  const sideWinL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.65, 3.4), glassMat);
  sideWinL.position.set(-1.46, 1.95, 0.85);
  const sideWinR = sideWinL.clone();
  sideWinR.position.x = 1.46;
  torosGroup.add(sideWinL, sideWinR);

  // 6. Iconic Toros Roof Rack (Portbagaj) with Crossbars & Spare Wheel
  const rackBar1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.08), chromeMat);
  rackBar1.position.set(0, 2.52, -0.2);
  const rackBar2 = rackBar1.clone();
  rackBar2.position.z = 0.8;
  const rackBar3 = rackBar1.clone();
  rackBar3.position.z = 1.8;
  const railL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 2.6), chromeMat);
  railL.position.set(-1.2, 2.52, 0.8);
  const railR = railL.clone();
  railR.position.x = 1.2;
  torosGroup.add(rackBar1, rackBar2, rackBar3, railL, railR);

  // Spare wheel on roof rack!
  const roofTire = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.35, 16), tireMat);
  roofTire.position.set(0, 2.72, 0.8);
  torosGroup.add(roofTire);

  // 7. Rear Chrome Bumper & Taillights
  const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.32, 0.25), chromeMat);
  rearBumper.position.set(0, 0.75, 3.15);
  const tlL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.08), tailGlowMat);
  tlL.position.set(-1.25, 1.25, 3.12);
  const tlR = tlL.clone();
  tlR.position.x = 1.25;
  torosGroup.add(rearBumper, tlL, tlR);

  // Cabin Interior
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 });
  const seatDriver = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.9, 0.85), seatMat);
  seatDriver.position.set(-0.65, 1.45, 0.1);
  const seatPass = seatDriver.clone();
  seatPass.position.x = 0.65;
  const steerWheel = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.038, 8, 16), darkTrimMat);
  steerWheel.position.set(-0.65, 1.85, -0.45);
  steerWheel.rotation.x = 0.55;
  torosGroup.add(seatDriver, seatPass, steerWheel);

  // 8. 4 Wheels with Toros Classic Chrome Hubcaps
  function createTorosWheel() {
    const wG = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.48, 18), tireMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.52, 14), hubcapMat);
    hub.rotation.z = Math.PI / 2;
    wG.add(tire, hub);
    return { group: wG, tire: tire };
  }

  const flPivot = new THREE.Group();
  flPivot.position.set(-1.65, 0.68, -1.8);
  const flW = createTorosWheel();
  flPivot.add(flW.group);
  torosGroup.add(flPivot);

  const frPivot = new THREE.Group();
  frPivot.position.set(1.65, 0.68, -1.8);
  const frW = createTorosWheel();
  frPivot.add(frW.group);
  torosGroup.add(frPivot);

  const rlW = createTorosWheel();
  rlW.group.position.set(-1.65, 0.68, 1.8);
  const rrW = createTorosWheel();
  rrW.group.position.set(1.65, 0.68, 1.8);
  torosGroup.add(rlW.group, rrW.group);

  torosGroup.position.set(startX, 0, startZ);
  torosGroup.rotation.y = startAngle;

  return {
    group: torosGroup,
    type: 'toros',
    name: 'Beyaz Toros Station Wagon',
    wheels: {
      flPivot: flPivot,
      frPivot: frPivot,
      flTire: flW.tire,
      frTire: frW.tire,
      rlTire: rlW.tire,
      rrTire: rrW.tire
    },
    pos: new THREE.Vector3(startX, 0, startZ),
    vel: new THREE.Vector3(0, 0, 0),
    speed: 0,
    angle: startAngle,
    steerAngle: 0,
    isDriven: false,
    maxSpeed: 108,
    reverseMax: -32,
    accel: 64,
    brakeDecel: 78,
    friction: 0.985,
    turnSpeed: 3.2,
    cockpitPos: new THREE.Vector3(-0.65, 2.15, 0.2)
  };
}

// Swift PUBG Military Two-Wheeler Motorbike 3D Model
function createPubgMotorbikeVehicle(startX = 0, startZ = 0, startAngle = 0) {
  const bikeGroup = new THREE.Group();

  const tankMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.25, metalness: 0.6 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5, metalness: 0.85 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.1, metalness: 0.95 });
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.9 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9, metalness: 0.1 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.3, metalness: 0.75 });
  const lightGlowMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  const tailGlowMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  // 1. Tubular Steel Frame & Engine Block
  const engine = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.85, 1.4), frameMat);
  engine.position.set(0, 0.95, -0.1);
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 1.35, 14), tankMat);
  tank.rotation.x = Math.PI / 2;
  tank.position.set(0, 1.5, -0.4);
  bikeGroup.add(engine, tank);

  // 2. Stepped Dual Leather Seat
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.35, 1.6), seatMat);
  seat.position.set(0, 1.45, 0.7);
  bikeGroup.add(seat);

  // 3. Chrome Exhaust Pipe (Running on right side)
  const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 2.4, 12), chromeMat);
  exhaust.rotation.x = Math.PI / 2;
  exhaust.position.set(0.48, 0.65, 0.5);
  bikeGroup.add(exhaust);

  // 4. Front Steerable Fork & Handlebars
  const frontFork = new THREE.Group();
  frontFork.position.set(0, 0.75, -1.55);

  const forkL = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8), chromeMat);
  forkL.position.set(-0.25, 0.45, 0);
  forkL.rotation.x = 0.25;
  const forkR = forkL.clone();
  forkR.position.x = 0.25;

  const handleBar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.08), frameMat);
  handleBar.position.set(0, 1.15, -0.15);

  // Round Headlight
  const headlight = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.15, 16), lightGlowMat);
  headlight.rotation.x = Math.PI / 2;
  headlight.position.set(0, 0.95, -0.32);

  frontFork.add(forkL, forkR, handleBar, headlight);

  // Front Motorcycle Wheel
  const fwTire = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.28, 20), tireMat);
  fwTire.rotation.z = Math.PI / 2;
  fwTire.castShadow = true;
  const fwRim = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.3, 14), rimMat);
  fwRim.rotation.z = Math.PI / 2;
  const frontWheelGroup = new THREE.Group();
  frontWheelGroup.add(fwTire, fwRim);
  frontFork.add(frontWheelGroup);
  bikeGroup.add(frontFork);

  // 5. Rear Motorcycle Wheel
  const rwTire = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.38, 20), tireMat);
  rwTire.rotation.z = Math.PI / 2;
  rwTire.castShadow = true;
  const rwRim = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.4, 14), rimMat);
  rwRim.rotation.z = Math.PI / 2;
  const rearWheelGroup = new THREE.Group();
  rearWheelGroup.position.set(0, 0.75, 1.55);
  rearWheelGroup.add(rwTire, rwRim);
  bikeGroup.add(rearWheelGroup);

  // 6. Rear Fender & Tail Light
  const tailLight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.1), tailGlowMat);
  tailLight.position.set(0, 1.45, 1.55);
  bikeGroup.add(tailLight);

  bikeGroup.position.set(startX, 0, startZ);
  bikeGroup.rotation.y = startAngle;

  return {
    group: bikeGroup,
    type: 'motorbike',
    name: 'PUBG Askeri Motor',
    isBike: true,
    wheels: {
      flPivot: frontFork,
      frPivot: frontFork,
      flTire: fwTire,
      frTire: fwTire,
      rlTire: rwTire,
      rrTire: rwTire
    },
    pos: new THREE.Vector3(startX, 0, startZ),
    vel: new THREE.Vector3(0, 0, 0),
    speed: 0,
    angle: startAngle,
    steerAngle: 0,
    isDriven: false,
    maxSpeed: 128,
    reverseMax: -22,
    accel: 88,
    brakeDecel: 90,
    friction: 0.988,
    turnSpeed: 3.8,
    cockpitPos: new THREE.Vector3(0, 2.35, 0.25)
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
  const housePositions = [];

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

  // 2. ORGANIC WINDING ERANGEL ROAD NETWORK & SECONDARY TRAILS (SEAMLESS CONTINUOUS RIBBONS)
  const addContinuousRoadRibbon = (points, width, mat, yOffset = 0.12) => {
    if (!points || points.length < 2) return;
    const geom = new THREE.BufferGeometry();
    const vertices = [];
    const uvs = [];
    const indices = [];

    let totalDist = 0;
    const distances = [0];
    for (let i = 1; i < points.length; i++) {
      const segD = Math.hypot(points[i].x - points[i - 1].x, points[i].z - points[i - 1].z);
      totalDist += segD;
      distances.push(totalDist);
    }

    const halfW = width * 0.5;

    for (let i = 0; i < points.length; i++) {
      let nx = 0, nz = 0;
      if (i === 0) {
        const dx = points[1].x - points[0].x;
        const dz = points[1].z - points[0].z;
        const len = Math.hypot(dx, dz) || 1;
        nx = -dz / len;
        nz = dx / len;
      } else if (i === points.length - 1) {
        const dx = points[i].x - points[i - 1].x;
        const dz = points[i].z - points[i - 1].z;
        const len = Math.hypot(dx, dz) || 1;
        nx = -dz / len;
        nz = dx / len;
      } else {
        const dx1 = points[i].x - points[i - 1].x;
        const dz1 = points[i].z - points[i - 1].z;
        const l1 = Math.hypot(dx1, dz1) || 1;
        const dx2 = points[i + 1].x - points[i].x;
        const dz2 = points[i + 1].z - points[i].z;
        const l2 = Math.hypot(dx2, dz2) || 1;
        const avgDx = (dx1 / l1 + dx2 / l2);
        const avgDz = (dz1 / l1 + dz2 / l2);
        const avgLen = Math.hypot(avgDx, avgDz) || 1;
        nx = -avgDz / avgLen;
        nz = avgDx / avgLen;
      }

      // Left & Right vertices along road perpendicular
      vertices.push(points[i].x + nx * halfW, yOffset, points[i].z + nz * halfW);
      vertices.push(points[i].x - nx * halfW, yOffset, points[i].z - nz * halfW);

      const vCoord = distances[i] / 12.0;
      uvs.push(0, vCoord);
      uvs.push(1, vCoord);

      // Upward pointing (+Y) triangle normal winding order
      if (i < points.length - 1) {
        const v0 = i * 2;
        const v1 = i * 2 + 1;
        const v2 = (i + 1) * 2;
        const v3 = (i + 1) * 2 + 1;
        indices.push(v0, v2, v1);
        indices.push(v2, v3, v1);
      }
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    const mesh = new THREE.Mesh(geom, mat);
    mesh.receiveShadow = true;
    mapGroup.add(mesh);
  };

  pubgRoadTex.repeat.set(1, 1);
  const asphaltRoadMat = new THREE.MeshStandardMaterial({
    map: pubgRoadTex,
    roughness: 0.7,
    metalness: 0.08,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2
  });
  dirtRoadMat.side = THREE.DoubleSide;
  dirtRoadMat.polygonOffset = true;
  dirtRoadMat.polygonOffsetFactor = -2;
  dirtRoadMat.polygonOffsetUnits = -2;

  // Main S-Curved Erangel Highway (Winding through Farm, Pochinki, River Bridge, School, and Rozhok)
  const mainHighwayPoints = [
    { x: 50, z: -1250 },
    { x: 65, z: -1080 },
    { x: 35, z: -880 },
    { x: -20, z: -680 },
    { x: -55, z: -480 },
    { x: -90, z: -280 },
    { x: -60, z: -110 },
    { x: -20, z: 20 },
    { x: 0, z: 110 },   // Approaching River Bridge
    { x: 0, z: 190 },   // Across River Bridge (aligned straight with bridge structure)
    { x: 25, z: 280 },
    { x: 75, z: 380 },  // Skirting PUBG School
    { x: 110, z: 510 },
    { x: 80, z: 660 },
    { x: 25, z: 780 },  // Approaching Rozhok Ridge
    { x: -15, z: 920 },
    { x: 20, z: 1080 },
    { x: 40, z: 1250 }
  ];
  addContinuousRoadRibbon(mainHighwayPoints, 15, asphaltRoadMat, 0.12);

  // Pochinki Loop & Southern Farmland Road
  const pochinkiRoadPoints = [
    { x: -350, z: -20 },
    { x: -290, z: -60 },
    { x: -150, z: -70 },
    { x: -60, z: -110 },
    { x: 60, z: -220 },
    { x: 140, z: -400 },
    { x: 160, z: -600 }
  ];
  addContinuousRoadRibbon(pochinkiRoadPoints, 12, dirtRoadMat, 0.14);

  // Pochinki North Avenue to West Coast
  const pochinkiNorthPoints = [
    { x: -350, z: 40 },
    { x: -220, z: 50 },
    { x: -115, z: 45 },
    { x: -20, z: 20 }
  ];
  addContinuousRoadRibbon(pochinkiNorthPoints, 11, dirtRoadMat, 0.14);

  // Rozhok - School Ridge Connector Road
  const rozhokSchoolPoints = [
    { x: 75, z: 380 },
    { x: 280, z: 420 },
    { x: 350, z: 460 },  // School entrance
    { x: 420, z: 580 },
    { x: 300, z: 720 },
    { x: 160, z: 780 },
    { x: 25, z: 780 }
  ];
  addContinuousRoadRibbon(rozhokSchoolPoints, 12, asphaltRoadMat, 0.12);

  // North Rozhok - Yasnaya Country Trail
  const yasnayaTrailPoints = [
    { x: 160, z: 780 },
    { x: 240, z: 820 },
    { x: 320, z: 840 },
    { x: 450, z: 920 }
  ];
  addContinuousRoadRibbon(yasnayaTrailPoints, 10, dirtRoadMat, 0.14);

  // 3. RIVER & SUSPENSION HIGHWAY BRIDGE (Z: 110 to 190)
  const riverMesh = new THREE.Mesh(new THREE.PlaneGeometry(800, 80), waterMat);
  riverMesh.rotation.x = -Math.PI / 2;
  riverMesh.position.set(0, 0.02, 150);
  mapGroup.add(riverMesh);

  // Steel Truss Bridge with Smooth Approach Ramps (North & South River Banks)
  // 1. Smooth North Approach Ramp (z: 92 to 105, from y: 0.05 to 1.1)
  const rampNorth = new THREE.Mesh(new THREE.BoxGeometry(18, 0.5, 14), concreteMat);
  rampNorth.position.set(0, 0.45, 98.5);
  rampNorth.rotation.x = Math.atan2(0.9, 14);
  rampNorth.receiveShadow = true;
  mapGroup.add(rampNorth);
  colliders.push({
    isStairs: true,
    minX: -9.5, maxX: 9.5,
    minZ: 92, maxZ: 105,
    minY: 0.05, maxY: 1.15,
    dirZ: 1
  });

  // 2. Main Bridge Elevated Deck (z: 105 to 195, y: 0.9 to 1.1)
  const bridgeDeck = new THREE.Mesh(new THREE.BoxGeometry(18, 0.5, 90), concreteMat);
  bridgeDeck.position.set(0, 0.9, 150);
  bridgeDeck.receiveShadow = true;
  mapGroup.add(bridgeDeck);
  colliders.push({
    isFloor: true,
    minX: -9.5, maxX: 9.5,
    minZ: 105, maxZ: 195,
    minY: 0.65, maxY: 1.15
  });

  // 3. Smooth South Approach Ramp (z: 195 to 208, from y: 1.1 down to 0.05)
  const rampSouth = new THREE.Mesh(new THREE.BoxGeometry(18, 0.5, 14), concreteMat);
  rampSouth.position.set(0, 0.45, 201.5);
  rampSouth.rotation.x = -Math.atan2(0.9, 14);
  rampSouth.receiveShadow = true;
  mapGroup.add(rampSouth);
  colliders.push({
    isStairs: true,
    minX: -9.5, maxX: 9.5,
    minZ: 195, maxZ: 208,
    minY: 0.05, maxY: 1.15,
    dirZ: -1
  });

  // Bridge Guard Rails & Overhead Steel Truss Towers
  addBoxObject(1.4, 24, 1.4, -9.5, 1.1, 120, metalBridgeMat);
  addBoxObject(1.4, 24, 1.4, 9.5, 1.1, 120, metalBridgeMat);
  addBoxObject(1.4, 24, 1.4, -9.5, 1.1, 180, metalBridgeMat);
  addBoxObject(1.4, 24, 1.4, 9.5, 1.1, 180, metalBridgeMat);
  addBoxObject(20.4, 1.4, 1.4, 0, 24, 120, metalBridgeMat);
  addBoxObject(20.4, 1.4, 1.4, 0, 24, 180, metalBridgeMat);
  addBoxObject(0.8, 1.4, 90, -9.5, 1.3, 150, metalBridgeMat);
  addBoxObject(0.8, 1.4, 90, 9.5, 1.3, 150, metalBridgeMat);

  // DIVERSE HOUSE ARCHITECTURAL MATERIALS (4 DISTINCT VISUAL STYLES)
  const houseStyleMaterials = [
    { // Style 0: Classic Erangel Red Brick Villa with Terracotta Roof
      wall: new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.85 }),
      roof: new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.6 }),
      trim: new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.5 })
    },
    { // Style 1: Modern Coastal White Plaster with Royal Blue Roof
      wall: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.65 }),
      roof: new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.55 }),
      trim: new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 })
    },
    { // Style 2: Warm Amber / Stucco Estate with Slate Dark Roof
      wall: new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 }),
      roof: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 }),
      trim: new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 })
    },
    { // Style 3: Rustic Timber Lodge with Forest Green Roof
      wall: new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 }),
      roof: new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.65 }),
      trim: new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.6 })
    }
  ];

  // 4. ENTERABLE HOUSE GENERATOR WITH CLIMBABLE STAIRS, STAIRWELL CUTOUT & VARIED ARCHITECTURAL STYLES
  const addEnterableHouse = (cx, cz, rotY = 0, styleIdx = 0) => {
    housePositions.push({ cx, cz, rotY });
    const houseGroup = new THREE.Group();
    houseGroup.position.set(cx, 0, cz);
    houseGroup.rotation.y = rotY;

    const style = houseStyleMaterials[Math.abs(styleIdx) % houseStyleMaterials.length];

    // Ground Floor Plate
    const gf = new THREE.Mesh(new THREE.BoxGeometry(16, 0.3, 20), floorWoodMat);
    gf.position.set(0, 0.15, 0);
    houseGroup.add(gf);

    const addHW = (w, h, d, px, py, pz, mat = style.wall) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(px, py + h / 2, pz);
      m.castShadow = true; m.receiveShadow = true;
      houseGroup.add(m);
    };

    // Ground Floor Exterior Walls
    addHW(16, 5.8, 0.5, 0, 0.3, -9.75); // Back Wall
    addHW(0.5, 5.8, 20, -7.75, 0.3, 0); // Left Wall
    addHW(0.5, 5.8, 20, 7.75, 0.3, 0);  // Right Wall
    addHW(6.7, 5.8, 0.5, -4.65, 0.3, 9.75); // Front Wall Left (-8.0 to -1.3)
    addHW(6.7, 5.8, 0.5, 4.65, 0.3, 9.75);  // Front Wall Right (+1.3 to +8.0)
    addHW(2.6, 1.8, 0.5, 0, 4.3, 9.75);     // Door Header (Doorway width 2.6m, height 4.0m)

    // Interior Ground Partition Wall (Placed on the LEFT so it NEVER cuts into the stairs!)
    // Stairs are located on the right side (x: 4.8 to 7.4). Partition wall stays strictly on left x: -7.5 to 2.0!
    addHW(5.5, 5.8, 0.4, -4.5, 0.3, 0);
    addHW(3.5, 1.6, 0.4, 0.0, 4.5, 0);

    // 2nd Floor Slabs with OPEN STAIRWELL (x: 4.2 to 7.8, z: -8.0 to 5.5 is left completely open for stairs!)
    const floor2Left = new THREE.Mesh(new THREE.BoxGeometry(12.2, 0.35, 20), floorWoodMat);
    floor2Left.position.set(-1.9, 6.1, 0);
    houseGroup.add(floor2Left);
    // Upper Floor Rear Landing
    const floor2Landing = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.35, 4.5), floorWoodMat);
    floor2Landing.position.set(6.1, 6.1, 7.75);
    houseGroup.add(floor2Landing);
    // Upper Floor Front Edge
    const floor2Back = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.35, 2.0), floorWoodMat);
    floor2Back.position.set(6.1, 6.1, -9.0);
    houseGroup.add(floor2Back);

    // 2nd Floor Exterior Walls & Balcony
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
    addHW(8, 1.2, 0.3, 0, 6.25, 13.7, style.trim);
    addHW(0.3, 1.2, 4, -3.9, 6.25, 11.8, style.trim);
    addHW(0.3, 1.2, 4, 3.9, 6.25, 11.8, style.trim);

    // Pitched Roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(12, 3.8, 4), style.roof);
    roof.position.set(0, 13.4, 0);
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);

    // Interior Climbable Wooden Staircase (Along right interior wall x: 6.0, running from z: -7.0 to 5.5)
    const numSteps = 16;
    const stepH = 5.9 / numSteps; // ~0.37m
    const stepD = 13.0 / numSteps; // ~0.81m
    for (let st = 0; st < numSteps; st++) {
      const stepMesh = new THREE.Mesh(new THREE.BoxGeometry(2.6, stepH, stepD), woodWallMat);
      stepMesh.position.set(6.0, 0.3 + (st + 0.5) * stepH, -7.0 + (st + 0.5) * stepD);
      houseGroup.add(stepMesh);
    }

    // Safety railing on 2nd floor around stairwell hole
    addHW(0.2, 1.1, 12.5, 4.2, 6.25, -0.75, style.trim);

    mapGroup.add(houseGroup);

    // Interactive Front Wooden Door with Brass Knob (Width: 2.6m, Height: 4.0m - perfectly fills doorway!)
    const doorGroup = new THREE.Group();
    const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(2.6, 4.0, 0.14), woodWallMat);
    doorPanel.position.set(1.3, 2.0, 0);
    doorPanel.castShadow = true;
    const doorKnob = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.2 }));
    doorKnob.position.set(2.35, 2.0, 0.09);
    doorGroup.add(doorPanel, doorKnob);

    let doorWorldPos;
    let doorCollider;
    if (rotY === Math.PI) {
      doorGroup.position.set(cx + 1.3, 0.3, cz - 9.75);
      doorGroup.rotation.y = Math.PI;
      doorWorldPos = new THREE.Vector3(cx, 0.5, cz - 9.75);
      doorCollider = { minX: cx - 1.35, maxX: cx + 1.35, minZ: cz - 10.3, maxZ: cz - 9.2, minY: 0, maxY: 4.2, isDoor: true };
    } else {
      doorGroup.position.set(cx - 1.3, 0.3, cz + 9.75);
      doorGroup.rotation.y = 0;
      doorWorldPos = new THREE.Vector3(cx, 0.5, cz + 9.75);
      doorCollider = { minX: cx - 1.35, maxX: cx + 1.35, minZ: cz + 9.2, maxZ: cz + 10.3, minY: 0, maxY: 4.2, isDoor: true };
    }
    mapGroup.add(doorGroup);
    colliders.push(doorCollider);

    window.houseDoors = window.houseDoors || [];
    const doorObj = {
      pos: doorWorldPos,
      mesh: doorGroup,
      pivot: doorGroup,
      baseAngle: (rotY === Math.PI ? Math.PI : 0),
      openAngle: (rotY === Math.PI ? Math.PI * 0.48 : -Math.PI * 0.48),
      closedRot: (rotY === Math.PI ? Math.PI : 0),
      openRot: (rotY === Math.PI ? Math.PI + Math.PI * 0.48 : -Math.PI * 0.48),
      targetRot: (rotY === Math.PI ? Math.PI : 0),
      isOpen: false,
      collider: doorCollider
    };
    doorCollider.doorRef = doorObj;
    window.houseDoors.push(doorObj);

    // Ground floor solid foundation slab so players never clip through terrain inside houses
    colliders.push({ isFloor: true, minX: cx - 8.2, maxX: cx + 8.2, minZ: cz - 10.2, maxZ: cz + 10.2, minY: 0.0, maxY: 0.35 });

    // Colliders for Enterable House
    if (rotY === Math.PI) {
      // Exterior Back Wall
      colliders.push({ minX: cx - 8.4, maxX: cx + 8.4, minZ: cz + 9.0, maxZ: cz + 10.4, minY: 0, maxY: 12 });
      // Front Wall Left & Right (Generous 3.6m opening so players never snag or get stuck on door edges!)
      colliders.push({ minX: cx - 8.4, maxX: cx - 1.8, minZ: cz - 10.4, maxZ: cz - 9.0, minY: 0, maxY: 12 });
      colliders.push({ minX: cx + 1.8, maxX: cx + 8.4, minZ: cz - 10.4, maxZ: cz - 9.0, minY: 0, maxY: 12 });
      // Interior Partition Wall (Ground floor only, stops at ceiling maxY: 5.8 so 2nd floor is completely free!)
      colliders.push({ minX: cx + 1.5, maxX: cx + 8.0, minZ: cz - 0.6, maxZ: cz + 0.6, minY: 0, maxY: 5.8 });
      // Exterior Side Walls
      colliders.push({ minX: cx - 8.4, maxX: cx - 7.1, minZ: cz - 10.4, maxZ: cz + 10.4, minY: 0, maxY: 12 });
      colliders.push({ minX: cx + 7.1, maxX: cx + 8.4, minZ: cz - 10.4, maxZ: cz + 10.4, minY: 0, maxY: 12 });
      // 2nd Floor Balcony - Solid floor slab & safety railings
      colliders.push({ isFloor: true, minX: cx - 4.2, maxX: cx + 4.2, minZ: cz - 14.0, maxZ: cz - 9.6, minY: 5.9, maxY: 6.35 });
      colliders.push({ minX: cx - 4.2, maxX: cx + 4.2, minZ: cz - 14.0, maxZ: cz - 13.5, minY: 6.0, maxY: 7.6 });
      colliders.push({ minX: cx - 4.2, maxX: cx - 3.7, minZ: cz - 14.0, maxZ: cz - 9.6, minY: 6.0, maxY: 7.6 });
      colliders.push({ minX: cx + 3.7, maxX: cx + 4.2, minZ: cz - 14.0, maxZ: cz - 9.6, minY: 6.0, maxY: 7.6 });
      
      // 2nd Floor Main Solid Slabs (Correctly oriented for rotY === Math.PI: Main floor covers cx - 4.4 to cx + 8.2)
      colliders.push({ isFloor: true, minX: cx - 4.4, maxX: cx + 8.2, minZ: cz - 10.0, maxZ: cz + 10.0, minY: 5.9, maxY: 6.35 });
      // Upper floor rear landing (opposite of stairwell opening)
      colliders.push({ isFloor: true, minX: cx - 8.2, maxX: cx - 4.2, minZ: cz - 10.0, maxZ: cz - 5.2, minY: 5.9, maxY: 6.35 });
      // Upper floor front edge landing
      colliders.push({ isFloor: true, minX: cx - 8.2, maxX: cx - 4.2, minZ: cz + 7.8, maxZ: cz + 10.0, minY: 5.9, maxY: 6.35 });

      // RAMP COLLIDER FOR CLIMBABLE STAIRS
      colliders.push({
        isStairs: true,
        minX: cx - 7.5, maxX: cx - 4.5,
        minZ: cz - 6.0, maxZ: cz + 8.0,
        minY: 0.1, maxY: 6.25,
        dirZ: -1
      });
    } else {
      // Exterior Back Wall
      colliders.push({ minX: cx - 8.4, maxX: cx + 8.4, minZ: cz - 10.4, maxZ: cz - 9.0, minY: 0, maxY: 12 });
      // Front Wall Left & Right (Generous 3.6m opening)
      colliders.push({ minX: cx - 8.4, maxX: cx - 1.8, minZ: cz + 9.0, maxZ: cz + 10.4, minY: 0, maxY: 12 });
      colliders.push({ minX: cx + 1.8, maxX: cx + 8.4, minZ: cz + 9.0, maxZ: cz + 10.4, minY: 0, maxY: 12 });
      // Interior Partition Wall (Ground floor only, stops at ceiling maxY: 5.8!)
      colliders.push({ minX: cx - 8.0, maxX: cx - 1.5, minZ: cz - 0.6, maxZ: cz + 0.6, minY: 0, maxY: 5.8 });
      // Exterior Side Walls
      colliders.push({ minX: cx - 8.4, maxX: cx - 7.1, minZ: cz - 10.4, maxZ: cz + 10.4, minY: 0, maxY: 12 });
      colliders.push({ minX: cx + 7.1, maxX: cx + 8.4, minZ: cz - 10.4, maxZ: cz + 10.4, minY: 0, maxY: 12 });
      // 2nd Floor Balcony - Solid floor slab & safety railings
      colliders.push({ isFloor: true, minX: cx - 4.2, maxX: cx + 4.2, minZ: cz + 9.6, maxZ: cz + 14.0, minY: 5.9, maxY: 6.35 });
      colliders.push({ minX: cx - 4.2, maxX: cx + 4.2, minZ: cz + 13.5, maxZ: cz + 14.0, minY: 6.0, maxY: 7.6 });
      colliders.push({ minX: cx - 4.2, maxX: cx - 3.7, minZ: cz + 9.6, maxZ: cz + 14.0, minY: 6.0, maxY: 7.6 });
      colliders.push({ minX: cx + 3.7, maxX: cx + 4.2, minZ: cz + 9.6, maxZ: cz + 14.0, minY: 6.0, maxY: 7.6 });
      
      // 2nd Floor Main Solid Slabs: Main room covers cx - 8.2 to cx + 4.4
      colliders.push({ isFloor: true, minX: cx - 8.2, maxX: cx + 4.4, minZ: cz - 10.0, maxZ: cz + 10.0, minY: 5.9, maxY: 6.35 });
      // Upper floor rear landing
      colliders.push({ isFloor: true, minX: cx + 4.2, maxX: cx + 8.2, minZ: cz + 5.2, maxZ: cz + 10.0, minY: 5.9, maxY: 6.35 });
      // Upper floor front edge landing
      colliders.push({ isFloor: true, minX: cx + 4.2, maxX: cx + 8.2, minZ: cz - 10.0, maxZ: cz - 7.8, minY: 5.9, maxY: 6.35 });

      // RAMP COLLIDER FOR CLIMBABLE STAIRS
      colliders.push({
        isStairs: true,
        minX: cx + 4.5, maxX: cx + 7.5,
        minZ: cz - 8.0, maxZ: cz + 6.0,
        minY: 0.1, maxY: 6.25,
        dirZ: 1
      });
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
    colliders.push({ isFloor: true, minX: cx - 26, maxX: cx + 26, minZ: cz - 19, maxZ: cz + 19, minY: 5.4, maxY: 5.85 });
    colliders.push({ isFloor: true, minX: cx - 27, maxX: cx + 27, minZ: cz - 20, maxZ: cz + 20, minY: 10.4, maxY: 10.85 });
    colliders.push({ minX: cx - 58, maxX: cx - 28, minZ: cz - 14, maxZ: cz - 13, minY: 0, maxY: 12 });
    colliders.push({ minX: cx - 58, maxX: cx - 28, minZ: cz + 13, maxZ: cz + 14, minY: 0, maxY: 12 });
    colliders.push({ minX: cx - 58.2, maxX: cx - 57.2, minZ: cz - 14, maxZ: cz + 14, minY: 0, maxY: 12 });

    // School Interior Staircase Colliders
    colliders.push({ isStairs: true, minX: cx - 24, maxX: cx - 20, minZ: cz - 13, maxZ: cz - 4, minY: 0.1, maxY: 5.8, dirZ: 1 });
    colliders.push({ isStairs: true, minX: cx - 24, maxX: cx - 20, minZ: cz - 5, maxZ: cz + 4, minY: 5.5, maxY: 10.8, dirZ: 1 });
    colliders.push({ isStairs: true, minX: cx + 20, maxX: cx + 24, minZ: cz + 4, maxZ: cz + 13, minY: 0.1, maxY: 5.8, dirZ: -1 });
    colliders.push({ isStairs: true, minX: cx + 20, maxX: cx + 24, minZ: cz - 4, maxZ: cz + 5, minY: 5.5, maxY: 10.8, dirZ: -1 });
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

    // Accurate Colliders with full rotation support (0, Math.PI, Math.PI/2) and open stairwell
    if (Math.abs(rotY - Math.PI / 2) < 0.1) {
      // Rotated 90 degrees: Doorway on East wall (X: ax + 10.7)
      colliders.push({ minX: ax - 11.2, maxX: ax - 10.2, minZ: az - 11.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 }); // Back Wall (West)
      colliders.push({ minX: ax + 10.2, maxX: ax + 11.2, minZ: az - 11.2, maxZ: az - 2.8, minY: 0, maxY: 14.5 });  // Front Wall Left (East)
      colliders.push({ minX: ax + 10.2, maxX: ax + 11.2, minZ: az + 2.8, maxZ: az + 11.2, minY: 0, maxY: 14.5 });  // Front Wall Right (East)
      colliders.push({ minX: ax - 11.2, maxX: ax + 11.2, minZ: az - 11.2, maxZ: az - 10.2, minY: 0, maxY: 14.5 }); // Side Wall North
      colliders.push({ minX: ax - 11.2, maxX: ax + 11.2, minZ: az + 10.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 }); // Side Wall South
      colliders.push({ isFloor: true, minX: ax - 11, maxX: ax + 11, minZ: az - 11, maxZ: az + 11, minY: 13.0, maxY: 13.45 }); // Roof
      for (let fl = 0; fl < 3; fl++) {
        const yBase = 0.4 + fl * 4.2;
        // Floor slab cutout leaves stair area free
        colliders.push({ isFloor: true, minX: ax - 10, maxX: ax + 10, minZ: az - 10, maxZ: az + 4.0, minY: yBase - 0.1, maxY: yBase + 0.35 });
        colliders.push({ isFloor: true, minX: ax - 1.0, maxX: ax + 10, minZ: az + 4.0, maxZ: az + 10, minY: yBase - 0.1, maxY: yBase + 0.35 });
        colliders.push({ isStairs: true, minX: ax - 7.5, maxX: ax - 1.0, minZ: az + 4.5, maxZ: az + 7.5, minY: yBase + 0.1, maxY: yBase + 4.25, dirZ: 1 });
      }
    } else if (Math.abs(rotY - Math.PI) < 0.1) {
      // Rotated 180 degrees: Doorway on North wall (Z: az - 10.7)
      colliders.push({ minX: ax - 11.2, maxX: ax + 11.2, minZ: az + 10.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 }); // Back Wall (South)
      colliders.push({ minX: ax - 11.2, maxX: ax - 2.8, minZ: az - 11.2, maxZ: az - 10.2, minY: 0, maxY: 14.5 });  // Front Wall Left (North)
      colliders.push({ minX: ax + 2.8, maxX: ax + 11.2, minZ: az - 11.2, maxZ: az - 10.2, minY: 0, maxY: 14.5 });  // Front Wall Right (North)
      colliders.push({ minX: ax - 11.2, maxX: ax - 10.2, minZ: az - 11.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 }); // Left Wall (West)
      colliders.push({ minX: ax + 10.2, maxX: ax + 11.2, minZ: az - 11.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 }); // Right Wall (East)
      colliders.push({ isFloor: true, minX: ax - 11, maxX: ax + 11, minZ: az - 11, maxZ: az + 11, minY: 13.0, maxY: 13.45 }); // Roof
      for (let fl = 0; fl < 3; fl++) {
        const yBase = 0.4 + fl * 4.2;
        colliders.push({ isFloor: true, minX: ax - 10, maxX: ax + 4.0, minZ: az - 10, maxZ: az + 10, minY: yBase - 0.1, maxY: yBase + 0.35 });
        colliders.push({ isFloor: true, minX: ax + 4.0, maxX: ax + 10, minZ: az - 10, maxZ: az + 0.5, minY: yBase - 0.1, maxY: yBase + 0.35 });
        colliders.push({ isStairs: true, minX: ax + 4.5, maxX: ax + 7.5, minZ: az + 1.0, maxZ: az + 7.5, minY: yBase + 0.1, maxY: yBase + 4.25, dirZ: -1 });
      }
    } else {
      // Default rotY 0: Doorway on South wall (Z: az + 10.7)
      colliders.push({ minX: ax - 11.2, maxX: ax + 11.2, minZ: az - 11.2, maxZ: az - 10.2, minY: 0, maxY: 14.5 }); // Back Wall (North)
      colliders.push({ minX: ax - 11.2, maxX: ax - 2.8, minZ: az + 10.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 });  // Front Wall Left (South)
      colliders.push({ minX: ax + 2.8, maxX: ax + 11.2, minZ: az + 10.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 });  // Front Wall Right (South)
      colliders.push({ minX: ax - 11.2, maxX: ax - 10.2, minZ: az - 11.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 }); // Left Wall (West)
      colliders.push({ minX: ax + 10.2, maxX: ax + 11.2, minZ: az - 11.2, maxZ: az + 11.2, minY: 0, maxY: 14.5 }); // Right Wall (East)
      colliders.push({ isFloor: true, minX: ax - 11, maxX: ax + 11, minZ: az - 11, maxZ: az + 11, minY: 13.0, maxY: 13.45 }); // Roof
      for (let fl = 0; fl < 3; fl++) {
        const yBase = 0.4 + fl * 4.2;
        colliders.push({ isFloor: true, minX: ax - 4.0, maxX: ax + 10, minZ: az - 10, maxZ: az + 10, minY: yBase - 0.1, maxY: yBase + 0.35 });
        colliders.push({ isFloor: true, minX: ax - 10, maxX: ax - 4.0, minZ: az - 0.5, maxZ: az + 10, minY: yBase - 0.1, maxY: yBase + 0.35 });
        colliders.push({ isStairs: true, minX: ax - 7.5, maxX: ax - 4.5, minZ: az - 7.5, maxZ: az - 1.0, minY: yBase + 0.1, maxY: yBase + 4.25, dirZ: 1 });
      }
    }
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

  // 8. DENSE POCHINKI TOWN (16 ENTERABLE 2-STORY HOUSES WITH 4 DIVERSE ARCHITECTURAL STYLES!)
  // South Avenue (Z: -60)
  addEnterableHouse(-45, -60, 0, 0);
  addEnterableHouse(-80, -60, 0, 1);
  addEnterableHouse(-115, -60, 0, 2);
  addEnterableHouse(-150, -60, 0, 3);
  addEnterableHouse(-185, -60, 0, 0);
  addEnterableHouse(-220, -60, 0, 1);
  addEnterableHouse(-255, -60, 0, 2);
  addEnterableHouse(-290, -60, 0, 3);

  // North Avenue (Z: 40)
  addEnterableHouse(-45, 40, Math.PI, 1);
  addEnterableHouse(-80, 40, Math.PI, 2);
  addEnterableHouse(-115, 40, Math.PI, 3);
  addEnterableHouse(-150, 40, Math.PI, 0);
  addEnterableHouse(-185, 40, Math.PI, 1);
  addEnterableHouse(-220, 40, Math.PI, 2);
  addEnterableHouse(-255, 40, Math.PI, 3);
  addEnterableHouse(-290, 40, Math.PI, 0);

  // Pochinki Stone Walls & Fences
  addBoxObject(110, 1.5, 0.6, -110, 0, -85, concreteMat);
  addBoxObject(110, 1.5, 0.6, -235, 0, -85, concreteMat);
  addBoxObject(110, 1.5, 0.6, -110, 0, 65, concreteMat);
  addBoxObject(110, 1.5, 0.6, -235, 0, 65, concreteMat);

  // 9. ROZHOK RIDGE (12 ENTERABLE 2-STORY HOUSES WITH DIVERSE STYLES)
  // South Row (Z: 760)
  addEnterableHouse(-40, 760, 0, 2);
  addEnterableHouse(0, 760, 0, 3);
  addEnterableHouse(40, 760, 0, 0);
  addEnterableHouse(80, 760, 0, 1);
  addEnterableHouse(120, 760, 0, 2);
  addEnterableHouse(160, 760, 0, 3);

  // North Row (Z: 880)
  addEnterableHouse(-40, 880, Math.PI, 3);
  addEnterableHouse(0, 880, Math.PI, 0);
  addEnterableHouse(40, 880, Math.PI, 1);
  addEnterableHouse(80, 880, Math.PI, 2);
  addEnterableHouse(120, 880, Math.PI, 3);
  addEnterableHouse(160, 880, Math.PI, 0);

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
  addEnterableHouse(220, 750, 0, 1);
  addEnterableHouse(260, 750, 0, 2);
  addEnterableHouse(300, 750, 0, 3);
  addEnterableHouse(340, 750, 0, 0);
  addEnterableHouse(220, 840, Math.PI, 0);
  addEnterableHouse(260, 840, Math.PI, 1);
  addEnterableHouse(300, 840, Math.PI, 2);
  addEnterableHouse(340, 840, Math.PI, 3);
  addApartmentBuilding(380, 740, 0);
  addApartmentBuilding(380, 840, Math.PI);

  // Yasnaya Clock Tower
  addBoxObject(10, 36, 10, 300, 0, 800, brickMat);
  const clockDial = addBoxObject(4.5, 4.5, 0.4, 300, 30, 805.2, floorWoodMat);

  // 11. FARM ESTATE (6 ENTERABLE HOUSES + 2 RED BARNS)
  addEnterableHouse(80, -550, 0, 3);
  addEnterableHouse(120, -550, 0, 0);
  addEnterableHouse(160, -550, 0, 1);
  addEnterableHouse(80, -650, Math.PI, 2);
  addEnterableHouse(120, -650, Math.PI, 3);
  addEnterableHouse(160, -650, Math.PI, 0);

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

    if (Math.abs(rot - Math.PI / 2) < 0.1) {
      // Rotated 90 degrees: Length 45m along Z, width 26m along X. Door on East wall (X: wx + 12.7)
      colliders.push({ minX: wx - 13.2, maxX: wx - 12.2, minZ: wz - 23, maxZ: wz + 23, minY: 0, maxY: 11 }); // Back wall (West)
      colliders.push({ minX: wx - 13.2, maxX: wx + 13.2, minZ: wz - 23, maxZ: wz - 21.6, minY: 0, maxY: 11 }); // Side wall Left (North)
      colliders.push({ minX: wx - 13.2, maxX: wx + 13.2, minZ: wz + 21.6, maxZ: wz + 23, minY: 0, maxY: 11 }); // Side wall Right (South)
      colliders.push({ minX: wx + 12.2, maxX: wx + 13.2, minZ: wz - 23, maxZ: wz - 6.5, minY: 0, maxY: 11 });  // Front wall Left (East)
      colliders.push({ minX: wx + 12.2, maxX: wx + 13.2, minZ: wz + 6.5, maxZ: wz + 23, minY: 0, maxY: 11 });  // Front wall Right (East)
    } else {
      colliders.push({ minX: wx - 23, maxX: wx + 23, minZ: wz - 13.2, maxZ: wz - 12.2, minY: 0, maxY: 11 });
      colliders.push({ minX: wx - 23, maxX: wx - 21.6, minZ: wz - 13.2, maxZ: wz + 13.2, minY: 0, maxY: 11 });
      colliders.push({ minX: wx + 21.6, maxX: wx + 23, minZ: wz - 13.2, maxZ: wz + 13.2, minY: 0, maxY: 11 });
      colliders.push({ minX: wx - 23, maxX: wx - 6.5, minZ: wz + 12.2, maxZ: wz + 13.2, minY: 0, maxY: 11 });
      colliders.push({ minX: wx + 6.5, maxX: wx + 23, minZ: wz + 12.2, maxZ: wz + 13.2, minY: 0, maxY: 11 });
    }
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

  // 14. RICH & DIVERSE PUBG RNG LOOT SYSTEM (Silencer, Bandage, Frag Grenade, Smoke Grenade, Armor, Helmet, Medkit, Energy Drink, Weapons, Scopes)
  const addBandageLoot = (lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const r1 = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.5, 18), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }));
    r1.rotation.z = Math.PI / 2;
    lg.add(r1);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.9, 24), new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'bandage', name: '🩹 3x Bandaj (+45 Can)', mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addMedkitLoot = (lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.45, lz);
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.55, 0.75), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.35 }));
    lg.add(box);
    const cross1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.15), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    cross1.position.set(0, 0.28, 0); lg.add(cross1);
    const cross2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    cross2.position.set(0, 0.28, 0); lg.add(cross2);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.75, 1.05, 24), new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.4; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'medkit', name: '💊 İlk Yardım Kiti (Tam Can 150)', mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addFragGrenadeLoot = (lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.35, 14, 14), new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.8 }));
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.25, 10), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 }));
    cap.position.y = 0.35;
    lg.add(body, cap);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.9, 24), new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'frag_grenade', name: '💣 2x El Bombası (Patlayıcı)', mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addSmokeGrenadeLoot = (lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.65, 16), new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 }));
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.15, 16), new THREE.MeshStandardMaterial({ color: 0x38bdf8 }));
    band.position.y = 0.12;
    lg.add(body, band);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.9, 24), new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'smoke_grenade', name: '💨 2x Sis Bombası (Sis Kalkanı)', mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addAmmoBoxLoot = (ammoType, count, lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const boxMat = new THREE.MeshStandardMaterial({ color: ammoType === '9mm' ? 0xb45309 : (ammoType === '7.62mm' ? 0x991b1b : 0x15803d), roughness: 0.5 });
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.35, 0.45), boxMat);
    lg.add(box);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.9, 24), new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'ammo_box', ammoType: ammoType, count: count, name: `📦 ${ammoType} Mermi Kutusu (+${count} Mermi)`, mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addArmorLoot = (level = 2, lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const color = level === 3 ? 0x0f172a : (level === 2 ? 0x1e3a8a : 0x475569);
    const vest = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.85, 0.4), new THREE.MeshStandardMaterial({ color, roughness: 0.85 }));
    lg.add(vest);
    const ringColor = level === 3 ? 0xf59e0b : (level === 2 ? 0x38bdf8 : 0x94a3b8);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.95, 24), new THREE.MeshBasicMaterial({ color: ringColor, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    const pct = level === 3 ? '%55' : (level === 2 ? '%40' : '%20');
    lootItems.push({ type: 'armor', level: level, name: `🛡️ Seviye ${level} Çelik Yelek (${pct} Hasar Emme)`, mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addHelmetLoot = (level = 2, lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const color = level === 3 ? 0x0f172a : (level === 2 ? 0x334155 : 0x64748b);
    const helm = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 12), new THREE.MeshStandardMaterial({ color, roughness: 0.6 }));
    helm.scale.set(1, 0.8, 1.1);
    lg.add(helm);
    const ringColor = level === 3 ? 0xf59e0b : (level === 2 ? 0xa855f7 : 0x94a3b8);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.95, 24), new THREE.MeshBasicMaterial({ color: ringColor, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    const pct = level === 3 ? '%55' : (level === 2 ? '%40' : '%25');
    lootItems.push({ type: 'helmet', level: level, name: `🪖 Seviye ${level} Kask (${pct} Kafa Koruma)`, mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addBackpackLoot = (level = 2, lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const color = level === 3 ? 0x14532d : (level === 2 ? 0x78350f : 0x475569);
    const bp = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.8, 0.45), new THREE.MeshStandardMaterial({ color, roughness: 0.85 }));
    lg.add(bp);
    const ringColor = level === 3 ? 0xf59e0b : (level === 2 ? 0x10b981 : 0x94a3b8);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.95, 24), new THREE.MeshBasicMaterial({ color: ringColor, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    const cap = level === 3 ? '400' : (level === 2 ? '250' : '150');
    lootItems.push({ type: 'backpack', level: level, name: `🎒 Seviye ${level} Çanta (Kapasite: ${cap})`, mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addReviveBeacon = (bx, bz) => {
    const bg = new THREE.Group(); bg.position.set(bx, 0, bz);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 0.6, 16), concreteMat);
    base.position.y = 0.3; bg.add(base);
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 3.8, 12), metalBridgeMat);
    pillar.position.y = 2.2; bg.add(pillar);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 12), new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.2, emissive: 0x00f0ff, emissiveIntensity: 0.8 }));
    dome.position.y = 4.2; bg.add(dome);
    const ring1 = new THREE.Mesh(new THREE.RingGeometry(1.8, 2.3, 32), new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.85 }));
    ring1.rotation.x = -Math.PI / 2; ring1.position.y = 0.65; bg.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(2.6, 3.1, 32), new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.55 }));
    ring2.rotation.x = -Math.PI / 2; ring2.position.y = 0.65; bg.add(ring2);
    mapGroup.add(bg);
    colliders.push({ minX: bx - 1.6, maxX: bx + 1.6, minZ: bz - 1.6, maxZ: bz + 1.6, minY: 0, maxY: 4.5 });
    window.reviveBeacons = window.reviveBeacons || [];
    window.reviveBeacons.push({ pos: new THREE.Vector3(bx, 0, bz), mesh: bg, name: 'Yeniden Canlandırma Kulesi (Recall Station)' });
  };

  // Add 2 Iconic Revive Beacons (Pochinki & School)
  addReviveBeacon(-60, -10);
  addReviveBeacon(350, 450);

  const addEnergyDrinkLoot = (lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.55, 14), new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3, metalness: 0.7 }));
    lg.add(can);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.6, 0.85, 24), new THREE.MeshBasicMaterial({ color: 0x60a5fa, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'energy_drink', name: '⚡ Enerji İçeceği (+%25 Koşu Hızı)', mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addScopeLoot = (lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.7, 14), new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 }));
    body.rotation.z = Math.PI / 2;
    lg.add(body);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.9, 24), new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'scope', name: '🔭 4x Dürbün (ACOG Uzak Nişan)', mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  const addWeaponLoot = (gunName, lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.6, lz);
    let wModel;
    if (gunName === 'Sniper') wModel = createSniperModel(false);
    else if (gunName === 'Shawty') wModel = createShawtyModel(false);
    else if (gunName === 'Burst Rifle') wModel = createBurstRifleModel(false);
    else if (gunName === 'Pistol' || gunName === 'Deagle' || gunName === 'Revolver') wModel = createTwoTonePistolModel(false);
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

  // Mermi Çoğaltıcı / Uzatılmış Hızlı Çekim Şarjör
  const addExtendedMagLoot = (lx, ly, lz) => {
    const lg = new THREE.Group(); lg.position.set(lx, ly + 0.35, lz);
    const mag = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.65, 0.45), new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 }));
    mag.rotation.x = 0.2;
    lg.add(mag);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.9, 24), new THREE.MeshBasicMaterial({ color: 0xeab308, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -0.3; lg.add(ring);
    mapGroup.add(lg);
    lootItems.push({ type: 'extended_mag', name: '⚡ Uzatılmış Şarjör / Mermi Çoğaltıcı (+15 Şarjör & +90 Mermi)', mesh: lg, pos: new THREE.Vector3(lx, ly, lz), radius: 3.2, collected: false });
  };

  // 14. RICH & DIVERSE PROCEDURAL PUBG LOOT GENERATOR
  const spawnRandomLootAt = (x, y, z, category = null) => {
    const roll = Math.random();
    if (category === 'weapon' || (!category && roll < 0.20)) {
      const gRoll = Math.random();
      if (gRoll < 0.25) addWeaponLoot('AK-47', x, y, z);
      else if (gRoll < 0.45) addWeaponLoot('Burst Rifle', x, y, z);
      else if (gRoll < 0.60) addWeaponLoot('Sniper', x, y, z);
      else if (gRoll < 0.75) addWeaponLoot('Shawty', x, y, z);
      else if (gRoll < 0.90) addWeaponLoot('Deagle', x, y, z);
      else addWeaponLoot('Minigun', x, y, z);
    } else if (category === 'armor' || (!category && roll < 0.35)) {
      const aRoll = Math.random();
      if (aRoll < 0.50) {
        const lvl = Math.random() < 0.25 ? 3 : (Math.random() < 0.65 ? 2 : 1);
        addArmorLoot(lvl, x, y, z);
      } else {
        const lvl = Math.random() < 0.25 ? 3 : (Math.random() < 0.65 ? 2 : 1);
        addHelmetLoot(lvl, x, y, z);
      }
    } else if (category === 'gear' || (!category && roll < 0.50)) {
      const gRoll = Math.random();
      if (gRoll < 0.35) {
        addBackpackLoot(Math.random() < 0.4 ? 3 : 2, x, y, z);
      } else if (gRoll < 0.60) {
        addSilencerLoot(x, y, z);
      } else if (gRoll < 0.82) {
        addExtendedMagLoot(x, y, z);
      } else {
        addScopeLoot(x, y, z);
      }
    } else if (category === 'grenade' || (!category && roll < 0.65)) {
      if (Math.random() < 0.5) addSmokeGrenadeLoot(x, y, z);
      else addFragGrenadeLoot(x, y, z);
    } else if (category === 'med' || (!category && roll < 0.80)) {
      const mRoll = Math.random();
      if (mRoll < 0.4) addBandageLoot(x, y, z);
      else if (mRoll < 0.75) addEnergyDrinkLoot(x, y, z);
      else addMedkitLoot(x, y, z);
    } else {
      const aRoll = Math.random();
      if (aRoll < 0.4) addAmmoBoxLoot('5.56mm', 90, x, y, z);
      else if (aRoll < 0.75) addAmmoBoxLoot('7.62mm', 90, x, y, z);
      else addAmmoBoxLoot('9mm', 60, x, y, z);
    }
  };

  // A. Procedural loot placement inside enterable houses (Balanced: 1 to 2 items per house, not flooded)
  housePositions.forEach(hp => {
    const isRot = (hp.rotY === Math.PI);
    // 50% chance for ground floor item
    if (Math.random() < 0.50) {
      spawnRandomLootAt(hp.cx + (isRot ? 3.5 : -3.5), 0.5, hp.cz + (Math.random() - 0.5) * 3);
    }
    // 40% chance for 2nd floor item
    if (Math.random() < 0.40) {
      spawnRandomLootAt(hp.cx + (isRot ? 3.0 : -3.0), 6.45, hp.cz + (isRot ? -4.5 : 4.5));
    }
    // Rare 15% chance for high tier item
    if (Math.random() < 0.15) {
      const cat = Math.random() < 0.5 ? 'armor' : 'gear';
      spawnRandomLootAt(hp.cx + (isRot ? 4.5 : -4.5), 6.45, hp.cz + (isRot ? 5.5 : -5.5), cat);
    }
  });

  // B. Major Landmarks & Compounds Loot Spots (School, Apartments, Church, Warehouses, Towers)
  const landmarkLootSpots = [
    // PUBG SCHOOL & POOL
    { x: 350, y: 0.5, z: 410, cat: 'weapon' }, { x: 340, y: 0.5, z: 425, cat: 'armor' },
    { x: 360, y: 0.5, z: 425, cat: 'med' }, { x: 340, y: 6.4, z: 415, cat: 'grenade' },
    { x: 360, y: 6.4, z: 415, cat: 'gear' }, { x: 350, y: 11.2, z: 420, cat: 'weapon' },
    { x: 338, y: 11.2, z: 430, cat: 'gear' }, { x: 362, y: 11.2, z: 410, cat: 'med' },
    { x: 307, y: 0.5, z: 420, cat: 'weapon' }, { x: 298, y: 4.2, z: 420, cat: 'grenade' },
    { x: 325, y: 0.5, z: 440, cat: 'armor' }, { x: 375, y: 0.5, z: 440, cat: 'gear' },

    // SCHOOL APARTMENTS
    { x: 460, y: 0.5, z: 390, cat: 'weapon' }, { x: 460, y: 9.2, z: 390, cat: 'med' }, { x: 460, y: 13.8, z: 390, cat: 'weapon' },
    { x: 460, y: 0.5, z: 450, cat: 'armor' }, { x: 460, y: 9.2, z: 450, cat: 'gear' }, { x: 460, y: 13.8, z: 450, cat: 'gear' },
    { x: 510, y: 0.5, z: 420, cat: 'armor' }, { x: 510, y: 9.2, z: 420, cat: 'med' }, { x: 510, y: 13.8, z: 420, cat: 'gear' },

    // POCHINKI CHURCH
    { x: -340, y: 0.5, z: -10, cat: 'weapon' }, { x: -340, y: 0.5, z: 5, cat: 'armor' },
    { x: -348, y: 14.5, z: 6, cat: 'weapon' }, { x: -348, y: 28.0, z: 16.5, cat: 'gear' },

    // YASNAYA APARTMENTS & CLOCK TOWER
    { x: 380, y: 0.5, z: 740, cat: 'weapon' }, { x: 380, y: 13.8, z: 740, cat: 'weapon' },
    { x: 380, y: 0.5, z: 840, cat: 'armor' }, { x: 380, y: 13.8, z: 840, cat: 'gear' },
    { x: 300, y: 0.5, z: 800, cat: 'armor' }, { x: 300, y: 32.0, z: 800, cat: 'gear' },

    // RED BARNS (FARM)
    { x: 120, y: 0.5, z: -470, cat: 'weapon' }, { x: 125, y: 0.5, z: -465, cat: 'armor' },
    { x: 180, y: 0.5, z: -470, cat: 'gear' }, { x: 175, y: 0.5, z: -465, cat: 'med' },

    // MILITARY WAREHOUSES
    { x: 0, y: 0.5, z: -900, cat: 'weapon' }, { x: 5, y: 0.5, z: -900, cat: 'gear' },
    { x: -70, y: 0.5, z: -860, cat: 'gear' }, { x: -65, y: 0.5, z: -860, cat: 'weapon' },
    { x: -10, y: 0.5, z: -890, cat: 'armor' }, { x: -75, y: 0.5, z: -850, cat: 'grenade' },

    // WATCHTOWERS
    { x: -120, y: 15.5, z: -550, cat: 'weapon' },
    { x: 140, y: 15.5, z: -320, cat: 'gear' },
    { x: -130, y: 15.5, z: 120, cat: 'weapon' },
    { x: 90, y: 15.5, z: 520, cat: 'gear' },
    { x: 260, y: 15.5, z: 950, cat: 'weapon' },

    // COAST & LIGHTHOUSE
    { x: -280, y: 0.5, z: -800, cat: 'weapon' }, { x: -280, y: 22.0, z: -800, cat: 'gear' },
    { x: -120, y: 0.5, z: -750, cat: 'grenade' }, { x: -160, y: 0.5, z: -750, cat: 'med' }
  ];

  landmarkLootSpots.forEach(s => {
    spawnRandomLootAt(s.x, s.y, s.z, s.cat);
  });

  // 15. CURATED & BALANCED PUBG VEHICLE FLEET (Strictly limited to 4 well-spaced vehicles)
  const candidateVehicles = [
    { x: -35, z: -120, rot: 0 },              // Blue LZ (South Pochinki)
    { x: 30, z: 820, rot: Math.PI },          // Red LZ (Rozhok Hill)
    { x: 350, z: 465, rot: 0.4 },             // School Courtyard
    { x: 140, z: -520, rot: 0.8 },            // Farm Highway
    { x: 250, z: 790, rot: 1.5 },             // Yasnaya Boulevard
    { x: -160, z: -700, rot: 0.5 },           // Mylta Coastal Road
    { x: -220, z: -75, rot: 0 },              // Pochinki West Garage
    { x: 0, z: 300, rot: 0 }                  // Central Crossroad Junction
  ];

  // Shuffle locations
  for (let i = candidateVehicles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidateVehicles[i], candidateVehicles[j]] = [candidateVehicles[j], candidateVehicles[i]];
  }

  // Exactly 4 vehicles total on the entire map, well separated (minimum 300m apart)
  const selectedSpots = [
    { x: -35, z: -120, rot: 0 },
    { x: 30, z: 820, rot: Math.PI }
  ];
  const maxTotalVehicles = 4;
  for (let i = 0; i < candidateVehicles.length && selectedSpots.length < maxTotalVehicles; i++) {
    const sp = candidateVehicles[i];
    const tooClose = selectedSpots.some(s => Math.hypot(sp.x - s.x, sp.z - s.z) < 300);
    if (!tooClose) {
      selectedSpots.push(sp);
    }
  }

  const vehicles = [];
  selectedSpots.forEach((spot, idx) => {
    const vRoll = Math.random();
    const rot = spot.rot + (Math.random() - 0.5) * 0.3;
    let vObj;
    if (idx === 0) {
      // Iconic Beyaz Toros at Blue LZ
      vObj = createPubgTorosVehicle(spot.x, spot.z, rot);
    } else if (idx === 1) {
      // Military Motorbike at Red LZ
      vObj = createPubgMotorbikeVehicle(spot.x, spot.z, rot);
    } else if (vRoll < 0.40) {
      vObj = createPubgTorosVehicle(spot.x, spot.z, rot);
    } else if (vRoll < 0.72) {
      vObj = createPubgJeepVehicle(spot.x, spot.z, rot);
    } else {
      vObj = createPubgMotorbikeVehicle(spot.x, spot.z, rot);
    }
    mapGroup.add(vObj.group);
    vehicles.push(vObj);
  });

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
  createSmokeGrenadeModel: (isVm, skin) => createSmokeGrenadeModel(isVm, skin),
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
  createPubgTorosVehicle: (x, z, angle) => createPubgTorosVehicle(x, z, angle),
  createPubgMotorbikeVehicle: (x, z, angle) => createPubgMotorbikeVehicle(x, z, angle),
  createPubgSurvivalMap: () => createPubgSurvivalMap()
};

