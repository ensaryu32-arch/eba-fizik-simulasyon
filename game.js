// Veck.io Complete 3D Engine with Weapon Deploy FX, Knife/Grenade Viewmodels, Wall Raycast Blocking, 10-Min Timer, and Loadout Modal

const RANDOM_GUEST_NAMES = [
  'GölgeAvcı', 'Fırtına', 'Bozkurt', 'Şahin', 'Poyraz', 'DemirYumruk', 'Kasırga', 'Yıldırım', 'Akrep', 'Pars', 'Kartal', 'Hayalet'
];
function getRandomDefaultGuestName() {
  const base = RANDOM_GUEST_NAMES[Math.floor(Math.random() * RANDOM_GUEST_NAMES.length)];
  return `${base}_${Math.floor(10 + Math.random() * 90)}`;
}

const savedLocalNick = localStorage.getItem('veck_saved_name');
const initialNick = (savedLocalNick && savedLocalNick !== 'ensar44' && savedLocalNick !== 'ensar') ? savedLocalNick : getRandomDefaultGuestName();

const state = {
  mode: 'lobby',
  matchType: 'FFA',
  isPaused: false,
  isPrivateRoom: false,
  roomId: 'M73MNGX8',
  myName: initialNick,
  mouseSensitivity: parseFloat(localStorage.getItem('veck_sensitivity')) || 0.0016,
  level: 0,
  xp: 0,
  coins: 0,
  gems: 0,
  token: localStorage.getItem('veck_token') || null,
  isLoggedIn: false,
  currentSlot: 1, // 1: Primary, 2: Secondary, 3: Knife, 4: Grenade
  prevSlot: 2,
  bandages: 0,
  maxPlayers: 16,
  botsEnabled: true,
  slotAmmo: { 1: 30, 2: 15, 3: 1, 4: 2 },
  reserveAmmo: { 1: 60, 2: 30, 4: 2 },
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
  isTabOpen: false,
  hasSilencer: false
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
let lobbyEnv, arenaData, cyberCityData, pubgMapData;
let currentSelectedMap = 'pubg'; // Default to PUBG Survival Map (Large Map & Car!)
let localAvatar = null;
let deployGraceTimer = 0;
let currentDrivenVehicle = null;
let currentInspectedCrate = null;
const skydiveState = {
  active: false,
  inPlane: false,
  planeTimer: 0,
  bluePlaneMesh: null,
  redPlaneMesh: null,
  bluePlanePos: new THREE.Vector3(),
  redPlanePos: new THREE.Vector3(),
  parachuteMesh: null,
  botParachutes: []
};

let vehCamYaw = 0;
let vehCamPitch = 0.2;
window.activeInteractionTarget = null;

// Reusable math objects to eliminate Garbage Collection lag
const _tempHitVec = new THREE.Vector3();
const _tempRayDir = new THREE.Vector3();
const _tempRay = new THREE.Ray();

function getActiveMapData() {
  if (currentSelectedMap === 'pubg' && pubgMapData) return pubgMapData;
  if (currentSelectedMap === 'cyber_city' && cyberCityData) return cyberCityData;
  return arenaData;
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
  if (currentSelectedMap === 'pubg') currentSelectedMap = 'arena';
  else if (currentSelectedMap === 'arena') currentSelectedMap = 'cyber_city';
  else currentSelectedMap = 'pubg';

  const el = document.getElementById('current-map-name');
  if (el) {
    if (currentSelectedMap === 'pubg') el.textContent = 'Map: PUBG Survival (Büyük Harita & Araba)';
    else if (currentSelectedMap === 'cyber_city') el.textContent = 'Map: Cyber City (Neon Sci-Fi)';
    else el.textContent = 'Map: Arena (Veck Classic)';
  }
};

// Viewmodel dictionary for all weapon models
const viewmodels = {};
let activeGun = null;

const bots = [];
const remotePlayers = new Map();
const activeGrenades = [];
const activeDeathCrates = [];

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
  // Sleek Sci-Fi Dark Navy for Lobby Hangar (Prevents blinding blank blue screen!)
  scene.background = new THREE.Color(0x0a0e1a);
  scene.fog = new THREE.FogExp2(0x0a0e1a, 0.012);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 15000);
  camera.rotation.order = 'YXZ';
  camera.position.set(0, 2.1, 4.6);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
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

  // 1. Authentic Veck.io Sci-Fi Lobby Hangar & Pedestals
  try {
    const createLobby = (window.models && window.models.createLobbyEnvironment) || (typeof createLobbyEnvironment === 'function' ? createLobbyEnvironment : null);
    if (createLobby) {
      lobbyEnv = createLobby();
      scene.add(lobbyEnv);
    }
  } catch (err) {
    console.error("Lobby environment creation error:", err);
  }

  // 2. Battle Maps (safely loaded in background, hidden until match starts)
  try {
    const createArena = (window.models && window.models.createVeckArenaMap) || (typeof createVeckArenaMap === 'function' ? createVeckArenaMap : null);
    if (createArena) {
      arenaData = createArena();
      arenaData.group.visible = false;
      scene.add(arenaData.group);
    }
  } catch (err) {
    console.error("Veck arena creation error:", err);
  }

  try {
    if (window.models && window.models.createCyberCityMap) {
      cyberCityData = window.models.createCyberCityMap();
      cyberCityData.group.visible = false;
      scene.add(cyberCityData.group);
    }
  } catch (err) {
    console.error("Cyber city creation error:", err);
  }

  try {
    if (window.models && window.models.createPubgSurvivalMap) {
      pubgMapData = window.models.createPubgSurvivalMap();
      pubgMapData.group.visible = false;
      scene.add(pubgMapData.group);
    }
  } catch (err) {
    console.error("Pubg map creation error:", err);
  }

  // 3. Lobby Player Avatar (Standing prominently on Center Podium with Weapon & Nameplate)
  try {
    const createChar = (window.models && window.models.createBlockyCharacter) || (typeof createBlockyCharacter === 'function' ? createBlockyCharacter : null);
    if (createChar) {
      localAvatar = createChar({
        name: state.myName || 'Ensar',
        level: 5,
        teamColor: 'blue',
        shirtColor: 0x6c4bf6,
        pantsColor: 0x1f2438,
        weaponType: 'ak47',
        isEnemy: false
      });
      localAvatar.group.position.set(0, 0.32, 0);
      scene.add(localAvatar.group);
    }
  } catch (err) {
    console.error("Local avatar creation error:", err);
  }

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

  // Start Loop FIRST so 3D rendering is 100% guaranteed to start immediately!
  requestAnimationFrame(gameLoop);

  // Match Timer
  setInterval(updateMatchTimer, 1000);

  // Render Weapon Loadout Screen Grid
  renderWeaponLoadoutGrid();

  // Connect WebSocket safely with offline/file fallback
  try {
    initWebSocket();
  } catch (err) {
    console.warn("WebSocket init error:", err);
  }
}

function initWebSocket() {
  if (!window.location.host || window.location.protocol === 'file:') {
    console.warn("WebSocket skipped (local file:// or static host). Offline mode active.");
    return;
  }
  try {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    socket = new WebSocket(`${protocol}//${window.location.host}`);

    socket.onerror = (err) => {
      console.warn("WebSocket connection warning:", err);
    };

  socket.onopen = () => {
    if (state.myName) {
      socket.send(JSON.stringify({
        type: 'identify',
        username: state.myName
      }));
    }
    if (state.mode === 'battle') {
      socket.send(JSON.stringify({
        type: 'join_room',
        roomId: state.roomId,
        isPrivate: state.isPrivateRoom,
        mode: state.matchType,
        name: state.myName,
        x: playerPos.x,
        y: playerPos.y,
        z: playerPos.z,
        rotY: playerRotY
      }));
    }
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.type === 'room_joined') {
        state.myPlayerId = data.id;
        if (data.map) currentSelectedMap = data.map;
        if (data.duration) state.matchSeconds = Number(data.duration);
        if (data.bots !== undefined) state.botsEnabled = (data.bots === 'with_bots');
        if (data.maxPlayers) state.maxPlayers = Number(data.maxPlayers);

        if (window.pubgLobbyState && window.pubgLobbyState.active) {
          window.pubgLobbyState.isHost = !!data.isHost;
          if (data.players && Array.isArray(data.players)) {
            window.pubgLobbyState.players = data.players.map(p => ({
              id: p.id,
              name: p.name || 'Oyuncu',
              team: p.team || 'blue',
              isHost: !!p.isHost,
              isBot: false
            }));
            if (typeof renderPubgLobbySlots === 'function') renderPubgLobbySlots();
          }
        }

        // Clean up previous remote players
        remotePlayers.forEach(rp => {
          if (rp.group) scene.remove(rp.group);
        });
        remotePlayers.clear();

        // Spawn all players currently in the room
        if (Array.isArray(data.players)) {
          data.players.forEach(p => {
            if (p.id !== data.id) {
              createRemotePlayer(p);
            }
          });
        }
        if (state.isTabOpen) updateScoreboardUI();
      }

      if (data.type === 'player_joined') {
        if (window.pubgLobbyState && window.pubgLobbyState.active && data.player) {
          if (!window.pubgLobbyState.players.some(p => p.id === data.player.id)) {
            window.pubgLobbyState.players.push({
              id: data.player.id,
              name: data.player.name || 'Oyuncu',
              team: data.player.team || 'red',
              isHost: !!data.player.isHost,
              isBot: false
            });
            if (typeof renderPubgLobbySlots === 'function') renderPubgLobbySlots();
          }
        }
        if (data.player && data.player.id !== state.myPlayerId) {
          createRemotePlayer(data.player);
          showGlobalNotification(`🎮 "${data.player.name || 'Oyuncu'}" odaya katıldı!`, 'info');
          if (state.isTabOpen) updateScoreboardUI();
        }
      }

      if (data.type === 'team_switched') {
        if (window.pubgLobbyState && window.pubgLobbyState.active) {
          const target = window.pubgLobbyState.players.find(p => p.id === data.id);
          if (target) {
            target.team = data.team;
            if (typeof renderPubgLobbySlots === 'function') renderPubgLobbySlots();
          }
        }
      }

      if (data.type === 'match_started') {
        if (window.pubgLobbyState && window.pubgLobbyState.active) {
          if (typeof launchPubgMatchFromLobby === 'function') {
            launchPubgMatchFromLobby();
          }
        }
      }

      if (data.type === 'player_moved') {
        const rp = remotePlayers.get(data.id);
        if (rp) {
          rp.targetPos.set(data.x, data.y, data.z);
          rp.targetRotY = data.rotY;
          rp.targetHeadPitch = data.headPitch || 0;
        }
      }

      if (data.type === 'player_left') {
        const rp = remotePlayers.get(data.id);
        if (rp) {
          if (rp.group) scene.remove(rp.group);
          remotePlayers.delete(data.id);
          if (state.isTabOpen) updateScoreboardUI();
        }
      }

      if (data.type === 'player_damaged') {
        if (data.targetId === state.myPlayerId) {
          // Local player took damage from someone!
          if (state.mode === 'battle' && !state.isDead) {
            state.health = Math.max(0, state.health - data.damage);
            updateHealthUI();
            if (window.soundFX && window.soundFX.playHit) window.soundFX.playHit();
            triggerDamageFlash();

            if (state.health <= 0) {
              state.isDead = true;
              state.deaths++;
              showFeed(`${data.attackerName || 'Düşman'} ⚔️ ${state.myName}${data.isHeadshot ? ' (HEADSHOT)' : ''}`);
              showDeathCallout(data.attackerName || 'Düşman', data.gun || 'AK-47');
              updateViewmodelVisibility();
              if (state.isTabOpen) updateScoreboardUI();

              if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                  type: 'player_died',
                  attackerId: data.attackerId,
                  attackerName: data.attackerName,
                  isHeadshot: data.isHeadshot,
                  gun: data.gun
                }));
              }

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

                if (socket && socket.readyState === WebSocket.OPEN) {
                  socket.send(JSON.stringify({
                    type: 'player_respawned',
                    x: playerPos.x,
                    y: playerPos.y,
                    z: playerPos.z
                  }));
                }
              }, 2800);
            }
          }
        } else {
          // Remote player took damage
          const rp = remotePlayers.get(data.targetId);
          if (rp) {
            rp.health = Math.max(0, (rp.health !== undefined ? rp.health : 150) - data.damage);
            if (rp.hpFill) {
              rp.hpFill.scale.x = Math.max(0, rp.health / 150);
            }
          }
        }
      }

      if (data.type === 'player_died') {
        showFeed(`${data.attackerName || 'Düşman'} ⚔️ ${data.victimName || 'Oyuncu'}${data.isHeadshot ? ' (HEADSHOT)' : ''}`);

        // If I made the kill!
        if (data.attackerId === state.myPlayerId) {
          state.kills++;
          state.score += (data.isHeadshot ? 150 : 100);
          if (!state.stats) state.stats = { kills: 0, score: 0, headshots: 0, matchesPlayed: 0, matchesWon: 0, casesOpened: 0, heavyKills: 0, slidesUsed: 0 };
          state.stats.kills = (state.stats.kills || 0) + 1;
          state.stats.score = (state.stats.score || 0) + (data.isHeadshot ? 150 : 100);
          if (data.isHeadshot) state.stats.headshots = (state.stats.headshots || 0) + 1;

          const scoreEl = document.getElementById('player-score');
          if (scoreEl) scoreEl.textContent = state.kills;
          triggerHitmarker();
          if (window.soundFX && window.soundFX.playKillSound) window.soundFX.playKillSound();
        } else {
          const killerRp = remotePlayers.get(data.attackerId);
          if (killerRp) {
            killerRp.kills = (killerRp.kills || 0) + 1;
            killerRp.score = (killerRp.score || 0) + (data.isHeadshot ? 150 : 100);
          }
        }

        const rp = remotePlayers.get(data.targetId);
        if (rp) {
          rp.isDead = true;
          rp.deaths = (rp.deaths || 0) + 1;
          if (rp.group) rp.group.visible = false;
        }
        if (state.isTabOpen) updateScoreboardUI();
      }

      if (data.type === 'vehicle_update') {
        const activeMap = getActiveMapData();
        if (activeMap && activeMap.vehicles && activeMap.vehicles[data.vehicleIndex]) {
          const v = activeMap.vehicles[data.vehicleIndex];
          if (!v.isDriven) {
            v.pos.set(data.x, data.y, data.z);
            v.group.position.copy(v.pos);
            v.angle = data.angle;
            v.group.rotation.y = data.angle;
            v.speed = data.speed;
            if (v.wheels && v.wheels.flPivot && v.wheels.frPivot) {
              v.wheels.flPivot.rotation.y = data.steerAngle || 0;
              v.wheels.frPivot.rotation.y = data.steerAngle || 0;
            }
          }
        }
      }

      if (data.type === 'vehicle_honk') {
        if (window.soundFX && window.soundFX.playCarHonk) window.soundFX.playCarHonk();
      }

      if (data.type === 'loot_picked') {
        const activeMap = getActiveMapData();
        if (activeMap && activeMap.lootItems && activeMap.lootItems[data.lootIndex]) {
          const item = activeMap.lootItems[data.lootIndex];
          item.collected = true;
          if (item.mesh) item.mesh.visible = false;
        }
      }

      if (data.type === 'player_respawned') {
        const rp = remotePlayers.get(data.id);
        if (rp) {
          rp.isDead = false;
          rp.health = 150;
          if (rp.hpFill) rp.hpFill.scale.x = 1;
          rp.group.position.set(data.x, data.y, data.z);
          rp.targetPos.set(data.x, data.y, data.z);
          rp.group.visible = true;
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
  } catch (err) {
    console.warn("WebSocket initialization exception:", err);
  }
}

