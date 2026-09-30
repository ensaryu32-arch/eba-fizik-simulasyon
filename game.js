// Veck.io Complete 3D Engine with Weapon Deploy FX, Knife/Grenade Viewmodels, Wall Raycast Blocking, 10-Min Timer, and Loadout Modal

const state = {
  mode: 'lobby',
  matchType: 'FFA',
  isPaused: false,
  isPrivateRoom: false,
  roomId: 'M73MNGX8',
  myName: 'Player_' + Math.floor(1000 + Math.random() * 9000),
  level: 0,
  xp: 0,
  coins: 0,
  gems: 0,
  token: localStorage.getItem('veck_token') || null,
  isLoggedIn: false,
  currentSlot: 1, // 1: Primary, 2: Secondary, 3: Knife, 4: Grenade
  prevSlot: 2,
  equippedGuns: {
    1: 'AK-47',
    2: 'Pistol',
    3: 'Combat Knife',
    4: 'Frag Grenade'
  },
  equippedWeaponSkins: {
    'AK-47': 'default',
    'Assault Rifle': 'default',
    'Burst Rifle': 'default',
    'Paintball Gun': 'default',
    'Minigun': 'default',
    'Sniper': 'default',
    'Rocket Launcher': 'default',
    'Shawty': 'default',
    'Bow': 'default',
    'Pistol': 'default',
    'Handgun': 'default',
    'Deagle': 'default',
    'Revolver': 'default',
    'Combat Knife': 'default',
    'Stabber': 'default',
    'Gunblade': 'default',
    'Karambit': 'default',
    'Butterfly Knife': 'default',
    'Huntsman Knife': 'default',
    'Frag Grenade': 'default',
    'Molotov': 'default'
  },
  equippedSkin: 'Mr Veck',
  equippedHat: 'Laughing Emoji Head',
  equippedFace: 'Iconic Smug Man Face',
  inventory: [
    'AK-47',
    'Pistol',
    'Combat Knife',
    'Frag Grenade',
    'Mr Veck',
    'Laughing Emoji Head'
  ],
  claimedTasks: [],
  activeLoadoutTab: 1,
  health: 150,
  maxHealth: 150,
  ammo: 30,
  maxAmmo: 30,
  isReloading: false,
  reloadTimer: 0,
  reloadDuration: 1.1,
  isADS: false,
  isDead: false,
  kills: 0,
  deaths: 0,
  score: 0,
  ping: 18,
  matchSeconds: 10 * 60, // 10 minutes (600 seconds)
  isTabOpen: false
};

const ALL_WEAPONS_CATALOG = {
  // Slot 1: Primaries
  'AK-47': { slot: 1, name: 'AK-47', icon: '🔫', sound: 'assault_rifle', damage: 22, headDamage: 34, fireRate: 95, maxAmmo: 30, reloadTime: 1100, spread: 0.012, locked: false },
  'Paintball Gun': { slot: 1, name: 'Paintball Gun', icon: '🎨', sound: 'paintball', damage: 15, headDamage: 34, fireRate: 110, maxAmmo: 40, reloadTime: 900, spread: 0.018, locked: false },
  'Minigun': { slot: 1, name: 'Minigun', icon: '🌪️', sound: 'minigun', damage: 12, headDamage: 34, fireRate: 55, maxAmmo: 100, reloadTime: 2100, spread: 0.024, locked: false },
  'Assault Rifle': { slot: 1, name: 'Assault Rifle', icon: '🎯', sound: 'assault_rifle', damage: 24, headDamage: 34, fireRate: 100, maxAmmo: 30, reloadTime: 1100, spread: 0.010, locked: false },
  'Burst Rifle': { slot: 1, name: 'Burst Rifle', icon: '⚡', sound: 'assault_rifle', damage: 26, headDamage: 34, fireRate: 140, maxAmmo: 24, reloadTime: 1050, spread: 0.008, locked: false },
  'Sniper': { slot: 1, name: 'Sniper', icon: '🔭', sound: 'sniper', damage: 65, headDamage: 34, fireRate: 850, maxAmmo: 5, reloadTime: 1600, spread: 0.002, locked: false },
  'Rocket Launcher': { slot: 1, name: 'Rocket Launcher', icon: '🚀', sound: 'rocket', damage: 80, headDamage: 34, fireRate: 1200, maxAmmo: 1, reloadTime: 1900, spread: 0.01, locked: false },

  // Slot 2: Pistols
  'Pistol': { slot: 2, name: 'Pistol', icon: '🔥', sound: 'pistol', damage: 18, headDamage: 34, fireRate: 200, maxAmmo: 12, reloadTime: 850, spread: 0.015, locked: false },
  'Deagle': { slot: 2, name: 'Deagle', icon: '💥', sound: 'pistol', damage: 28, headDamage: 34, fireRate: 280, maxAmmo: 7, reloadTime: 950, spread: 0.012, locked: false },
  'Revolver': { slot: 2, name: 'Revolver', icon: '🤠', sound: 'pistol', damage: 30, headDamage: 34, fireRate: 320, maxAmmo: 6, reloadTime: 1200, spread: 0.008, locked: false },

  // Slot 3: Melee Knives
  'Combat Knife': { slot: 3, name: 'Combat Knife', icon: '🗡️', sound: 'knife', damage: 45, headDamage: 34, fireRate: 350, maxAmmo: 999, reloadTime: 10, spread: 0, locked: false },
  'Karambit': { slot: 3, name: 'Karambit', icon: '🌀', sound: 'knife', damage: 50, headDamage: 34, fireRate: 310, maxAmmo: 999, reloadTime: 10, spread: 0, locked: false },
  'Butterfly Knife': { slot: 3, name: 'Butterfly Knife', icon: '🦋', sound: 'knife', damage: 52, headDamage: 34, fireRate: 290, maxAmmo: 999, reloadTime: 10, spread: 0, locked: false },
  'Huntsman Knife': { slot: 3, name: 'Huntsman Knife', icon: '🪓', sound: 'knife', damage: 55, headDamage: 34, fireRate: 360, maxAmmo: 999, reloadTime: 10, spread: 0, locked: false },
  'Gunblade': { slot: 3, name: 'Gunblade', icon: '⚔️', sound: 'knife', damage: 55, headDamage: 34, fireRate: 380, maxAmmo: 999, reloadTime: 10, spread: 0, locked: false },

  // Slot 4: Explosives
  'Frag Grenade': { slot: 4, name: 'Frag Grenade', icon: '💣', sound: 'grenade', damage: 75, headDamage: 34, fireRate: 1000, maxAmmo: 2, reloadTime: 1800, spread: 0.05, locked: false },
  'Molotov': { slot: 4, name: 'Molotov', icon: '🍾', sound: 'grenade', damage: 60, headDamage: 34, fireRate: 1000, maxAmmo: 2, reloadTime: 1800, spread: 0.05, locked: false }
};

function getCurrentWeapon() {
  const gunName = state.equippedGuns[state.currentSlot] || 'AK-47';
  return ALL_WEAPONS_CATALOG[gunName] || ALL_WEAPONS_CATALOG['AK-47'];
}

const SPAWN_POINTS = [
  { x: 0, z: 25 },
  { x: -55, z: -45 },
  { x: 55, z: 45 },
  { x: -75, z: 25 },
  { x: 75, z: -25 },
  { x: -30, z: 65 },
  { x: 30, z: -65 },
  { x: 0, z: -55 }
];

// Input Tracking
const keys = { w: false, a: false, s: false, d: false, space: false, shift: false };
let isPointerLocked = false;
let isMouseDown = false;
let lastShotTime = 0;

// Three.js Objects
let scene, camera, renderer;
let lobbyEnv, arenaData, cyberCityData;
let currentSelectedMap = 'arena'; // 'arena' or 'cyber_city'
let localAvatar = null;
let deployGraceTimer = 0;

// Reusable math objects to eliminate Garbage Collection lag
const _tempHitVec = new THREE.Vector3();
const _tempRayDir = new THREE.Vector3();
const _tempRay = new THREE.Ray();

function getActiveMapData() {
  return currentSelectedMap === 'cyber_city' && cyberCityData ? cyberCityData : arenaData;
}

function getActiveColliders() {
  const map = getActiveMapData();
  return (map && map.colliders) ? map.colliders : [];
}

function getActiveJumpPads() {
  const map = getActiveMapData();
  return (map && map.jumpPads) ? map.jumpPads : [];
}

window.toggleSelectedMap = function() {
  currentSelectedMap = (currentSelectedMap === 'arena') ? 'cyber_city' : 'arena';
  const el = document.getElementById('current-map-name');
  if (el) {
    el.textContent = currentSelectedMap === 'cyber_city' ? 'Map: Cyber City (Neon Sci-Fi)' : 'Map: Arena (Veck Classic)';
  }
};

// Viewmodel dictionary for all weapon models
const viewmodels = {};
let activeGun = null;

const bots = [];
const remotePlayers = new Map();
const activeGrenades = [];

// Physics
const velocity = new THREE.Vector3();
const playerPos = new THREE.Vector3(0, 0, 0);
let playerRotY = 0;
let headPitch = 0;
let isGrounded = true;

// Bobbing, Recoil & Deploy Animations
let walkBobTimer = 0;
let recoilOffset = 0;
let deployOffset = 0;
let knifeSlashTimer = 0;
let flashTimer = 0;

// WebSocket
let socket = null;

function init() {
  const container = document.getElementById('canvas-container');

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2196f3);
  scene.fog = new THREE.FogExp2(0x2196f3, 0.002);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 900);
  camera.rotation.order = 'YXZ';
  camera.position.set(0, 2.2, 4.2);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.75);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffffff, 0.95);
  sun.position.set(70, 140, 70);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  sun.shadow.bias = -0.0001;
  sun.shadow.camera.near = 10;
  sun.shadow.camera.far = 400;
  sun.shadow.camera.left = -150;
  sun.shadow.camera.right = 150;
  sun.shadow.camera.top = 150;
  sun.shadow.camera.bottom = -150;
  scene.add(sun);

  // Environments
  lobbyEnv = createLobbyEnvironment();
  scene.add(lobbyEnv);
  arenaData = createVeckArenaMap();
  arenaData.group.visible = false;
  scene.add(arenaData.group);

  if (window.models && window.models.createCyberCityMap) {
    cyberCityData = window.models.createCyberCityMap();
    cyberCityData.group.visible = false;
    scene.add(cyberCityData.group);
  }

  // Lobby Avatar with Iconic Man Face
  localAvatar = createBlockyCharacter({
    shirtColor: 0x6c4bf6,
    pantsColor: 0x1f2438,
    isEnemy: false
  });
  scene.add(localAvatar.group);

  // Build All 3D Viewmodels & Attach to Camera
  viewmodels['AK-47'] = window.models.createAK47Model(true, state.equippedWeaponSkins['AK-47']);
  viewmodels['Assault Rifle'] = window.models.createAssaultRifleModel(true, state.equippedWeaponSkins['Assault Rifle']);
  viewmodels['Burst Rifle'] = window.models.createBurstRifleModel(true, state.equippedWeaponSkins['Burst Rifle']);
  viewmodels['Paintball Gun'] = window.models.createPaintballGunModel(true, state.equippedWeaponSkins['Paintball Gun']);
  viewmodels['Minigun'] = window.models.createMinigunModel(true, state.equippedWeaponSkins['Minigun']);
  viewmodels['Sniper'] = window.models.createSniperModel(true, state.equippedWeaponSkins['Sniper']);
  viewmodels['Rocket Launcher'] = window.models.createRocketLauncherModel(true, state.equippedWeaponSkins['Rocket Launcher']);
  viewmodels['Shawty'] = window.models.createShawtyModel(true, state.equippedWeaponSkins['Shawty']);
  viewmodels['Bow'] = window.models.createBowModel(true, state.equippedWeaponSkins['Bow']);

  viewmodels['Pistol'] = window.models.createPistolModel(true, state.equippedWeaponSkins['Pistol']);
  viewmodels['Handgun'] = window.models.createPistolModel(true, state.equippedWeaponSkins['Handgun']);
  viewmodels['Deagle'] = window.models.createPistolModel(true, state.equippedWeaponSkins['Deagle']);
  viewmodels['Revolver'] = window.models.createPistolModel(true, state.equippedWeaponSkins['Revolver']);

  viewmodels['Combat Knife'] = window.models.createKnifeModel(true, state.equippedWeaponSkins['Combat Knife']);
  viewmodels['Stabber'] = window.models.createKnifeModel(true, state.equippedWeaponSkins['Stabber']);
  viewmodels['Gunblade'] = window.models.createKnifeModel(true, state.equippedWeaponSkins['Gunblade']);
  viewmodels['Karambit'] = window.models.createKarambitModel(true, state.equippedWeaponSkins['Karambit']);
  viewmodels['Butterfly Knife'] = window.models.createButterflyKnifeModel(true, state.equippedWeaponSkins['Butterfly Knife']);
  viewmodels['Huntsman Knife'] = window.models.createHuntsmanKnifeModel(true, state.equippedWeaponSkins['Huntsman Knife']);

  viewmodels['Frag Grenade'] = window.models.createFragGrenadeModel(true, state.equippedWeaponSkins['Frag Grenade']);
  viewmodels['Molotov'] = window.models.createFragGrenadeModel(true, state.equippedWeaponSkins['Molotov']);

  Object.values(viewmodels).forEach(vm => {
    // Natural 3D first-person FPS weapon stance: slightly right, angled in towards crosshair
    vm.position.set(0.18, -0.22, -0.38);
    vm.rotation.set(0.04, -0.10, -0.05);
    vm.visible = false;
    camera.add(vm);
  });

  scene.add(camera);

  // Setup Controls
  setupControls();

  // Connect WebSocket
  initWebSocket();

  // Match Timer
  setInterval(updateMatchTimer, 1000);

  // Render Weapon Loadout Screen Grid
  renderWeaponLoadoutGrid();

  // Start Loop
  requestAnimationFrame(gameLoop);
}

function initWebSocket() {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  socket = new WebSocket(`${protocol}//${window.location.host}`);

  socket.onopen = () => {
    if (state.myName) {
      socket.send(JSON.stringify({
        type: 'identify',
        username: state.myName
      }));
    }
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.type === 'player_joined') {
        createRemotePlayer(data.player);
      }

      if (data.type === 'player_moved') {
        const rp = remotePlayers.get(data.id);
        if (rp) {
          rp.group.position.set(data.x, data.y, data.z);
          rp.group.rotation.y = data.rotY;
        }
      }

      if (data.type === 'player_left') {
        const rp = remotePlayers.get(data.id);
        if (rp) {
          scene.remove(rp.group);
          remotePlayers.delete(data.id);
        }
      }

      if (data.type === 'player_shot') {
        window.soundFX.playShot(
          data.gun === 'Pistol' ? 'pistol' : 'assault_rifle',
          data.origin,
          playerPos,
          playerRotY
        );
        createLaserTracer(new THREE.Vector3().copy(data.origin), new THREE.Vector3().copy(data.direction));
      }

      // REALTIME MATCH INVITATION
      if (data.type === 'match_invitation') {
        showMatchInviteBanner(data.fromUsername, data.roomId, data.mode);
      }

      // STATUS OF INVITE SENT
      if (data.type === 'invite_sent_status') {
        showFriendActionMsg(data.message, data.success);
      }

      // REALTIME FRIEND REQUEST RECEIVED
      if (data.type === 'friend_request_received') {
        showGlobalNotification(`📩 "${data.fromUsername}" sana bir arkadaşlık isteği gönderdi!`, 'info');
        const modal = document.getElementById('friends-modal');
        if (modal && (modal.style.display === 'flex' || modal.style.display === 'block')) {
          loadFriendsList();
        }
      }

      // REALTIME FRIEND REQUEST ACCEPTED
      if (data.type === 'friend_request_accepted') {
        showGlobalNotification(`🎉 "${data.byUsername}" arkadaşlık isteğinizi kabul etti! Artık maça çağırabilirsiniz.`, 'success');
        const modal = document.getElementById('friends-modal');
        if (modal && (modal.style.display === 'flex' || modal.style.display === 'block')) {
          loadFriendsList();
        }
      }

    } catch (err) {}
  };
}

function createRemotePlayer(p) {
  if (remotePlayers.has(p.id)) return;
  const avatar = createBlockyCharacter({
    name: p.name,
    level: 7,
    shirtColor: 0x3b82f6,
    pantsColor: 0x1f2438,
    isEnemy: true,
    teamColor: 'blue',
    weaponType: 'ak47'
  });
  avatar.group.position.set(p.x, p.y, p.z);
  scene.add(avatar.group);
  remotePlayers.set(p.id, avatar);
}

function spawnBots() {
  // Clear any existing bots
  bots.forEach(b => scene.remove(b.avatar.group));
  bots.length = 0;

  if (state.isPrivateRoom) return; // NO BOTS IN PRIVATE ROOM MATCHES!

  const botData = [
    { name: 'Vortex [PRO]', level: 25, color: 0x0284c7, team: 'blue', weapon: 'ak47', kills: 0, deaths: 0, score: 0, ping: 24, x: -28, z: -42 },
    { name: 'RedFury [VIP]', level: 35, color: 0xdc2626, team: 'red', weapon: 'ak47', kills: 0, deaths: 0, score: 0, ping: 31, x: 28, z: 42 },
    { name: 'GhostSniper [ELITE]', level: 48, color: 0x0284c7, team: 'blue', weapon: 'sniper', kills: 0, deaths: 0, score: 0, ping: 19, x: -60, z: 32 },
    { name: 'CyberWolf_TR', level: 28, color: 0xdc2626, team: 'red', weapon: 'burst', kills: 0, deaths: 0, score: 0, ping: 42, x: 60, z: -32 },
    { name: 'TitanHeavy [JUGG]', level: 50, color: 0x0284c7, team: 'blue', weapon: 'minigun', kills: 0, deaths: 0, score: 0, ping: 27, x: -75, z: -25 },
    { name: 'NeonPhantom', level: 31, color: 0xdc2626, team: 'red', weapon: 'pistol', kills: 0, deaths: 0, score: 0, ping: 35, x: 75, z: 25 }
  ];

  botData.forEach((b) => {
    const isFriendly = (state.matchType === 'TDM' && b.team === 'blue');
    const avatar = createBlockyCharacter({
      name: b.name,
      level: b.level,
      shirtColor: isFriendly ? 0x0284c7 : (b.team === 'blue' ? 0x3b82f6 : 0xdc2626),
      pantsColor: 0x1f2438,
      isEnemy: !isFriendly,
      isBot: true,
      teamColor: b.team,
      weaponType: b.weapon
    });
    avatar.group.position.set(b.x, 0, b.z);
    scene.add(avatar.group);

    bots.push({
      name: b.name,
      team: b.team,
      level: b.level,
      weapon: b.weapon,
      avatar: avatar,
      health: 120,
      maxHealth: 120,
      isDead: false,
      kills: b.kills,
      deaths: b.deaths,
      score: b.score,
      ping: b.ping,
      targetPos: new THREE.Vector3(b.x, 0, b.z),
      velocity: new THREE.Vector3(0, 0, 0),
      vy: 0,
      isGrounded: true,
      walkPhase: Math.random() * 10,
      burstCount: 0,
      burstMax: b.weapon === 'minigun' ? 8 : (b.weapon === 'sniper' ? 1 : (b.weapon === 'burst' ? 3 : 4)),
      burstTimer: 0,
      shootCooldown: 800 + Math.random() * 1200,
      decisionTimer: Math.random() * 1500,
      strafeTimer: Math.random() * 1200,
      strafeDir: Math.random() < 0.5 ? 1 : -1,
      currentTarget: null,
      jumpCooldown: Math.random() * 1800
    });
  });
}

// Check if a line of sight between two positions is blocked by solid walls / obstacles
function isLineOfSightBlocked(origin, targetPos) {
  const colliders = getActiveColliders();
  if (!colliders || colliders.length === 0) return false;

  _tempRayDir.subVectors(targetPos, origin);
  const maxDist = _tempRayDir.length();
  _tempRayDir.normalize();

  _tempRay.origin.copy(origin);
  _tempRay.direction.copy(_tempRayDir);

  for (let i = 0; i < colliders.length; i++) {
    const c = colliders[i];
    if (!c.box3) {
      c.box3 = new THREE.Box3(
        new THREE.Vector3(c.minX, c.minY, c.minZ),
        new THREE.Vector3(c.maxX, c.maxY, c.maxZ)
      );
    }
    if (_tempRay.intersectBox(c.box3, _tempHitVec)) {
      if (origin.distanceTo(_tempHitVec) < maxDist - 0.5) {
        return true; // Wall blocks the shot!
      }
    }
  }
  return false;
}