function createRemotePlayer(p) {
  if (!p || !p.id) return;
  if (p.id === state.myPlayerId) return;
  if (remotePlayers.has(p.id)) {
    const existing = remotePlayers.get(p.id);
    if (p.x !== undefined) existing.targetPos.set(p.x, p.y, p.z);
    return;
  }
  // In FFA (Free For All) and standard matches, opponents are ENEMIES!
  const isTeammate = (state.matchType === 'TDM' && p.team && p.team === state.myTeam);
  const teamColor = isTeammate ? 'blue' : 'red';
  const shirtColor = isTeammate ? 0x3b82f6 : 0xdc2626;

  const avatar = createBlockyCharacter({
    name: p.name || 'Oyuncu',
    level: p.level || 7,
    shirtColor: shirtColor,
    pantsColor: 0x1f2438,
    isEnemy: !isTeammate,
    teamColor: teamColor,
    weaponType: (p.gun === 'Pistol' || p.gun === 'Deagle') ? 'pistol' : 'ak47'
  });
  const initX = (p.x !== undefined) ? p.x : 0;
  const initY = (p.y !== undefined) ? p.y : 0;
  const initZ = (p.z !== undefined) ? p.z : 0;

  avatar.group.position.set(initX, initY, initZ);
  avatar.targetPos = new THREE.Vector3(initX, initY, initZ);
  avatar.targetRotY = p.rotY || 0;
  avatar.targetHeadPitch = p.headPitch || 0;
  avatar.health = 150;
  avatar.maxHealth = 150;
  avatar.id = p.id;
  avatar.name = p.name || 'Oyuncu';
  avatar.level = p.level || 7;
  avatar.kills = p.kills || 0;
  avatar.deaths = p.deaths || 0;
  avatar.score = p.score || 0;
  avatar.ping = p.ping || Math.floor(16 + Math.random() * 20);
  avatar.walkPhase = 0;
  avatar.isDead = false;

  scene.add(avatar.group);
  remotePlayers.set(p.id, avatar);
}