function checkAndResolveCollisions(pos, radius = 0.75) {
  const colliders = getActiveColliders();
  if (!colliders || colliders.length === 0) return;

  for (const c of colliders) {
    if (pos.y < c.maxY && pos.y + 1.8 > c.minY) {
      if (pos.x + radius > c.minX && pos.x - radius < c.maxX &&
          pos.z + radius > c.minZ && pos.z - radius < c.maxZ) {
        
        const pushLeft = (pos.x + radius) - c.minX;
        const pushRight = c.maxX - (pos.x - radius);
        const pushTop = (pos.z + radius) - c.minZ;
        const pushBottom = c.maxZ - (pos.z - radius);

        const minPush = Math.min(pushLeft, pushRight, pushTop, pushBottom);
        if (minPush === pushLeft) pos.x = c.minX - radius;
        else if (minPush === pushRight) pos.x = c.maxX + radius;
        else if (minPush === pushTop) pos.z = c.minZ - radius;
        else if (minPush === pushBottom) pos.z = c.maxZ + radius;
      }
    }
  }
}

function getRandomSpawn() {
  const sp = SPAWN_POINTS[Math.floor(Math.random() * SPAWN_POINTS.length)];
  return {
    x: sp.x + (Math.random() - 0.5) * 8,
    z: sp.z + (Math.random() - 0.5) * 8
  };
}

// WEAPON LOADOUT SELECTION (SCREENSHOT 1)
window.selectGunLoadoutTab = function(slotNum) {
  state.activeLoadoutTab = slotNum;
  for (let i = 1; i <= 4; i++) {
    const tab = document.getElementById(`cg-tab-${i}`);
    if (tab) tab.classList.toggle('active', i === slotNum);
  }
  renderWeaponLoadoutGrid();
  window.soundFX.playClick();
};

function renderWeaponLoadoutGrid() {
  const container = document.getElementById('cg-weapon-grid-container');
  if (!container) return;

  const currentSlot = state.activeLoadoutTab || 1;
  const equippedName = state.equippedGuns[currentSlot];

  const weaponsInSlot = Object.values(ALL_WEAPONS_CATALOG).filter(w => w.slot === currentSlot);

  let html = `
    <div class="cg-gun-card" onclick="equipWeapon('Random')">
      <div class="cg-gun-icon">🔀</div>
      <div class="cg-gun-name">Random</div>
    </div>
  `;

  weaponsInSlot.forEach(w => {
    const isEquipped = (w.name === equippedName);
    const config = GUNS_SHOP_PRICES[w.name] || { price: 0, currency: 'coins', unlocked: true };
    const isFree = !config || config.price === 0;
    const isOwned = isFree || (state.inventory && state.inventory.includes(w.name));

    if (!isOwned) {
      html += `
        <div class="cg-gun-card locked-weapon" onclick="handleLockedWeaponClick('${w.name}', ${config.price})" style="opacity: 0.82; position: relative; border-color: rgba(239, 68, 68, 0.45); background: rgba(15, 23, 42, 0.7);">
          <div class="cg-lock-badge" style="position: absolute; top: 6px; right: 8px; font-size: 13px;">🔒</div>
          <div class="cg-gun-icon" style="opacity: 0.4; filter: grayscale(0.8);">${w.icon}</div>
          <div class="cg-gun-name" style="color: #94a3b8;">${w.name}</div>
          <div style="font-size: 10px; color: #ffd700; font-weight: 800; margin-top: 2px;">🪙 ${config.price.toLocaleString()}</div>
        </div>
      `;
    } else {
      html += `
        <div class="cg-gun-card ${isEquipped ? 'selected' : ''}" onclick="equipWeapon('${w.name}')">
          <div class="cg-gun-icon">${w.icon}</div>
          <div class="cg-gun-name">${w.name}</div>
          ${isEquipped ? '<div style="font-size:10px; color:#00ff88; font-weight:900;">EQUIPPED</div>' : '<div style="font-size:10px; color:#38bdf8;">OWNED</div>'}
        </div>
      `;
    }
  });

  // Fill in placeholders / padlocks
  const emptySlots = Math.max(0, 11 - weaponsInSlot.length);
  for (let i = 0; i < emptySlots; i++) {
    html += `
      <div class="cg-gun-card locked">
        <div class="cg-lock-icon">🔒</div>
        <div class="cg-gun-icon">🔫</div>
        <div class="cg-gun-name">Locked</div>
      </div>
    `;
  }

  container.innerHTML = html;
}

window.handleLockedWeaponClick = function(weaponName, price) {
  window.soundFX.playClick();
  alert(`🔒 "${weaponName}" Kilitli!\nBu silahı oyunda kullanabilmek için ana menüdeki Guns mağazasından ${price.toLocaleString()} Altın karşılığı satın almalısınız.`);
};

window.equipWeapon = function(weaponName) {
  if (weaponName === 'Random') {
    const weaponsInSlot = Object.values(ALL_WEAPONS_CATALOG).filter(w => {
      if (w.slot !== state.activeLoadoutTab) return false;
      const config = GUNS_SHOP_PRICES[w.name] || { price: 0 };
      return config.price === 0 || (state.inventory && state.inventory.includes(w.name));
    });
    if (weaponsInSlot.length === 0) return;
    const rand = weaponsInSlot[Math.floor(Math.random() * weaponsInSlot.length)];
    weaponName = rand.name;
  }

  const config = GUNS_SHOP_PRICES[weaponName] || { price: 0 };
  const isFree = !config || config.price === 0;
  const isOwned = isFree || (state.inventory && state.inventory.includes(weaponName));
  if (!isOwned) {
    handleLockedWeaponClick(weaponName, config.price);
    return;
  }

  const slot = state.activeLoadoutTab;
  state.equippedGuns[slot] = weaponName;

  const tabLabel = document.getElementById(`cg-equipped-${slot}`);
  if (tabLabel) tabLabel.textContent = weaponName;

  if (state.currentSlot === slot) {
    const w = getCurrentWeapon();
    state.ammo = w.maxAmmo;
    state.isReloading = false;
    updateAmmoUI();
    updateViewmodelVisibility();
  }

  renderWeaponLoadoutGrid();
  window.soundFX.playDeploy();
};

function toggleSound() {
  if (!window.soundFX) return;
  window.soundFX.enabled = !window.soundFX.enabled;
  const isMuted = !window.soundFX.enabled;
  const btn = document.getElementById('btn-sound');
  if (btn) btn.textContent = isMuted ? '🔇' : '🔊';
  if (window.soundFX.masterGain && window.soundFX.ctx) {
    window.soundFX.masterGain.gain.setValueAtTime(isMuted ? 0 : 0.85, window.soundFX.ctx.currentTime);
  }
}
window.toggleSound = toggleSound;

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }
}
window.toggleFullscreen = toggleFullscreen;

document.addEventListener('fullscreenchange', () => {
  const btn = document.getElementById('btn-fullscreen');
  if (btn) btn.textContent = document.fullscreenElement ? '🗗' : '⛶';
});

let isSchoolDisguised = false;
const EDU_FAVICON = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎓</text></svg>';
const EBA_FAVICON = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📖</text></svg>';

function toggleSchoolDisguise() {
  isSchoolDisguised = !isSchoolDisguised;
  const overlay = document.getElementById('school-panic-screen');
  const favEl = document.getElementById('site-favicon');
  const btn = document.getElementById('btn-school-disguise');

  if (isSchoolDisguised) {
    if (overlay) overlay.style.display = 'block';
    document.title = 'EBA - Eğitim Bilişim Ağı | Ders Akışı & Notlar';
    if (favEl) favEl.href = EBA_FAVICON;
    if (btn) btn.style.background = '#e11d48';

    // Mute sound while in disguise
    if (window.soundFX && window.soundFX.enabled) {
      toggleSound();
      window._unmuteOnDisguiseExit = true;
    }
    // Release pointer lock so mouse is free
    if (document.exitPointerLock) document.exitPointerLock();
  } else {
    if (overlay) overlay.style.display = 'none';
    document.title = 'EBA Proje Geliştirme ve Fizik Modelleme Portalı';
    if (favEl) favEl.href = EDU_FAVICON;
    if (btn) btn.style.background = '';

    // Restore sound if it was muted by disguise
    if (window._unmuteOnDisguiseExit) {
      if (window.soundFX && !window.soundFX.enabled) toggleSound();
      window._unmuteOnDisguiseExit = false;
    }
  }
}
window.toggleSchoolDisguise = toggleSchoolDisguise;

window.addEventListener('keydown', (e) => {
  if (e.key === 'F9') {
    e.preventDefault();
    toggleSchoolDisguise();
  }
});

window.openChangeGunsModal = function(isPreMatch = false) {
  state.isPreMatchLoadout = isPreMatch;
  window.soundFX.playClick();
  const pauseOverlay = document.getElementById('pause-overlay');
  if (pauseOverlay) pauseOverlay.style.display = 'none';

  const modal = document.getElementById('change-guns-modal');
  if (modal) modal.style.display = 'flex';

  // Fix: Slot 1 MUST be a primary gun, never a knife!
  if (state.equippedGuns[1] && (state.equippedGuns[1].includes('Knife') || state.equippedGuns[1].includes('Karambit'))) {
    state.equippedGuns[1] = 'AK-47';
  }
  if (!state.equippedGuns[3] || (!state.equippedGuns[3].includes('Knife') && !state.equippedGuns[3].includes('Karambit'))) {
    state.equippedGuns[3] = 'Combat Knife';
  }

  const deployBtn = document.getElementById('btn-deploy-action');
  if (deployBtn) {
    deployBtn.style.display = 'block';
    if (isPreMatch) {
      deployBtn.innerHTML = '⚔️ SEÇİLEN SİLAHLARLA SAVAŞA GİR (BAŞLAT) ➔';
      deployBtn.style.background = 'linear-gradient(180deg, #10b981 0%, #059669 100%)';
    } else {
      deployBtn.innerHTML = '✓ OYUNA DÖN / RESUME (ESC)';
      deployBtn.style.background = 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%)';
    }
  }

  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`cg-equipped-${i}`);
    if (el) el.textContent = state.equippedGuns[i];
  }

  renderWeaponLoadoutGrid();
};

window.closeChangeGunsModal = function() {
  window.soundFX.playClick();
  const modal = document.getElementById('change-guns-modal');
  if (modal) modal.style.display = 'none';

  if (state.isPreMatchLoadout) {
    state.isPreMatchLoadout = false;
    document.getElementById('ui-root').style.display = 'flex';
    return;
  } else if (state.mode === 'battle') {
    document.getElementById('pause-overlay').style.display = 'flex';
  }
};

window.confirmDeployAndEnterGame = function() {
  window.soundFX.playClick();
  const modal = document.getElementById('change-guns-modal');
  if (modal) modal.style.display = 'none';

  if (state.isPreMatchLoadout) {
    state.isPreMatchLoadout = false;
    executeStartBattle(state.pendingBattleMode || 'FFA');
  } else if (state.mode === 'battle') {
    resumeGame();
  }
};

window.closeMatchEndModal = function() {
  window.soundFX.playClick();
  document.getElementById('match-end-modal').style.display = 'none';
};

function getRandomSpawn() {
  const sp = SPAWN_POINTS[Math.floor(Math.random() * SPAWN_POINTS.length)];
  return {
    x: sp.x + (Math.random() - 0.5) * 8,
    z: sp.z + (Math.random() - 0.5) * 8
  };
}

// 100% RESPONSIVE KEYBOARD CONTROLS (WASD + 1/2/3/4/Q MULTI-KEY CONCURRENCY)
function setupControls() {
  let lastPauseToggleTime = 0;

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function handleKeyDown(e) {
    // If typing in an input element, do not capture game hotkeys except Escape
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
      if (e.code === 'Escape') e.target.blur();
      return;
    }

    // Pre-Match Loadout: Space or Enter immediately deploys into battle
    if (state.isPreMatchLoadout && (e.code === 'Space' || e.code === 'Enter')) {
      e.preventDefault();
      confirmDeployAndEnterGame();
      return;
    }

    // TAB Scoreboard (Hold TAB)
    if (e.code === 'Tab' || e.key === 'Tab') {
      e.preventDefault();
      if (!state.isTabOpen && state.mode === 'battle') openScoreboard();
      return;
    }

    // WASD Movement (Keys tracked concurrently)
    if (e.code === 'KeyW' || e.key === 'w' || e.key === 'W') keys.w = true;
    if (e.code === 'KeyA' || e.key === 'a' || e.key === 'A') keys.a = true;
    if (e.code === 'KeyS' || e.key === 's' || e.key === 'S') keys.s = true;
    if (e.code === 'KeyD' || e.key === 'd' || e.key === 'D') keys.d = true;
    if (e.code === 'Space' || e.key === ' ') keys.space = true;
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.key === 'Shift') keys.shift = true;

    // Instant Weapon Switching (Checked across all code/key/shift variants so 1 tap is guaranteed while holding WASD)
    if (e.code === 'Digit1' || e.code === 'Numpad1' || e.key === '1' || e.key === '!' || e.keyCode === 49 || e.which === 49) {
      switchSlot(1);
    } else if (e.code === 'Digit2' || e.code === 'Numpad2' || e.key === '2' || e.key === "'" || e.key === '@' || e.keyCode === 50 || e.which === 50) {
      switchSlot(2);
    } else if (e.code === 'Digit3' || e.code === 'Numpad3' || e.key === '3' || e.key === '^' || e.key === '#' || e.keyCode === 51 || e.which === 51) {
      switchSlot(3);
    } else if (e.code === 'Digit4' || e.code === 'Numpad4' || e.key === '4' || e.key === '+' || e.key === '$' || e.keyCode === 52 || e.which === 52) {
      switchSlot(4);
    } else if (e.code === 'KeyQ' || e.key === 'q' || e.key === 'Q' || e.keyCode === 81) {
      switchSlot(state.prevSlot);
    }

    if (e.code === 'KeyR' || e.key === 'r' || e.key === 'R') startReload();
    if (e.code === 'KeyE' || e.key === 'e' || e.key === 'E') toggleADS();

    // ESCAPE KEY: Clean, instant toggle with 320ms debouncing (no duplicate triggers!)
    if ((e.code === 'Escape' || e.key === 'Escape') && state.mode === 'battle') {
      e.preventDefault();
      const now = performance.now();
      if (now - lastPauseToggleTime < 320) return;
      lastPauseToggleTime = now;

      const friendsModal = document.getElementById('friends-modal');
      if (friendsModal && (friendsModal.style.display === 'flex' || friendsModal.style.display === 'block')) {
        closeFriendsModal();
        return;
      }

      const cgModal = document.getElementById('change-guns-modal');
      if (cgModal && (cgModal.style.display === 'flex' || cgModal.style.display === 'block')) {
        closeChangeGunsModal();
        return;
      }

      if (state.isPaused) {
        resumeGame();
      } else {
        pauseGame();
      }
      return;
    }
  }

  function handleKeyUp(e) {
    if (e.code === 'Tab' || e.key === 'Tab') {
      e.preventDefault();
      closeScoreboard();
      return;
    }

    if (e.code === 'KeyW' || e.key === 'w' || e.key === 'W') keys.w = false;
    if (e.code === 'KeyA' || e.key === 'a' || e.key === 'A') keys.a = false;
    if (e.code === 'KeyS' || e.key === 's' || e.key === 'S') keys.s = false;
    if (e.code === 'KeyD' || e.key === 'd' || e.key === 'D') keys.d = false;
    if (e.code === 'Space' || e.key === ' ') keys.space = false;
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.key === 'Shift') keys.shift = false;
  }

  // Single window capture listener to eliminate duplicate/conflicting keydown handling
  window.addEventListener('keydown', handleKeyDown, { capture: true });
  window.addEventListener('keyup', handleKeyUp, { capture: true });

  window.addEventListener('wheel', (e) => {
    if (state.mode === 'battle' && !state.isPaused) {
      let nextSlot = state.currentSlot + (e.deltaY > 0 ? 1 : -1);
      if (nextSlot > 4) nextSlot = 1;
      if (nextSlot < 1) nextSlot = 4;
      switchSlot(nextSlot);
    }
  });

  function showFocusOverlay() {
    const el = document.getElementById('click-to-focus-overlay');
    if (el && state.mode === 'battle' && !state.isPaused && !state.isDead) {
      el.style.display = 'flex';
    }
  }

  function hideFocusOverlay() {
    const el = document.getElementById('click-to-focus-overlay');
    if (el) el.style.display = 'none';
  }
  window.showFocusOverlay = showFocusOverlay;
  window.hideFocusOverlay = hideFocusOverlay;

  // Click on the focus overlay directly locks pointer with user gesture
  const clickTrapEl = document.getElementById('click-to-focus-overlay');
  if (clickTrapEl) {
    clickTrapEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      hideFocusOverlay();
      renderer.domElement.requestPointerLock();
    });
  }

  window.addEventListener('mousedown', (e) => {
    if (state.mode === 'battle' && !state.isPaused && !state.isDead) {
      if (document.pointerLockElement !== renderer.domElement) {
        // Critical fix: When mouse is unlocked (e.g. after ESC resume), the first click locks the pointer
        // without firing the weapon or consuming bullets!
        renderer.domElement.requestPointerLock();
        hideFocusOverlay();
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (e.button === 0) {
        isMouseDown = true;
        shoot();
      } else if (e.button === 2) {
        setADS(true);
      }
    }
  });

  window.addEventListener('mouseup', (e) => {
    if (e.button === 0) isMouseDown = false;
    if (e.button === 2) setADS(false);
  });

  window.addEventListener('contextmenu', (e) => {
    if (state.mode === 'battle') e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (isPointerLocked && state.mode === 'battle' && !state.isPaused && !state.isDead) {
      const sens = state.isADS ? 0.0012 : 0.0022;
      playerRotY -= e.movementX * sens;
      headPitch -= e.movementY * sens;
      headPitch = Math.max(-1.45, Math.min(1.45, headPitch));
    }
  });

  document.addEventListener('pointerlockchange', () => {
    isPointerLocked = (document.pointerLockElement === renderer.domElement);
    if (isPointerLocked) {
      hideFocusOverlay();
    } else {
      if (state.mode === 'battle' && !state.isPaused && !state.isDead) {
        // If the focus overlay is currently visible, user hasn't clicked to lock yet; do not re-pause
        const focusEl = document.getElementById('click-to-focus-overlay');
        if (focusEl && focusEl.style.display === 'flex') return;

        if (performance.now() - lastPauseToggleTime < 320) return;
        lastPauseToggleTime = performance.now();

        const endModal = document.getElementById('match-end-modal');
        const cgModal = document.getElementById('change-guns-modal');
        const friendsModal = document.getElementById('friends-modal');
        if ((!endModal || endModal.style.display !== 'flex') && 
            (!cgModal || cgModal.style.display !== 'flex') &&
            (!friendsModal || friendsModal.style.display !== 'flex')) {
          pauseGame();
        }
      }
    }
  });

  document.getElementById('player-name-input').addEventListener('input', (e) => {
    state.myName = e.target.value.trim() || 'ensar';
    const pauseName = document.getElementById('pause-card-name');
    if (pauseName) {
      const adminTag = state.isAdmin ? '<span style="color:#ef4444; font-weight:900;">[ADMIN]</span> ' : '';
      pauseName.innerHTML = `${adminTag}${state.myName}`;
    }
    const hudName = document.getElementById('hud-player-name');
    if (hudName) hudName.textContent = state.myName;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'identify', username: state.myName }));
    }
  });
}

// MODAL CONTROLS (SCREENSHOTS 2 & 3)
window.openModeModal = function() {
  window.soundFX.playClick();
  document.getElementById('mode-select-modal').style.display = 'flex';
};

window.closeModeModal = function() {
  window.soundFX.playClick();
  document.getElementById('mode-select-modal').style.display = 'none';
};

window.openPrivateGameModal = function() {
  window.soundFX.playClick();
  closeModeModal();
  document.getElementById('private-game-modal').style.display = 'flex';
};

window.closePrivateGameModal = function() {
  window.soundFX.playClick();
  document.getElementById('private-game-modal').style.display = 'none';
};

window.createPrivateRoom = async function() {
  window.soundFX.playClick();
  const mode = document.getElementById('private-mode-select')?.value || 'FFA';

  try {
    const res = await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode })
    });
    const data = await res.json();

    if (data.success) {
      state.roomId = data.roomId;
      state.isPrivateRoom = true;
      state.matchType = mode;
      closePrivateGameModal();
      alert(`🎉 Özel Oda Başarıyla Kuruldu!\nArkadaşlarınızın girmesi için Oda Kodu: ${data.roomId}`);
      startBattle(mode);
    }
  } catch (e) {
    alert('Oda oluşturulamadı!');
  }
};

window.joinPrivateRoom = async function() {
  window.soundFX.playClick();
  const inputCode = document.getElementById('private-room-code-input').value.trim().toUpperCase();
  if (!inputCode) {
    alert('Lütfen katılmak istediğiniz Oda Kodunu girin!');
    return;
  }

  try {
    const res = await fetch('/api/rooms/check/' + encodeURIComponent(inputCode));
    const data = await res.json();

    if (!data.exists) {
      alert(`❌ "${inputCode}" kodlu oda bulunamadı!\nLütfen geçerli ve kurulu bir Oda Kodu girin veya sağ taraftan yeni bir özel oda kurun.`);
      return;
    }

    state.roomId = inputCode;
    state.isPrivateRoom = true;
    closePrivateGameModal();
    startBattle(data.mode || 'FFA');
  } catch (e) {
    alert('Sunucuya bağlanılamadı!');
  }
};

function openScoreboard() {
  state.isTabOpen = true;
  const sb = document.getElementById('tab-scoreboard');
  if (sb) {
    updateScoreboardUI();
    sb.style.display = 'flex';
  }
}

function closeScoreboard() {
  state.isTabOpen = false;
  const sb = document.getElementById('tab-scoreboard');
  if (sb) sb.style.display = 'none';
}

function updateScoreboardUI() {
  const tbody = document.getElementById('scoreboard-rows');
  if (!tbody) return;

  const roomBadge = document.getElementById('sb-room-badge');
  if (roomBadge) roomBadge.textContent = `ODA: ${state.roomId || 'FFA'} • ${state.matchType || 'FFA'}`;

  const timerDisplay = document.getElementById('sb-timer-display');
  if (timerDisplay) {
    const mins = Math.floor(state.matchSeconds / 60);
    const secs = state.matchSeconds % 60;
    timerDisplay.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  const playerEntry = {
    isLocal: true,
    name: state.myName,
    level: state.level || 0,
    kills: state.kills,
    deaths: state.deaths,
    kd: (state.deaths === 0 ? state.kills : (state.kills / state.deaths)).toFixed(1),
    score: state.score,
    ping: state.ping || 18
  };

  const allEntries = [playerEntry, ...bots.map(b => ({
    isLocal: false,
    name: b.name,
    level: b.level,
    kills: b.kills,
    deaths: b.deaths,
    kd: (b.deaths === 0 ? b.kills : (b.kills / b.deaths)).toFixed(1),
    score: b.score,
    ping: b.ping || 24
  }))];

  // PRIMARY SORT: BY KILLS DESCENDING (As requested: "en çok kişiyi kim öldürdü")
  allEntries.sort((a, b) => b.kills - a.kills || b.score - a.score);

  const topLeader = allEntries[0];
  const topKillerEl = document.getElementById('sb-top-killer-name');
  if (topKillerEl && topLeader) {
    topKillerEl.textContent = `${topLeader.name} (${topLeader.kills} Kill)`;
  }

  tbody.innerHTML = allEntries.map((p, idx) => {
    const rankClass = idx === 0 ? 'sb-rank-gold' : (idx === 1 ? 'sb-rank-silver' : (idx === 2 ? 'sb-rank-bronze' : ''));
    const medalIcon = idx === 0 ? '👑 ' : (idx === 1 ? '🥈 ' : (idx === 2 ? '🥉 ' : ''));
    return `
      <tr class="sb-row ${p.isLocal ? 'local-player' : ''}">
        <td class="${rankClass}" style="text-align: center; font-weight: 900;">${medalIcon}#${idx + 1}</td>
        <td>
          <div class="sb-player-cell">
            <span class="sb-lvl-badge">★${p.level}</span>
            <span class="sb-name-text">${p.name} ${p.isLocal ? '<span style="color:#38bdf8; font-size:11px; font-weight: 900;">(SEN)</span>' : ''}</span>
          </div>
        </td>
        <td style="text-align: center; color: #4ade80; font-weight: 900; font-size: 16px;">${p.kills}</td>
        <td style="text-align: center; color: #f87171; font-weight: 700;">${p.deaths}</td>
        <td style="text-align: center; color: #93c5fd; font-weight: 700;">${p.kd}</td>
        <td style="text-align: center; color: #facc15; font-weight: 900;">${p.score}</td>
        <td style="text-align: center; color: #94a3b8; font-size: 11px;">${p.ping}ms</td>
      </tr>
    `;
  }).join('');
}

function toggleADS() {
  setADS(!state.isADS);
}

function setADS(val) {
  state.isADS = val;
  const ch = document.getElementById('main-crosshair');
  if (ch) ch.classList.toggle('ads-mode', val);
}

window.startBattle = function(mode = 'FFA') {
  window.soundFX.playClick();
  closeModeModal();
  closePrivateGameModal();

  state.pendingBattleMode = mode;
  // Open Pre-Match Loadout Screen so the player chooses their weapons and knife BEFORE entering battle!
  openChangeGunsModal(true);
};

window.executeStartBattle = function(mode = 'FFA') {
  state.mode = 'battle';
  state.matchType = mode;
  state.isPaused = false;
  state.isDead = false;
  state.health = 150;
  state.matchSeconds = 10 * 60; // 10 minutes maximum match time
  state.ammo = getCurrentWeapon().maxAmmo;
  state.isReloading = false;

  document.getElementById('ui-root').style.display = 'none';
  document.getElementById('battle-hud').style.display = 'block';
  document.getElementById('pause-overlay').style.display = 'none';
  const cgModal = document.getElementById('change-guns-modal');
  if (cgModal) cgModal.style.display = 'none';

  document.getElementById('room-code-tag').textContent = state.roomId;
  hideBanners();
  updateHealthUI();
  updateAmmoUI();

  // Reset match kills, deaths and scores completely on each match start!
  state.kills = 0;
  state.deaths = 0;
  state.score = 0;
  state.matchSeconds = 10 * 60;
  const pScoreEl = document.getElementById('player-score');
  if (pScoreEl) pScoreEl.textContent = '0';

  deployGraceTimer = 0.5;
  if (lobbyEnv) lobbyEnv.visible = false;
  if (localAvatar && localAvatar.group) localAvatar.group.visible = false;
  if (currentSelectedMap === 'cyber_city' && cyberCityData) {
    if (arenaData && arenaData.group) arenaData.group.visible = false;
    cyberCityData.group.visible = true;
  } else {
    if (cyberCityData && cyberCityData.group) cyberCityData.group.visible = false;
    if (arenaData && arenaData.group) arenaData.group.visible = true;
  }
  updateViewmodelVisibility();

  // Deploy animation
  deployOffset = 1.0;
  window.soundFX.playDeploy();

  const spawn = getRandomSpawn();
  playerPos.set(spawn.x, 0, spawn.z);
  playerRotY = Math.PI;
  headPitch = 0;
  velocity.set(0, 0, 0);

  // Instantly place camera at spawn position to prevent rendering lobby orbit
  camera.position.set(playerPos.x, playerPos.y + 1.8, playerPos.z);
  camera.rotation.set(headPitch, playerRotY, 0, 'YXZ');

  // Spawn Bots only if public match (No bots in private rooms!)
  spawnBots();

  // Notify server via WebSocket
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'join_room',
      roomId: state.roomId,
      isPrivate: state.isPrivateRoom,
      mode: state.matchType,
      name: state.myName
    }));
  }

  renderer.domElement.requestPointerLock();
};

window.pauseGame = function() {
  state.isPaused = true;
  hideFocusOverlay();
  document.exitPointerLock();
  const pauseRoomId = document.getElementById('pause-room-id');
  if (pauseRoomId) pauseRoomId.textContent = state.roomId;
  
  const pauseName = document.getElementById('pause-card-name');
  if (pauseName) {
    const adminTag = state.isAdmin ? '<span style="color:#ef4444; font-weight:900;">[ADMIN]</span> ' : '';
    pauseName.innerHTML = `${adminTag}${state.myName}`;
  }

  const pauseLvl = document.getElementById('pause-card-lvl');
  if (pauseLvl) pauseLvl.textContent = `lvl ${state.level || 0}`;

  const currentLevelXp = (state.xp || 0) % 1000;
  const xpPct = Math.min(100, Math.max(0, (currentLevelXp / 1000) * 100));
  const xpFill = document.getElementById('pause-card-xp-fill');
  if (xpFill) xpFill.style.width = `${xpPct}%`;
  const xpText = document.getElementById('pause-card-xp-text');
  if (xpText) xpText.textContent = `${1000 - currentLevelXp} XP to Next`;

  document.getElementById('pause-overlay').style.display = 'flex';
  window.soundFX.playClick();
};

window.resumeGame = function() {
  state.isPaused = false;
  document.getElementById('pause-overlay').style.display = 'none';
  window.soundFX.playClick();

  try {
    const lockPromise = renderer.domElement.requestPointerLock();
    if (lockPromise && typeof lockPromise.catch === 'function') {
      lockPromise.catch(() => {
        if (state.mode === 'battle' && !state.isPaused && !state.isDead) {
          showFocusOverlay();
        }
      });
    }
  } catch (err) {
    if (state.mode === 'battle' && !state.isPaused && !state.isDead) {
      showFocusOverlay();
    }
  }

  setTimeout(() => {
    if (state.mode === 'battle' && !state.isPaused && !state.isDead && document.pointerLockElement !== renderer.domElement) {
      showFocusOverlay();
    }
  }, 60);
};

window.leaveBattle = function() {
  state.mode = 'lobby';
  state.isPaused = false;
  state.isDead = false;
  state.kills = 0;
  state.deaths = 0;
  state.score = 0;
  hideFocusOverlay();
  const pScoreEl = document.getElementById('player-score');
  if (pScoreEl) pScoreEl.textContent = '0';
  document.exitPointerLock();
  document.getElementById('ui-root').style.display = 'flex';
  document.getElementById('battle-hud').style.display = 'none';
  document.getElementById('pause-overlay').style.display = 'none';
  closeScoreboard();
  hideBanners();

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'lobby_status',
      username: state.myName
    }));
  }

  lobbyEnv.visible = true;
  localAvatar.group.visible = true;
  if (arenaData) arenaData.group.visible = false;
  if (cyberCityData) cyberCityData.group.visible = false;

  // Hide all first-person weapon viewmodels in lobby so nothing floats on screen!
  Object.values(viewmodels).forEach(vm => {
    if (vm) vm.visible = false;
  });
  activeGun = null;

  playerPos.set(0, 0, 0);
  playerRotY = 0;
  headPitch = 0;
  window.soundFX.playClick();
};

function updateViewmodelVisibility() {
  // Hide all viewmodels first
  Object.values(viewmodels).forEach(vm => {
    vm.visible = false;
  });
  activeGun = null;

  if (state.mode !== 'battle' || state.isDead) return;

  const currentW = getCurrentWeapon();
  const vm = viewmodels[currentW.name] || (state.currentSlot === 1 ? viewmodels['AK-47'] : (state.currentSlot === 2 ? viewmodels['Pistol'] : (state.currentSlot === 3 ? viewmodels['Combat Knife'] : viewmodels['Frag Grenade'])));

  if (vm) {
    const activeSkin = state.equippedWeaponSkins[currentW.name] || 'default';
    if (window.models && window.models.applySkinToMesh) {
      window.models.applySkinToMesh(vm, activeSkin, currentW.name);
    }
    vm.visible = true;
    activeGun = vm;
  }
}

// 100% RELIABLE WEAPON SWITCH WITH MECHANICAL AUDIO & SPRING DEPLOY FX
window.switchSlot = function(slotNum) {
  if (state.currentSlot === slotNum) return;
  state.prevSlot = state.currentSlot;
  state.currentSlot = slotNum;
  const w = getCurrentWeapon();
  state.ammo = w.maxAmmo;
  state.isReloading = false;

  updateAmmoUI();
  updateViewmodelVisibility();

  // Weapon Switch Spring Animation & Sound FX
  deployOffset = 1.0;
  window.soundFX.playDeploy();

  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`slot-${i}`);
    if (el) el.classList.toggle('active', slotNum === i);
  }
};

function triggerDamageFlash() {
  const vig = document.getElementById('damage-vignette');
  if (vig) {
    vig.classList.add('flash');
    setTimeout(() => vig.classList.remove('flash'), 160);
  }
}

function showFloatingDamage(worldPos, damage, isHeadshot = false) {
  const container = document.getElementById('damage-numbers-layer');
  if (!container) return;

  const tempV = worldPos.clone();
  tempV.y += 0.4;
  tempV.project(camera);

  const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-(tempV.y * 0.5) + 0.5) * window.innerHeight;

  const pop = document.createElement('div');
  pop.className = `damage-number-pop ${isHeadshot ? 'headshot-crit' : ''}`;
  pop.textContent = isHeadshot ? `${damage} CRIT` : `${damage}`;
  pop.style.left = `${x}px`;
  pop.style.top = `${y}px`;

  container.appendChild(pop);
  setTimeout(() => pop.remove(), 750);
}

function showEliminationBanner(victimName) {
  const banner = document.getElementById('elim-banner');
  const nameEl = document.getElementById('elim-victim-name');
  const roundWon = document.getElementById('round-won-banner');

  if (nameEl) nameEl.textContent = victimName;
  if (banner) banner.classList.add('show');
  if (roundWon) roundWon.classList.add('show');

  setTimeout(() => {
    if (banner) banner.classList.remove('show');
    if (roundWon) roundWon.classList.remove('show');
  }, 2200);
}

function showDeathCallout(killerName, killerWeapon) {
  const card = document.getElementById('killer-card');
  const nameEl = document.getElementById('killer-name');
  const weaponEl = document.getElementById('killer-weapon');
  const roundLost = document.getElementById('round-lost-banner');

  if (nameEl) nameEl.textContent = `${killerName} ✨`;
  if (weaponEl) weaponEl.textContent = `Eliminated you with ${killerWeapon}`;
  if (card) card.classList.add('show');
  if (roundLost) roundLost.classList.add('show');

  setTimeout(() => {
    if (card) card.classList.remove('show');
    if (roundLost) roundLost.classList.remove('show');
  }, 2800);
}

function hideBanners() {
  const b1 = document.getElementById('elim-banner');
  const b2 = document.getElementById('round-won-banner');
  const b3 = document.getElementById('round-lost-banner');
  const b4 = document.getElementById('killer-card');
  if (b1) b1.classList.remove('show');
  if (b2) b2.classList.remove('show');
  if (b3) b3.classList.remove('show');
  if (b4) b4.classList.remove('show');
}

function shoot() {
  if (state.mode !== 'battle' || state.health <= 0 || state.isReloading || state.isPaused || state.isDead) return;

  const weapon = getCurrentWeapon();
  const now = Date.now();
  if (now - lastShotTime < weapon.fireRate) return;

  // SLOT 3: MELEE KNIFE ATTACK
  if (state.currentSlot === 3) {
    lastShotTime = now;
    knifeSlashTimer = 0.28;
    window.soundFX.playKnifeSlash();

    const shootDir = new THREE.Vector3();
    camera.getWorldDirection(shootDir);
    const origin = camera.position.clone();

    // Check bots within melee range (3.8m)
    bots.forEach((bot) => {
      if (bot.health > 0 && !bot.isDead) {
        const bp = bot.avatar.group.position;
        const d = origin.distanceTo(bp);
        if (d < 3.8 && !isLineOfSightBlocked(origin, bp)) {
          const damage = 45;
          bot.health -= damage;
          triggerHitmarker();
          window.soundFX.playHit();
          showFloatingDamage(bp.clone().add(new THREE.Vector3(0, 1.2, 0)), damage, false);

          if (bot.avatar.hpFill) bot.avatar.hpFill.scale.x = Math.max(0, bot.health / bot.maxHealth);

          if (bot.health <= 0) {
            handleBotKill(bot, weapon, false);
          }
        }
      }
    });
    return;
  }

  // SLOT 4: GRENADE THROW
  if (state.currentSlot === 4) {
    if (state.ammo <= 0) return;
    lastShotTime = now;
    state.ammo--;
    updateAmmoUI();

    const shootDir = new THREE.Vector3();
    camera.getWorldDirection(shootDir);
    const origin = camera.position.clone().add(shootDir.clone().multiplyScalar(0.7));

    const gMesh = createFragGrenadeModel(false);
    gMesh.position.copy(origin);
    scene.add(gMesh);

    const gVel = shootDir.clone().multiplyScalar(24);
    gVel.y += 6;

    activeGrenades.push({
      mesh: gMesh,
      pos: origin,
      vel: gVel,
      timer: 2.2,
      isExploded: false
    });

    window.soundFX.playClickSound(this.currentTime || 0, 800, 300, 0.08, 0.4);
    return;
  }

  // SLOTS 1 & 2: GUNFIRE
  if (state.ammo <= 0) {
    startReload();
    return;
  }

  lastShotTime = now;
  state.ammo--;
  updateAmmoUI();
  if (state.ammo === 0) {
    setTimeout(startReload, 80);
  }

  window.soundFX.playShot(weapon.sound);

  recoilOffset = state.currentSlot === 1 ? 0.16 : 0.12;
  if (activeGun && activeGun.flash) {
    activeGun.flash.material.opacity = 1;
    flashTimer = 0.05;
  }

  const shootDir = new THREE.Vector3();
  camera.getWorldDirection(shootDir);

  const spread = state.isADS ? weapon.spread * 0.15 : weapon.spread;
  shootDir.x += (Math.random() - 0.5) * spread;
  shootDir.y += (Math.random() - 0.5) * spread;
  shootDir.z += (Math.random() - 0.5) * spread;
  shootDir.normalize();

  const origin = camera.position.clone();
  createLaserTracer(origin, shootDir);

  // Sync to server over WebSocket
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'shoot',
      gun: weapon.name,
      origin: origin,
      direction: shootDir
    }));
  }

  const raycaster = new THREE.Raycaster(origin, shootDir, 0.1, 300);

  // 1. Check solid obstacle collision distance (Wall / Box / Barrel / Container)
  let closestWallDist = Infinity;
  const colliders = getActiveColliders();
  for (const c of colliders) {
    const box = new THREE.Box3(
      new THREE.Vector3(c.minX, c.minY, c.minZ),
      new THREE.Vector3(c.maxX, c.maxY, c.maxZ)
    );
    const hit = new THREE.Vector3();
    if (raycaster.ray.intersectBox(box, hit)) {
      const d = origin.distanceTo(hit);
      if (d < closestWallDist) closestWallDist = d;
    }
  }

  // 2. Bot Targets Check
  bots.forEach((bot) => {
    if (bot.health > 0 && !bot.isDead) {
      // In TDM, player and Blue bots are on the same team -> Friendly fire disabled!
      if (state.matchType === 'TDM' && bot.team === 'blue') {
        return;
      }

      const box = new THREE.Box3().setFromObject(bot.avatar.group);
      const hitPoint = new THREE.Vector3();
      const intersects = raycaster.ray.intersectBox(box, hitPoint);

      if (intersects) {
        const targetDist = origin.distanceTo(hitPoint);

        // BULLET IS BLOCKED IF A SOLID WALL IS IN FRONT OF BOT!
        if (targetDist < closestWallDist) {
          const hitRelY = hitPoint.y - bot.avatar.group.position.y;
          const isHeadshot = hitRelY > 1.65;
          // Exact 34 damage on headshots! Never 1-hit kill!
          const damage = isHeadshot ? 34 : (weapon.damage || 22);

          bot.health -= damage;
          triggerHitmarker();
          window.soundFX.playHit();
          showFloatingDamage(hitPoint, damage, isHeadshot);

          if (bot.avatar.hpFill) {
            bot.avatar.hpFill.scale.x = Math.max(0, bot.health / bot.maxHealth);
          }

          bot.currentTarget = { pos: playerPos, isPlayer: true, dist: bot.avatar.group.position.distanceTo(playerPos) };
          bot.strafeDir *= -1;

          if (bot.health <= 0) {
            handleBotKill(bot, weapon, isHeadshot);
          }
        }
      }
    }
  });

  // 3. Remote Players (Private Room Mode)
  remotePlayers.forEach((rp, rId) => {
    const box = new THREE.Box3().setFromObject(rp.group);
    const hitPoint = new THREE.Vector3();
    if (raycaster.ray.intersectBox(box, hitPoint)) {
      const targetDist = origin.distanceTo(hitPoint);
      if (targetDist < closestWallDist) {
        triggerHitmarker();
        window.soundFX.playHit();
        const hitRelY = hitPoint.y - rp.group.position.y;
        const isHeadshot = hitRelY > 1.65;
        const damage = isHeadshot ? 34 : (weapon.damage || 22);
        showFloatingDamage(hitPoint, damage, isHeadshot);

        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: 'player_hit',
            targetId: rId,
            damage: damage,
            isHeadshot: isHeadshot
          }));
        }
      }
    }
  });
}