function spawnBots() {
  // Clear any existing bots
  bots.forEach(b => scene.remove(b.avatar.group));
  bots.length = 0;

  if (state.isPrivateRoom && !state.botsEnabled) return; // NO BOTS IN PRIVATE ROOM UNLESS WITH BOTS SELECTED!

  const mapData = getActiveMapData();
  const spawnPool = (mapData && mapData.spawnPoints && mapData.spawnPoints.length > 0)
    ? [...mapData.spawnPoints]
    : [...SPAWN_POINTS];

  // Shuffle spawn points so bots and player are spread across the entire map
  for (let i = spawnPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [spawnPool[i], spawnPool[j]] = [spawnPool[j], spawnPool[i]];
  }

  const botRoster = [
    { name: 'Vortex [PRO]', level: 25, weapon: 'ak47', kills: 0, deaths: 0, score: 0, ping: 24 },
    { name: 'RedFury [VIP]', level: 35, weapon: 'ak47', kills: 0, deaths: 0, score: 0, ping: 31 },
    { name: 'GhostSniper [ELITE]', level: 48, weapon: 'sniper', kills: 0, deaths: 0, score: 0, ping: 19 },
    { name: 'CyberWolf_TR', level: 28, weapon: 'burst', kills: 0, deaths: 0, score: 0, ping: 42 },
    { name: 'TitanHeavy [JUGG]', level: 50, weapon: 'minigun', kills: 0, deaths: 0, score: 0, ping: 27 },
    { name: 'NeonPhantom', level: 31, weapon: 'pistol', kills: 0, deaths: 0, score: 0, ping: 35 },
    { name: 'ShadowHunter', level: 42, weapon: 'sniper', kills: 0, deaths: 0, score: 0, ping: 28 },
    { name: 'BalkanBeast', level: 39, weapon: 'ak47', kills: 0, deaths: 0, score: 0, ping: 33 }
  ];

  botRoster.forEach((b, idx) => {
    // Team battle: TDM, 2v2, Squad, or any team match
    const isTeamMode = (state.matchType === 'TDM' || state.matchType === '2v2' || state.matchType === 'Squad');
    const myTeam = state.team || 'blue';
    const enemyTeam = (myTeam === 'blue') ? 'red' : 'blue';
    // In team mode, evenly distribute bots between blue and red
    const assignedTeam = isTeamMode ? (idx % 2 === 0 ? myTeam : enemyTeam) : 'red';
    const isFriendly = isTeamMode && (assignedTeam === myTeam);

    let spawnX, spawnZ;
    if (isFriendly) {
      // TEAMMATES SPAWN RIGHT BESIDE THE PLAYER (within 3 to 6 meters!)
      const angle = (idx * Math.PI / 2) + Math.random() * 0.5;
      const dist = 3.5 + Math.random() * 2.5;
      spawnX = playerPos.x + Math.sin(angle) * dist;
      spawnZ = playerPos.z + Math.cos(angle) * dist;
    } else {
      const sp = isTeamMode ? getRandomSpawn(enemyTeam) : spawnPool[idx % spawnPool.length];
      spawnX = (sp ? sp.x : 30) + (Math.random() - 0.5) * 6;
      spawnZ = (sp ? sp.z : 820) + (Math.random() - 0.5) * 6;
    }

    const avatar = createBlockyCharacter({
      name: b.name,
      level: b.level,
      shirtColor: isFriendly ? 0x0284c7 : 0xdc2626,
      pantsColor: 0x1f2438,
      isEnemy: !isFriendly,
      isBot: true,
      teamColor: isFriendly ? 'blue' : 'red',
      weaponType: b.weapon
    });
    avatar.group.position.set(spawnX, 0, spawnZ);
    scene.add(avatar.group);

    bots.push({
      name: b.name,
      team: assignedTeam,
      isFriendly: isFriendly,
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
      targetPos: new THREE.Vector3(spawnX, 0, spawnZ),
      targetLanding: (assignedTeam === 'blue')
        ? new THREE.Vector3(-35 + (Math.random() - 0.5) * 40, 0, -120 + (Math.random() - 0.5) * 40)
        : ((assignedTeam === 'red')
          ? new THREE.Vector3(30 + (Math.random() - 0.5) * 40, 0, 820 + (Math.random() - 0.5) * 40)
          : new THREE.Vector3(spawnX, 0, spawnZ)),
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
  if (maxDist < 0.2) return false;
  _tempRayDir.normalize();

  _tempRay.origin.copy(origin);
  _tempRay.direction.copy(_tempRayDir);

  const minX = Math.min(origin.x, targetPos.x) - 1.0;
  const maxX = Math.max(origin.x, targetPos.x) + 1.0;
  const minZ = Math.min(origin.z, targetPos.z) - 1.0;
  const maxZ = Math.max(origin.z, targetPos.z) + 1.0;

  for (let i = 0; i < colliders.length; i++) {
    const c = colliders[i];
    // Fast 2D AABB bounding check to skip distant colliders
    if (c.maxX < minX || c.minX > maxX || c.maxZ < minZ || c.minZ > maxZ) continue;

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
  if (!colliders || colliders.length === 0) return 0;

  let highestGroundY = 0;

  for (const c of colliders) {
    const inX = (pos.x + radius * 0.7 > c.minX && pos.x - radius * 0.7 < c.maxX);
    const inZ = (pos.z + radius * 0.7 > c.minZ && pos.z - radius * 0.7 < c.maxZ);

    if (inX && inZ) {
      // Step-up threshold: allows smooth climbing up stair steps up to 0.55m high!
      if (pos.y >= c.maxY - 0.55) {
        if (c.maxY > highestGroundY) {
          highestGroundY = c.maxY;
        }
      } else if (pos.y < c.maxY && pos.y + 1.8 > c.minY) {
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
  return highestGroundY;
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
  if (currentSelectedMap === 'pubg') {
    showGlobalNotification('❌ PUBG modunda silahlar evlerden ve ölü çantalarından toplanır!', 'warning');
    return;
  }
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

function getRandomSpawn(team = null) {
  const mapData = getActiveMapData();
  let pool = (mapData && mapData.spawnPoints && mapData.spawnPoints.length > 0) ? mapData.spawnPoints : SPAWN_POINTS;

  // In Team Deathmatch (TDM): Team Blue spawns at South Base, Team Red at North Base
  if (state.matchType === 'TDM' && team) {
    if (team === 'blue') {
      const bluePool = pool.filter(sp => sp.z < 0);
      if (bluePool.length > 0) pool = bluePool;
    } else if (team === 'red') {
      const redPool = pool.filter(sp => sp.z >= 0);
      if (redPool.length > 0) pool = redPool;
    }
  }

  const sp = pool[Math.floor(Math.random() * pool.length)];
  return {
    x: sp.x + (Math.random() - 0.5) * 6,
    z: sp.z + (Math.random() - 0.5) * 6
  };
}

// Vehicle & Loot Ground Interaction Helper Functions
function enterVehicle(veh) {
  if (!veh || currentDrivenVehicle) return;
  currentDrivenVehicle = veh;
  veh.isDriven = true;
  vehCamYaw = 0;
  vehCamPitch = 0.2;

  const promptEl = document.getElementById('interaction-prompt');
  if (promptEl) promptEl.style.display = 'none';

  const vehHud = document.getElementById('vehicle-hud');
  if (vehHud) vehHud.style.display = 'block';

  // Hide weapon viewmodel while driving
  if (activeGun) activeGun.visible = false;
  if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
  showGlobalNotification('🚙 PUBG UAZ Aracına Bindin! [W/S/A/D] ile sür, Fare ile Etrafa Bak, [SPACE] El Freni, [SHIFT] Turbo, [H] Korna, [E] İn', 'info');
}

function exitVehicle() {
  if (!currentDrivenVehicle) return;
  const veh = currentDrivenVehicle;

  // Step out to the side
  const exitAngle = veh.angle + Math.PI / 2;
  playerPos.set(
    veh.pos.x + Math.sin(exitAngle) * 3.6,
    veh.pos.y,
    veh.pos.z + Math.cos(exitAngle) * 3.6
  );
  velocity.set(0, 0, 0);
  playerRotY = veh.angle + vehCamYaw;
  headPitch = vehCamPitch;

  veh.isDriven = false;
  currentDrivenVehicle = null;

  const vehHud = document.getElementById('vehicle-hud');
  if (vehHud) vehHud.style.display = 'none';

  updateViewmodelVisibility();
  if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
}

function pickupLoot(loot, index) {
  if (!loot || loot.collected) return;
  loot.collected = true;
  if (loot.mesh) loot.mesh.visible = false;

  if (loot.type === 'bandage') {
    state.bandages = (state.bandages || 0) + 1;
    const countBadge = document.getElementById('bandage-count-badge');
    if (countBadge) countBadge.textContent = state.bandages;
    if (window.soundFX && window.soundFX.playLootPickup) window.soundFX.playLootPickup();
    showGlobalNotification(`🩹 Bandaj çantaya eklendi! Toplam: ${state.bandages} ([5] Tuşu ile Can Bas)`, 'success');
  } else if (loot.type === 'medkit') {
    state.health = 150;
    updateHealthUI();
    if (window.soundFX && window.soundFX.playLootPickup) window.soundFX.playLootPickup();
    showGlobalNotification('💊 İlk Yardım Çantası kullanıldı! Can 150/150!', 'success');
  } else if (loot.type === 'silencer') {
    state.hasSilencer = true;
    if (window.soundFX && window.soundFX.playSilencerAttach) {
      window.soundFX.playSilencerAttach();
    } else if (window.soundFX && window.soundFX.playLootPickup) {
      window.soundFX.playLootPickup();
    }
    if (activeGun) attachSilencerToViewmodel(activeGun);
    updateAmmoUI();
    showGlobalNotification('🔇 Susturucu Kuşandı! Silah sesleri kısıldı ve namlu ateşi gizlendi.', 'success');
  } else if (loot.type === 'weapon') {
    // Any weapon can be equipped in slot 1 or slot 2!
    let targetSlot = 1;
    if (!state.equippedGuns[1]) {
      targetSlot = 1;
    } else if (!state.equippedGuns[2]) {
      targetSlot = 2;
    } else {
      targetSlot = (state.currentSlot === 2) ? 2 : 1;
    }

    state.equippedGuns[targetSlot] = loot.gunName;
    const wInfo = ALL_WEAPONS_CATALOG[loot.gunName] || ALL_WEAPONS_CATALOG['AK-47'];

    // Limited Ammo: grant mag ammo + reserve ammo!
    const startingMag = wInfo.maxAmmo || 30;
    const startingReserve = (loot.gunName === 'Sniper') ? 15 : ((loot.gunName === 'Shawty') ? 18 : 60);

    if (!state.slotAmmo) state.slotAmmo = { 1: 0, 2: 0, 3: 1, 4: 0 };
    if (!state.reserveAmmo) state.reserveAmmo = { 1: 0, 2: 0, 4: 0 };

    state.slotAmmo[targetSlot] = startingMag;
    state.reserveAmmo[targetSlot] = startingReserve;
    state.ammo = startingMag;

    // Update slot box icon and tooltip in HUD
    const slotEl = document.getElementById(`slot-${targetSlot}`);
    if (slotEl) {
      slotEl.innerHTML = wInfo.icon || '🔫';
      slotEl.title = `Key ${targetSlot}: ${wInfo.name}`;
    }

    switchSlot(targetSlot);

    if (state.hasSilencer && activeGun) {
      attachSilencerToViewmodel(activeGun);
    }
    if (window.soundFX && window.soundFX.playLootPickup) window.soundFX.playLootPickup();
    showGlobalNotification(`${wInfo.icon || '🔫'} ${loot.gunName} alındı! (${targetSlot}. Slot, ${startingMag} Mermi + ${startingReserve} Yedek)`, 'success');
  }

  updateSlotBarVisibility();
  updateBackpackUI();

  // Network sync
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'loot_picked', lootIndex: index }));
  }
}

window.useBandage = function() {
  if (state.mode !== 'battle' || state.isDead) return;
  if (!state.bandages || state.bandages <= 0) {
    showGlobalNotification('❌ Çantada hiç bandaj yok! Haritadaki evlerden toplayabilirsin.', 'warning');
    return;
  }
  if (state.health >= 150) {
    showGlobalNotification('Canın zaten tam dolu!', 'info');
    return;
  }
  state.bandages--;
  state.health = Math.min(150, state.health + 45);
  updateHealthUI();
  const countBadge = document.getElementById('bandage-count-badge');
  if (countBadge) countBadge.textContent = state.bandages;
  if (window.soundFX && window.soundFX.playBandage) window.soundFX.playBandage();
  showGlobalNotification(`🩹 Bandaj uygulandı! Can: ${state.health}/150 (+45)`, 'success');
};

// PUBG SKYDIVE & PARACHUTE FLIGHT SYSTEM
function ejectPlayerFromPlane() {
  if (!skydiveState.active || !skydiveState.inPlane) return;
  skydiveState.inPlane = false;

  // Parachute model attached above player
  if (window.models && window.models.createParachuteModel) {
    skydiveState.parachuteMesh = window.models.createParachuteModel();
    scene.add(skydiveState.parachuteMesh);
  }

  // ALL Bots eject from their respective team's plane
  bots.forEach((b, idx) => {
    if (b.avatar) {
      b.isSkydiving = true;
      const bTeam = b.team || 'blue';
      const originPlanePos = (bTeam === 'red') ? skydiveState.redPlanePos : skydiveState.bluePlanePos;
      const spreadX = (idx % 2 === 0 ? 1 : -1) * (10 + (idx % 3) * 6);
      const spreadZ = (idx % 2 === 0 ? 1 : -1) * (12 + (idx % 4) * 5);
      b.avatar.group.position.set(
        originPlanePos.x + spreadX,
        originPlanePos.y + (Math.random() - 0.5) * 6,
        originPlanePos.z + spreadZ
      );
      if (window.models && window.models.createParachuteModel) {
        const bpMesh = window.models.createParachuteModel();
        scene.add(bpMesh);
        skydiveState.botParachutes.push({ mesh: bpMesh, bot: b });
      }
    }
  });

  const promptText = document.getElementById('skydive-prompt-text');
  if (promptText) promptText.textContent = '🪂 PARAŞÜTLE SÜZÜLÜYORSUN • [W/A/S/D] ile Yön Ver • [SHIFT] Hızlı İniş';
  if (window.soundFX && window.soundFX.playDeploy) window.soundFX.playDeploy();
  showGlobalNotification('🪂 Paraşüt Açıldı! Yerdeki araca ve evlere doğru süzül, [SHIFT] Hızlı İniş!', 'success');
}
window.ejectPlayerFromPlane = ejectPlayerFromPlane;

function updateSkydivePhysics(delta) {
  if (!skydiveState.active) return;

  // 1. In Plane Phase: Both planes fly in reverse directions
  if (skydiveState.inPlane) {
    skydiveState.planeTimer -= delta;
    const flySpeed = 75; // 75 m/s

    // Blue Plane flies South (+Z)
    skydiveState.bluePlanePos.z += flySpeed * delta;
    if (skydiveState.bluePlaneMesh) {
      skydiveState.bluePlaneMesh.position.copy(skydiveState.bluePlanePos);
      skydiveState.bluePlaneMesh.rotation.y = 0;
    }

    // Red Plane flies North (-Z)
    skydiveState.redPlanePos.z -= flySpeed * delta;
    if (skydiveState.redPlaneMesh) {
      skydiveState.redPlaneMesh.position.copy(skydiveState.redPlanePos);
      skydiveState.redPlaneMesh.rotation.y = Math.PI;
    }

    const myTeam = state.team || (window.pubgLobbyState && window.pubgLobbyState.myTeam) || 'blue';
    if (myTeam === 'red') {
      playerPos.set(skydiveState.redPlanePos.x, 159, skydiveState.redPlanePos.z);
      camera.position.set(playerPos.x, playerPos.y + 4.5, playerPos.z + 20.0);
      camera.rotation.set(headPitch, playerRotY, 0, 'YXZ');
    } else {
      playerPos.set(skydiveState.bluePlanePos.x, 159, skydiveState.bluePlanePos.z);
      camera.position.set(playerPos.x, playerPos.y + 4.5, playerPos.z - 20.0);
      camera.rotation.set(headPitch, playerRotY, 0, 'YXZ');
    }

    if (skydiveState.planeTimer <= 0) {
      ejectPlayerFromPlane();
    }
    return;
  }

  // 2. Parachute Gliding Phase
  const isShift = keys.shift;
  const fallSpeed = isShift ? 22 : 11.5; // m/s vertical descent
  playerPos.y -= fallSpeed * delta;

  // Glide Steering with WASD
  const glideSpeed = 24; // m/s forward gliding
  const move = new THREE.Vector3();
  if (keys.w) move.z -= 1;
  if (keys.s) move.z += 1;
  if (keys.a) move.x -= 1;
  if (keys.d) move.x += 1;
  move.normalize();
  move.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerRotY);

  playerPos.x += move.x * glideSpeed * delta;
  playerPos.z += move.z * glideSpeed * delta;

  // Update Parachute 3D Mesh
  if (skydiveState.parachuteMesh) {
    skydiveState.parachuteMesh.position.copy(playerPos);
    skydiveState.parachuteMesh.rotation.y = playerRotY;
  }

  // Camera follows parachuting player smoothly with full mouse look
  camera.position.set(playerPos.x, playerPos.y + 1.8, playerPos.z);
  camera.rotation.set(headPitch, playerRotY, 0, 'YXZ');

  // Keep planes continuing their flight path in the sky during parachute phase
  const flySpeed = 75;
  skydiveState.bluePlanePos.z += flySpeed * delta;
  if (skydiveState.bluePlaneMesh) skydiveState.bluePlaneMesh.position.copy(skydiveState.bluePlanePos);
  skydiveState.redPlanePos.z -= flySpeed * delta;
  if (skydiveState.redPlaneMesh) skydiveState.redPlaneMesh.position.copy(skydiveState.redPlanePos);

  // Update Bot Parachutes and Gliding towards respective team bases
  skydiveState.botParachutes.forEach(bp => {
    if (bp.bot && bp.bot.avatar) {
      const bPos = bp.bot.avatar.group.position;
      bPos.y -= fallSpeed * delta;
      if (bp.bot.targetLanding) {
        const dx = bp.bot.targetLanding.x - bPos.x;
        const dz = bp.bot.targetLanding.z - bPos.z;
        const dist = Math.hypot(dx, dz);
        if (dist > 4) {
          const steerSpeed = 26;
          bPos.x += (dx / dist) * Math.min(dist, steerSpeed * delta);
          bPos.z += (dz / dist) * Math.min(dist, steerSpeed * delta);
        }
      }
      bp.mesh.position.copy(bPos);
    }
  });

  // Check Ground Landing
  const groundY = checkAndResolveCollisions(playerPos, 0.75);
  if (playerPos.y <= groundY + 0.4) {
    playerPos.y = groundY;
    velocity.set(0, 0, 0);
    skydiveState.active = false;

    // Clean up parachute meshes and planes
    if (skydiveState.parachuteMesh) {
      scene.remove(skydiveState.parachuteMesh);
      skydiveState.parachuteMesh = null;
    }
    if (skydiveState.bluePlaneMesh) {
      scene.remove(skydiveState.bluePlaneMesh);
      skydiveState.bluePlaneMesh = null;
    }
    if (skydiveState.redPlaneMesh) {
      scene.remove(skydiveState.redPlaneMesh);
      skydiveState.redPlaneMesh = null;
    }
    skydiveState.botParachutes.forEach(bp => scene.remove(bp.mesh));
    skydiveState.botParachutes = [];

    // Land all bots on ground
    bots.forEach(b => {
      if (b.avatar) {
        b.isSkydiving = false;
        const gY = checkAndResolveCollisions(b.avatar.group.position, 0.75);
        b.avatar.group.position.y = gY;
      }
    });

    const skyHud = document.getElementById('skydive-hud');
    if (skyHud) skyHud.style.display = 'none';

    if (window.soundFX && window.soundFX.playLanding) window.soundFX.playLanding();
    showGlobalNotification('🪂 Başarıyla İniş Yaptın! Yerdeki aracı [E] ile sür, evleri arayarak silah topla!', 'success');
  }
}
window.updateSkydivePhysics = updateSkydivePhysics;

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
    if (e.code === 'Space' || e.key === ' ') {
      keys.space = true;
      if (skydiveState.active && skydiveState.inPlane) {
        ejectPlayerFromPlane();
      }
    }
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
    } else if (e.code === 'Digit5' || e.code === 'Numpad5' || e.key === '5' || e.keyCode === 53 || e.which === 53) {
      useBandage();
    } else if (e.code === 'KeyQ' || e.key === 'q' || e.key === 'Q' || e.keyCode === 81) {
      switchSlot(state.prevSlot);
    }

    if (e.code === 'KeyR' || e.key === 'r' || e.key === 'R') startReload();
    
    // Vehicle & Interaction Key [E]
    if (e.code === 'KeyE' || e.key === 'e' || e.key === 'E') {
      if (currentDrivenVehicle) {
        exitVehicle();
      } else if (window.activeInteractionTarget && window.activeInteractionTarget.type === 'vehicle') {
        enterVehicle(window.activeInteractionTarget.vehicle);
      } else {
        toggleADS();
      }
    }

    // Loot & Death Crate Pickup Key [F]
    if (e.code === 'KeyF' || e.key === 'f' || e.key === 'F') {
      if (window.activeInteractionTarget && window.activeInteractionTarget.type === 'loot') {
        pickupLoot(window.activeInteractionTarget.loot, window.activeInteractionTarget.index);
      } else if (window.activeInteractionTarget && window.activeInteractionTarget.type === 'death_crate') {
        openDeathCrateModal(window.activeInteractionTarget.crate, window.activeInteractionTarget.index);
      }
    }

    // Backpack / Inventory Key [M]
    if (e.code === 'KeyM' || e.key === 'm' || e.key === 'M') {
      toggleBackpackModal();
    }

    // Vehicle Horn Key [H]
    if (e.code === 'KeyH' || e.key === 'h' || e.key === 'H') {
      if (currentDrivenVehicle) {
        if (window.soundFX && window.soundFX.playCarHonk) window.soundFX.playCarHonk();
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'vehicle_honk' }));
        }
      }
    }

    // ESCAPE KEY: Clean, instant toggle with 320ms debouncing (no duplicate triggers!)
    if ((e.code === 'Escape' || e.key === 'Escape') && state.mode === 'battle') {
      e.preventDefault();
      const now = performance.now();
      if (now - lastPauseToggleTime < 320) return;
      lastPauseToggleTime = now;

      const dcModal = document.getElementById('death-crate-modal');
      if (dcModal && dcModal.style.display === 'flex') {
        closeDeathCrateModal();
        return;
      }
      const bpModal = document.getElementById('backpack-modal');
      if (bpModal && bpModal.style.display === 'flex') {
        toggleBackpackModal();
        return;
      }
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
      const baseSens = state.mouseSensitivity || 0.0016;
      if (currentDrivenVehicle) {
        // Vehicle 360° Free-Look Camera
        vehCamYaw -= e.movementX * baseSens;
        vehCamPitch -= e.movementY * baseSens;
        vehCamPitch = Math.max(-0.45, Math.min(1.15, vehCamPitch));
      } else {
        const sens = state.isADS ? baseSens * 0.55 : baseSens;
        playerRotY -= e.movementX * sens;
        headPitch -= e.movementY * sens;
        headPitch = Math.max(-1.45, Math.min(1.45, headPitch));
      }
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
    state.myName = e.target.value.trim() || getRandomDefaultGuestName();
    localStorage.setItem('veck_saved_name', state.myName);
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
  const map = document.getElementById('private-map-select')?.value || 'pubg';
  const maxPlayers = parseInt(document.getElementById('private-players-select')?.value) || 16;
  const duration = parseInt(document.getElementById('private-time-select')?.value) || 900;
  const bots = document.getElementById('private-bots-select')?.value || 'none';

  try {
    const res = await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, map, maxPlayers, duration, bots })
    });
    const data = await res.json();

    if (data.success) {
      state.roomId = data.roomId;
      state.isPrivateRoom = true;
      state.matchType = mode;
      state.matchSeconds = duration;
      state.maxPlayers = maxPlayers;
      state.botsEnabled = (bots === 'with_bots');
      currentSelectedMap = map;
      closePrivateGameModal();
      showGlobalNotification(`🎉 Özel Oda (${data.roomId}) Kuruldu!`, 'success');
      if (map === 'pubg') {
        openPubgTeamLobbyModal(data.roomId, mode, map, maxPlayers, true);
      } else {
        startBattle(mode);
      }
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
      alert(`❌ "${inputCode}" kodlu oda bulunamadı!\nLütfen geçerli ve kurulu bir Oda Kodu girin.`);
      return;
    }

    state.roomId = inputCode;
    state.isPrivateRoom = true;
    state.matchType = data.mode || 'FFA';
    state.matchSeconds = Number(data.duration || 900);
    state.maxPlayers = Number(data.maxPlayers || 8);
    state.botsEnabled = (data.bots === 'with_bots');
    currentSelectedMap = data.map || 'pubg';
    closePrivateGameModal();
    showGlobalNotification(`🚀 Odaya bağlanılıyor: ${inputCode}`, 'info');
    if (currentSelectedMap === 'pubg') {
      openPubgTeamLobbyModal(inputCode, state.matchType, currentSelectedMap, state.maxPlayers, false);
    } else {
      startBattle(data.mode || 'FFA');
    }
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

  const allEntries = [
    playerEntry,
    ...Array.from(remotePlayers.values()).map(rp => ({
      isLocal: false,
      name: rp.name || 'Oyuncu',
      level: rp.level || 1,
      kills: rp.kills || 0,
      deaths: rp.deaths || 0,
      kd: (rp.deaths === 0 ? (rp.kills || 0) : ((rp.kills || 0) / rp.deaths)).toFixed(1),
      score: rp.score || 0,
      ping: rp.ping || 22
    })),
    ...(state.botsEnabled !== false ? bots.map(b => ({
      isLocal: false,
      name: b.name,
      level: b.level,
      kills: b.kills,
      deaths: b.deaths,
      kd: (b.deaths === 0 ? b.kills : (b.kills / b.deaths)).toFixed(1),
      score: b.score,
      ping: b.ping || 24
    })) : [])
  ];

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