function handleBotKill(bot, weapon, isHeadshot) {
  bot.isDead = true;
  state.kills++;
  state.score += (isHeadshot ? 150 : 100);
  bot.deaths++;

  if (!state.stats) state.stats = { kills: 0, score: 0, headshots: 0, matchesPlayed: 0, matchesWon: 0, casesOpened: 0, heavyKills: 0, slidesUsed: 0 };
  state.stats.kills = (state.stats.kills || 0) + 1;
  state.stats.score = (state.stats.score || 0) + (isHeadshot ? 150 : 100);
  if (isHeadshot) state.stats.headshots = (state.stats.headshots || 0) + 1;
  if (weapon && (weapon.name === 'Rocket Launcher' || weapon.name === 'Minigun')) {
    state.stats.heavyKills = (state.stats.heavyKills || 0) + 1;
  }

  document.getElementById('player-score').textContent = state.kills;
  window.soundFX.playKill();

  // Gun Game Mode weapon progression!
  if (state.matchType === 'Gun Game') {
    const nextG = (state.currentSlot % 4) + 1;
    switchSlot(nextG);
  }

  showEliminationBanner(bot.name);
  showFeed(`${state.myName} ⚔️ ${bot.name} (${weapon ? weapon.name : 'Weapon'}${isHeadshot ? ' 🎯' : ''})`);

  bot.avatar.group.rotation.x = -Math.PI / 2;
  bot.avatar.group.position.y = 0.25;
  if (bot.avatar.hpGroup) bot.avatar.hpGroup.visible = false;

  if (state.isTabOpen) updateScoreboardUI();

  setTimeout(() => {
    bot.health = 100;
    bot.isDead = false;
    bot.avatar.group.rotation.set(0, 0, 0);
    bot.avatar.group.position.y = 0;
    if (bot.avatar.hpGroup) bot.avatar.hpGroup.visible = true;
    if (bot.avatar.hpFill) bot.avatar.hpFill.scale.x = 1;

    const sp = getRandomSpawn();
    bot.avatar.group.position.set(sp.x, 0, sp.z);
  }, 2600);
}

function startReload() {
  const weapon = getCurrentWeapon();
  if (state.isReloading || state.currentSlot === 3 || state.ammo === weapon.maxAmmo) return;

  state.isReloading = true;
  state.reloadTimer = 0;
  document.getElementById('ammo-current').innerHTML = `... <span style="font-size: 24px; color: #8fa0c9;">III</span>`;
  window.soundFX.playReload();
}

function triggerHitmarker() {
  const hm = document.getElementById('hitmarker');
  hm.classList.add('show');
  setTimeout(() => hm.classList.remove('show'), 90);
}

function createLaserTracer(origin, dir) {
  const p2 = origin.clone().add(dir.clone().multiplyScalar(100));
  const geom = new THREE.BufferGeometry().setFromPoints([origin, p2]);
  const mat = new THREE.LineBasicMaterial({ color: 0xffea00, linewidth: 2 });
  const line = new THREE.Line(geom, mat);
  scene.add(line);
  setTimeout(() => { scene.remove(line); geom.dispose(); }, 35);
}

function updateHealthUI() {
  const fill = document.getElementById('health-fill');
  const text = document.getElementById('health-text');
  const pct = Math.max(0, (state.health / state.maxHealth) * 100);
  fill.style.width = pct + '%';
  text.textContent = Math.ceil(state.health);
}

function updateAmmoUI() {
  const weapon = getCurrentWeapon();
  document.getElementById('ammo-current').innerHTML = `${state.currentSlot === 3 ? '∞' : state.ammo} <span style="font-size: 26px; color: #8fa0c9;">III</span>`;
  const nameEl = document.getElementById('ammo-gun-name');
  if (nameEl) nameEl.textContent = weapon.name;
}

function updateMatchTimer() {
  if (state.mode === 'battle' && !state.isPaused && state.matchSeconds > 0) {
    state.matchSeconds--;
    const mins = Math.floor(state.matchSeconds / 60);
    const secs = state.matchSeconds % 60;
    const timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    
    document.getElementById('match-timer').textContent = timeStr;
    const pTimer = document.getElementById('pause-match-timer');
    if (pTimer) pTimer.textContent = timeStr;
    const cgTimer = document.getElementById('cg-match-timer');
    if (cgTimer) cgTimer.textContent = timeStr;

    // 10 MINUTES EXPIRED: END OF MATCH TRIGGER
    if (state.matchSeconds <= 0) {
      endMatch10Minutes();
    }
  }
}

function endMatch10Minutes() {
  state.isPaused = true;
  document.exitPointerLock();

  // Find 1st place champion
  let highestKills = state.kills;
  let winnerName = state.myName;

  bots.forEach(b => {
    if (b.kills > highestKills) {
      highestKills = b.kills;
      winnerName = b.name;
    }
  });

  if (!state.stats) state.stats = { kills: 0, score: 0, headshots: 0, matchesPlayed: 0, matchesWon: 0, casesOpened: 0, heavyKills: 0, slidesUsed: 0 };
  state.stats.matchesPlayed = (state.stats.matchesPlayed || 0) + 1;
  if (winnerName === state.myName) {
    state.stats.matchesWon = (state.stats.matchesWon || 0) + 1;
  }

  document.getElementById('winner-banner-text').textContent = `#1 TOP CHAMPION: ${winnerName} (${highestKills} Kills)`;
  document.getElementById('end-kills').textContent = state.kills;
  document.getElementById('end-deaths').textContent = state.deaths;
  document.getElementById('end-score').textContent = state.score;

  document.getElementById('match-end-modal').style.display = 'flex';
  window.soundFX.playKill();
}

function showFeed(text) {
  const kf = document.getElementById('killfeed');
  const item = document.createElement('div');
  item.className = 'killfeed-item';
  item.textContent = text;
  kf.appendChild(item);
  setTimeout(() => item.remove(), 3500);
}

// MAIN GAME LOOP
let prevTime = performance.now();
let netSyncTimer = 0;

function gameLoop(time) {
  requestAnimationFrame(gameLoop);

  const delta = Math.min(0.1, (time - prevTime) / 1000);
  prevTime = time;
  const t = time * 0.001;

  if (deployGraceTimer > 0) deployGraceTimer -= delta;

  if (flashTimer > 0) {
    flashTimer -= delta;
    if (flashTimer <= 0 && activeGun && activeGun.flash) {
      activeGun.flash.material.opacity = 0;
    }
  }

  // Smooth Weapon Deploy / Switch Spring Animation
  if (deployOffset > 0) {
    deployOffset = Math.max(0, deployOffset - delta * 4.2);
  }

  // Knife slash swing animation
  if (knifeSlashTimer > 0) {
    knifeSlashTimer -= delta;
  }

  // Active Grenades Physics Loop
  for (let i = activeGrenades.length - 1; i >= 0; i--) {
    const g = activeGrenades[i];
    g.timer -= delta;

    g.vel.y -= 22 * delta; // Gravity
    g.pos.x += g.vel.x * delta;
    g.pos.y += g.vel.y * delta;
    g.pos.z += g.vel.z * delta;

    // Ground bounce
    if (g.pos.y <= 0.2) {
      g.pos.y = 0.2;
      g.vel.y = -g.vel.y * 0.45;
      g.vel.x *= 0.7;
      g.vel.z *= 0.7;
    }

    g.mesh.position.copy(g.pos);
    g.mesh.rotation.x += delta * 15;
    g.mesh.rotation.y += delta * 10;

    // Grenade Detonation after fuse
    if (g.timer <= 0 && !g.isExploded) {
      g.isExploded = true;
      scene.remove(g.mesh);
      activeGrenades.splice(i, 1);

      window.soundFX.playExplosion(1.0);

      // Area Damage (12m radius)
      bots.forEach(b => {
        if (b.health > 0 && !b.isDead) {
          const d = b.avatar.group.position.distanceTo(g.pos);
          if (d < 12) {
            const dmg = Math.round(75 * (1 - d / 12));
            b.health -= dmg;
            showFloatingDamage(b.avatar.group.position.clone().add(new THREE.Vector3(0, 1.2, 0)), dmg, false);
            if (b.avatar.hpFill) b.avatar.hpFill.scale.x = Math.max(0, b.health / b.maxHealth);
            if (b.health <= 0) handleBotKill(b, { name: 'Frag Grenade' }, false);
          }
        }
      });

      // Player Damage if within blast radius
      const pDist = playerPos.distanceTo(g.pos);
      if (pDist < 10) {
        state.health = Math.max(0, state.health - Math.round(60 * (1 - pDist / 10)));
        updateHealthUI();
        triggerDamageFlash();
      }
    }
  }

  // Rotary Minigun barrel rotation
  if (activeGun && activeGun.barrelGroup && isMouseDown && state.currentSlot === 1 && state.equippedGuns[1] === 'Minigun') {
    activeGun.barrelGroup.rotation.z += delta * 45;
  }

  // Lobby Orbit
  if (state.mode === 'lobby') {
    const radius = 4.2;
    const camX = Math.sin(t * 0.4) * 0.6;
    const camZ = radius + Math.cos(t * 0.4) * 0.4;
    camera.position.set(camX, 2.0, camZ);
    camera.lookAt(0, 1.4, 0);

    if (localAvatar) {
      localAvatar.group.rotation.y = Math.sin(t * 0.5) * 0.15;
      localAvatar.leftArm.rotation.x = Math.sin(t * 1.5) * 0.08;
      localAvatar.rightArm.rotation.x = -Math.sin(t * 1.5) * 0.08;
      localAvatar.head.rotation.y = Math.sin(t * 0.8) * 0.12;
    }
  }

  // In-Game Battle Mode
  if (state.mode === 'battle' && !state.isPaused) {
    // Zeppelin Propellers & Cloud Drift
    if (arenaData && arenaData.zeppelin && arenaData.zeppelin.props) {
      arenaData.zeppelin.props[0].rotation.x += delta * 30;
      arenaData.zeppelin.props[1].rotation.x += delta * 30;
    }
    if (arenaData && arenaData.clouds) {
      arenaData.clouds.rotation.y += delta * 0.006;
    }

    // Player Movement Physics
    if (!state.isDead) {
      const speed = keys.shift ? 16 : 10.5;
      const move = new THREE.Vector3();
      if (keys.w) move.z -= 1;
      if (keys.s) move.z += 1;
      if (keys.a) move.x -= 1;
      if (keys.d) move.x += 1;
      move.normalize();
      move.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerRotY);

      playerPos.x += move.x * speed * delta;
      playerPos.z += move.z * speed * delta;

      // Solid obstacle collisions
      checkAndResolveCollisions(playerPos, 0.75);

      playerPos.x = Math.max(-145, Math.min(145, playerPos.x));
      playerPos.z = Math.max(-145, Math.min(145, playerPos.z));

      if (keys.space && isGrounded) {
        velocity.y = 8.5;
        isGrounded = false;
        window.soundFX.playClickSound(t, 200, 450, 0.08, 0.2);
      }

      velocity.y -= 22 * delta;
      playerPos.y += velocity.y * delta;

      if (playerPos.y <= 0) {
        playerPos.y = 0;
        velocity.y = 0;
        isGrounded = true;
      }

      // Jump Pads
      getActiveJumpPads().forEach(([jx, jy, jz]) => {
        const d = Math.sqrt((playerPos.x - jx) ** 2 + (playerPos.z - jz) ** 2);
        if (d < 3.2 && playerPos.y < 1.2) {
          velocity.y = 20;
          isGrounded = false;
          window.soundFX.playJumpPad();
        }
      });

      // Camera FPS
      const targetFOV = state.isADS ? 48 : 70;
      camera.fov += (targetFOV - camera.fov) * delta * 15;
      camera.updateProjectionMatrix();

      camera.position.set(playerPos.x, playerPos.y + 1.8, playerPos.z);
      camera.rotation.set(headPitch, playerRotY, 0, 'YXZ');

      // Network sync player position every 40ms
      netSyncTimer += delta;
      if (netSyncTimer > 0.04 && socket && socket.readyState === WebSocket.OPEN) {
        netSyncTimer = 0;
        socket.send(JSON.stringify({
          type: 'move',
          x: playerPos.x,
          y: playerPos.y,
          z: playerPos.z,
          rotY: playerRotY,
          headPitch: headPitch
        }));
      }
    }

    // Reload Progress
    let reloadAnimY = 0;
    let reloadAnimRotZ = 0;

    if (state.isReloading) {
      state.reloadTimer += delta;
      const prog = Math.min(1, state.reloadTimer / state.reloadDuration);

      if (prog < 0.4) {
        const p = prog / 0.4;
        reloadAnimY = -Math.sin(p * Math.PI * 0.5) * 0.25;
        reloadAnimRotZ = p * 0.35;
        if (activeGun && activeGun.mag) activeGun.mag.position.y = -0.22 - p * 0.4;
      } else if (prog < 0.8) {
        const p = (prog - 0.4) / 0.4;
        reloadAnimY = -0.25 + p * 0.15;
        reloadAnimRotZ = 0.35 * (1 - p * 0.5);
        if (activeGun && activeGun.mag) activeGun.mag.position.y = -0.62 + p * 0.4;
      } else {
        const p = (prog - 0.8) / 0.2;
        reloadAnimY = -0.1 * (1 - p);
        reloadAnimRotZ = 0.17 * (1 - p);
        if (activeGun && activeGun.mag) activeGun.mag.position.y = -0.22;
      }

      if (state.reloadTimer >= state.reloadDuration) {
        state.isReloading = false;
        state.ammo = getCurrentWeapon().maxAmmo;
        updateAmmoUI();
        if (activeGun && activeGun.mag) activeGun.mag.position.y = -0.22;
      }
    }

    // Viewmodel Bob, ADS & Deploy Spring
    const moveLen = keys.w || keys.a || keys.s || keys.d ? 1 : 0;
    if (moveLen > 0 && isGrounded && !state.isDead) walkBobTimer += delta * 12;

    recoilOffset = Math.max(0, recoilOffset - delta * 0.9);
    const bobX = Math.cos(walkBobTimer) * 0.008;
    const bobY = Math.sin(walkBobTimer * 2) * 0.008;
    const deployY = -deployOffset * 0.22;
    const deployRot = deployOffset * 0.25;

    // Knife slash motion
    const slashOffsetZ = knifeSlashTimer > 0 ? -0.18 : 0;
    const slashRotX = knifeSlashTimer > 0 ? -0.45 : 0;

    if (activeGun && !state.isDead) {
      if (state.currentSlot === 1) {
        if (state.isADS) {
          // Perfectly centered iron sights down the center
          activeGun.position.set(0, -0.155 + reloadAnimY + deployY, -0.28 + recoilOffset);
          activeGun.rotation.set(-recoilOffset * 0.4, 0, reloadAnimRotZ + deployRot);
        } else {
          // Authentic 3D FPS stance: slightly to the right, angled inward to show the full 3D volume, stamped receiver, wood handguard vents, and banana mag
          activeGun.position.set(0.18 + bobX, -0.22 + bobY + reloadAnimY + deployY, -0.38 + recoilOffset);
          activeGun.rotation.set(-recoilOffset * 0.5 + 0.04, -0.10, -0.05 + reloadAnimRotZ + deployRot);
        }
      } else if (state.currentSlot === 2) {
        if (state.isADS) {
          activeGun.position.set(0, -0.14 + reloadAnimY + deployY, -0.26 + recoilOffset);
          activeGun.rotation.set(-recoilOffset * 0.5, 0, reloadAnimRotZ + deployRot);
        } else {
          activeGun.position.set(0.15 + bobX, -0.20 + bobY + reloadAnimY + deployY, -0.34 + recoilOffset);
          activeGun.rotation.set(-recoilOffset * 0.6 + 0.04, -0.08, -0.04 + reloadAnimRotZ + deployRot);
        }
      } else if (state.currentSlot === 3) {
        // Knife / Karambit / Butterfly 3D Viewmodel
        if (knifeSlashTimer > 0) {
          const slashP = knifeSlashTimer / 0.28;
          const swipeRotX = -Math.sin(slashP * Math.PI) * 0.65;
          const swipeRotZ = -Math.sin(slashP * Math.PI) * 0.85;
          const swipeX = -Math.sin(slashP * Math.PI) * 0.16;
          const swipeZ = -Math.sin(slashP * Math.PI) * 0.25;
          activeGun.position.set(0.16 + bobX + swipeX, -0.20 + bobY + deployY, -0.32 + swipeZ);
          activeGun.rotation.set(0.1 + swipeRotX, -0.25, -0.1 + deployRot + swipeRotZ);
        } else {
          activeGun.position.set(0.16 + bobX, -0.20 + bobY + deployY, -0.32);
          activeGun.rotation.set(0.1, -0.25, -0.1 + deployRot);
        }
      } else if (state.currentSlot === 4) {
        // Grenade Viewmodel
        activeGun.position.set(0.14 + bobX, -0.20 + bobY + deployY, -0.30);
        activeGun.rotation.set(0.2, -0.1, deployRot);
      }
    }

    // Dynamic Crosshair Scale
    const crosshairEl = document.getElementById('main-crosshair');
    if (crosshairEl) {
      const spreadScale = 1.0 + (moveLen > 0 ? 0.25 : 0) + (isGrounded ? 0 : 0.4) + (recoilOffset * 1.6);
      if (!state.isADS) {
        crosshairEl.style.transform = `translate(-50%, -50%) scale(${spreadScale})`;
      }
    }

    if (isMouseDown && (state.currentSlot === 1 || state.currentSlot === 2 || state.currentSlot === 3) && !state.isReloading && !state.isDead) {
      shoot();
    }

    // CS2 Tactical Bots
    bots.forEach((bot, bIdx) => {
      if (bot.health > 0 && !bot.isDead) {
        const bp = bot.avatar.group.position;
        if (bot.vy === undefined) bot.vy = 0;
        bot.vy -= 22 * delta;
        bp.y += bot.vy * delta;
        if (bp.y <= 0) {
          bp.y = 0;
          bot.vy = 0;
          bot.isGrounded = true;
        }

        if (bot.avatar.hpGroup) {
          bot.avatar.hpGroup.quaternion.copy(camera.quaternion);
        }

        if (time > bot.decisionTimer) {
          bot.decisionTimer = time + 1400 + Math.random() * 1200;
          let bestTarget = null;

          if (state.matchType === 'TDM') {
            if (bot.team === 'blue') {
              // Teammate Bot: ONLY targets Red enemy bots! NEVER targets the player!
              const enemyBots = bots.filter((other, idx) => idx !== bIdx && other.team === 'red' && other.health > 0 && !other.isDead);
              if (enemyBots.length > 0) {
                let closest = enemyBots[0];
                let minD = bp.distanceTo(closest.avatar.group.position);
                for (let eb of enemyBots) {
                  const d = bp.distanceTo(eb.avatar.group.position);
                  if (d < minD) { minD = d; closest = eb; }
                }
                bestTarget = { pos: closest.avatar.group.position, isPlayer: false, bot: closest, dist: minD };
              }
            } else {
              // Red Enemy Bot: Targets player (Blue) or Blue bots
              bestTarget = { pos: playerPos, isPlayer: true, dist: bp.distanceTo(playerPos) };
              const blueBots = bots.filter((other, idx) => idx !== bIdx && other.team === 'blue' && other.health > 0 && !other.isDead);
              blueBots.forEach(bb => {
                const d = bp.distanceTo(bb.avatar.group.position);
                if (d < bestTarget.dist && Math.random() < 0.6) {
                  bestTarget = { pos: bb.avatar.group.position, isPlayer: false, bot: bb, dist: d };
                }
              });
            }
          } else {
            bestTarget = { pos: playerPos, isPlayer: true, dist: bp.distanceTo(playerPos) };
            bots.forEach((otherBot, oIdx) => {
              if (bIdx !== oIdx && otherBot.health > 0 && !otherBot.isDead) {
                const d = bp.distanceTo(otherBot.avatar.group.position);
                if (d < bestTarget.dist && Math.random() < 0.65) {
                  bestTarget = { pos: otherBot.avatar.group.position, isPlayer: false, bot: otherBot, dist: d };
                }
              }
            });
          }
          if (bestTarget) bot.currentTarget = bestTarget;
        }

        const target = bot.currentTarget || { pos: playerPos, isPlayer: true, dist: bp.distanceTo(playerPos) };
        const targetPos = target.pos;
        const dist = bp.distanceTo(targetPos);

        // Tactical Bot Bunnyhop & Jump to Dodge Fire (dist is now guaranteed defined)
        if (bot.isGrounded && time > (bot.jumpCooldown || 0)) {
          if (dist < 28 && Math.random() < 0.28) {
            bot.vy = 7.5;
            bot.isGrounded = false;
            bot.jumpCooldown = time + 1800 + Math.random() * 2200;
          }
        }

        bot.avatar.group.lookAt(targetPos.x, 0, targetPos.z);

        if (time > bot.strafeTimer) {
          bot.strafeTimer = time + 900 + Math.random() * 1200;
          bot.strafeDir *= -1;
        }

        const fwd = new THREE.Vector3().subVectors(targetPos, bp).normalize();
        const side = new THREE.Vector3(-fwd.z, 0, fwd.x);

        let isMoving = false;
        if (dist > 28) {
          bp.x += fwd.x * 4.2 * delta;
          bp.z += fwd.z * 4.2 * delta;
          isMoving = true;
        } else if (dist > 8) {
          bp.x += side.x * bot.strafeDir * 2.8 * delta;
          bp.z += side.z * bot.strafeDir * 2.8 * delta;
          isMoving = true;
        }

        checkAndResolveCollisions(bp, 0.75);

        if (isMoving) {
          bot.walkPhase += delta * 11;
          bot.avatar.leftLeg.rotation.x = Math.sin(bot.walkPhase) * 0.5;
          bot.avatar.rightLeg.rotation.x = -Math.sin(bot.walkPhase) * 0.5;
        } else {
          bot.avatar.leftLeg.rotation.x *= 0.8;
          bot.avatar.rightLeg.rotation.x *= 0.8;
        }

        // BOTS ONLY SHOOT IF WITHIN 38M AND LINE OF SIGHT IS NOT BLOCKED BY A WALL!
        const hasLOS = !isLineOfSightBlocked(bp.clone().add(new THREE.Vector3(0, 1.4, 0)), targetPos);

        if (dist < 38 && hasLOS && time > bot.shootCooldown && (!target.isPlayer || !state.isDead)) {
          bot.burstCount++;
          const origin = bp.clone().add(new THREE.Vector3(0, 1.4, 0));
          const shootDir = new THREE.Vector3().subVectors(targetPos, origin).normalize();

          shootDir.x += (Math.random() - 0.5) * 0.03;
          shootDir.y += (Math.random() - 0.5) * 0.03;
          shootDir.z += (Math.random() - 0.5) * 0.03;
          shootDir.normalize();

          createLaserTracer(origin, shootDir);

          window.soundFX.playShot(
            bot.weapon === 'pistol' ? 'pistol' : 'assault_rifle',
            bp,
            playerPos,
            playerRotY
          );

          if (target.isPlayer && !state.isDead) {
            // In TDM, Blue team bots NEVER damage the player!
            if (state.matchType === 'TDM' && bot.team === 'blue') {
              // Friendly fire blocked
            } else if (Math.random() < 0.28) {
              state.health = Math.max(0, state.health - (bot.weapon === 'pistol' ? 18 : 12));
              updateHealthUI();
              window.soundFX.playHit();
              triggerDamageFlash();

              if (state.health <= 0) {
                state.isDead = true;
                bot.kills++;
                bot.score += 100;
                state.deaths++;
                showFeed(`${bot.name} ⚔️ ${state.myName}`);
                showDeathCallout(bot.name, bot.weapon === 'pistol' ? 'Pistol' : 'AK-47');
                updateViewmodelVisibility();

                if (state.isTabOpen) updateScoreboardUI();

                setTimeout(() => {
                  state.health = 150;
                  state.isDead = false;
                  state.ammo = getCurrentWeapon().maxAmmo;
                  updateHealthUI();
                  updateAmmoUI();
                  updateViewmodelVisibility();
                  const pSpawn = getRandomSpawn();
                  playerPos.set(pSpawn.x, 0, pSpawn.z);
                  velocity.set(0, 0, 0);
                }, 2800);
              }
            }
          } else if (target.bot && target.bot.health > 0 && !target.bot.isDead) {
            // In TDM, bots of the same team do not damage each other
            if (state.matchType === 'TDM' && bot.team === target.bot.team) {
              // Friendly fire blocked
            } else {
              target.bot.health -= (bot.weapon === 'pistol' ? 30 : 22);
              if (target.bot.avatar.hpFill) {
                target.bot.avatar.hpFill.scale.x = Math.max(0, target.bot.health / target.bot.maxHealth);
              }
              if (target.bot.health <= 0) {
                target.bot.isDead = true;
                bot.kills++;
                bot.score += 100;
                target.bot.deaths++;
                showFeed(`${bot.name} ⚔️ ${target.bot.name}`);
                if (state.isTabOpen) updateScoreboardUI();

                target.bot.avatar.group.rotation.x = -Math.PI / 2;
                target.bot.avatar.group.position.y = 0.25;
                if (target.bot.avatar.hpGroup) target.bot.avatar.hpGroup.visible = false;

                setTimeout(() => {
                  target.bot.health = 100;
                  target.bot.isDead = false;
                  target.bot.avatar.group.rotation.set(0, 0, 0);
                  target.bot.avatar.group.position.y = 0;
                  if (target.bot.avatar.hpGroup) target.bot.avatar.hpGroup.visible = true;
                  if (target.bot.avatar.hpFill) target.bot.avatar.hpFill.scale.x = 1;
                  const sp = getRandomSpawn();
                  target.bot.avatar.group.position.set(sp.x, 0, sp.z);
                }, 2600);
              }
            }
          }

          if (bot.burstCount >= bot.burstMax) {
            bot.burstCount = 0;
            bot.burstMax = 3 + Math.floor(Math.random() * 2);
            bot.shootCooldown = time + 1000 + Math.random() * 1200;
          } else {
            bot.shootCooldown = time + (bot.weapon === 'pistol' ? 220 : 110);
          }
        }
      }
    });
  }

  renderer.render(scene, camera);
}

// ========================================================
// ONLINE ACCOUNT, AUTH, SHOP, BACKPACK, LOOTBOX & TASKS SYSTEM
// ========================================================

// 1. UPDATE CURRENCY & PROFILE UI
function updateCurrencyUI() {
  const coinEl = document.getElementById('coin-amount');
  const gemEl = document.getElementById('gem-amount');
  const shopCoins = document.querySelectorAll('.shop-coin-display');
  const shopGems = document.querySelectorAll('.shop-gem-display');
  const profileCoins = document.getElementById('profile-coins');
  const profileGems = document.getElementById('profile-gems');
  const profileLvl = document.getElementById('profile-level');
  const profileXp = document.getElementById('profile-xp');
  const profileName = document.getElementById('profile-display-name');
  const lobbyLvl = document.getElementById('lobby-level-badge');
  const nameInput = document.getElementById('player-name-input');
  const bpName = document.getElementById('bp-card-username');
  const bpLvl = document.getElementById('bp-card-lvl');

  if (coinEl) coinEl.textContent = Number(state.coins).toLocaleString();
  if (gemEl) gemEl.textContent = Number(state.gems).toLocaleString();

  shopCoins.forEach(el => el.textContent = Number(state.coins).toLocaleString());
  shopGems.forEach(el => el.textContent = Number(state.gems).toLocaleString());

  if (profileCoins) profileCoins.textContent = Number(state.coins).toLocaleString();
  if (profileGems) profileGems.textContent = Number(state.gems).toLocaleString();
  if (profileLvl) profileLvl.textContent = state.level;
  if (profileXp) profileXp.textContent = state.xp;
  if (profileName) profileName.textContent = state.myName;
  if (lobbyLvl) lobbyLvl.textContent = `⭐ ${state.level}`;
  if (nameInput && !state.isLoggedIn) state.myName = nameInput.value || 'ensar44';
  if (bpName) bpName.innerHTML = `<span style="color: #00f0ff;">[edip]</span> ${state.myName}`;
  if (bpLvl) bpLvl.textContent = `lvl ${state.level}`;

  const headerLoginText = document.getElementById('btn-login-text');
  const headerLoginBtn = document.getElementById('btn-header-login');
  if (headerLoginText && headerLoginBtn) {
    if (state.isLoggedIn) {
      headerLoginText.textContent = `${state.myName} (Profil)`;
      headerLoginBtn.style.background = 'linear-gradient(180deg, #10b981 0%, #059669 100%)';
      headerLoginBtn.style.borderColor = '#047857';
    } else {
      headerLoginText.textContent = 'Login';
      headerLoginBtn.style.background = 'linear-gradient(180deg, #1fa2ff 0%, #12d8fa 100%)';
      headerLoginBtn.style.borderColor = '#0066cc';
    }
  }

  const adminBtn = document.getElementById('btn-admin-panel');
  if (adminBtn) {
    adminBtn.style.display = (state.isLoggedIn && state.isAdmin) ? 'flex' : 'none';
  }
}

// 2. AUTHENTICATION (LOGIN / REGISTER)
let authMode = 'login';

function openAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.style.display = 'flex';

  const form = document.getElementById('auth-form');
  const profileBox = document.getElementById('auth-logged-in-profile');
  const errBox = document.getElementById('auth-error-msg');
  const succBox = document.getElementById('auth-success-msg');
  if (errBox) errBox.style.display = 'none';
  if (succBox) succBox.style.display = 'none';

  if (state.isLoggedIn) {
    if (form) form.style.display = 'none';
    if (profileBox) profileBox.style.display = 'block';
  } else {
    if (form) form.style.display = 'block';
    if (profileBox) profileBox.style.display = 'none';
    switchAuthTab('login');
  }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'none';
}

function switchAuthTab(mode) {
  authMode = mode;
  const loginTab = document.getElementById('tab-login-btn');
  const regTab = document.getElementById('tab-register-btn');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (loginTab && regTab && submitBtn) {
    if (mode === 'login') {
      loginTab.classList.add('active');
      regTab.classList.remove('active');
      submitBtn.textContent = 'GİRİŞ YAP';
    } else {
      loginTab.classList.remove('active');
      regTab.classList.add('active');
      submitBtn.textContent = 'HESAP OLUŞTUR';
    }
  }
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('auth-username').value.trim();
  const password = document.getElementById('auth-password').value;
  const errBox = document.getElementById('auth-error-msg');
  const succBox = document.getElementById('auth-success-msg');

  if (errBox) errBox.style.display = 'none';
  if (succBox) succBox.style.display = 'none';

  const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (!data.success) {
      if (errBox) {
        errBox.textContent = data.message || 'Giriş başarısız!';
        errBox.style.display = 'block';
      }
      return;
    }

    state.token = data.token;
    localStorage.setItem('veck_token', data.token);
    state.isLoggedIn = true;

    syncUserData(data.user);

    if (succBox) {
      succBox.textContent = data.message || 'İşlem başarılı!';
      succBox.style.display = 'block';
    }

    setTimeout(() => {
      closeAuthModal();
      updateCurrencyUI();
    }, 900);
  } catch (err) {
    if (errBox) {
      errBox.textContent = 'Sunucuya bağlanılamadı!';
      errBox.style.display = 'block';
    }
  }
}

function handleLogout() {
  state.token = null;
  state.isLoggedIn = false;
  state.isAdmin = false;
  localStorage.removeItem('veck_token');
  closeAuthModal();
  updateCurrencyUI();
  alert('Hesabınızdan çıkış yapıldı.');
}

async function fetchUserProfile() {
  if (!state.token) return;
  try {
    const res = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    const data = await res.json();
    if (data.success && data.user) {
      state.isLoggedIn = true;
      syncUserData(data.user);
      updateCurrencyUI();
    } else {
      state.token = null;
      localStorage.removeItem('veck_token');
      state.isLoggedIn = false;
      state.isAdmin = false;
    }
  } catch (e) {
    console.error('Session verify failed:', e);
  }
}

function syncUserData(user) {
  if (!user) return;
  state.myName = user.username || state.myName;
  state.coins = user.coins ?? state.coins;
  state.gems = user.gems ?? state.gems;
  state.level = user.level ?? state.level;
  state.xp = user.xp ?? state.xp;
  state.isAdmin = !!user.isAdmin;
  state.inventory = user.inventory || state.inventory;
  state.claimedTasks = user.claimedTasks || [];
  if (user.equipped) {
    ['gun1', 'gun2', 'gun3', 'gun4'].forEach((slotKey, idx) => {
      const slotNum = idx + 1;
      const val = user.equipped[slotKey];
      if (val) {
        let baseGun = val;
        let skinName = 'default';
        if (val.includes('|')) {
          const parts = val.split('|').map(s => s.trim());
          baseGun = parts[0];
          skinName = parts[1];
        }
        if (baseGun === 'Spray') baseGun = 'Assault Rifle';
        if (baseGun === 'Handgun') baseGun = 'Pistol';
        if (baseGun === 'Stabber') baseGun = 'Combat Knife';

        state.equippedGuns[slotNum] = baseGun;
        if (!state.equippedWeaponSkins) state.equippedWeaponSkins = {};
        state.equippedWeaponSkins[baseGun] = skinName;
      }
    });
    if (user.equipped.skin) state.equippedSkin = user.equipped.skin;
    if (user.equipped.hat) state.equippedHat = user.equipped.hat;
  }
  const nameInput = document.getElementById('player-name-input');
  if (nameInput) nameInput.value = state.myName;
  const lobbyLvl = document.getElementById('lobby-level-badge');
  if (lobbyLvl) lobbyLvl.textContent = `⭐ ${state.level || 0}`;
  const pauseName = document.getElementById('pause-card-name');
  if (pauseName) {
    const adminTag = state.isAdmin ? '<span style="color:#ef4444; font-weight:900;">[ADMIN]</span> ' : '';
    pauseName.innerHTML = `${adminTag}${state.myName}`;
  }
  const pauseLvl = document.getElementById('pause-card-lvl');
  if (pauseLvl) pauseLvl.textContent = `lvl ${state.level || 0}`;
  const hudName = document.getElementById('hud-player-name');
  if (hudName) hudName.textContent = state.myName;

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'identify', username: state.myName }));
  }
}

// 3. GUNS & SKINS SHOP MODAL (SCREENSHOT 1)
let gunPreviewScene, gunPreviewCamera, gunPreviewRenderer, gunPreviewMeshGroup;
let showcaseGunName = 'Assault Rifle';

const GUNS_SHOP_PRICES = {
  'Assault Rifle': { price: 0, currency: 'coins', unlocked: true },
  'AK-47': { price: 0, currency: 'coins', unlocked: true },
  'Burst Rifle': { price: 2500, currency: 'coins', unlocked: false },
  'Sniper': { price: 5000, currency: 'coins', unlocked: false },
  'Rocket Launcher': { price: 15000, currency: 'coins', unlocked: false }, // RPG 15,000 Coins as requested!
  'Minigun': { price: 15000, currency: 'coins', unlocked: false }, // Minigun 15,000 Coins as requested!
  'Paintball Gun': { price: 3000, currency: 'coins', unlocked: false },
  'Handgun': { price: 0, currency: 'coins', unlocked: true },
  'Pistol': { price: 0, currency: 'coins', unlocked: true },
  'Deagle': { price: 2000, currency: 'coins', unlocked: false },
  'Revolver': { price: 2500, currency: 'coins', unlocked: false },
  'Combat Knife': { price: 0, currency: 'coins', unlocked: true },
  'Stabber': { price: 0, currency: 'coins', unlocked: true },
  'Karambit': { price: 5000, currency: 'coins', unlocked: false },
  'Butterfly Knife': { price: 6500, currency: 'coins', unlocked: false },
  'Huntsman Knife': { price: 4500, currency: 'coins', unlocked: false },
  'Gunblade': { price: 8000, currency: 'coins', unlocked: false },
  'Shawty': { price: 3500, currency: 'coins', unlocked: false },
  'Bow': { price: 4000, currency: 'coins', unlocked: false },
  'Frag Grenade': { price: 0, currency: 'coins', unlocked: true },
  'Molotov': { price: 1500, currency: 'coins', unlocked: false }
};

function initGunPreview3D() {
  const canvas = document.getElementById('gun-preview-canvas');
  if (!canvas || gunPreviewRenderer) return;

  gunPreviewScene = new THREE.Scene();
  gunPreviewCamera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  gunPreviewCamera.position.set(0, 0.4, 2.6);

  gunPreviewRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  gunPreviewRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
  gunPreviewRenderer.setPixelRatio(window.devicePixelRatio);

  const amb = new THREE.AmbientLight(0xffffff, 1.2);
  gunPreviewScene.add(amb);

  const dir1 = new THREE.DirectionalLight(0xffd700, 1.4);
  dir1.position.set(2, 4, 3);
  gunPreviewScene.add(dir1);

  const dir2 = new THREE.DirectionalLight(0x00f0ff, 0.8);
  dir2.position.set(-3, -1, -2);
  gunPreviewScene.add(dir2);

  gunPreviewMeshGroup = new THREE.Group();
  gunPreviewScene.add(gunPreviewMeshGroup);

  function animateGunPreview() {
    requestAnimationFrame(animateGunPreview);
    if (gunPreviewMeshGroup) {
      gunPreviewMeshGroup.rotation.y += 0.015;
    }
    gunPreviewRenderer.render(gunPreviewScene, gunPreviewCamera);
  }
  animateGunPreview();
}

function openGunsShopModal() {
  const modal = document.getElementById('guns-shop-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  updateCurrencyUI();

  setTimeout(() => {
    initGunPreview3D();
    selectShowcaseGun('Assault Rifle');
  }, 100);
}

function closeGunsShopModal() {
  const modal = document.getElementById('guns-shop-modal');
  if (modal) modal.style.display = 'none';
}

function selectShowcaseGun(gunName) {
  showcaseGunName = gunName;

  document.querySelectorAll('#guns-category-list .gun-sidebar-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-gun') === gunName);
  });

  const titleEl = document.getElementById('showcase-title');
  if (titleEl) titleEl.textContent = gunName === 'Rocket Launcher' ? 'Rocket Launcher (RPG)' : gunName;

  // Re-render Authentic 3D Mesh in showcase
  if (gunPreviewMeshGroup) {
    while (gunPreviewMeshGroup.children.length > 0) {
      gunPreviewMeshGroup.remove(gunPreviewMeshGroup.children[0]);
    }

    let showcaseMesh;
    const skinName = (state.equippedWeaponSkins && state.equippedWeaponSkins[gunName]) || 'default';

    if (window.models) {
      if (gunName === 'Rocket Launcher') {
        showcaseMesh = window.models.createRocketLauncherModel(false, skinName);
      } else if (gunName === 'Minigun') {
        showcaseMesh = window.models.createMinigunModel(false, skinName);
      } else if (gunName === 'Sniper') {
        showcaseMesh = window.models.createSniperModel(false, skinName);
      } else if (gunName === 'Handgun' || gunName === 'Pistol') {
        showcaseMesh = window.models.createPistolModel(false, skinName);
      } else if (gunName === 'Stabber' || gunName === 'Combat Knife') {
        showcaseMesh = window.models.createKnifeModel(false, skinName);
      } else if (gunName === 'Karambit') {
        showcaseMesh = window.models.createKarambitModel(false, skinName);
      } else if (gunName === 'Butterfly Knife') {
        showcaseMesh = window.models.createButterflyKnifeModel(false, skinName);
      } else if (gunName === 'Huntsman Knife') {
        showcaseMesh = window.models.createHuntsmanKnifeModel(false, skinName);
      } else if (gunName === 'Burst Rifle') {
        showcaseMesh = window.models.createBurstRifleModel(false, skinName);
      } else if (gunName === 'Shawty') {
        showcaseMesh = window.models.createShawtyModel(false, skinName);
      } else if (gunName === 'Bow') {
        showcaseMesh = window.models.createBowModel(false, skinName);
      } else if (gunName === 'AK-47') {
        showcaseMesh = window.models.createAK47Model(false, skinName);
      } else {
        // Default Assault Rifle (SCAR-L Orange/Black 3D Model matching Screenshot 1!)
        showcaseMesh = window.models.createAssaultRifleModel(false, skinName);
      }
    }

    if (showcaseMesh) {
      showcaseMesh.scale.set(1.5, 1.5, 1.5);
      gunPreviewMeshGroup.add(showcaseMesh);
    }
  }

  renderShowcaseActionBtn();
}