// ========================================================
// PUBG SPECIAL PRE-MATCH TEAM & WAITING LOBBY (8 PLAYERS)
// ========================================================
window.pubgLobbyState = {
  active: false,
  roomId: 'PUBG-8P',
  isHost: true,
  mode: 'TDM', // 'TDM' (Takımlı 4v4) or 'FFA' (Herkes Tek)
  map: 'pubg',
  maxPlayers: 8,
  myTeam: 'blue',
  players: [],
  botsFilled: false
};

const PUBG_BOT_NAMES = ['Bot Enes', 'Bot Can', 'Bot Efe', 'Bot Mert', 'Bot Kerem', 'Bot Emre', 'Bot Baran', 'Bot Arda'];

window.openPubgTeamLobbyModal = function(roomId, mode = 'TDM', map = 'pubg', maxPlayers = 8, isHost = true) {
  pubgLobbyState.active = true;
  pubgLobbyState.roomId = roomId || state.roomId || 'PUBG-8P';
  pubgLobbyState.mode = (mode === 'FFA') ? 'FFA' : 'TDM';
  pubgLobbyState.map = map || 'pubg';
  pubgLobbyState.maxPlayers = maxPlayers || 8;
  pubgLobbyState.isHost = isHost;
  pubgLobbyState.myTeam = 'blue';
  pubgLobbyState.botsFilled = false;

  state.roomId = pubgLobbyState.roomId;
  state.isPrivateRoom = true;
  state.matchType = pubgLobbyState.mode;
  state.team = 'blue';
  currentSelectedMap = pubgLobbyState.map;

  pubgLobbyState.players = [{
    id: state.myPlayerId || 'local_player',
    name: state.myName || 'Ensar',
    team: 'blue',
    isHost: isHost,
    isBot: false
  }];

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'join_room',
      roomId: pubgLobbyState.roomId,
      isPrivate: true,
      mode: pubgLobbyState.mode,
      map: pubgLobbyState.map,
      maxPlayers: pubgLobbyState.maxPlayers,
      name: state.myName || 'Ensar',
      team: 'blue',
      x: 0, y: 0, z: 0, rotY: 0
    }));
  }

  const roomEl = document.getElementById('pubg-lobby-room-code');
  if (roomEl) roomEl.textContent = `ODA KODU: ${pubgLobbyState.roomId}`;
  const mapEl = document.getElementById('pubg-lobby-map-name');
  if (mapEl) mapEl.textContent = `HARİTA: 8000m Erangel`;

  setLobbyGameMode(pubgLobbyState.mode, false);
  renderPubgLobbySlots();

  const startBtn = document.getElementById('btn-host-start-match');
  if (startBtn) {
    startBtn.style.display = isHost ? 'block' : 'none';
  }

  const modal = document.getElementById('pubg-team-lobby-modal');
  if (modal) modal.style.display = 'flex';
};

window.choosePlayerTeam = function(newTeam) {
  if (pubgLobbyState.myTeam === newTeam) return;
  pubgLobbyState.myTeam = newTeam;
  state.team = newTeam;
  if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();

  const me = pubgLobbyState.players.find(p => p.id === (state.myPlayerId || 'local_player') || p.name === state.myName);
  if (me) me.team = newTeam;

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'switch_team',
      team: newTeam
    }));
  }

  renderPubgLobbySlots();
  showGlobalNotification(newTeam === 'blue' ? '🔵 Mavi Takıma (Güney Jeep Üssü) geçtin!' : '🔴 Kırmızı Takıma (Kuzey Jeep Üssü) geçtin!', 'info');
};

window.setLobbyGameMode = function(mode, notify = true) {
  pubgLobbyState.mode = mode;
  state.matchType = mode;

  const btnTeam = document.getElementById('btn-mode-team');
  const btnSolo = document.getElementById('btn-mode-solo');
  const teamsView = document.getElementById('pubg-teams-view');
  const soloView = document.getElementById('pubg-solo-view');

  if (mode === 'TDM') {
    if (btnTeam) btnTeam.classList.add('active');
    if (btnSolo) btnSolo.classList.remove('active');
    if (teamsView) teamsView.style.display = 'flex';
    if (soloView) soloView.style.display = 'none';
  } else {
    if (btnTeam) btnTeam.classList.remove('active');
    if (btnSolo) btnSolo.classList.add('active');
    if (teamsView) teamsView.style.display = 'none';
    if (soloView) soloView.style.display = 'grid';
  }

  renderPubgLobbySlots();
  if (notify) {
    showGlobalNotification(mode === 'TDM' ? '🛡️ Takımlı Savaş Seçildi (4v4 Mavi vs Kırmızı)' : '💀 Herkes Tek Seçildi (Solo 8 Kişi)', 'info');
  }
};

window.toggleFillLobbyBots = function() {
  if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
  pubgLobbyState.botsFilled = !pubgLobbyState.botsFilled;

  if (pubgLobbyState.botsFilled) {
    const existing = pubgLobbyState.players.filter(p => !p.isBot);
    const needed = Math.max(0, pubgLobbyState.maxPlayers - existing.length);
    const filled = [...existing];

    let botIdx = 0;
    for (let i = 0; i < needed; i++) {
      const blueCount = filled.filter(p => p.team === 'blue').length;
      const redCount = filled.filter(p => p.team === 'red').length;
      const team = (blueCount <= redCount) ? 'blue' : 'red';
      filled.push({
        id: 'bot_' + (i + 1),
        name: PUBG_BOT_NAMES[botIdx % PUBG_BOT_NAMES.length],
        team: team,
        isHost: false,
        isBot: true
      });
      botIdx++;
    }
    pubgLobbyState.players = filled;
    state.botsEnabled = true;
    showGlobalNotification('🤖 8 Kişilik Oda Botlarla Dolduruldu! Oyunu Başlatabilirsin.', 'success');
  } else {
    pubgLobbyState.players = pubgLobbyState.players.filter(p => !p.isBot);
    state.botsEnabled = false;
    showGlobalNotification('🤖 Botlar çıkarıldı. Gerçek oyuncular bekleniyor.', 'warning');
  }

  renderPubgLobbySlots();
};

window.triggerHostStartMatch = function() {
  if (!pubgLobbyState.isHost) {
    showGlobalNotification('⏳ Sadece Oda Kurucusu (Host) oyunu başlatabilir!', 'warning');
    return;
  }

  if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();

  // If there are empty slots and host clicks start, automatically fill bots
  if (pubgLobbyState.players.length < pubgLobbyState.maxPlayers) {
    window.toggleFillLobbyBots();
  }

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'room_start_match',
      roomId: pubgLobbyState.roomId,
      mode: pubgLobbyState.mode,
      map: pubgLobbyState.map
    }));
  }

  window.launchPubgMatchFromLobby();
};

window.launchPubgMatchFromLobby = function() {
  const modal = document.getElementById('pubg-team-lobby-modal');
  if (modal) modal.style.display = 'none';
  pubgLobbyState.active = false;

  currentSelectedMap = pubgLobbyState.map || 'pubg';
  state.matchType = pubgLobbyState.mode || 'TDM';
  state.team = pubgLobbyState.myTeam || 'blue';

  showGlobalNotification('🚀 Maç Başladı! Erangel 8000m haritasına kargo uçağıyla uçuyorsunuz...', 'success');
  executeStartBattle(state.matchType);
};

window.leavePubgTeamLobby = function() {
  const modal = document.getElementById('pubg-team-lobby-modal');
  if (modal) modal.style.display = 'none';
  pubgLobbyState.active = false;
  showGlobalNotification('Lobi terk edildi.', 'info');
};