function renderShowcaseActionBtn() {
  const container = document.getElementById('showcase-action-container');
  if (!container) return;

  const config = GUNS_SHOP_PRICES[showcaseGunName] || { price: 0, currency: 'coins', unlocked: true };
  const isOwned = state.inventory.includes(showcaseGunName) || config.price === 0;
  const isEquipped = state.equippedGuns[1] === showcaseGunName || state.equippedGuns[2] === showcaseGunName || state.equippedGuns[3] === showcaseGunName;

  if (isEquipped) {
    container.innerHTML = `<button class="btn-equip-showcase" style="background: #15803d; cursor: default;">✓ EQUIPPED</button>`;
  } else if (isOwned) {
    container.innerHTML = `<button class="btn-equip-showcase" onclick="equipShowcaseGun('${showcaseGunName}')">EQUIP</button>`;
  } else {
    container.innerHTML = `<button class="btn-buy-showcase" onclick="buyShowcaseGun('${showcaseGunName}', ${config.price}, '${config.currency}')">BUY 🪙 ${config.price.toLocaleString()}</button>`;
  }
}

async function buyShowcaseGun(gunName, price, currency) {
  if (!state.isLoggedIn) {
    if (currency === 'coins' && state.coins < price) {
      alert(`Yetersiz Altın! ${gunName} almak için ${price.toLocaleString()} Altın gerekiyor. Görev yaparak veya kupon ile altın kazanabilirsiniz.`);
      openCurrencyModal('coins');
      return;
    }
    if (currency === 'gems' && state.gems < price) {
      alert(`Yetersiz Elmas! ${gunName} almak için ${price.toLocaleString()} Elmas gerekiyor.`);
      openCurrencyModal('gems');
      return;
    }
    if (currency === 'coins') state.coins -= price;
    else state.gems -= price;
    if (!state.inventory.includes(gunName)) state.inventory.push(gunName);
    updateCurrencyUI();
    renderShowcaseActionBtn();
    alert(`🎉 "${gunName}" başarıyla satın alındı ve envanterinize eklendi!`);
    return;
  }

  if (currency === 'coins' && state.coins < price) {
    alert(`Yetersiz Altın! ${gunName} almak için ${price.toLocaleString()} Altın gerekiyor. Görev yaparak veya kupon ile altın kazanabilirsiniz.`);
    openCurrencyModal('coins');
    return;
  }

  try {
    const res = await fetch('/api/shop/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ itemId: gunName, price, currencyType: currency })
    });
    const data = await res.json();

    if (data.success) {
      syncUserData(data.user);
      updateCurrencyUI();
      renderShowcaseActionBtn();
      alert(data.message);
    } else {
      alert(data.message || 'Satın alma başarısız!');
    }
  } catch (e) {
    alert('Sunucu hatası meydana geldi!');
  }
}

async function equipShowcaseGun(gunName) {
  let slot = 1;
  if (gunName === 'Handgun' || gunName === 'Pistol') slot = 2;
  else if (gunName === 'Stabber' || gunName === 'Combat Knife' || gunName === 'Karambit' || gunName === 'Butterfly Knife' || gunName === 'Huntsman Knife') slot = 3;

  state.equippedGuns[slot] = gunName;
  updateWeaponSlotIcons();
  updateViewmodelVisibility();
  renderShowcaseActionBtn();

  if (state.isLoggedIn) {
    try {
      await fetch('/api/inventory/equip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({ category: `gun${slot}`, itemId: gunName })
      });
    } catch (e) {
      console.error(e);
    }
  }
}

// 4. BACKPACK & SKINS SHOP (SCREENSHOTS 2 & 3)
const BACKPACK_ITEMS_DATABASE = [
  { id: 'AK-47 | Dragon Fire', name: 'AK-47 | Dragon Fire', cat: 'guns', sub: 'Mythic gunskin', rarity: 'mythic', icon: '🐉', price: 950, currency: 'gems', pop: 100 },
  { id: 'Karambit | Fade Emerald', name: 'Karambit | Fade Emerald', cat: 'guns', sub: 'Mythic Balisong', rarity: 'mythic', icon: '💎', price: 750, currency: 'gems', pop: 99 },
  { id: 'Butterfly Knife | Cyber Neon', name: 'Butterfly Knife | Cyber Neon', cat: 'guns', sub: 'Cosmic Balisong', rarity: 'cosmic', icon: '🦋', price: 1200, currency: 'gems', pop: 98 },
  { id: 'Huntsman Knife | Damascus Steel', name: 'Huntsman Knife | Damascus Steel', cat: 'guns', sub: 'Legendary Huntsman', rarity: 'legendary', icon: '🪓', price: 600, currency: 'gems', pop: 97 },
  { id: 'Minigun | Vulcan Magma', name: 'Minigun | Vulcan Magma', cat: 'guns', sub: 'Mythic Heavy', rarity: 'mythic', icon: '🌋', price: 850, currency: 'gems', pop: 96 },
  { id: 'Ghost Operator', name: 'Ghost Operator', cat: 'vecks', sub: 'Legendary skin', rarity: 'legendary', icon: '💀', price: 500, currency: 'gems', pop: 95 },
  { id: 'Cyber Ninja', name: 'Cyber Ninja', cat: 'vecks', sub: 'Mythic skin', rarity: 'mythic', icon: '🥷', price: 700, currency: 'gems', pop: 94 },
  { id: 'Karambit | Gold', name: 'Karambit | Gold', cat: 'guns', sub: 'Legendary gunskin', rarity: 'legendary', icon: '🗡️', price: 250, currency: 'gems', pop: 99 },
  { id: 'Karambit | Vampire\'s Blood', name: 'Karambit | Vampire\'s Blood', cat: 'guns', sub: 'Mythic gunskin', rarity: 'mythic', icon: '🗡️', price: 500, currency: 'gems', pop: 98 },
  { id: 'Meme Frog Suit', name: 'Meme Frog Suit', cat: 'vecks', sub: 'Epic skin', rarity: 'epic', icon: '🐸', price: 120, currency: 'gems', pop: 95 },
  { id: 'Laughing Emoji Head', name: 'Laughing Emoji Head', cat: 'hats', sub: 'Common hat', rarity: 'common', icon: '😂', price: 0, currency: 'coins', pop: 94 },
  { id: 'Gold Alloy', name: 'Gold Alloy', cat: 'vecks', sub: 'Epic skin', rarity: 'epic', icon: '✨', price: 140, currency: 'gems', pop: 93 },
  { id: 'Player 456', name: 'Player 456', cat: 'vecks', sub: 'Epic skin', rarity: 'epic', icon: '🦑', price: 80, currency: 'gems', pop: 92 },
  { id: 'Yarn Beanie', name: 'Yarn Beanie', cat: 'hats', sub: 'Epic hat', rarity: 'epic', icon: '🧣', price: 1800, currency: 'coins', pop: 91 },
  { id: 'Police Patrol', name: 'Police Patrol', cat: 'vecks', sub: 'Rare skin', rarity: 'rare', icon: '👮', price: 1250, currency: 'coins', pop: 90 },
  { id: 'Guard Circle', name: 'Guard Circle', cat: 'vecks', sub: 'Epic skin', rarity: 'epic', icon: '⭕', price: 90, currency: 'gems', pop: 89 },
  { id: 'Guard Triangle', name: 'Guard Triangle', cat: 'vecks', sub: 'Epic skin', rarity: 'epic', icon: '🔺', price: 90, currency: 'gems', pop: 88 },
  { id: 'Donald J. Veck', name: 'Donald J. Veck', cat: 'vecks', sub: 'Rare skin', rarity: 'rare', icon: '👔', price: 1500, currency: 'coins', pop: 87 },
  { id: 'Black Suit', name: 'Black Suit', cat: 'vecks', sub: 'Rare skin', rarity: 'rare', icon: '🤵', price: 1200, currency: 'coins', pop: 86 },
  { id: 'Field Medic', name: 'Field Medic', cat: 'vecks', sub: 'Rare skin', rarity: 'rare', icon: '🩺', price: 1250, currency: 'coins', pop: 85 },
  { id: 'Purple Suit', name: 'Purple Suit', cat: 'vecks', sub: 'Rare skin', rarity: 'rare', icon: '🟪', price: 1200, currency: 'coins', pop: 84 },
  { id: 'AK-47 | Rainbow', name: 'AK-47 | Rainbow', cat: 'guns', sub: 'Cosmic gunskin', rarity: 'cosmic', icon: '🌈', price: 8000, currency: 'gems', pop: 83 },
  { id: 'Butterfly Knife | Gold', name: 'Butterfly Knife | Gold', cat: 'guns', sub: 'Legendary Balisong', rarity: 'legendary', icon: '🦋', price: 300, currency: 'gems', pop: 97 },
  { id: 'Butterfly Knife | Rainbow', name: 'Butterfly Knife | Rainbow', cat: 'guns', sub: 'Cosmic Balisong', rarity: 'cosmic', icon: '🌈', price: 8000, currency: 'gems', pop: 96 },
  { id: 'Butterfly Knife | Vampire\'s Blood', name: 'Butterfly Knife | Vampire\'s Blood', cat: 'guns', sub: 'Mythic Balisong', rarity: 'mythic', icon: '🦋', price: 550, currency: 'gems', pop: 95 },
  { id: 'Huntsman Knife | Gold', name: 'Huntsman Knife | Gold', cat: 'guns', sub: 'Legendary Huntsman', rarity: 'legendary', icon: '🪓', price: 220, currency: 'gems', pop: 94 },
  { id: 'Combat Knife | Gold', name: 'Combat Knife | Gold', cat: 'guns', sub: 'Legendary Bayonet', rarity: 'legendary', icon: '🗡️', price: 200, currency: 'gems', pop: 93 },
  { id: 'Spray | Rainbow', name: 'Spray | Rainbow', cat: 'guns', sub: 'Cosmic gunskin', rarity: 'cosmic', icon: '🌈', price: 8000, currency: 'gems', pop: 82 },
  { id: 'Handgun | Rainbow', name: 'Handgun | Rainbow', cat: 'guns', sub: 'Cosmic gunskin', rarity: 'cosmic', icon: '🌈', price: 8000, currency: 'gems', pop: 81 },
  { id: 'Bow | Rainbow', name: 'Bow | Rainbow', cat: 'guns', sub: 'Cosmic gunskin', rarity: 'cosmic', icon: '🌈', price: 8000, currency: 'gems', pop: 80 },
  { id: 'Minigun | Rainbow', name: 'Minigun | Rainbow', cat: 'guns', sub: 'Cosmic gunskin', rarity: 'cosmic', icon: '🌪️', price: 8000, currency: 'gems', pop: 79 },
  { id: 'Karambit | Rainbow', name: 'Karambit | Rainbow', cat: 'guns', sub: 'Cosmic gunskin', rarity: 'cosmic', icon: '🗡️', price: 8000, currency: 'gems', pop: 78 }
];

let backpackActiveCategory = 'all';
let avatarPreviewScene, avatarPreviewCamera, avatarPreviewRenderer, avatarPreviewMeshGroup;

function initAvatarPreview3D() {
  const canvas = document.getElementById('avatar-preview-canvas');
  if (!canvas || avatarPreviewRenderer) return;

  avatarPreviewScene = new THREE.Scene();
  avatarPreviewCamera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  avatarPreviewCamera.position.set(0, 1.4, 3.4);

  avatarPreviewRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  avatarPreviewRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
  avatarPreviewRenderer.setPixelRatio(window.devicePixelRatio);

  const amb = new THREE.AmbientLight(0xffffff, 1.3);
  avatarPreviewScene.add(amb);

  const dir = new THREE.DirectionalLight(0x00f0ff, 1.0);
  dir.position.set(2, 4, 3);
  avatarPreviewScene.add(dir);

  avatarPreviewMeshGroup = new THREE.Group();
  avatarPreviewScene.add(avatarPreviewMeshGroup);

  if (window.models && window.models.createVeckAvatar) {
    const avatar = window.models.createVeckAvatar({
      bodyColor: 0x64748b,
      hatType: 'keffiyeh',
      shirtType: 'tactical_vest'
    });
    avatarPreviewMeshGroup.add(avatar.group);
  }

  function animateAvatarPreview() {
    requestAnimationFrame(animateAvatarPreview);
    if (avatarPreviewMeshGroup) {
      avatarPreviewMeshGroup.rotation.y = Math.sin(performance.now() * 0.001) * 0.25;
    }
    avatarPreviewRenderer.render(avatarPreviewScene, avatarPreviewCamera);
  }
  animateAvatarPreview();
}

function openBackpackModal(initialCat = 'all') {
  const modal = document.getElementById('backpack-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  updateCurrencyUI();
  filterBackpackCategory(initialCat);

  setTimeout(() => {
    initAvatarPreview3D();
  }, 100);
}

function closeBackpackModal() {
  const modal = document.getElementById('backpack-modal');
  if (modal) modal.style.display = 'none';
}

function filterBackpackCategory(cat) {
  backpackActiveCategory = cat;
  document.querySelectorAll('.backpack-bottom-dock .bp-dock-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
  });
  renderBackpackGrid();
}

function renderBackpackGrid() {
  const container = document.getElementById('backpack-items-container');
  if (!container) return;

  const searchVal = (document.getElementById('backpack-search-input')?.value || '').toLowerCase();
  const myItemsOnly = document.getElementById('backpack-my-items-toggle')?.checked || false;
  const sortVal = document.getElementById('backpack-sort-select')?.value || 'popularity';

  let items = BACKPACK_ITEMS_DATABASE.filter(item => {
    if (backpackActiveCategory !== 'all' && item.cat !== backpackActiveCategory) return false;
    if (searchVal && !item.name.toLowerCase().includes(searchVal)) return false;
    if (myItemsOnly && !state.inventory.includes(item.id)) return false;
    return true;
  });

  if (sortVal === 'price_asc') items.sort((a, b) => a.price - b.price);
  else if (sortVal === 'price_desc') items.sort((a, b) => b.price - a.price);
  else if (sortVal === 'popularity') items.sort((a, b) => b.pop - a.pop);

  container.innerHTML = '';

  items.forEach(item => {
    const isOwned = state.inventory.includes(item.id) || item.price === 0;
    let isEquipped = false;
    if (item.cat === 'guns') {
      let [baseGun, skinName] = item.id.includes('|') ? item.id.split('|').map(s => s.trim()) : [item.id, 'default'];
      if (baseGun === 'Spray') baseGun = 'Assault Rifle';
      if (baseGun === 'Handgun') baseGun = 'Pistol';
      if (baseGun === 'Stabber') baseGun = 'Combat Knife';
      const slot = ALL_WEAPONS_CATALOG[baseGun] ? ALL_WEAPONS_CATALOG[baseGun].slot : (baseGun === 'Karambit' ? 3 : 1);
      const currentGun = state.equippedGuns[slot];
      const currentSkin = (state.equippedWeaponSkins && state.equippedWeaponSkins[baseGun]) || 'default';
      isEquipped = (currentGun === baseGun && currentSkin === (skinName || 'default'));
    } else if (item.cat === 'vecks') {
      isEquipped = (state.equippedSkin === item.id);
    } else if (item.cat === 'hats') {
      isEquipped = (state.equippedHat === item.id);
    }

    const card = document.createElement('div');
    card.className = `bp-skin-card rarity-${item.rarity}`;

    let actionBtnHtml = '';
    if (isEquipped) {
      actionBtnHtml = `<button class="bp-card-btn btn-skin-equipped">✓ EQUIPPED</button>`;
    } else if (isOwned) {
      actionBtnHtml = `<button class="bp-card-btn btn-skin-select" onclick="equipBackpackItem('${item.id}', '${item.cat}')">SELECT</button>`;
    } else if (item.currency === 'gems') {
      actionBtnHtml = `<button class="bp-card-btn btn-skin-buy-gem" onclick="buyBackpackItem('${item.id}', ${item.price}, 'gems')">💎 ${item.price.toLocaleString()}</button>`;
    } else {
      actionBtnHtml = `<button class="bp-card-btn btn-skin-buy-gold" onclick="buyBackpackItem('${item.id}', ${item.price}, 'coins')">🪙 ${item.price.toLocaleString()}</button>`;
    }

    card.innerHTML = `
      <div class="bp-card-name" title="${item.name}">${item.name}</div>
      <div class="bp-card-sub">${item.sub}</div>
      <div class="bp-card-icon">${item.icon}</div>
      ${actionBtnHtml}
    `;

    container.appendChild(card);
  });
}

async function buyBackpackItem(itemId, price, currency) {
  if (!state.isLoggedIn) {
    if (currency === 'coins' && state.coins < price) {
      alert(`Yetersiz Altın! Bu eşyayı almak için ${price.toLocaleString()} Altın gerekiyor.`);
      openCurrencyModal('coins');
      return;
    }
    if (currency === 'gems' && state.gems < price) {
      alert(`Yetersiz Elmas! Bu eşyayı almak için ${price.toLocaleString()} Elmas gerekiyor.`);
      openCurrencyModal('gems');
      return;
    }
    if (currency === 'coins') state.coins -= price;
    else state.gems -= price;
    if (!state.inventory.includes(itemId)) state.inventory.push(itemId);
    updateCurrencyUI();
    renderBackpackGrid();
    alert(`🎉 "${itemId}" başarıyla satın alındı ve envanterinize eklendi!`);
    return;
  }

  if (currency === 'coins' && state.coins < price) {
    alert(`Yetersiz Altın! Bu eşyayı almak için ${price.toLocaleString()} Altın gerekiyor.`);
    openCurrencyModal('coins');
    return;
  }

  if (currency === 'gems' && state.gems < price) {
    alert(`Yetersiz Elmas! Bu eşyayı almak için ${price.toLocaleString()} Elmas gerekiyor.`);
    openCurrencyModal('gems');
    return;
  }

  try {
    const res = await fetch('/api/shop/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ itemId, price, currencyType: currency })
    });
    const data = await res.json();

    if (data.success) {
      syncUserData(data.user);
      updateCurrencyUI();
      renderBackpackGrid();
      alert(data.message);
    } else {
      alert(data.message || 'Satın alma başarısız!');
    }
  } catch (e) {
    alert('Sunucu hatası!');
  }
}

async function equipBackpackItem(itemId, cat) {
  if (cat === 'vecks') {
    state.equippedSkin = itemId;
  } else if (cat === 'hats') {
    state.equippedHat = itemId;
  } else if (cat === 'guns') {
    let baseGun = itemId;
    let skinName = 'default';
    if (itemId.includes('|')) {
      const parts = itemId.split('|').map(s => s.trim());
      baseGun = parts[0];
      skinName = parts[1];
    }

    if (baseGun === 'Spray') baseGun = 'Assault Rifle';
    if (baseGun === 'Handgun') baseGun = 'Pistol';
    if (baseGun === 'Stabber') baseGun = 'Combat Knife';

    const slot = ALL_WEAPONS_CATALOG[baseGun] ? ALL_WEAPONS_CATALOG[baseGun].slot : (baseGun === 'Karambit' ? 3 : 1);

    state.equippedGuns[slot] = baseGun;
    if (!state.equippedWeaponSkins) state.equippedWeaponSkins = {};
    state.equippedWeaponSkins[baseGun] = skinName;

    // Apply skin to viewmodel immediately in real-time
    if (window.models && window.models.applySkinToMesh) {
      if (viewmodels[baseGun]) {
        window.models.applySkinToMesh(viewmodels[baseGun], skinName, baseGun);
      }
      const currentW = getCurrentWeapon();
      if (viewmodels[currentW.name]) {
        const activeSkin = state.equippedWeaponSkins[currentW.name] || 'default';
        window.models.applySkinToMesh(viewmodels[currentW.name], activeSkin, currentW.name);
      }
    }
  }

  renderBackpackGrid();
  if (showcaseGunName) {
    selectShowcaseGun(showcaseGunName);
  }

  if (state.isLoggedIn) {
    try {
      await fetch('/api/inventory/equip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({ category: cat === 'vecks' ? 'skin' : (cat === 'hats' ? 'hat' : 'gun1'), itemId })
      });
    } catch (e) {
      console.error(e);
    }
  }
}

// 5. LOOTBOX / CASE OPENING SYSTEM
let selectedCrateType = 'common';

const CRATE_DEFINITIONS = {
  'common': { name: 'Askeri Silah Kasası', price: 500, currency: 'coins', icon: '🪖' },
  'tactical': { name: 'Taktiksel Kasa', price: 1500, currency: 'coins', icon: '🛡️' },
  'rainbow': { name: 'Kozmik Gökkuşağı Kasası', price: 50, currency: 'gems', icon: '🌈' },
  'legendary': { name: 'Efsanevi Karambit Kasası', price: 100, currency: 'gems', icon: '🗡️' }
};