window.renderPubgLobbySlots = function() {
  const countBadge = document.getElementById('pubg-lobby-player-count');
  if (countBadge) {
    countBadge.textContent = `OYUNCULAR: ${pubgLobbyState.players.length} / ${pubgLobbyState.maxPlayers}`;
  }

  const statusMsg = document.getElementById('pubg-lobby-status-msg');
  if (statusMsg) {
    if (pubgLobbyState.players.length >= pubgLobbyState.maxPlayers) {
      statusMsg.innerHTML = '<span style="color: #4ade80;">✅ Oda Tamamen Doldu (8/8)! Başlamaya hazır.</span>';
    } else {
      statusMsg.textContent = `⏳ ${pubgLobbyState.maxPlayers - pubgLobbyState.players.length} Oyuncu daha bekleniyor...`;
    }
  }

  const blueList = document.getElementById('blue-slots-list');
  const redList = document.getElementById('red-slots-list');
  const blueBadge = document.getElementById('blue-count-badge');
  const redBadge = document.getElementById('red-count-badge');

  const halfMax = Math.floor(pubgLobbyState.maxPlayers / 2);
  const bluePlayers = pubgLobbyState.players.filter(p => p.team === 'blue');
  const redPlayers = pubgLobbyState.players.filter(p => p.team === 'red');

  if (blueBadge) blueBadge.textContent = `${bluePlayers.length} / ${halfMax}`;
  if (redBadge) redBadge.textContent = `${redPlayers.length} / ${halfMax}`;

  if (blueList) {
    let html = '';
    for (let i = 0; i < halfMax; i++) {
      const p = bluePlayers[i];
      if (p) {
        const isMe = (p.id === state.myPlayerId || p.id === 'local_player' || p.name === state.myName);
        html += `
          <div class="pubg-slot-card ${isMe ? 'is-you' : ''}">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">${p.isBot ? '🤖' : (isMe ? '👑' : '👤')}</span>
              <span style="font-weight: 800; color: #fff; font-size: 13px;">${p.name || 'Oyuncu'}</span>
              ${isMe ? '<span style="font-size: 10px; background: #eab308; color: #000; font-weight: 900; padding: 1px 6px; border-radius: 4px;">SEN</span>' : ''}
              ${p.isHost ? '<span style="font-size: 10px; background: #3b82f6; color: #fff; font-weight: 800; padding: 1px 5px; border-radius: 4px;">HOST</span>' : ''}
            </div>
            <span style="font-size: 11px; color: #38bdf8; font-weight: 800;">HAZIR</span>
          </div>`;
      } else {
        html += `
          <div class="pubg-slot-card empty-slot">
            <span style="font-size: 12px; color: #64748b; font-weight: 700;">+ Boş Slot ${i + 1}</span>
            <span style="font-size: 11px; color: #475569;">Bekleniyor...</span>
          </div>`;
      }
    }
    blueList.innerHTML = html;
  }

  if (redList) {
    let html = '';
    for (let i = 0; i < halfMax; i++) {
      const p = redPlayers[i];
      if (p) {
        const isMe = (p.id === state.myPlayerId || p.id === 'local_player' || p.name === state.myName);
        html += `
          <div class="pubg-slot-card ${isMe ? 'is-you' : ''}">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">${p.isBot ? '🤖' : (isMe ? '👑' : '👤')}</span>
              <span style="font-weight: 800; color: #fff; font-size: 13px;">${p.name || 'Oyuncu'}</span>
              ${isMe ? '<span style="font-size: 10px; background: #eab308; color: #000; font-weight: 900; padding: 1px 6px; border-radius: 4px;">SEN</span>' : ''}
              ${p.isHost ? '<span style="font-size: 10px; background: #3b82f6; color: #fff; font-weight: 800; padding: 1px 5px; border-radius: 4px;">HOST</span>' : ''}
            </div>
            <span style="font-size: 11px; color: #f87171; font-weight: 800;">HAZIR</span>
          </div>`;
      } else {
        html += `
          <div class="pubg-slot-card empty-slot">
            <span style="font-size: 12px; color: #64748b; font-weight: 700;">+ Boş Slot ${i + 1}</span>
            <span style="font-size: 11px; color: #475569;">Bekleniyor...</span>
          </div>`;
      }
    }
    redList.innerHTML = html;
  }

  const soloView = document.getElementById('pubg-solo-view');
  if (soloView) {
    let html = '';
    for (let i = 0; i < pubgLobbyState.maxPlayers; i++) {
      const p = pubgLobbyState.players[i];
      if (p) {
        const isMe = (p.id === state.myPlayerId || p.id === 'local_player' || p.name === state.myName);
        html += `
          <div class="pubg-slot-card ${isMe ? 'is-you' : ''}" style="flex-direction: column; align-items: center; text-align: center; gap: 6px; padding: 14px;">
            <span style="font-size: 28px;">${p.isBot ? '🤖' : (isMe ? '👑' : '👤')}</span>
            <span style="font-weight: 800; color: #fff; font-size: 13px;">${p.name || 'Oyuncu'}</span>
            ${isMe ? '<span style="font-size: 10px; background: #eab308; color: #000; font-weight: 900; padding: 2px 6px; border-radius: 4px;">SEN</span>' : ''}
            <span style="font-size: 11px; color: #10b981; font-weight: 800;">SOLO HAZIR</span>
          </div>`;
      } else {
        html += `
          <div class="pubg-slot-card empty-slot" style="flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 6px; padding: 14px;">
            <span style="font-size: 22px; opacity: 0.4;">⏳</span>
            <span style="font-size: 12px; color: #64748b; font-weight: 700;">Boş Slot ${i + 1}</span>
          </div>`;
      }
    }
    soloView.innerHTML = html;
  }
};

window.startBattle = function(mode = 'FFA') {
  window.soundFX.playClick();
  closeModeModal();
  closePrivateGameModal();

  state.pendingBattleMode = mode;
  // In PUBG Survival Mode: Open Pre-Match Team & Waiting Lobby so players can choose Blue vs Red teams or Solo!
  if (currentSelectedMap === 'pubg') {
    openPubgTeamLobbyModal(state.roomId || 'PUBG-8P', mode === 'FFA' ? 'FFA' : 'TDM', 'pubg', 8, true);
  } else {
    // Open Pre-Match Loadout Screen so the player chooses their weapons and knife BEFORE entering battle!
    openChangeGunsModal(true);
  }
};

window.executeStartBattle = function(mode = 'FFA') {
  state.mode = 'battle';
  state.matchType = mode;
  state.isPaused = false;
  state.isDead = false;
  state.health = 150;
  state.matchSeconds = 10 * 60; // 10 minutes maximum match time
  if (currentSelectedMap === 'pubg') {
    // In PUBG Survival Mode: Start completely UNARMED! Only knife equipped; loot weapons in houses!
    state.equippedGuns[1] = null;
    state.equippedGuns[2] = null;
    state.equippedGuns[3] = 'Combat Knife';
    state.equippedGuns[4] = null;
    state.currentSlot = 3;
    state.slotAmmo = { 1: 0, 2: 0, 3: 1, 4: 0 };
    state.reserveAmmo = { 1: 0, 2: 0, 4: 0 };
    state.ammo = 0;
    state.hasSilencer = false;

    // Reset slot boxes in HUD
    const s1 = document.getElementById('slot-1');
    const s2 = document.getElementById('slot-2');
    if (s1) { s1.innerHTML = '🔫'; s1.title = 'Key 1: Boş'; }
    if (s2) { s2.innerHTML = '🔥'; s2.title = 'Key 2: Boş'; }

    showGlobalNotification('🪂 PUBG Modu: Silahsız başladın! Evleri ve hangarları arayarak silah, mermi ve bandaj bul!', 'warning');
  } else {
    state.currentSlot = 1;
    state.slotAmmo = { 1: 30, 2: 15, 3: 1, 4: 2 };
    state.ammo = getCurrentWeapon().maxAmmo;
    state.slotAmmo[state.currentSlot] = state.ammo;
    state.hasSilencer = false;
  }
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
  if (arenaData && arenaData.group) arenaData.group.visible = false;
  if (cyberCityData && cyberCityData.group) cyberCityData.group.visible = false;
  if (pubgMapData && pubgMapData.group) pubgMapData.group.visible = false;

  const currentMap = getActiveMapData();
  if (currentMap && currentMap.group) currentMap.group.visible = true;

  // Set Battle Map Atmosphere Sky
  if (state.pendingBattleMode === 'pubg' || (pubgMapData && pubgMapData.group && pubgMapData.group.visible)) {
    scene.background = new THREE.Color(0x7ec0ee); // PUBG sunny outdoor sky
    scene.fog = new THREE.FogExp2(0x7ec0ee, 0.00015); // Clear panoramic distance fog for 8000m map
  } else if (state.pendingBattleMode === 'cybercity' || (cyberCityData && cyberCityData.group && cyberCityData.group.visible)) {
    scene.background = new THREE.Color(0x0b0f19); // Cyber city night sky
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.008);
  } else {
    scene.background = new THREE.Color(0x2196f3); // Block arena blue sky
    scene.fog = new THREE.FogExp2(0x2196f3, 0.002);
  }

  updateViewmodelVisibility();

  // Deploy animation
  deployOffset = 1.0;

  // PUBG AIRPLANE & SKYDIVE SEQUENCE INITIALIZATION (2 OPPOSING PLANES FOR EACH TEAM!)
  if (currentSelectedMap === 'pubg') {
    skydiveState.active = true;
    skydiveState.inPlane = true;
    skydiveState.planeTimer = 14.0; // 14 seconds flight time

    // Clean any prior plane/chute
    if (skydiveState.bluePlaneMesh) scene.remove(skydiveState.bluePlaneMesh);
    if (skydiveState.redPlaneMesh) scene.remove(skydiveState.redPlaneMesh);
    if (skydiveState.parachuteMesh) scene.remove(skydiveState.parachuteMesh);
    skydiveState.botParachutes.forEach(bp => scene.remove(bp.mesh));
    skydiveState.botParachutes = [];

    // Create 3D Military Cargo Transport Planes for BOTH Teams
    if (window.models && window.models.createMilitaryCargoPlane) {
      // 1. Blue Team Plane: Starts at North (z = -1180), flies South (+Z) towards Pochinki (z = -120)
      skydiveState.bluePlaneMesh = window.models.createMilitaryCargoPlane();
      skydiveState.bluePlanePos.set(-35, 160, -1180);
      skydiveState.bluePlaneMesh.position.copy(skydiveState.bluePlanePos);
      skydiveState.bluePlaneMesh.rotation.y = 0;
      scene.add(skydiveState.bluePlaneMesh);

      // 2. Red Team Plane: Starts at South (z = 1880), flies North (-Z) towards Rozhok (z = 820)
      skydiveState.redPlaneMesh = window.models.createMilitaryCargoPlane();
      skydiveState.redPlanePos.set(30, 160, 1880);
      skydiveState.redPlaneMesh.position.copy(skydiveState.redPlanePos);
      skydiveState.redPlaneMesh.rotation.y = Math.PI; // Heading opposite direction!
      scene.add(skydiveState.redPlaneMesh);
    }

    const myTeam = state.team || (window.pubgLobbyState && window.pubgLobbyState.myTeam) || 'blue';
    if (myTeam === 'red') {
      playerPos.set(skydiveState.redPlanePos.x, 159, skydiveState.redPlanePos.z);
      playerRotY = Math.PI;
      headPitch = -0.15;
      velocity.set(0, 0, -75);
    } else {
      playerPos.set(skydiveState.bluePlanePos.x, 159, skydiveState.bluePlanePos.z);
      playerRotY = 0;
      headPitch = -0.15;
      velocity.set(0, 0, 75);
    }

    const skyHud = document.getElementById('skydive-hud');
    if (skyHud) skyHud.style.display = 'block';
    if (window.soundFX && window.soundFX.playDeploy) window.soundFX.playDeploy();
    showGlobalNotification('✈️ Her İki Takım İçin Karşılıklı Kargo Uçakları Havada! [SPACE] ile İstediğin Yere Paraşütle Atla!', 'info');
  }

  if (window.soundFX && window.soundFX.playDeploy) window.soundFX.playDeploy();

  updateSlotBarVisibility();
  if (currentSelectedMap !== 'pubg') {
    const playerTeam = (state.matchType === 'TDM') ? 'blue' : null;
    const spawn = getRandomSpawn(playerTeam);
    playerPos.set(spawn.x, 0, spawn.z);
    playerRotY = Math.PI;
    headPitch = 0;
    velocity.set(0, 0, 0);

    // Instantly place camera at spawn position to prevent rendering lobby orbit
    camera.position.set(playerPos.x, playerPos.y + 1.8, playerPos.z);
    camera.rotation.set(headPitch, playerRotY, 0, 'YXZ');
  } else {
    // In PUBG mode: Camera starts high in sky behind cargo plane
    const myTeamCam = state.team || (window.pubgLobbyState && window.pubgLobbyState.myTeam) || 'blue';
    if (myTeamCam === 'red') {
      camera.position.set(playerPos.x, playerPos.y + 3.0, playerPos.z + 12.0);
    } else {
      camera.position.set(playerPos.x, playerPos.y + 3.0, playerPos.z - 12.0);
    }
    camera.rotation.set(headPitch, playerRotY, 0, 'YXZ');
  }

  // Spawn Bots only if public match (No bots in private rooms!)
  spawnBots();

  // Notify server via WebSocket
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'join_room',
      roomId: state.roomId,
      isPrivate: state.isPrivateRoom,
      mode: state.matchType,
      name: state.myName,
      x: playerPos.x,
      y: playerPos.y,
      z: playerPos.z,
      rotY: playerRotY
    }));
  }

  renderer.domElement.requestPointerLock();
};