function openLootboxModal() {
  const modal = document.getElementById('lootbox-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  updateCurrencyUI();
  populateLootboxTrack();
}

function closeLootboxModal() {
  const modal = document.getElementById('lootbox-modal');
  if (modal) modal.style.display = 'none';
}

function selectCrate(type) {
  selectedCrateType = type;
  document.querySelectorAll('.crate-card').forEach((card, idx) => {
    card.classList.toggle('active', ['common', 'tactical', 'rainbow', 'legendary'][idx] === type);
  });
  const c = CRATE_DEFINITIONS[type];
  const priceText = document.getElementById('selected-crate-price-text');
  if (priceText) {
    priceText.textContent = c.currency === 'coins' ? `🪙 ${c.price.toLocaleString()}` : `💎 ${c.price.toLocaleString()}`;
  }
}

const ALL_LOOTBOX_ITEMS = [
  { name: 'AK-47 | Dragon Fire', rarity: 'mythic', icon: '🐉' },
  { name: 'Karambit | Gold', rarity: 'legendary', icon: '✨' },
  { name: 'Karambit | Vampire\'s Blood', rarity: 'mythic', icon: '🗡️' },
  { name: 'Karambit | Fade Emerald', rarity: 'mythic', icon: '💎' },
  { name: 'AK-47 | Rainbow', rarity: 'cosmic', icon: '🌈' },
  { name: 'Minigun | Rainbow', rarity: 'cosmic', icon: '🌪️' },
  { name: 'Butterfly Knife | Cyber Neon', rarity: 'cosmic', icon: '🦋' },
  { name: 'Huntsman Knife | Damascus Steel', rarity: 'legendary', icon: '🪓' },
  { name: 'Rocket Launcher', rarity: 'epic', icon: '🚀' },
  { name: 'Minigun', rarity: 'epic', icon: '🌪️' },
  { name: 'Player 456', rarity: 'epic', icon: '🦑' },
  { name: 'Guard Triangle', rarity: 'epic', icon: '🔺' },
  { name: 'Ghost Operator', rarity: 'legendary', icon: '💀' },
  { name: 'Police Patrol', rarity: 'rare', icon: '👮' },
  { name: 'Donald J. Veck', rarity: 'rare', icon: '👔' },
  { name: 'Yarn Beanie', rarity: 'rare', icon: '🧣' },
  { name: 'Deagle', rarity: 'epic', icon: '💥' },
  { name: 'Combat Knife', rarity: 'rare', icon: '🗡️' }
];

function populateLootboxTrack(targetItem = null) {
  const track = document.getElementById('lootbox-track');
  if (!track) return;
  track.style.transition = 'none';
  track.style.transform = 'translateX(0px)';
  track.innerHTML = '';

  const totalCards = 50;
  const targetIndex = 30;

  for (let i = 0; i < totalCards; i++) {
    let item;
    if (i === targetIndex && targetItem) {
      item = targetItem;
    } else {
      item = ALL_LOOTBOX_ITEMS[Math.floor(Math.random() * ALL_LOOTBOX_ITEMS.length)];
    }

    const itemDiv = document.createElement('div');
    const rarityClass = (item.rarity || 'rare').toLowerCase();
    itemDiv.className = `loot-track-item rarity-${rarityClass}`;
    itemDiv.innerHTML = `
      <div style="font-size: 28px;">${item.icon || '🎁'}</div>
      <div style="font-size: 10px; font-weight: 800; margin-top: 4px; text-align: center;">${item.name}</div>
    `;
    track.appendChild(itemDiv);
  }
}

async function spinLootbox() {
  if (!state.isLoggedIn) {
    alert('Kasa açabilmek için lütfen önce giriş yapın veya kayıt olun!');
    openAuthModal();
    return;
  }

  const crate = CRATE_DEFINITIONS[selectedCrateType];
  if (crate.currency === 'coins' && state.coins < crate.price) {
    alert('Yetersiz Altın bakiyesi!');
    openCurrencyModal('coins');
    return;
  }
  if (crate.currency === 'gems' && state.gems < crate.price) {
    alert('Yetersiz Elmas bakiyesi!');
    openCurrencyModal('gems');
    return;
  }

  const btn = document.getElementById('btn-open-crate-action');
  if (btn) btn.disabled = true;

  try {
    const res = await fetch('/api/shop/open-case', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ caseType: selectedCrateType })
    });
    const data = await res.json();

    if (!data.success) {
      alert(data.message || 'Kasa açılamadı!');
      if (btn) btn.disabled = false;
      return;
    }

    syncUserData(data.user);
    updateCurrencyUI();

    if (!state.stats) state.stats = { kills: 0, score: 0, headshots: 0, matchesPlayed: 0, matchesWon: 0, casesOpened: 0, heavyKills: 0, slidesUsed: 0 };
    state.stats.casesOpened = (state.stats.casesOpened || 0) + 1;

    // Build the track with the exact won item placed at index 30
    populateLootboxTrack(data.wonItem);

    const track = document.getElementById('lootbox-track');
    const viewport = document.querySelector('.lootbox-spinner-viewport');
    const viewportWidth = viewport ? viewport.clientWidth : 700;
    const targetIndex = 30;
    // Each card is 110px width with 5px margin on each side (stride = 120px). Center is at index * 120 + 60.
    const cardCenter = targetIndex * 120 + 60;
    const targetOffset = Math.round((viewportWidth / 2) - cardCenter);

    // Reset transform before animating
    track.style.transition = 'none';
    track.style.transform = 'translateX(0px)';
    void track.offsetHeight; // Force DOM reflow

    // Play spinning / click sound
    if (window.soundFX && window.soundFX.playKillSound) {
      window.soundFX.playKillSound();
    }

    track.style.transition = 'transform 4.5s cubic-bezier(0.12, 0.8, 0.25, 1)';
    track.style.transform = `translateX(${targetOffset}px)`;

    setTimeout(() => {
      showLootWonPopup(data.wonItem);
      if (btn) btn.disabled = false;
    }, 4600);

  } catch (e) {
    alert('Sunucu hatası!');
    if (btn) btn.disabled = false;
  }
}

function showLootWonPopup(item) {
  const popup = document.getElementById('loot-won-popup');
  if (!popup) return;
  document.getElementById('loot-won-rarity').textContent = `🎉 ${(item.rarity || 'ÖZEL').toUpperCase()} ÖDÜL!`;
  document.getElementById('loot-won-icon').textContent = item.icon || '✨';
  document.getElementById('loot-won-name').textContent = item.name;
  popup.style.display = 'flex';
}

function closeLootWonPopup() {
  const popup = document.getElementById('loot-won-popup');
  if (popup) popup.style.display = 'none';
  populateLootboxTrack();
}

// 6. DAILY TASKS / QUESTS (WITH REAL 24-HOUR RESET & PROGRESS CHECK)
const DAILY_TASKS_LIST = [
  { id: 'task_kills_5', title: '🎯 5 Düşman Yok Et', statKey: 'kills', target: 5, coins: 1500, gems: 10 },
  { id: 'task_damage_1000', title: '💥 1,000 Toplam Skor Kazan', statKey: 'score', target: 1000, coins: 1800, gems: 10 },
  { id: 'task_headshot_3', title: '🎯 3 Düşmanı Kafadan Vur (Headshot)', statKey: 'headshots', target: 3, coins: 2200, gems: 15 },
  { id: 'task_matches_3', title: '⚔️ 3 Maç Tamamla', statKey: 'matchesPlayed', target: 3, coins: 2000, gems: 15 },
  { id: 'task_win_1', title: '🏆 1 Maç Kazan (#1 Lider Ol)', statKey: 'matchesWon', target: 1, coins: 3500, gems: 25 },
  { id: 'task_open_case', title: '🎁 1 Adet Kasa Aç', statKey: 'casesOpened', target: 1, coins: 1000, gems: 20 },
  { id: 'task_heavy_2', title: '🚀 RPG veya Minigun ile 2 Kill Al', statKey: 'heavyKills', target: 2, coins: 2500, gems: 20 },
  { id: 'task_slide_5', title: '⚡ Slide (Kayma) Hareketini 5 Kez Kullan', statKey: 'slidesUsed', target: 5, coins: 1200, gems: 5 }
];

function getDailyResetTimeLeft() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCHours(24, 0, 0, 0);
  const diffMs = tomorrow - now;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}s ${mins}dk`;
}

function openTasksModal() {
  const modal = document.getElementById('tasks-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  renderTasksList();
}

function closeTasksModal() {
  const modal = document.getElementById('tasks-modal');
  if (modal) modal.style.display = 'none';
}

function renderTasksList() {
  const container = document.getElementById('tasks-list-box');
  if (!container) return;
  container.innerHTML = '';

  const resetHeader = document.createElement('div');
  resetHeader.style.cssText = 'background: rgba(14, 165, 233, 0.15); border: 1px solid #0ea5e9; border-radius: 10px; padding: 10px; text-align: center; font-size: 13px; font-weight: 800; color: #38bdf8; margin-bottom: 14px;';
  resetHeader.innerHTML = `⏳ <strong>24 Saatlik Sıfırlanma:</strong> Yeni Görevler <u>${getDailyResetTimeLeft()}</u> sonra yenilenecek`;
  container.appendChild(resetHeader);

  if (!state.stats) {
    state.stats = { kills: state.kills || 0, score: state.score || 0, headshots: 0, matchesPlayed: 0, matchesWon: 0, casesOpened: 0, heavyKills: 0, slidesUsed: 0 };
  }

  DAILY_TASKS_LIST.forEach(task => {
    const isClaimed = state.claimedTasks.includes(task.id);
    const currentVal = Math.min(task.target, (state.stats && state.stats[task.statKey]) || 0);
    const pct = Math.min(100, Math.round((currentVal / task.target) * 100));
    const isReady = currentVal >= task.target;

    const row = document.createElement('div');
    row.className = 'task-item-row';
    row.innerHTML = `
      <div style="flex: 1; margin-right: 14px;">
        <div class="task-title">${task.title}</div>
        <div class="task-reward">+${task.coins.toLocaleString()} 🪙 &nbsp;|&nbsp; +${task.gems} 💎</div>
        
        <!-- Progress Bar -->
        <div style="background: #0f172a; border: 1px solid #334155; border-radius: 6px; height: 10px; width: 100%; margin-top: 6px; overflow: hidden; position: relative;">
          <div style="background: linear-gradient(90deg, #38bdf8, #22c55e); height: 100%; width: ${pct}%; transition: width 0.3s;"></div>
        </div>
        <div style="font-size: 11px; color: #94a3b8; font-weight: 800; margin-top: 3px;">İlerleme: ${currentVal} / ${task.target} (%${pct})</div>
      </div>

      <div>
        ${isClaimed
          ? `<button class="btn-claim-task claimed" disabled>ALINDI ✓</button>`
          : isReady
            ? `<button class="btn-claim-task" style="background: linear-gradient(180deg, #22c55e, #16a34a); box-shadow: 0 0 12px rgba(34,197,94,0.6);" onclick="handleClaimTask('${task.id}', ${task.coins}, ${task.gems})">ÖDÜLÜ AL 🎁</button>`
            : `<button class="btn-claim-task claimed" style="opacity: 0.6; cursor: not-allowed;" onclick="alert('Bu görevi henüz tamamlamadınız! İlerleme: ${currentVal}/${task.target}')">KİLİTLİ 🔒</button>`
        }
      </div>
    `;
    container.appendChild(row);
  });
}

async function handleClaimTask(taskId, coins, gems) {
  if (!state.isLoggedIn) {
    alert('Görev ödüllerini almak için lütfen önce hesabınıza giriş yapın!');
    openAuthModal();
    return;
  }

  const taskDef = DAILY_TASKS_LIST.find(t => t.id === taskId);
  if (taskDef) {
    const currentVal = (state.stats && state.stats[taskDef.statKey]) || 0;
    if (currentVal < taskDef.target) {
      alert(`❌ Bu görevi henüz tamamlamadınız! (${currentVal}/${taskDef.target})`);
      return;
    }
  }

  try {
    const res = await fetch('/api/tasks/claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ taskId, coinsReward: coins, gemsReward: gems })
    });
    const data = await res.json();

    if (data.success) {
      syncUserData(data.user);
      updateCurrencyUI();
      renderTasksList();
      alert(data.message);
    } else {
      alert(data.message || 'Görev ödülü alınamadı!');
    }
  } catch (e) {
    alert('Sunucu hatası!');
  }
}

// 7. CURRENCY SHOP & COUPON REDEMPTION (corromax -> 15,000 Coins, 5 max uses)
function openCurrencyModal(initialType = 'coins') {
  const modal = document.getElementById('currency-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  const fb = document.getElementById('coupon-feedback');
  if (fb) fb.style.display = 'none';
}

function closeCurrencyModal() {
  const modal = document.getElementById('currency-modal');
  if (modal) modal.style.display = 'none';
}

async function handleRedeemCoupon() {
  const input = document.getElementById('coupon-code-input');
  const code = input ? input.value.trim() : '';
  const fb = document.getElementById('coupon-feedback');

  if (!code) {
    alert('Lütfen bir kupon kodu girin!');
    return;
  }

  if (!state.isLoggedIn) {
    alert('Kupon kodunu kullanmak için lütfen önce giriş yapın veya kayıt olun!');
    openAuthModal();
    return;
  }

  try {
    const res = await fetch('/api/coupon/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ code })
    });
    const data = await res.json();

    if (fb) {
      fb.style.display = 'block';
      if (data.success) {
        fb.style.color = '#4ade80';
        fb.textContent = data.message;
        syncUserData(data.user);
        updateCurrencyUI();
        input.value = '';
      } else {
        fb.style.color = '#f87171';
        fb.textContent = data.message;
      }
    }
  } catch (e) {
    if (fb) {
      fb.style.display = 'block';
      fb.style.color = '#f87171';
      fb.textContent = 'Sunucuya bağlanılamadı!';
    }
  }
}

async function topUpCurrency(currency, amount, priceUsd) {
  const currencyName = currency === 'coins' ? 'Altın' : 'Elmas';
  const priceDisplay = (priceUsd * 30).toLocaleString() + ' TL';
  const confirmBuy = confirm(`💳 ${priceDisplay} karşılığında +${amount.toLocaleString()} ${currencyName} satın almayı onaylıyor musunuz?`);
  if (!confirmBuy) return;

  alert('ensar abime parayı öde teslim eder');
  return;
}

// ========================================================
// 8. ENSAR ADMIN PANEL MANAGEMENT
// ========================================================
window.openAdminModal = async function() {
  if (!state.isLoggedIn || !state.isAdmin) {
    alert('Yetkisiz erişim! Sadece adminler girebilir.');
    return;
  }
  const modal = document.getElementById('admin-modal');
  if (modal) modal.style.display = 'flex';
  await window.refreshAdminData();
};

window.closeAdminModal = function() {
  const modal = document.getElementById('admin-modal');
  if (modal) modal.style.display = 'none';
};

window.refreshAdminData = async function() {
  if (!state.token) return;
  try {
    window.loadAdminCoupons();
    const res = await fetch('/api/admin/overview', {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    const data = await res.json();
    if (!data.success) {
      alert(data.message || 'Veriler alınamadı!');
      return;
    }
    const totUsersEl = document.getElementById('admin-total-users');
    const onlUsersEl = document.getElementById('admin-online-users');
    const banUsersEl = document.getElementById('admin-banned-users');
    const actRoomsEl = document.getElementById('admin-active-rooms');
    const tableBody = document.getElementById('admin-users-table-body') || document.getElementById('admin-users-list');

    if (totUsersEl) totUsersEl.textContent = data.totalUsers || 0;
    if (onlUsersEl) onlUsersEl.textContent = data.onlineCount || 0;
    if (banUsersEl) banUsersEl.textContent = data.bannedCount || 0;
    if (actRoomsEl) actRoomsEl.textContent = (data.rooms ? data.rooms.length : 0);

    if (tableBody) {
      tableBody.innerHTML = '';
      if (!data.users || data.users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="padding: 20px; text-align: center; color: #94a3b8;">Kayıtlı oyuncu bulunamadı.</td></tr>';
        return;
      }

      data.users.forEach(u => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
        if (u.isBanned) {
          tr.style.background = 'rgba(239, 68, 68, 0.08)';
        }

        tr.innerHTML = `
          <td style="padding: 12px 14px; font-weight: 800; color: #fff;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span>${u.username}</span>
              ${u.isAdmin ? '<span style="background: #ef4444; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 900;">ADMIN</span>' : ''}
              ${u.isBanned ? '<span style="background: #b91c1c; color: #fecaca; border: 1px solid #ef4444; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 900;">🚫 BANLI</span>' : ''}
            </div>
            <div style="font-size: 11px; color: #94a3b8; font-weight: normal; margin-top: 2px;">
              Env: ${u.inventoryCount || 0} eşya • Kayıt: ${u.createdAt ? new Date(u.createdAt).toLocaleDateString('tr-TR') : 'Bilinmiyor'}
            </div>
          </td>
          <td style="padding: 12px 14px;">
            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${u.isOnline ? '#10b981' : '#64748b'}; margin-right: 6px;"></span>
            ${u.isOnline ? '<span style="color:#10b981; font-weight:bold;">Online</span>' : '<span style="color:#94a3b8;">Offline</span>'}
          </td>
          <td style="padding: 12px 14px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <input type="number" id="adm-lvl-${u.username}" value="${u.level || 0}" style="width: 55px; background: rgba(0,0,0,0.5); color: #fff; border: 1px solid #3b82f6; border-radius: 6px; padding: 5px; text-align: center; font-weight: bold;">
              <span style="font-size: 11px; color: #94a3b8;">(${u.xp || 0} XP)</span>
            </div>
          </td>
          <td style="padding: 12px 14px;">
            <input type="number" id="adm-coins-${u.username}" value="${u.coins || 0}" style="width: 90px; background: rgba(0,0,0,0.5); color: #ffb703; border: 1px solid #ffb703; border-radius: 6px; padding: 5px; text-align: center; font-weight: bold;">
          </td>
          <td style="padding: 12px 14px;">
            <input type="number" id="adm-gems-${u.username}" value="${u.gems || 0}" style="width: 80px; background: rgba(0,0,0,0.5); color: #00f0ff; border: 1px solid #00f0ff; border-radius: 6px; padding: 5px; text-align: center; font-weight: bold;">
          </td>
          <td style="padding: 12px 14px;">
            <div style="font-size: 12px;">
              <span style="color: #10b981; font-weight: bold;">${u.kills || 0}K</span> / 
              <span style="color: #ef4444; font-weight: bold;">${u.deaths || 0}D</span>
              <span style="color: #cbd5e1; font-size: 11px; margin-left: 4px;">(${u.kd || 0} KD)</span>
            </div>
          </td>
          <td style="padding: 12px 14px; text-align: center;">
            <input type="checkbox" id="adm-isadmin-${u.username}" ${u.isAdmin ? 'checked' : ''} ${u.username === 'ensar' ? 'disabled' : ''} style="cursor: pointer; transform: scale(1.3);">
          </td>
          <td style="padding: 12px 14px; text-align: center; white-space: nowrap;">
            <button onclick="window.saveUserFromAdmin('${u.username}')" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 4px;" title="Bilgileri Kaydet">💾 Kaydet</button>
            
            ${u.username !== 'ensar' ? `
              ${u.isBanned 
                ? `<button onclick="window.banUserFromAdmin('${u.username}', false)" style="background: linear-gradient(135deg, #10b981, #047857); color: white; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 4px;" title="Banı Kaldır">✅ Aç</button>`
                : `<button onclick="window.banUserFromAdmin('${u.username}', true)" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 4px;" title="Oyuncuyu Banla">🚫 Banla</button>`
              }
              <button onclick="window.deleteUserFromAdmin('${u.username}')" style="background: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-weight: bold;" title="Hesabı Tamamen Sil">🗑️ Sil</button>
            ` : '<span style="color: #f87171; font-size: 11px; font-weight: 800;">KURUCU</span>'}
          </td>
        `;
        tableBody.appendChild(tr);
      });
    }
  } catch (err) {
    console.error('Admin overview failed:', err);
  }
};

window.banUserFromAdmin = async function(targetUsername, banStatus) {
  const confirmMsg = banStatus
    ? `"${targetUsername}" kullanıcısını BANLAMAK istediğinize emin misiniz?\n(Oyuna girişi tamamen engellenecek ve aktifse oyundan atılacaktır)`
    : `"${targetUsername}" kullanıcısının banını açmak istediğinize emin misiniz?`;
  
  if (!confirm(confirmMsg)) return;

  try {
    const res = await fetch('/api/admin/ban-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ targetUsername, ban: banStatus })
    });
    const data = await res.json();
    if (data.success) {
      alert(data.message);
      window.refreshAdminData();
    } else {
      alert(data.message || 'Ban işlemi gerçekleştirilemedi!');
    }
  } catch (err) {
    alert('Sunucu iletişim hatası!');
  }
};

window.saveUserFromAdmin = async function(targetUsername) {
  const lvlInput = document.getElementById(`adm-lvl-${targetUsername}`);
  const coinsInput = document.getElementById(`adm-coins-${targetUsername}`);
  const gemsInput = document.getElementById(`adm-gems-${targetUsername}`);
  const adminCheck = document.getElementById(`adm-isadmin-${targetUsername}`);

  const level = parseInt(lvlInput.value, 10);
  const coins = parseInt(coinsInput.value, 10);
  const gems = parseInt(gemsInput.value, 10);
  const isAdmin = adminCheck ? adminCheck.checked : false;

  try {
    const res = await fetch('/api/admin/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ targetUsername, coins, gems, level, isAdmin })
    });
    const data = await res.json();
    if (data.success) {
      alert(`[${targetUsername}] kullanıcısı başarıyla güncellendi!`);
      if (targetUsername === state.myName) {
        state.coins = coins;
        state.gems = gems;
        state.level = level;
        state.isAdmin = isAdmin;
        updateCurrencyUI();
      }
      window.refreshAdminData();
    } else {
      alert(data.message || 'Güncelleme hatası!');
    }
  } catch (err) {
    alert('Sunucu hatası!');
  }
};

window.deleteUserFromAdmin = async function(targetUsername) {
  if (!confirm(`${targetUsername} kullanıcısını tamamen silmek istediğinize emin misiniz?`)) return;
  try {
    const res = await fetch('/api/admin/delete-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ targetUsername })
    });
    const data = await res.json();
    if (data.success) {
      alert(`${targetUsername} silindi!`);
      window.refreshAdminData();
    } else {
      alert(data.message || 'Silinemedi!');
    }
  } catch (err) {
    alert('Sunucu hatası!');
  }
};

window.loadAdminCoupons = async function() {
  if (!state.token || !state.isAdmin) return;
  try {
    const res = await fetch('/api/admin/coupons', {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    const data = await res.json();
    if (!data.success) return;

    const tbody = document.getElementById('admin-coupons-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (!data.coupons || data.coupons.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="padding: 16px; text-align: center; color: #94a3b8;">Henüz oluşturulmuş kupon yok.</td></tr>';
      return;
    }

    data.coupons.forEach(c => {
      const isFull = (c.usedCount >= c.maxUses);
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
      tr.innerHTML = `
        <td style="padding: 10px 12px; font-weight: 900; color: #fbbf24; letter-spacing: 0.5px;">${c.code.toUpperCase()}</td>
        <td style="padding: 10px 12px; font-weight: 800; color: #ffb703;">+${(c.coinsReward || 0).toLocaleString()} 🪙</td>
        <td style="padding: 10px 12px; font-weight: 800; color: #38bdf8;">+${(c.gemsReward || 0).toLocaleString()} 💎</td>
        <td style="padding: 10px 12px;">
          <span style="background: ${isFull ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}; color: ${isFull ? '#f87171' : '#34d399'}; border: 1px solid ${isFull ? '#ef4444' : '#10b981'}; padding: 2px 8px; border-radius: 6px; font-weight: 800; font-size: 11px;">
            ${c.usedCount} / ${c.maxUses} Kişi ${isFull ? '(DOLDU)' : ''}
          </span>
        </td>
        <td style="padding: 10px 12px; color: #94a3b8; font-size: 11px;">
          ${(c.usedByUsers && c.usedByUsers.length > 0) ? c.usedByUsers.join(', ') : 'Henüz kullanılmadı'}
        </td>
        <td style="padding: 10px 12px; text-align: center;">
          <button onclick="window.deleteAdminCoupon('${c.code}')" style="background: #ef4444; color: #fff; border: none; padding: 4px 10px; border-radius: 5px; font-weight: 800; font-size: 11px; cursor: pointer;">Sil</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Kuponlar yüklenemedi:', err);
  }
};

window.createAdminCouponSubmit = async function() {
  const codeEl = document.getElementById('admin-coupon-code');
  const coinsEl = document.getElementById('admin-coupon-coins');
  const gemsEl = document.getElementById('admin-coupon-gems');
  const limitEl = document.getElementById('admin-coupon-limit');
  const msgEl = document.getElementById('admin-coupon-msg');

  const code = (codeEl.value || '').trim();
  const coinsReward = parseInt(coinsEl.value, 10) || 0;
  const gemsReward = parseInt(gemsEl.value, 10) || 0;
  const maxUses = parseInt(limitEl.value, 10) || 5;

  if (!code) {
    if (msgEl) {
      msgEl.style.display = 'block';
      msgEl.style.background = 'rgba(239, 68, 68, 0.2)';
      msgEl.style.color = '#f87171';
      msgEl.textContent = 'Lütfen bir kupon kodu belirleyin!';
    }
    return;
  }

  try {
    const res = await fetch('/api/admin/coupons/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ code, coinsReward, gemsReward, maxUses })
    });
    const data = await res.json();

    if (msgEl) {
      msgEl.style.display = 'block';
      msgEl.style.background = data.success ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
      msgEl.style.color = data.success ? '#34d399' : '#f87171';
      msgEl.textContent = data.message;
    }

    if (data.success) {
      codeEl.value = '';
      coinsEl.value = '';
      gemsEl.value = '';
      limitEl.value = '5';
      window.loadAdminCoupons();
    }
  } catch (err) {
    if (msgEl) {
      msgEl.style.display = 'block';
      msgEl.style.background = 'rgba(239, 68, 68, 0.2)';
      msgEl.style.color = '#f87171';
      msgEl.textContent = 'Sunucu bağlantı hatası!';
    }
  }
};

window.deleteAdminCoupon = async function(code) {
  if (!confirm(`"${code.toUpperCase()}" kuponunu silmek istediğinize emin misiniz?`)) return;
  try {
    const res = await fetch('/api/admin/coupons/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) {
      window.loadAdminCoupons();
    }
  } catch (err) {
    alert('Sunucu iletişim hatası!');
  }
};

// Explicit Window Export for HTML onclick attributes
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.handleAuthSubmit = handleAuthSubmit;
window.handleLogout = handleLogout;
window.openGunsShopModal = openGunsShopModal;
window.closeGunsShopModal = closeGunsShopModal;
window.selectShowcaseGun = selectShowcaseGun;
window.buyShowcaseGun = buyShowcaseGun;
window.equipShowcaseGun = equipShowcaseGun;
window.openBackpackModal = openBackpackModal;
window.closeBackpackModal = closeBackpackModal;
window.filterBackpackCategory = filterBackpackCategory;
window.renderBackpackGrid = renderBackpackGrid;
window.buyBackpackItem = buyBackpackItem;
window.equipBackpackItem = equipBackpackItem;
window.openLootboxModal = openLootboxModal;
window.closeLootboxModal = closeLootboxModal;
window.selectCrate = selectCrate;
window.spinLootbox = spinLootbox;
window.closeLootWonPopup = closeLootWonPopup;
window.openTasksModal = openTasksModal;
window.closeTasksModal = closeTasksModal;
window.handleClaimTask = handleClaimTask;
window.openCurrencyModal = openCurrencyModal;
window.closeCurrencyModal = closeCurrencyModal;
window.handleRedeemCoupon = handleRedeemCoupon;
window.topUpCurrency = topUpCurrency;

// ==========================================
// FRIENDS & REAL-TIME MATCH INVITATION SYSTEM
// ==========================================
let currentPendingInvite = null;

function showMatchInviteBanner(fromUser, roomId, mode) {
  currentPendingInvite = { fromUser, roomId, mode };
  const banner = document.getElementById('match-invite-banner');
  const userEl = document.getElementById('invite-from-user');
  const roomEl = document.getElementById('invite-room-code');
  const modeEl = document.getElementById('invite-room-mode');

  if (userEl) userEl.textContent = fromUser;
  if (roomEl) roomEl.textContent = roomId;
  if (modeEl) modeEl.textContent = mode || 'FFA';

  if (banner) {
    banner.style.display = 'block';
    window.soundFX.playDeploy();
  }

  clearTimeout(window._inviteBannerTimeout);
  window._inviteBannerTimeout = setTimeout(() => {
    window.declineCurrentInvite();
  }, 25000);
}

function acceptCurrentInvite() {
  if (!currentPendingInvite) return;
  const invite = currentPendingInvite;
  currentPendingInvite = null;

  const banner = document.getElementById('match-invite-banner');
  if (banner) banner.style.display = 'none';

  if (state.mode === 'battle') {
    leaveBattle();
  }

  closeFriendsModal();
  const pauseOverlay = document.getElementById('pause-overlay');
  if (pauseOverlay) pauseOverlay.style.display = 'none';

  state.roomId = invite.roomId;
  state.isPrivateRoom = true;
  state.matchType = invite.mode || 'FFA';

  window.soundFX.playClick();
  alert(`🚀 "${invite.fromUser}" daveti kabul edildi! Odaya (${invite.roomId}) bağlanılıyor...`);
  startBattle(state.matchType);
}
window.acceptCurrentInvite = acceptCurrentInvite;

function declineCurrentInvite() {
  currentPendingInvite = null;
  const banner = document.getElementById('match-invite-banner');
  if (banner) banner.style.display = 'none';
}
window.declineCurrentInvite = declineCurrentInvite;

function openFriendsModal() {
  window.soundFX.playClick();
  const modal = document.getElementById('friends-modal');
  if (modal) {
    modal.style.display = 'flex';
    loadFriendsList();
  }
}
window.openFriendsModal = openFriendsModal;

function closeFriendsModal() {
  window.soundFX.playClick();
  const modal = document.getElementById('friends-modal');
  if (modal) modal.style.display = 'none';
}
window.closeFriendsModal = closeFriendsModal;

function showFriendActionMsg(msg, isSuccess) {
  const el = document.getElementById('friend-action-msg');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  el.style.background = isSuccess ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)';
  el.style.border = isSuccess ? '1px solid #22c55e' : '1px solid #ef4444';
  el.style.color = isSuccess ? '#4ade80' : '#f87171';
  setTimeout(() => {
    el.style.display = 'none';
  }, 4000);
}

function showGlobalNotification(msg, type = 'info') {
  const container = document.getElementById('global-toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'global-toast-item';
  if (type === 'success') {
    toast.style.borderColor = '#22c55e';
    toast.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(34, 197, 94, 0.4)';
  } else if (type === 'error') {
    toast.style.borderColor = '#ef4444';
  }
  toast.innerHTML = `<span style="font-size: 18px;">🔔</span><div>${msg}</div>`;
  container.appendChild(toast);
  if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 320);
  }, 4500);
}
window.showGlobalNotification = showGlobalNotification;

async function loadFriendsList() {
  const body = document.getElementById('friends-list-body');
  const countEl = document.getElementById('friends-count');
  if (!body) return;

  if (!state.token) {
    body.innerHTML = `
      <div style="padding: 26px; text-align: center; color: #94a3b8; font-size: 13px;">
        Arkadaş eklemek ve canlı maça davet etmek için lütfen önce 
        <button onclick="closeFriendsModal(); openAuthModal();" style="background:#2563eb; color:#fff; border:none; padding:6px 14px; border-radius:6px; cursor:pointer; font-weight:800; margin-left:6px;">GİRİŞ YAPIN</button>
      </div>`;
    if (countEl) countEl.textContent = '0';
    return;
  }

  body.innerHTML = '<div style="padding: 26px; text-align: center; color: #94a3b8;">Arkadaş listesi yükleniyor...</div>';

  try {
    const res = await fetch('/api/friends/list', {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    const data = await res.json();

    if (!data.success) {
      body.innerHTML = `<div style="padding: 26px; text-align: center; color: #f87171;">${data.message || 'Yüklenemedi!'}</div>`;
      return;
    }

    const friends = data.friends || [];
    const incoming = data.incomingRequests || [];
    const sent = data.sentRequests || [];

    if (countEl) countEl.textContent = friends.length;

    if (friends.length === 0 && incoming.length === 0 && sent.length === 0) {
      body.innerHTML = `
        <div style="padding: 34px 20px; text-align: center; color: #94a3b8; font-size: 13px; line-height: 1.6;">
          Henüz ekli arkadaşınız veya bekleyen bir isteğiniz bulunmuyor.<br>
          <span style="color: #cbd5e1;">Yukarıdaki kutucuğa arkadaşınızın kullanıcı adını yazarak arkadaşlık isteği gönderebilirsiniz!</span>
        </div>`;
      return;
    }

    let html = '';

    // 1. INCOMING REQUESTS (Requires User Acceptance)
    if (incoming.length > 0) {
      html += `
        <div class="friend-section-title friend-section-incoming">
          <span>📥</span> GELEN ARKADAŞLIK İSTEKLERİ (${incoming.length})
        </div>
      `;
      incoming.forEach(r => {
        html += `
          <div class="friend-row" style="background: rgba(56, 189, 248, 0.05); border-left: 3px solid #38bdf8;">
            <div class="friend-info-left">
              <span class="friend-status-dot ${r.isOnline ? 'friend-status-online' : 'friend-status-offline'}"></span>
              <div class="friend-name-col">
                <span class="friend-username-text">${r.username} <span style="font-size: 11px; color: #facc15; font-weight: 800;">★${r.level || 0}</span></span>
                <span class="friend-status-desc" style="color: #38bdf8; font-weight: 700;">Sana arkadaşlık isteği gönderdi</span>
              </div>
            </div>
            <div class="friend-actions-right">
              <button class="btn-friend-accept" onclick="window.acceptFriendRequest('${r.username}')" title="İsteği kabul et">
                ✅ Kabul Et
              </button>
              <button class="btn-friend-reject" onclick="window.rejectFriendRequest('${r.username}')" title="İsteği reddet">
                ❌ Reddet
              </button>
            </div>
          </div>
        `;
      });
    }

    // 2. MUTUAL ACCEPTED FRIENDS (Only these can be invited to matches!)
    html += `
      <div class="friend-section-title friend-section-accepted">
        <span>👥</span> KABUL EDİLEN ARKADAŞLARIN (${friends.length})
      </div>
    `;

    if (friends.length === 0) {
      html += `
        <div style="padding: 16px 20px; color: #94a3b8; font-size: 12px; font-weight: 600;">
          Henüz karşılıklı kabul edilmiş arkadaşınız yok. Gönderilen veya gelen istekler onaylandığında burada listelenir.
        </div>
      `;
    } else {
      friends.forEach(f => {
        let statusClass = 'friend-status-offline';
        let statusText = 'Çevrimdışı';

        if (f.isOnline) {
          if (f.inGame) {
            statusClass = 'friend-status-ingame';
            statusText = `⚔️ Maçta (Oda: ${f.roomId || 'Özel'})`;
          } else {
            statusClass = 'friend-status-online';
            statusText = '🟢 Lobide Çevrimiçi';
          }
        }

        const canInvite = f.isOnline;

        html += `
          <div class="friend-row">
            <div class="friend-info-left">
              <span class="friend-status-dot ${statusClass}"></span>
              <div class="friend-name-col">
                <span class="friend-username-text">${f.username} <span style="font-size: 11px; color: #facc15; font-weight: 800;">★${f.level || 0}</span></span>
                <span class="friend-status-desc">${statusText}</span>
              </div>
            </div>
            <div class="friend-actions-right">
              ${canInvite ? `
                <button class="btn-invite-friend-action" onclick="window.inviteFriendToRoom('${f.username}')" title="Bu oyuncuyu mevcut maça davet et">
                  📩 Maça Çağır
                </button>
              ` : '<span style="font-size: 11px; color: #64748b; font-weight: 700; padding: 6px 8px;">Çevrimdışı</span>'}
              <button class="btn-remove-friend-action" onclick="window.handleRemoveFriend('${f.username}')" title="Arkadaşlıktan çıkar">
                ✕
              </button>
            </div>
          </div>
        `;
      });
    }

    // 3. SENT PENDING REQUESTS (Awaiting Target Player's Acceptance)
    if (sent.length > 0) {
      html += `
        <div class="friend-section-title friend-section-sent">
          <span>📤</span> GÖNDERİLEN İSTEKLER (${sent.length}) - ONAY BEKLİYOR
        </div>
      `;
      sent.forEach(s => {
        html += `
          <div class="friend-row" style="background: rgba(251, 191, 36, 0.04);">
            <div class="friend-info-left">
              <span class="friend-status-dot ${s.isOnline ? 'friend-status-online' : 'friend-status-offline'}"></span>
              <div class="friend-name-col">
                <span class="friend-username-text">${s.username} <span style="font-size: 11px; color: #facc15; font-weight: 800;">★${s.level || 0}</span></span>
                <span class="friend-badge-pending">Karşı tarafın kabul etmesi bekleniyor (Maça çağrılamaz)</span>
              </div>
            </div>
            <div class="friend-actions-right">
              <button class="btn-friend-cancel" onclick="window.handleCancelFriendRequest('${s.username}')" title="İsteği geri al">
                İptal Et
              </button>
            </div>
          </div>
        `;
      });
    }

    body.innerHTML = html;

  } catch (err) {
    body.innerHTML = '<div style="padding: 26px; text-align: center; color: #f87171;">Sunucu bağlantı hatası!</div>';
  }
}
window.loadFriendsList = loadFriendsList;

async function handleAddFriendSubmit() {
  const input = document.getElementById('friend-username-input');
  if (!input) return;
  const username = input.value.trim();
  if (!username) {
    alert('Lütfen eklenecek oyuncunun kullanıcı adını girin!');
    return;
  }

  if (!state.token) {
    alert('Arkadaş eklemek için lütfen önce giriş yapın!');
    openAuthModal();
    return;
  }

  try {
    const res = await fetch('/api/friends/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ friendUsername: username })
    });
    const data = await res.json();

    showFriendActionMsg(data.message, data.success);
    if (data.success) {
      input.value = '';
      loadFriendsList();
    }
  } catch (err) {
    showFriendActionMsg('Sunucuya bağlanılamadı!', false);
  }
}
window.handleAddFriendSubmit = handleAddFriendSubmit;

async function acceptFriendRequest(targetUsername) {
  if (!state.token) return;
  try {
    const res = await fetch('/api/friends/accept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ friendUsername: targetUsername })
    });
    const data = await res.json();
    showFriendActionMsg(data.message, data.success);
    loadFriendsList();
  } catch (err) {
    showFriendActionMsg('İşlem başarısız!', false);
  }
}
window.acceptFriendRequest = acceptFriendRequest;

async function rejectFriendRequest(targetUsername) {
  if (!state.token) return;
  try {
    const res = await fetch('/api/friends/reject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ friendUsername: targetUsername })
    });
    const data = await res.json();
    showFriendActionMsg(data.message, data.success);
    loadFriendsList();
  } catch (err) {
    showFriendActionMsg('İşlem başarısız!', false);
  }
}
window.rejectFriendRequest = rejectFriendRequest;

async function handleCancelFriendRequest(targetUsername) {
  if (!state.token) return;
  try {
    const res = await fetch('/api/friends/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ friendUsername: targetUsername })
    });
    const data = await res.json();
    showFriendActionMsg(data.message, data.success);
    loadFriendsList();
  } catch (err) {
    showFriendActionMsg('İşlem başarısız!', false);
  }
}
window.handleCancelFriendRequest = handleCancelFriendRequest;

async function handleRemoveFriend(targetUsername) {
  if (!confirm(`"${targetUsername}" adlı oyuncuyu arkadaş listenizden çıkarmak istediğinize emin misiniz?`)) return;

  try {
    const res = await fetch('/api/friends/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({ friendUsername: targetUsername })
    });
    const data = await res.json();
    showFriendActionMsg(data.message, data.success);
    loadFriendsList();
  } catch (err) {
    showFriendActionMsg('İşlem başarısız!', false);
  }
}
window.handleRemoveFriend = handleRemoveFriend;

function inviteFriendToRoom(targetUsername) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert('Sunucu WebSocket bağlantısı henüz hazır değil!');
    return;
  }

  socket.send(JSON.stringify({
    type: 'invite_friend',
    targetUsername: targetUsername,
    roomId: state.roomId,
    mode: state.matchType
  }));

  showFriendActionMsg(`📩 "${targetUsername}" adlı oyuncuya davet gönderiliyor...`, true);
}
window.inviteFriendToRoom = inviteFriendToRoom;
window.inviteFriendToRoom = inviteFriendToRoom;

// Global initialization on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  init();
  fetchUserProfile();
  updateCurrencyUI();
});