window.pauseGame = function() {
  state.isPaused = true;
  hideFocusOverlay();
  document.exitPointerLock();

  const cgBtn = document.querySelector('.btn-change-guns');
  if (cgBtn) cgBtn.style.display = (currentSelectedMap === 'pubg') ? 'none' : 'flex';

  // If paused while in mid-air (jumping), settle down to ground immediately so player never freezes mid-air
  const groundY = checkAndResolveCollisions(playerPos, 0.75);
  if (playerPos.y > groundY) {
    playerPos.y = groundY;
    velocity.set(0, 0, 0);
    isGrounded = true;
    if (socket && socket.readyState === WebSocket.OPEN) {
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

  // Clear held keys so keys don't stay active
  keys.w = false;
  keys.a = false;
  keys.s = false;
  keys.d = false;
  keys.space = false;
  keys.shift = false;
  isMouseDown = false;

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

  const sensSlider = document.getElementById('pause-sens-slider');
  const sensVal = document.getElementById('pause-sens-val');
  const currentVal = ((state.mouseSensitivity || 0.0016) * 1000).toFixed(1);
  if (sensSlider) sensSlider.value = currentVal;
  if (sensVal) sensVal.textContent = currentVal;

  document.getElementById('pause-overlay').style.display = 'flex';
  window.soundFX.playClick();
};

window.updateMouseSensitivity = function(val) {
  const num = parseFloat(val);
  state.mouseSensitivity = num * 0.001;
  localStorage.setItem('veck_sensitivity', state.mouseSensitivity);
  const valEl = document.getElementById('pause-sens-val');
  if (valEl) valEl.textContent = Number(num).toFixed(1);
};

window.resumeGame = function() {
  state.isPaused = false;
  document.getElementById('pause-overlay').style.display = 'none';
  window.soundFX.playClick();

  // Ensure consistent grounding & clear keys
  const groundY = checkAndResolveCollisions(playerPos, 0.75);
  if (playerPos.y <= groundY) {
    playerPos.y = groundY;
    velocity.y = 0;
    isGrounded = true;
  }
  keys.w = false;
  keys.a = false;
  keys.s = false;
  keys.d = false;
  keys.space = false;
  keys.shift = false;
  isMouseDown = false;

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

  // Return to sleek sci-fi lobby atmosphere
  scene.background = new THREE.Color(0x0a0e1a);
  scene.fog = new THREE.FogExp2(0x0a0e1a, 0.012);

  if (lobbyEnv) lobbyEnv.visible = true;
  if (localAvatar && localAvatar.group) localAvatar.group.visible = true;
  if (arenaData && arenaData.group) arenaData.group.visible = false;
  if (cyberCityData && cyberCityData.group) cyberCityData.group.visible = false;
  if (pubgMapData && pubgMapData.group) pubgMapData.group.visible = false;
  if (currentDrivenVehicle) exitVehicle();

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


function attachSilencerToViewmodel(vm) {
  if (!vm || !window.models || !window.models.createSilencerModel) return;
  if (vm.silencerMesh) {
    try { vm.remove(vm.silencerMesh); } catch(e){}
    vm.silencerMesh = null;
  }
  if (!state.hasSilencer) return;

  const silencer = window.models.createSilencerModel();
  const gunName = state.equippedGuns[state.currentSlot] || '';
  if (gunName.includes('Sniper')) {
    silencer.position.set(0, 0.05, -1.35);
  } else if (gunName.includes('Pistol') || gunName.includes('Deagle') || gunName.includes('Revolver')) {
    silencer.position.set(0, 0.03, -0.45);
    silencer.scale.set(0.75, 0.75, 0.75);
  } else if (gunName.includes('Shotgun')) {
    silencer.position.set(0, 0.05, -0.85);
    silencer.scale.set(1.15, 1.15, 1.0);
  } else {
    // AK-47, Burst, Minigun, Assault Rifle
    silencer.position.set(0, 0.04, -0.92);
  }
  vm.add(silencer);
  vm.silencerMesh = silencer;
}

function updateViewmodelVisibility() {
  // Hide all viewmodels first
  Object.values(viewmodels).forEach(vm => {
    vm.visible = false;
    if (vm.flash) vm.flash.visible = false;
  });
  activeGun = null;

  if (state.mode !== 'battle' || state.isDead || currentDrivenVehicle) return;

  // In PUBG mode, if slot 1 or 2 has not been looted yet, show no weapon viewmodel
  if ((state.currentSlot === 1 && !state.equippedGuns[1]) || (state.currentSlot === 2 && !state.equippedGuns[2])) {
    return;
  }

  const currentW = getCurrentWeapon();
  const vm = viewmodels[currentW.name] || (state.currentSlot === 1 ? viewmodels['AK-47'] : (state.currentSlot === 2 ? viewmodels['Pistol'] : (state.currentSlot === 3 ? viewmodels['Combat Knife'] : viewmodels['Frag Grenade'])));

  if (vm) {
    const activeSkin = state.equippedWeaponSkins[currentW.name] || 'default';
    if (window.models && window.models.applySkinToMesh) {
      window.models.applySkinToMesh(vm, activeSkin, currentW.name);
    }
    if (vm.flash) vm.flash.visible = false;
    vm.visible = true;
    activeGun = vm;

    // Attach 3D silencer mesh if acquired and in a firearm slot
    if (state.hasSilencer && (state.currentSlot === 1 || state.currentSlot === 2)) {
      attachSilencerToViewmodel(vm);
    } else if (vm.silencerMesh) {
      try { vm.remove(vm.silencerMesh); } catch(e){}
      vm.silencerMesh = null;
    }
  }
}

// 100% RELIABLE WEAPON SWITCH WITH MECHANICAL AUDIO & SPRING DEPLOY FX
window.switchSlot = function(slotNum) {
  // If requested slot is empty, check if the other weapon slot has a weapon and switch to it!
  if (slotNum === 1 && !state.equippedGuns[1]) {
    if (state.equippedGuns[2]) {
      switchSlot(2);
      return;
    }
    showGlobalNotification('❌ Henüz silah bulamadın! Evlerden silah topla.', 'warning');
    return;
  }
  if (slotNum === 2 && !state.equippedGuns[2]) {
    if (state.equippedGuns[1]) {
      switchSlot(1);
      return;
    }
    showGlobalNotification('❌ 2. Slot boş! Haritadan ikinci bir silah bulabilirsin.', 'warning');
    return;
  }
  if (slotNum === 4 && !state.equippedGuns[4]) {
    showGlobalNotification('❌ El bombası slotu boş!', 'warning');
    return;
  }

  // If already on this slot, do NOTHING! Prevents ammo refill/drain bug when pressing 1 repeatedly!
  if (state.currentSlot === slotNum) return;

  // Save current weapon magazine ammo
  if (state.currentSlot) {
    if (!state.slotAmmo) state.slotAmmo = { 1: 30, 2: 15, 3: 1, 4: 2 };
    state.slotAmmo[state.currentSlot] = state.ammo;
  }

  state.prevSlot = state.currentSlot;
  state.currentSlot = slotNum;
  const w = getCurrentWeapon();

  // Restore saved ammo for this slot
  if (!state.slotAmmo) state.slotAmmo = { 1: 30, 2: 15, 3: 1, 4: 2 };
  if (state.slotAmmo[slotNum] !== undefined) {
    state.ammo = state.slotAmmo[slotNum];
  } else {
    state.ammo = w.maxAmmo;
    state.slotAmmo[slotNum] = w.maxAmmo;
  }

  state.isReloading = false;
  state.reloadTimer = 0;

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
  if (currentDrivenVehicle) return; // Do not shoot while driving car!

  if ((state.currentSlot === 1 && !state.equippedGuns[1]) || (state.currentSlot === 2 && !state.equippedGuns[2])) {
    showGlobalNotification(`❌ ${state.currentSlot}. Slot boş! Evlerden silah bulmalısın.`, 'warning');
    return;
  }

  if (state.ammo <= 0) {
    startReload();
    return;
  }

  lastShotTime = now;
  state.ammo--;
  if (!state.slotAmmo) state.slotAmmo = { 1: 30, 2: 15, 3: 1, 4: 2 };
  state.slotAmmo[state.currentSlot] = state.ammo;
  updateAmmoUI();
  if (state.ammo === 0) {
    setTimeout(startReload, 80);
  }

  const origin = camera.position.clone();

  // Play suppressed or standard shot sound
  if (state.hasSilencer && window.soundFX && window.soundFX.playSuppressedShot) {
    window.soundFX.playSuppressedShot(origin, camera.position, playerRotY);
  } else {
    window.soundFX.playShot(weapon.sound);
  }

  recoilOffset = state.currentSlot === 1 ? 0.16 : 0.12;

  // Suppress muzzle flash when silencer is attached
  if (!state.hasSilencer && activeGun && activeGun.flash) {
    activeGun.flash.visible = true;
    if (activeGun.flash.mat) {
      activeGun.flash.mat.opacity = 1;
    } else if (activeGun.flash.material) {
      activeGun.flash.material.opacity = 1;
    }
    activeGun.flash.rotation.z = Math.random() * Math.PI * 2;
    const s = 0.85 + Math.random() * 0.35;
    activeGun.flash.scale.set(s, s, s);
    flashTimer = 0.04;
  } else if (state.hasSilencer && activeGun && activeGun.flash) {
    activeGun.flash.visible = false;
  }

  const shootDir = new THREE.Vector3();
  camera.getWorldDirection(shootDir);

  const spread = state.isADS ? weapon.spread * 0.15 : weapon.spread;
  shootDir.x += (Math.random() - 0.5) * spread;
  shootDir.y += (Math.random() - 0.5) * spread;
  shootDir.z += (Math.random() - 0.5) * spread;
  shootDir.normalize();

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
      if ((state.matchType === 'TDM' || state.matchType === '2v2') && bot.team === 'blue') {
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

          if (state.matchType !== 'TDM' || bot.team !== 'blue') {
            bot.currentTarget = { pos: playerPos, isPlayer: true, dist: bot.avatar.group.position.distanceTo(playerPos) };
            bot.strafeDir *= -1;
          }

          if (bot.health <= 0) {
            handleBotKill(bot, weapon, isHeadshot);
          }
        }
      }
    }
  });

  // 3. Remote Players (Multiplayer Hit Registration)
  remotePlayers.forEach((rp, rId) => {
    if (rp.isDead) return;
    const px = rp.group.position.x;
    const py = rp.group.position.y;
    const pz = rp.group.position.z;
    const box = new THREE.Box3(
      new THREE.Vector3(px - 0.55, py, pz - 0.55),
      new THREE.Vector3(px + 0.55, py + 1.95, pz + 0.55)
    );
    const hitPoint = new THREE.Vector3();
    if (raycaster.ray.intersectBox(box, hitPoint)) {
      const targetDist = origin.distanceTo(hitPoint);
      if (targetDist < closestWallDist) {
        triggerHitmarker();
        if (window.soundFX && window.soundFX.playHit) window.soundFX.playHit();
        const hitRelY = hitPoint.y - py;
        const isHeadshot = hitRelY > 1.45;
        const damage = isHeadshot ? (weapon.damage ? Math.round(weapon.damage * 1.5) : 38) : (weapon.damage || 24);
        showFloatingDamage(hitPoint, damage, isHeadshot);

        // Flash remote player mesh red on hit
        if (rp.group) {
          rp.group.traverse(child => {
            if (child.isMesh && child.material && child.material.color) {
              const origHex = child.material.color.getHex();
              child.material.color.setHex(0xff3333);
              setTimeout(() => {
                if (child.material && child.material.color) child.material.color.setHex(origHex);
              }, 120);
            }
          });
        }

        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: 'player_hit',
            targetId: rId,
            damage: damage,
            isHeadshot: isHeadshot,
            gun: weapon.name
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

  // Spawn lootable death crate at death location
  spawnDeathCrate(bot.avatar.group.position, bot);

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



window.openDeathCrateModal = function(crate, index) {
  if (!crate || crate.collected) return;
  currentInspectedCrate = crate;
  const modal = document.getElementById('death-crate-modal');
  if (!modal) return;

  const wInfo = ALL_WEAPONS_CATALOG[crate.weapon] || ALL_WEAPONS_CATALOG['AK-47'];
  const wNameEl = document.getElementById('crate-weapon-name');
  const wIconEl = document.getElementById('crate-weapon-icon');
  const wDescEl = document.getElementById('crate-weapon-desc');
  const ammoDescEl = document.getElementById('crate-ammo-desc');
  const bandagesDescEl = document.getElementById('crate-bandages-desc');
  const silencerRow = document.getElementById('crate-silencer-row');

  if (wNameEl) wNameEl.textContent = wInfo.name;
  if (wIconEl) wIconEl.textContent = wInfo.icon || '🔫';
  if (wDescEl) wDescEl.textContent = `${wInfo.maxAmmo || 30} Mermi ile birlikte`;
  if (ammoDescEl) ammoDescEl.textContent = `+${crate.ammo} Yedek Mermi`;
  if (bandagesDescEl) bandagesDescEl.textContent = `${crate.bandages}x Bandaj (+45 Can)`;
  if (silencerRow) silencerRow.style.display = crate.hasSilencer ? 'flex' : 'none';

  modal.style.display = 'flex';
  document.exitPointerLock();
  if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
};

window.closeDeathCrateModal = function() {
  const modal = document.getElementById('death-crate-modal');
  if (modal) modal.style.display = 'none';
  currentInspectedCrate = null;
  if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
  if (state.mode === 'battle' && !state.isPaused && !state.isDead && !skydiveState.inPlane) {
    renderer.domElement.requestPointerLock();
  }
};

window.lootCrateWeapon = function(targetSlot) {
  if (!currentInspectedCrate) return;
  const crate = currentInspectedCrate;
  const wInfo = ALL_WEAPONS_CATALOG[crate.weapon] || ALL_WEAPONS_CATALOG['AK-47'];

  state.equippedGuns[targetSlot] = crate.weapon;
  if (!state.slotAmmo) state.slotAmmo = { 1: 0, 2: 0, 3: 1, 4: 0 };
  if (!state.reserveAmmo) state.reserveAmmo = { 1: 0, 2: 0, 4: 0 };
  state.slotAmmo[targetSlot] = wInfo.maxAmmo || 30;
  state.reserveAmmo[targetSlot] = (state.reserveAmmo[targetSlot] || 0) + 30;
  state.ammo = state.slotAmmo[targetSlot];

  const slotEl = document.getElementById(`slot-${targetSlot}`);
  if (slotEl) { slotEl.innerHTML = wInfo.icon || '🔫'; slotEl.title = `Key ${targetSlot}: ${wInfo.name}`; }
  switchSlot(targetSlot);
  updateAmmoUI();
  updateSlotBarVisibility();
  updateBackpackUI();
  if (window.soundFX && window.soundFX.playLootPickup) window.soundFX.playLootPickup();
  showGlobalNotification(`🔫 ${wInfo.name} ${targetSlot}. slota kuşandı!`, 'success');
};

window.lootCrateAmmo = function() {
  if (!currentInspectedCrate) return;
  const crate = currentInspectedCrate;
  if (!state.reserveAmmo) state.reserveAmmo = { 1: 0, 2: 0, 4: 0 };
  state.reserveAmmo[state.currentSlot] = (state.reserveAmmo[state.currentSlot] || 0) + crate.ammo;
  updateAmmoUI();
  updateBackpackUI();
  if (window.soundFX && window.soundFX.playLootPickup) window.soundFX.playLootPickup();
  showGlobalNotification(`📦 +${crate.ammo} Yedek Mermi çantaya eklendi!`, 'success');
};

window.lootCrateBandages = function() {
  if (!currentInspectedCrate) return;
  state.bandages = (state.bandages || 0) + currentInspectedCrate.bandages;
  const countBadge = document.getElementById('bandage-count-badge');
  if (countBadge) countBadge.textContent = state.bandages;
  updateSlotBarVisibility();
  updateBackpackUI();
  if (window.soundFX && window.soundFX.playLootPickup) window.soundFX.playLootPickup();
  showGlobalNotification(`🩹 +${currentInspectedCrate.bandages} Bandaj çantaya eklendi! ([5] ile kullan)`, 'success');
};

window.lootCrateSilencer = function() {
  if (!currentInspectedCrate) return;
  state.hasSilencer = true;
  if (activeGun) attachSilencerToViewmodel(activeGun);
  updateAmmoUI();
  updateBackpackUI();
  if (window.soundFX && window.soundFX.playSilencerAttach) window.soundFX.playSilencerAttach();
  showGlobalNotification('🔇 Susturucu takıldı! Silah sesleri ve namlu ateşi gizlendi.', 'success');
};

window.lootAllFromCurrentCrate = function() {
  if (!currentInspectedCrate) return;
  lootDeathCrate(currentInspectedCrate);
  closeDeathCrateModal();
};

function spawnDeathCrate(pos, bot) {
  if (!window.models || !window.models.createDeathCrateModel) return;
  const crateMesh = window.models.createDeathCrateModel();
  crateMesh.position.set(pos.x, 0.05, pos.z);
  scene.add(crateMesh);

  const dropWeapon = (bot && bot.weapon === 'sniper') ? 'Sniper' : ((bot && bot.weapon === 'burst') ? 'Burst Rifle' : ((bot && bot.weapon === 'minigun') ? 'Minigun' : 'AK-47'));

  activeDeathCrates.push({
    mesh: crateMesh,
    pos: new THREE.Vector3(pos.x, 0.05, pos.z),
    weapon: dropWeapon,
    ammo: 30 + Math.floor(Math.random() * 30),
    bandages: 1 + Math.floor(Math.random() * 2),
    hasSilencer: Math.random() < 0.35,
    collected: false
  });
}

function lootDeathCrate(crate, index) {
  if (!crate || crate.collected) return;
  crate.collected = true;
  if (crate.mesh) scene.remove(crate.mesh);

  // Equip weapon if slot 1 or slot 2 is empty, or add to reserve ammo
  let weaponAcquired = null;
  const wInfo = ALL_WEAPONS_CATALOG[crate.weapon] || ALL_WEAPONS_CATALOG['AK-47'];

  if (!state.equippedGuns[1]) {
    state.equippedGuns[1] = crate.weapon;
    state.slotAmmo[1] = wInfo.maxAmmo || 30;
    state.reserveAmmo[1] = crate.ammo;
    state.ammo = state.slotAmmo[1];
    weaponAcquired = crate.weapon;
    const s1 = document.getElementById('slot-1');
    if (s1) { s1.innerHTML = wInfo.icon || '🔫'; s1.title = `Key 1: ${wInfo.name}`; }
    switchSlot(1);
  } else if (!state.equippedGuns[2]) {
    state.equippedGuns[2] = crate.weapon;
    state.slotAmmo[2] = wInfo.maxAmmo || 30;
    state.reserveAmmo[2] = crate.ammo;
    weaponAcquired = crate.weapon;
    const s2 = document.getElementById('slot-2');
    if (s2) { s2.innerHTML = wInfo.icon || '🔫'; s2.title = `Key 2: ${wInfo.name}`; }
    switchSlot(2);
  } else {
    // Add looted ammo to current weapon's reserve!
    if (!state.reserveAmmo) state.reserveAmmo = { 1: 0, 2: 0, 4: 0 };
    state.reserveAmmo[state.currentSlot] = (state.reserveAmmo[state.currentSlot] || 0) + crate.ammo;
  }

  // Bandages
  if (crate.bandages > 0) {
    state.bandages = (state.bandages || 0) + crate.bandages;
    const countBadge = document.getElementById('bandage-count-badge');
    if (countBadge) countBadge.textContent = state.bandages;
  }

  // Silencer
  if (crate.hasSilencer && !state.hasSilencer) {
    state.hasSilencer = true;
    if (activeGun) attachSilencerToViewmodel(activeGun);
    if (window.soundFX && window.soundFX.playSilencerAttach) window.soundFX.playSilencerAttach();
  } else {
    if (window.soundFX && window.soundFX.playLootPickup) window.soundFX.playLootPickup();
  }

  updateAmmoUI();
  updateSlotBarVisibility();
  updateBackpackUI();

  showGlobalNotification(
    `🎒 Düşman Çantası Yağmalandı! ${weaponAcquired ? '+ ' + weaponAcquired + ', ' : ''}+${crate.ammo} Mermi, +${crate.bandages} Bandaj${crate.hasSilencer ? ', +Susturucu' : ''}`,
    'success'
  );
}

window.toggleBackpackModal = function() {
  const modal = document.getElementById('backpack-modal');
  if (!modal) return;
  const isOpening = (modal.style.display !== 'flex');
  if (isOpening) {
    modal.style.display = 'flex';
    document.exitPointerLock();
    updateBackpackUI();
    if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
  } else {
    modal.style.display = 'none';
    if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
    if (state.mode === 'battle' && !state.isPaused && !state.isDead) {
      renderer.domElement.requestPointerLock();
    }
  }
};

function updateBackpackUI() {
  const s1Name = document.getElementById('inv-slot1-name');
  const s1Ammo = document.getElementById('inv-slot1-ammo');
  const s1Attach = document.getElementById('inv-slot1-attach');
  const s2Name = document.getElementById('inv-slot2-name');
  const s2Ammo = document.getElementById('inv-slot2-ammo');
  const bandagesEl = document.getElementById('inv-bandages');
  const grenadesEl = document.getElementById('inv-grenades');
  const silencerEl = document.getElementById('inv-silencer-badge');
  const healthEl = document.getElementById('inv-health-text');

  if (s1Name) s1Name.textContent = state.equippedGuns[1] || 'Boş (Evden Silah Bul)';
  if (s1Ammo) s1Ammo.textContent = state.equippedGuns[1] ? `${state.slotAmmo ? (state.slotAmmo[1] || 0) : 0} Mermi` : '0 Mermi';
  if (s1Attach) {
    s1Attach.textContent = state.hasSilencer ? '🔇 Susturucu: Takılı' : 'Susturucu: Yok';
    s1Attach.style.color = state.hasSilencer ? '#4ade80' : '#94a3b8';
  }

  if (s2Name) s2Name.textContent = state.equippedGuns[2] || 'Boş (Evden Silah Bul)';
  if (s2Ammo) s2Ammo.textContent = state.equippedGuns[2] ? `${state.slotAmmo ? (state.slotAmmo[2] || 0) : 0} Mermi` : '0 Mermi';

  if (bandagesEl) bandagesEl.textContent = `${state.bandages || 0} Adet`;
  if (grenadesEl) grenadesEl.textContent = `${state.equippedGuns[4] ? 2 : 0} Adet`;
  if (silencerEl) {
    silencerEl.textContent = state.hasSilencer ? 'Var (Kuşanıldı)' : 'Yok';
    silencerEl.style.color = state.hasSilencer ? '#38bdf8' : '#94a3b8';
  }
  if (healthEl) healthEl.textContent = `${state.health}/150`;
}

function startReload() {
  const weapon = getCurrentWeapon();
  if (state.isReloading || state.currentSlot === 3 || state.ammo === weapon.maxAmmo) return;

  // In PUBG mode: ammo is strictly limited to reserve!
  if (currentSelectedMap === 'pubg') {
    if (!state.reserveAmmo) state.reserveAmmo = { 1: 0, 2: 0, 4: 0 };
    const res = state.reserveAmmo[state.currentSlot] || 0;
    if (res <= 0) {
      showGlobalNotification('❌ Yedek mermin tükendi! Evleri veya ölü çantalarını arayarak mermi bul!', 'warning');
      if (window.soundFX && window.soundFX.playClick) window.soundFX.playClick();
      return;
    }
  }

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


function updateSlotBarVisibility() {
  const s1 = document.getElementById('slot-1');
  const s2 = document.getElementById('slot-2');
  const s3 = document.getElementById('slot-3');
  const s4 = document.getElementById('slot-4');
  const s5 = document.getElementById('slot-5');

  if (currentSelectedMap === 'pubg') {
    // In PUBG mode: slots only appear when items are found/looted!
    if (s1) s1.style.display = state.equippedGuns[1] ? 'flex' : 'none';
    if (s2) s2.style.display = state.equippedGuns[2] ? 'flex' : 'none';
    if (s3) s3.style.display = 'flex'; // Melee knife always available
    if (s4) s4.style.display = state.equippedGuns[4] ? 'flex' : 'none';
    if (s5) s5.style.display = (state.bandages && state.bandages > 0) ? 'flex' : 'none';
  } else {
    // Standard mode: show all
    if (s1) s1.style.display = 'flex';
    if (s2) s2.style.display = 'flex';
    if (s3) s3.style.display = 'flex';
    if (s4) s4.style.display = 'flex';
    if (s5) s5.style.display = 'flex';
  }
}

function updateAmmoUI() {
  const nameEl = document.getElementById('ammo-gun-name');
  const ammoEl = document.getElementById('ammo-current');

  if ((state.currentSlot === 1 && !state.equippedGuns[1]) || (state.currentSlot === 2 && !state.equippedGuns[2])) {
    if (ammoEl) ammoEl.innerHTML = `0 <span style="font-size: 26px; color: #8fa0c9;">III</span>`;
    if (nameEl) nameEl.textContent = 'Boş (Evden Silah Bul)';
    return;
  }

  const weapon = getCurrentWeapon();
  if (ammoEl) {
    if (state.currentSlot === 3) {
      ammoEl.innerHTML = `∞ <span style="font-size: 22px; color: #8fa0c9;">BIÇAK</span>`;
    } else if (currentSelectedMap === 'pubg') {
      const res = state.reserveAmmo ? (state.reserveAmmo[state.currentSlot] || 0) : 0;
      ammoEl.innerHTML = `${state.ammo} <span style="font-size: 20px; color: #38bdf8;">/ ${res}</span>`;
    } else {
      ammoEl.innerHTML = `${state.ammo} <span style="font-size: 26px; color: #8fa0c9;">III</span>`;
    }
  }
  if (nameEl) {
    nameEl.textContent = (state.hasSilencer && (state.currentSlot === 1 || state.currentSlot === 2))
      ? `${weapon.name} [🔇 Susturucu]`
      : weapon.name;
  }
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
    if (activeGun && activeGun.flash) {
      const progress = Math.max(0, flashTimer / 0.04);
      if (activeGun.flash.mat) activeGun.flash.mat.opacity = progress;
      else if (activeGun.flash.material) activeGun.flash.material.opacity = progress;
    }
    if (flashTimer <= 0 && activeGun && activeGun.flash) {
      activeGun.flash.visible = false;
      if (activeGun.flash.mat) activeGun.flash.mat.opacity = 0;
      else if (activeGun.flash.material) activeGun.flash.material.opacity = 0;
    }
  } else if (activeGun && activeGun.flash && activeGun.flash.visible) {
    activeGun.flash.visible = false;
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

  // Lobby Orbit & Dynamic Scenery Animation
  if (state.mode === 'lobby') {
    const camX = Math.sin(t * 0.25) * 0.45;
    const camZ = 4.6 + Math.cos(t * 0.25) * 0.25;
    camera.position.set(camX, 2.1, camZ);
    camera.lookAt(0, 1.4, -2.5);

    // Player Heroic Idle Pose
    if (localAvatar) {
      localAvatar.group.rotation.y = Math.sin(t * 0.4) * 0.12;
      if (localAvatar.leftArm) localAvatar.leftArm.rotation.x = -1.2 + Math.sin(t * 1.2) * 0.05;
      if (localAvatar.rightArm) localAvatar.rightArm.rotation.x = -1.35 + Math.cos(t * 1.2) * 0.05;
      if (localAvatar.head) localAvatar.head.rotation.y = Math.sin(t * 0.6) * 0.14;
    }

    // Animate 3D Lobby Pedestals, Floating Weapons, Runes & Particles
    if (lobbyEnv && lobbyEnv.userData) {
      // Rotating & bobbing pedestal weapons (Quick TDM & Quick Arcade)
      if (lobbyEnv.userData.pedestalWeapons) {
        lobbyEnv.userData.pedestalWeapons.forEach(w => {
          w.rotation.y += delta * 1.4;
          if (w.userData && w.userData.baseY !== undefined) {
            w.position.y = w.userData.baseY + Math.sin(t * 2.2 + (w.userData.phase || 0)) * 0.07;
          }
        });
      }
      // Glowing rune circles rotation
      if (lobbyEnv.userData.runes) {
        lobbyEnv.userData.runes.forEach(r => {
          r.mesh.rotation.z += delta * r.speed;
        });
      }
      // Ambient lobby bots subtle idle animation
      if (lobbyEnv.userData.ambientBots) {
        lobbyEnv.userData.ambientBots.forEach((b, idx) => {
          if (b.head) b.head.rotation.y = Math.sin(t * 0.6 + idx * 1.5) * 0.18;
          if (b.group) b.group.position.y = Math.sin(t * 1.2 + idx) * 0.02;
        });
      }
      // Floating sci-fi energy motes
      if (lobbyEnv.userData.particles) {
        lobbyEnv.userData.particles.forEach(p => {
          p.position.y = p.userData.baseY + Math.sin(t * p.userData.speed + p.userData.phase) * 0.35;
          p.rotation.y += delta * 0.6;
        });
      }
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

    // Skydive / Parachute Flight Update
    if (skydiveState.active && state.mode === 'battle' && !state.isPaused && !state.isDead) {
      updateSkydivePhysics(delta);
    }

    // Player / Vehicle Movement Physics
    if (!state.isDead && !skydiveState.active) {
      if (currentDrivenVehicle) {
        // Vehicle Driving Physics (PUBG UAZ)
        const veh = currentDrivenVehicle;
        const isShift = keys.shift;
        const isSpace = keys.space;

        // Acceleration / Reverse
        const currentMaxSpeed = isShift ? veh.maxSpeed * 1.35 : veh.maxSpeed;
        if (keys.w) {
          veh.speed += veh.accel * (isShift ? 1.4 : 1.0) * delta;
        } else if (keys.s) {
          veh.speed -= veh.brakeDecel * delta;
        } else {
          veh.speed *= Math.pow(veh.friction, delta * 60);
        }

        if (isSpace) {
          veh.speed *= Math.pow(0.92, delta * 60);
        }

        veh.speed = Math.max(veh.reverseMax, Math.min(currentMaxSpeed, veh.speed));

        // Steering
        const steerTarget = (keys.a ? 0.45 : (keys.d ? -0.45 : 0));
        veh.steerAngle += (steerTarget - veh.steerAngle) * Math.min(1, delta * 8);

        if (Math.abs(veh.speed) > 1.0) {
          const turnFactor = (veh.speed > 0 ? 1 : -1);
          veh.angle += veh.steerAngle * veh.turnSpeed * turnFactor * (Math.abs(veh.speed) / currentMaxSpeed) * delta;
        }

        // Forward motion vector
        const speedMs = veh.speed * (1000 / 3600); // km/h to m/s
        veh.vel.x = -Math.sin(veh.angle) * speedMs;
        veh.vel.z = -Math.cos(veh.angle) * speedMs;

        const newVehX = veh.pos.x + veh.vel.x * delta;
        const newVehZ = veh.pos.z + veh.vel.z * delta;

        // Obstacle collision check for vehicle
        const testPos = new THREE.Vector3(newVehX, veh.pos.y, newVehZ);
        const groundY = checkAndResolveCollisions(testPos, 1.8);

        const bLimitX = (currentSelectedMap === 'pubg') ? 1250 : 145;
        const bLimitZ = (currentSelectedMap === 'pubg') ? 1250 : 145;
        veh.pos.x = Math.max(-bLimitX, Math.min(bLimitX, testPos.x));
        veh.pos.z = Math.max(-bLimitZ, Math.min(bLimitZ, testPos.z));
        veh.pos.y = groundY;

        // Apply to vehicle 3D group
        veh.group.position.copy(veh.pos);
        veh.group.rotation.y = veh.angle;

        // Visual front wheel steering
        if (veh.wheels && veh.wheels.flPivot && veh.wheels.frPivot) {
          veh.wheels.flPivot.rotation.y = veh.steerAngle;
          veh.wheels.frPivot.rotation.y = veh.steerAngle;
        }

        // Visual tire spinning
        const wheelCircumference = 2 * Math.PI * 0.85;
        const spinAngle = (speedMs * delta / wheelCircumference) * Math.PI * 2;
        if (veh.wheels.flTire) {
          veh.wheels.flTire.rotation.x += spinAngle;
          veh.wheels.frTire.rotation.x += spinAngle;
          veh.wheels.rlTire.rotation.x += spinAngle;
          veh.wheels.rrTire.rotation.x += spinAngle;
        }

        // Sync player position with vehicle
        playerPos.copy(veh.pos);
        playerRotY = veh.angle;

        // 3rd Person Free-Look Orbit Camera (Mouse looks freely around vehicle!)
        const totalYaw = veh.angle + vehCamYaw;
        const camDist = 11.5 * Math.cos(vehCamPitch);
        const camH = 3.6 + 11.5 * Math.sin(vehCamPitch);
        const camX = veh.pos.x + Math.sin(totalYaw) * camDist;
        const camZ = veh.pos.z + Math.cos(totalYaw) * camDist;
        camera.position.set(camX, veh.pos.y + Math.max(1.2, camH), camZ);
        camera.lookAt(veh.pos.x, veh.pos.y + 1.8, veh.pos.z);

        // Speedometer UI
        const spEl = document.getElementById('vehicle-speed');
        if (spEl) spEl.textContent = Math.abs(Math.round(veh.speed));

        // Network sync (throttle ~40ms)
        if (socket && socket.readyState === WebSocket.OPEN && (!veh.lastSyncTime || time - veh.lastSyncTime > 40)) {
          veh.lastSyncTime = time;
          socket.send(JSON.stringify({
            type: 'vehicle_update',
            vehicleIndex: 0,
            x: veh.pos.x, y: veh.pos.y, z: veh.pos.z,
            angle: veh.angle,
            steerAngle: veh.steerAngle,
            speed: veh.speed
          }));
        }
      } else {
        // Standard On-Foot Player Movement
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

        // Solid obstacle collisions and ground height
        const groundY = checkAndResolveCollisions(playerPos, 0.75);

        const boundaryLimitX = (currentSelectedMap === 'pubg') ? 1250 : 145;
        const boundaryLimitZ = (currentSelectedMap === 'pubg') ? 1250 : 145;
        playerPos.x = Math.max(-boundaryLimitX, Math.min(boundaryLimitX, playerPos.x));
        playerPos.z = Math.max(-boundaryLimitZ, Math.min(boundaryLimitZ, playerPos.z));

        if (keys.space && isGrounded) {
          velocity.y = 9.2;
          isGrounded = false;
          if (window.soundFX && window.soundFX.playJump) {
            window.soundFX.playJump();
          }
        }

        velocity.y -= 24 * delta;
        playerPos.y += velocity.y * delta;

        if (playerPos.y <= groundY) {
          playerPos.y = groundY;
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

        // Ground Interaction Proximity Check (Loot Items & Parked Vehicles)
        const promptEl = document.getElementById('interaction-prompt');
        const promptTextEl = document.getElementById('interaction-text');
        let nearbyInteractable = null;

        const activeMap = getActiveMapData();

        // 1. Check nearby vehicles to drive
        if (activeMap && activeMap.vehicles) {
          for (let vi = 0; vi < activeMap.vehicles.length; vi++) {
            const v = activeMap.vehicles[vi];
            const dist = playerPos.distanceTo(v.pos);
            if (dist < 4.8) {
              nearbyInteractable = {
                type: 'vehicle',
                vehicle: v,
                index: vi,
                text: '[E] Arabaya Bin / Sür (PUBG UAZ)'
              };
              break;
            }
          }
        }

        // 2. Check nearby loot items if not near vehicle
        if (!nearbyInteractable && activeMap && activeMap.lootItems) {
          for (let li = 0; li < activeMap.lootItems.length; li++) {
            const loot = activeMap.lootItems[li];
            if (!loot.collected) {
              if (loot.mesh) {
                loot.mesh.rotation.y += delta * 1.5;
                loot.mesh.position.y = loot.pos.y + 0.35 + Math.sin(t * 3 + li) * 0.08;
              }
              const dist = playerPos.distanceTo(loot.pos);
              if (dist < 3.2) {
                nearbyInteractable = {
                  type: 'loot',
                  loot: loot,
                  index: li,
                  text: `[F] ${loot.name}`
                };
                break;
              }
            }
          }
        }

        if (nearbyInteractable && promptEl && promptTextEl) {
          promptTextEl.textContent = nearbyInteractable.text;
          promptEl.style.display = 'block';
          window.activeInteractionTarget = nearbyInteractable;
        } else if (promptEl) {
          promptEl.style.display = 'none';
          window.activeInteractionTarget = null;
        }

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
    }

    // Buttery Smooth 60fps Interpolation & Animation for Remote Players
    remotePlayers.forEach((rp) => {
      if (!rp.group) return;
      if (rp.isDead) {
        rp.group.visible = false;
        return;
      }
      rp.group.visible = true;

      const currentPos = rp.group.position;
      const targetPos = rp.targetPos || currentPos;
      const dist = currentPos.distanceTo(targetPos);

      // Snap if teleported or respawned far away
      if (dist > 15) {
        currentPos.copy(targetPos);
      } else {
        currentPos.lerp(targetPos, Math.min(1, delta * 20));
      }

      // Smooth rotation Y: Add Math.PI so character front faces EXACTLY where camera looks!
      if (rp.targetRotY !== undefined) {
        const desiredRotY = rp.targetRotY + Math.PI;
        let diff = desiredRotY - rp.group.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        rp.group.rotation.y += diff * Math.min(1, delta * 20);
      }

      // Smooth head pitch & Tactical Arm/Weapon Aiming
      const pitch = (rp.targetHeadPitch !== undefined) ? rp.targetHeadPitch : 0;
      if (rp.head) {
        rp.head.rotation.x = -pitch;
      }

      // Aim weapon and arms directly up/down at target!
      if (rp.rightArm) {
        rp.rightArm.rotation.set(-1.35 - pitch, -0.15, 0);
      }
      if (rp.leftArm) {
        rp.leftArm.rotation.set(-1.22 - pitch, 0.45, -0.2);
      }

      // Legs walking & airborne animations
      const horizDist = Math.hypot(targetPos.x - currentPos.x, targetPos.z - currentPos.z);
      const isAirborne = currentPos.y > 0.4;

      if (isAirborne) {
        if (rp.leftLeg) rp.leftLeg.rotation.x = 0.45;
        if (rp.rightLeg) rp.rightLeg.rotation.x = -0.45;
      } else if (horizDist > 0.02 || dist > 0.05) {
        rp.walkPhase = (rp.walkPhase || 0) + delta * 14;
        if (rp.leftLeg) rp.leftLeg.rotation.x = Math.sin(rp.walkPhase) * 0.6;
        if (rp.rightLeg) rp.rightLeg.rotation.x = -Math.sin(rp.walkPhase) * 0.6;
      } else {
        if (rp.leftLeg) rp.leftLeg.rotation.x *= 0.85;
        if (rp.rightLeg) rp.rightLeg.rotation.x *= 0.85;
      }
    });

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
        if (!state.slotAmmo) state.slotAmmo = { 1: 30, 2: 15, 3: 1, 4: 2 };
        state.slotAmmo[state.currentSlot] = state.ammo;
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
      if (bot.health > 0 && !bot.isDead && !bot.isSkydiving) {
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

          const isTeam = (state.matchType === 'TDM' || state.matchType === '2v2' || state.matchType === 'Squad');
          if (isTeam) {
            if (bot.team === 'blue') {
              // Teammate Bot: Stays near player and ONLY targets Red enemy bots! NEVER targets the player!
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

        // BOTS ONLY SHOOT IF WITHIN 38M, COOLDOWN READY, AND LINE OF SIGHT NOT BLOCKED!
        if (dist < 38 && time > bot.shootCooldown && (!target.isPlayer || !state.isDead)) {
          const hasLOS = !isLineOfSightBlocked(bp.clone().add(new THREE.Vector3(0, 1.4, 0)), targetPos);
          if (hasLOS) {
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
            if ((state.matchType === 'TDM' || state.matchType === '2v2') && bot.team === 'blue') {
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
                spawnDeathCrate(target.bot.avatar.group.position, target.bot);

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
  if (nameInput && !state.isLoggedIn) state.myName = (nameInput.value && nameInput.value.trim()) ? nameInput.value.trim() : (state.myName || getRandomDefaultGuestName());
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

// Global initialization on DOM ready (with fallback if DOM is already ready)
function initAllGameSystems() {
  init();
  fetchUserProfile();
  updateCurrencyUI();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initAllGameSystems);
} else {
  // Document already ready, initialize immediately!
  initAllGameSystems();
}


